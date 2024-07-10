import React, { useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    ImageSourcePropType,
    Alert,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import ReviewTile from '../components/Profile Tiles/ReviewProfileTiles';
import { useState } from 'react';
import AddReviewBottomSheet from '../components/BottomSheet/AddReview';
import { useQuery } from 'urql';
import {
    GetCoachReviewsDocument,
    FindCoacheeByIdDocument,
} from '../generated-gql/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from './Authentication/SplashScreen';

import Icon from 'react-native-vector-icons/Ionicons';

// type ReviewsPageRouteProp = RouteProp<RootStackParams, 'ReviewsPage'>;
// type ReviewsPageNavigationProp = NativeStackNavigationProp<
//     RootStackParams,
//     'ReviewsPage'
// >;

// interface ReviewsPageProps {
//     route: ReviewsPageRouteProp;
//     navigation: StackNavigationProp<RootStackParams, 'ReviewsPage'>; // Use StackNavigationProp here
// }

const ReviewsPage = () => {
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const [lastRefetchTime, setLastRefetchTime] = useState<Date | null>(null);
    const pollingInterval = 1000;
    // const { profile } = route.params || {};

    const handleNavigateBack = () => {
        // navigation.navigate('NewCoachProfile');
        navigation.reset({
            routes: [{ name: 'NewCoachProfile' }],
        });
    };

    // const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    // const handleAddReviewPress = () => {
    //     if (hasCompletedBooking) {
    //         // If there's a completed booking, allow the review addition
    //         setBottomSheetVisible(true);
    //     } else {
    //         // If not, display an alert with a message
    //         Alert.alert(
    //             'Booking Required', // Title of the alert
    //             'You need to have a completed booking with this coach to leave a review.', // Message of the alert
    //             [{ text: 'OK', onPress: () => console.log('OK Pressed') }], // Alert button(s)
    //         );
    //     }
    // };

    // const handleCloseBottomSheet = () => {
    //     setBottomSheetVisible(false);
    // };

    // Might need to uncomment this out
    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setUserToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchUserToken();
    }, []);

    // // function to fetch coachee data by userID (token)
    // const useFetchCoacheeByUserID = (userID: any) => {
    //     const [coacheeResult] = useQuery({
    //         query: FindCoacheeByIdDocument, // Use the Coachee query document
    //         variables: {
    //             userId: parseInt(userID),
    //         },
    //     });

    //     return coacheeResult;
    // };
    // const {
    //     data: coacheeData,
    //     loading: coacheeLoading,
    //     error: coacheeError,
    // } = useFetchCoacheeByUserID(userToken);

    // Fetch reviews using urql useQuery hook
    const [result, refetch] = useQuery({
        query: GetCoachReviewsDocument,
        variables: { userId: userToken ? parseInt(userToken) : 0 },
    });

    const { data, fetching, error } = result;

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
            setLastRefetchTime(new Date());
            console.log('Refetching data at', new Date().toLocaleTimeString());
        }, pollingInterval);

        return () => clearInterval(interval);
    }, [refetch, pollingInterval]);

    if (fetching) return <SplashScreen navigation={navigation} />;
    if (error) return <Text>Error: {error.message}</Text>;

    const reviews = data?.findCoachByID?.reviews || [];

    // Calculate the number of reviews for each star rating
    const numReviewsByRating: { [key: number]: number } = {};
    reviews.forEach((review) => {
        numReviewsByRating[review.starRating] =
            (numReviewsByRating[review.starRating] || 0) + 1;
    });

    // Calculate the total number of reviews and the average rating
    const totalReviews = reviews.length;
    const totalStars = reviews.reduce(
        (sum, review) => sum + review.starRating,
        0,
    );
    const averageRating = totalReviews !== 0 ? totalStars / totalReviews : 0;

    const maxBarWidth = 150; // Adjust as needed

    // const coacheeName = coacheeData?.findCoacheeByID
    //     ? `${coacheeData.findCoacheeByID.firstName} ${coacheeData.findCoacheeByID.id}`
    //     : 'Unknown Coachee';

    // console.log('Coachee Name and ID:', coacheeName);

    // const coachBeingRated = `${profile.name || 'Unknown Coach'} (ID: ${
    //     profile.id || 'N/A'
    // })`;

    // console.log('Coach being rated and ID:', coachBeingRated);
    // console.log('');

    //make a logic here, that checks if the coachee has an already completed booking with the profile.id

    // //  Check if the coachee has a completed booking with the coach's ID
    // const hasCompletedBooking = coacheeData?.findCoacheeByID?.bookings.some(
    //     (booking) =>
    //         booking.status === 'COMPLETED' &&
    //         booking.coach.firstName + ' ' + booking.coach.lastName ===
    //             profile.name,
    // );

    // console.log(
    //     'Coachee has completed booking with this coach:',
    //     hasCompletedBooking,
    // );

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon
                        name="arrow-back-circle-outline"
                        size={30}
                        color="#7E3FF0"
                    />
                </TouchableOpacity>

                <View>
                    <Text style={styles.coachHeader}>
                        {data?.findCoachByID?.firstName +
                            ' ' +
                            data?.findCoachByID?.lastName}
                    </Text>
                </View>
            </View>

            <View style={styles.reviewStatsContainer}>
                <View style={styles.statsContent}>
                    <Text style={styles.averageText}>
                        {' '}
                        {averageRating.toFixed(1)}
                    </Text>
                    <Text style={styles.totalReviewsText}>
                        {totalReviews} Reviews
                    </Text>
                </View>
                {/* Render number of reviews for each star rating */}
                {[5, 4, 3, 2, 1].map((starRating) => (
                    <View key={starRating} style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{starRating}</Text>
                        <View
                            style={[
                                styles.ratingBar,
                                {
                                    width: Math.min(
                                        (numReviewsByRating[starRating] || 0) *
                                            20,
                                        maxBarWidth,
                                    ),
                                },
                            ]}
                        />
                    </View>
                ))}
            </View>

            <ScrollView style={styles.reviewsContainer}>
            {totalReviews > 0 ? (
                [...reviews].reverse().map((review, index) => (
                        <ReviewTile
                            key={index}
                            review={{
                                imageSource: {
                                    uri: review.coachee.profilePicture,
                                },
                                name: `${review.coachee.firstName} ${review.coachee.lastName}`,
                                stars: review.starRating,
                                reviewText: review.comment,
                            }}
                        />
                    ))
                ) : (
                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>
                        No reviews yet
                    </Text>
                )}
            </ScrollView>
            {/* 
            {hasCompletedBooking ? (
                <TouchableOpacity
                    style={styles.addReview}
                    onPress={handleAddReviewPress}
                >
                    <Icon name="add-circle-outline" size={50} color="#7E3FF0" />
                </TouchableOpacity>
            ) : (
                <View
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ alignSelf: 'center', color: 'white' }}>
                        You need a completed booking to add a review.
                    </Text>
                </View>
            )} */}

            {/* <AddReviewBottomSheet
                isVisible={bottomSheetVisible}
                onClose={handleCloseBottomSheet}
                coachId={data?.findCoachByID?.id} // fixed id
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: '7%',
        left: '6.5%',
        zIndex: 1,
    },
    coachHeader: {
        top: '5%',
        fontSize: 20,
        fontWeight: '400',
        left: '15%',
        color: '#7E3FF0',
    },
    reviewsContainer: {
        marginTop: '-10%',
        paddingHorizontal: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        marginTop: '1%',
        borderRadius: 20,
    },
    addReview: {
        position: 'absolute',
        bottom: '5%',
        left: '80%',
        zIndex: 2,
    },
    reviewStatsContainer: {
        marginTop: '40%',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        left: '1.5%',
    },
    statsContent: {
        left: '10%',
    },
    ratingContainer: {
        bottom: '18%',
        left: '70%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    ratingText: {
        bottom: '3%',
        marginRight: 10,
        fontSize: 20,
    },
    ratingBar: {
        height: 10,
        backgroundColor: '#7E3FF0',
        borderRadius: 5,
    },
    averageText: {
        fontSize: 55,
    },
    totalReviewsText: {
        fontSize: 15,
        color: '#908D93',
        left: '5%',
    },
});

export default ReviewsPage;
