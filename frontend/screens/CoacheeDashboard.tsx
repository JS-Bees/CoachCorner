import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useQuery } from 'urql';
// import { FindCoacheeByIdDocument } from '../generated-gql/graphql';
import CoachProfiles from '../components/Profile Tiles/CoachProfileTile';
import Profile from '../components/Profile Tiles/CoachProfileTile';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import { FindCoacheeByIdDocument, GetSortedCoachesDocument} from '../generated-gql/graphql';
import { RadioButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';


const { width, height } = Dimensions.get('window');
const initialStates = () => ({
    seeAllCoaches: false,
    sportsVisible: false,
    selectedSport: '',
    checked: 'second',
    userToken: null,
});

const CoacheeDashboard = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    // const isFocused = useIsFocused();

    const [fontsloaded] = useFonts({
        'Blinker-SemiBold': require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light': require('./../assets/fonts/Blinker-Light.ttf'),
    });

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [seeAllCoaches, setSeeAllCoaches] = useState(false);
    const [sportsVisible, setSportsVisible] = useState(false);
    const [selectedSport, setSelectedSport] = useState('');
    const [checked, setChecked] = React.useState('second');
    const [states, setStates] = useState(initialStates());

    useFocusEffect(
        React.useCallback(() => {
            setStates(initialStates()); // Reset the states when the screen is focused
          // When the screen is focused, add a back button event listener
          const onBackPress = () => {
            // Optionally, you can show a confirmation dialog
            Alert.alert(
              'Exit App',
              'Are you sure you want to exit the app?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => {},
                },
                {
                  text: 'Exit',
                  onPress: () => BackHandler.exitApp(),
                },
              ],
              { cancelable: true }
            );
    
            // Return true to indicate that we've handled the back button press
            return true;
          };
    
          const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          // Cleanup function
          return () => {
            backHandler.remove();
          };
        }, [])
      );

    const sports = [
        { label: 'Basketball', value: 'Basketball' },
        { label: 'Soccer', value: 'Soccer' },
        { label: 'Tennis', value: 'Tennis' },
        { label: 'Swimming', value: 'Swimming' },               
        { label: 'Volleyball', value: 'Volleyball' },                                                         

    ];



    const handleSeeAllPress = () => {
        setSeeAllCoaches(!seeAllCoaches);
        if (!seeAllCoaches) {
            navigation.navigate('MyCoaches_alt');
        }
    };

    const scrollViewRef = useRef(null);

    const handleIconPress = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: width, animated: true });
        }
    }; 

   
    const handleSportSelection = (sport: string) => {
        setSelectedSport(sport);
        setSportsVisible(false); // Hide the sports selection
        navigation.navigate('AllCoachesPage', { selectedSport: sport });
    };
    

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

    // function to fetch coachee data by userID (token)
    const useFetchCoacheeByUserID = (userID: any) => {
        const [coacheeResult] = useQuery({
            query: FindCoacheeByIdDocument, // Use the Coachee query document
            variables: {
                userId: parseInt(userID),
            },
        });

        return coacheeResult;
    };
    const {
        data: coacheeData,
        loading: coacheeLoading,
        error: coacheeError,
    } = useFetchCoacheeByUserID(userToken);

    // function to fetch coach data by userID (token)
    const useFetchCoach = (userID: any) => {
        const [coachResult] = useQuery({
            query: GetSortedCoachesDocument, // Use the Coachee query document
        });

        return coachResult;
    };
    const {
        data: coachData,
        loading: coachLoading,
        error: coachError,
    } = useFetchCoach(userToken);


    if (!fontsloaded) {
        return null;
    }
    
    const coacheeInterests = coacheeData?.findCoacheeByID?.interests || [];
    const coaches = coachData?.coaches || [];
    
    const genreTypes = ['MovieGenre', 'BookGenre', 'MusicGenre'];
    
    const findMatchingInterestsCount = (coacheeInterests, coachInterests) => {
        return genreTypes.reduce((count, genreType) => {
            const coacheeInterest = coacheeInterests.find(interest => interest.type === genreType);
            const coachInterest = coachInterests.find(interest => interest.type === genreType);
            return count + (coacheeInterest && coachInterest && coacheeInterest.name === coachInterest.name ? 1 : 0);
        }, 0);
    };
    
    const matchedCoaches = coaches.map(coach => {
        if (!coach) {
            console.log("Coach data is undefined.");
            return null;
        }
    
        const matchingInterestCount = findMatchingInterestsCount(coacheeInterests, coach.interests);
        return { coach, matchingInterestCount };
    }).filter(coach => coach !== null).sort((a, b) => b!.matchingInterestCount - a!.matchingInterestCount);
    
    if (matchedCoaches.length === 0) {
        const randomIndex = Math.floor(Math.random() * coaches.length);
        const randomCoach = coaches[randomIndex];
        matchedCoaches.push({ coach: randomCoach, matchingInterestCount: 0 });
    }
    
    // Log matched coaches
    console.log('Matched Coaches:', matchedCoaches.map(match => `${match?.coach?.firstName ?? 'N/A'} ${match?.coach?.lastName ?? 'N/A'}`));
    const matchedCoachesNames = matchedCoaches.map(match => `${match?.coach?.firstName ?? 'N/A'} ${match?.coach?.lastName ?? 'N/A'}`);
    
const DEFAULT_PROFILE_PICTURE = require('../assets/default_User.png')

// Compute the total star rating for each coach and then select the top two with the highest star ratings
const topCoachesByStarRating = (coaches) => {
    if (!coaches || coaches.length === 0) {
        return [];
    }

    // Compute total star rating for each coach
    const coachesWithTotalStarRatings = coaches.map((coach) => {
        const totalStarRating = coach.reviews.reduce(
            (acc, review) => acc + (review.starRating ?? 0),
            0
        );

        return {
            ...coach,
            totalStarRating,
        };
    });

    // Sort coaches by total star rating in descending order
    const sortedCoachesByStarRating = coachesWithTotalStarRatings.sort(
        (a, b) => b.totalStarRating - a.totalStarRating
    );

    // Return the top 2 coaches with the highest star ratings
    return sortedCoachesByStarRating.slice(0, 2);
};

// Get the top two coaches with the highest star ratings
const topCoaches = topCoachesByStarRating(coachData?.coaches);

// Create Profile objects for top coaches to maintain consistent structure
const displayTopCoaches: Profile[] = topCoaches.map((coach) => {
    const isProfilePictureDefault =
        !coach.profilePicture || !coach.profilePicture.startsWith('https://res');
    const profileImage = isProfilePictureDefault
        ? DEFAULT_PROFILE_PICTURE
        : { uri: coach.profilePicture };

    return {
        id: coach.id,
        name: `${coach.firstName} ${coach.lastName}`,
        imageSource: profileImage,
        gainedStars: coach.totalStarRating, // Use computed total star rating
        mainSport: coach.sports?.[0]?.type ?? 'Unknown',
        about: coach.bio,
        workplaceAddress: coach.address,
    };
});


    const RecommendedCoaches: Profile[] = [
        // max 2
        {   
            id: matchedCoaches[0]?.coach?.id || 0, 
            name: matchedCoachesNames[0],
              // Conditional check: if profilePicture is "profile picture", use the default image
            imageSource: matchedCoaches[0]?.coach?.profilePicture === "profile picture" 
            ? DEFAULT_PROFILE_PICTURE 
            : { uri: matchedCoaches[0]?.coach?.profilePicture },
            gainedStars: matchedCoaches[0]?.coach?.reviews.reduce((acc, review) => acc + review.starRating, 0) || 0,
            mainSport: matchedCoaches[0]?.coach?.sports && matchedCoaches[0].coach.sports.length > 0 ? matchedCoaches[0].coach.sports[0].type : "Unknown", //debugged this line since it was giving undefined value error
            about: matchedCoaches[0]?.coach?.bio,
            workplaceAddress: matchedCoaches[0]?.coach?.address,
        },
        {   
            id: matchedCoaches[1]?.coach?.id || 0, 
            name: matchedCoachesNames[1],
            imageSource: matchedCoaches[1]?.coach?.profilePicture === "profile picture" 
            ? DEFAULT_PROFILE_PICTURE 
            : { uri: matchedCoaches[1]?.coach?.profilePicture },
            gainedStars: matchedCoaches[1]?.coach?.reviews.reduce((acc, review) => acc + review.starRating, 0) || 0,
            mainSport: matchedCoaches[0]?.coach?.sports && matchedCoaches[0].coach.sports.length > 0 ? matchedCoaches[0].coach.sports[0].type : "Unknown",
            about: matchedCoaches[1]?.coach?.bio,
            workplaceAddress: matchedCoaches[1]?.coach?.address,
        },
    ];

    return (
        <View style={CoacheeDashboardStyle.container}>
            <View style={CoacheeDashboardStyle.nameAndGreetingsContainer}>
                <Text style={CoacheeDashboardStyle.greetings}>Welcome </Text>
                <Text style={CoacheeDashboardStyle.name}>
                    {coacheeData?.findCoacheeByID?.firstName}!
                </Text>
            </View>
            <View style={CoacheeDashboardStyle.imageContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('NewCoacheeProfile')}
            >
                <Image
                    source={{uri: coacheeData?.findCoacheeByID.profilePicture}} // Add your profile image source here
                    style={{
                        width: 40,
                        height: 40,
                        marginLeft: '10%',
                        marginTop: '-10%',
                        borderRadius: 20,
                    }}
                />
            </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                style={CoacheeDashboardStyle.container}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            >
        
                <ScrollView
                    contentInsetAdjustmentBehavior="scrollableAxes"
                    style={{ marginTop: '10%', height: 360 }}
                >
                    <View style={CoacheeDashboardStyle.frameContainer}>
                        <Text style={CoacheeDashboardStyle.frameText}>
                            Find the right coach for you!
                        </Text>
                        <Text style={CoacheeDashboardStyle.frameDescription}>
                            Get trained by expert coaches in different sport
                            fields
                        </Text>
                        <Image
                            source={require('../assets/19_Football_Academy-01_generated-removebg-preview.png')}
                            style={{
                                width: 120,
                                height: 120,
                                marginLeft: '65%',
                                marginTop: '-15%',
                            }}
                        />

                    </View>
                    <View style={{ flex: 1 }}>
            <Text style={CoacheeDashboardStyle.header}>Choose a Sport!</Text>
            <View style={{ flex: 1, justifyContent: 'center', padding: 30, bottom: '15%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={CoacheeDashboardStyle.sportsContainer}
                    >
                        <View style={CoacheeDashboardStyle.rows}>
                            {sports.map((sport, index) => (
                                <RadioButton.Item
                                    key={index}
                                    label={sport.label}
                                    value={sport.value}
                                    status={selectedSport === sport.value ? 'checked' : 'unchecked'}
                                    labelStyle={CoacheeDashboardStyle.radioButtonLabel}
                                    style={CoacheeDashboardStyle.radioButton}
                                    onPress={() => handleSportSelection(sport.value)}
                                    theme={{ colors: { accent: '#7E3FF0' } }}
                                />
                            ))}
                        </View>
                    </ScrollView>
                    <Icon
                        name="chevron-forward"
                        size={23}
                        color="#7E3FF0"
                        onPress={handleIconPress}
                    />
                </View>
            </View>
        </View>
                    

                    <View style={CoacheeDashboardStyle.topCoachesContainer}>
                        <Text style={CoacheeDashboardStyle.greetings}>
                            Top Coaches
                        </Text>
                    </View>
                   <View style={CoacheeDashboardStyle.profileTiles}>
                    <CoachProfiles
                        profiles={
                            seeAllCoaches ? displayTopCoaches : displayTopCoaches.slice(0, 2)
                        }
                    />
                   </View>

                    <View style={CoacheeDashboardStyle.recCoachesContainer}>
                        <Text style={CoacheeDashboardStyle.greetings}>
                            {' '}
                            Recommend for you{' '}
                        </Text>
                        <TouchableOpacity onPress={handleSeeAllPress}>
                            <Text style={CoacheeDashboardStyle.seeAll}>
                                See All
                            </Text>
                        </TouchableOpacity>
                    </View>
                   <View style={CoacheeDashboardStyle.profileTiles}>
                     <CoachProfiles profiles={RecommendedCoaches} />
                   </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const CoacheeDashboardStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backgroundContainer: {
        paddingTop: 140,
        borderRadius: 35, // Adjust the value for the desired curve
        position: 'absolute',
        backgroundColor: '#DED2EA', // Color for the background container
        height: height * 0.16, // Adjust the height as a percentage of the screen height
        width: '100%',
        zIndex: 0, // Set a lower z-index to put it behind topContainer
    },

    nameAndGreetingsContainer: {
        paddingTop: '15%',
        marginLeft: '25%',
        flexDirection: 'row',
        borderBlockColor: '#461a96',
        // borderWidth: 1,
        // width: '200%'
    },

    topCoachesContainer: {
        paddingTop: '1%',
        marginTop: "-15%",
        marginLeft: '7%',
        flexDirection: 'row',
    },
    recCoachesContainer: {

        marginLeft: '7%',
        flexDirection: 'row',
    },

    greetings: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#656466',
    },

    header: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#7E3FF0',
        fontWeight: "400",
        marginTop: "5%",
        left: "9%",
    },
    name: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#7E3FF0',
        marginLeft: '2%',
    },

    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    row: {
        flexDirection: 'row',
    },
    miniContainer: {
        borderRadius: 25, // Adjust the value for the desired curve
        width: width * 0.35, // 40% of screen width
        height: height * 0.19, // 20% of screen height
        margin: 8,
    },
    nestedMiniContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 25, // Adjust the value for the desired curve
        margin: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginTop: '-10%',
        marginLeft: '83%',
        flexDirection: 'row',
    },
    imageLabel: {
        fontFamily: 'Roboto',
        fontWeight: '800',
        fontSize: 15,
        color: '#483B5F',
        top: -2,
    },
    imageStyle: {
        width: 65,
        height: 65,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchContainer: {
        borderWidth: 3, // Add a border
        width: '90%',
        borderColor: '#7E3FF0', // Set the border color
        borderRadius: 15, // Add border radius to make it rounded
        marginTop: '10%',
        marginLeft: 'auto', // Set left margin to auto
        marginRight: 'auto', // Set right margin to auto
        paddingHorizontal: '2.6%',
    },
    
    searchBarContainer: {
        // Set the dimensions of the SearchBar container
        width: 300, // Adjust the width as needed
        height: 40, // Adjust the height as needed
    },

    searchBarInputContainer: {
        height: '100%', // Match the height of the container
    },

    frameContainer: {
        backgroundColor: '#461a96',
        marginTop: '2%',
        marginLeft: '7%',
        width: '85%',
        height: '15%',
        overflow: 'hidden',
        borderRadius: 16,
    },
    frameText: {
        color: 'white',
        top: 16,
        left: 18,
        fontSize: 18,
        lineHeight: 24,
    },
    frameDescription: {
        textAlign: 'left',
        left: 18,
        top: 25,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
        color: 'white',
        width: 206,
    },

    seeAll: {
        color: '#7E3FF0',
        fontSize: 13,
        paddingTop: '1.5%',
        marginLeft: '50%',
    },
    seeAllRecommended: {
        color: '#7E3FF0',
        fontSize: 13,
        paddingTop: '1.5%',
        marginLeft: '25%',
    },
    coachNameText: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer2: {
        backgroundColor: 'white',
        borderRadius: 6,
        paddingVertical: 6, // Add vertical padding
        paddingHorizontal: 6, // Add horizontal padding
        left: '-32%',
        marginTop: -40,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#7E3FF0',
        fontSize: 14,
        fontWeight: 'bold',
    },
    sportSelectionContainer: {
        backgroundColor: 'white',
        marginTop: '11%',
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#7E3FF0',
        width: '100%',
    },
    sportsContainer: {
        flexDirection: 'row', // Render items horizontally
        flexWrap: 'wrap', // Allow items to wrap to the next line if space is not enough
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally
        paddingHorizontal: 10, // Add padding to the container
    },
    rows: {
        flexDirection: 'row',
        position: 'relative',
        paddingHorizontal: -20, // Adjusted horizontal padding to create less space between buttons
    },
    radioButton: {
        marginLeft: -17, // Adjusted margin to reduce the space between radio buttons and labels
        borderColor: '#7E3FF0', // Add the desired border color for the radio buttons
    },
    radioButtonLabel: {
        fontSize: 12, // Adjust the font size of the label
        color: '#7E3FF0'
    },
    profileTiles: {
        marginLeft: "3%"
    }
    
});

export default CoacheeDashboard;