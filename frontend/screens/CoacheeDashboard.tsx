import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    Alert,
    Animated,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Context, useQuery } from 'urql';
import CoachProfiles from '../components/Profile Tiles/CoachProfileTile';
import Profile from '../components/Profile Tiles/CoachProfileTile';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import {
    FindCoacheeByIdDocument,
    GetSortedCoachesDocument,
    FindRecommendedCoachesDocument,
} from '../generated-gql/graphql';
import { RadioButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import TourModal from '../components/Tour';
const { width, height } = Dimensions.get('window');
const initialStates = () => ({
    seeAllCoaches: false,
    sportsVisible: false,
    selectedSport: '',
    checked: 'second',
    userToken: null,
});

const CoacheeDashboard = () => {

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();


    const [fontsloaded] = useFonts({
        'Blinker-SemiBold': require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light': require('./../assets/fonts/Blinker-Light.ttf'),
    });

    const [userToken, setUserToken] = useState<string | null>(null); 
    const [seeAllCoaches, setSeeAllCoaches] = useState(false);
    const [sportsVisible, setSportsVisible] = useState(false);
    const [selectedSport, setSelectedSport] = useState('');
    const [checked, setChecked] = React.useState('second');
    const [states, setStates] = useState(initialStates());
    const [isTourVisible, setTourVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0)); 

    const handleTour = () => {
        setTourVisible(true);
    };

    const closeTour = () => {
        setTourVisible(false);
    };

    useEffect(() => {
  
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [animation]);

    const iconAnimationStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10], 
                }),
            },
        ],
    };

    useFocusEffect(
        React.useCallback(() => {
            setStates(initialStates()); 
         
          const onBackPress = () => {
    
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
    
            
            return true;
          };
    
          const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
    
          return () => {
            backHandler.remove();
          };
        }, [])
      );


    const sports = [
        { label: 'Basketball', value: 'Basketball' },
        { label: 'Soccer', value: 'Soccer' },
        { label: 'Swimming', value: 'Swimming' },
        { label: 'Volleyball', value: 'Volleyball' },
    ];

    const scrollViewRef = useRef(null);

    const handleIconPress = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: width, animated: true });
        }
    };

    const handleSportSelection = (sport: string) => {
        setSelectedSport(sport);
        setSportsVisible(false); 
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


    const useFetchCoacheeByUserID = (userID: any) => {
        const [coacheeResult] = useQuery({
            query: FindCoacheeByIdDocument, 
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


    const useFetchCoach = (userID: any) => {
        const [coachResult] = useQuery({
            query: GetSortedCoachesDocument, 
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

   
    const topCoachesByStarRating = (coaches) => {
        if (!coaches || coaches.length === 0) {
            return [];
        }


        const coachesWithTotalStarRatings = coaches.map((coach) => {
            const totalStarRating = coach.reviews.reduce(
                (acc, review) => acc + (review.starRating ?? 0),
                0,
            );

            return {
                ...coach,
                totalStarRating,
            };
        });


        const sortedCoachesByStarRating = coachesWithTotalStarRatings.sort(
            (a, b) => b.totalStarRating - a.totalStarRating,
        );

 
        return sortedCoachesByStarRating.slice(0, 2);
    };

 
    const topCoaches = topCoachesByStarRating(coachData?.coaches);


    const displayTopCoaches: Profile[] = topCoaches.map((coach) => {
        const isProfilePictureDefault =
            !coach.profilePicture ||
            !coach.profilePicture.startsWith('https://res');
        const profileImage = isProfilePictureDefault
            ? DEFAULT_PROFILE_PICTURE
            : { uri: coach.profilePicture };

        return {
            id: coach.id,
            name: `${coach.firstName} ${coach.lastName}`,
            imageSource: profileImage,
            gainedStars: coach.totalStarRating, 
            mainSport: coach.sports?.[0]?.type ?? 'Unknown',
            about: coach.bio,
            workplaceAddress: coach.address,
        };
    });

    const recommendedCoaches = (userID: any) => {
        const [coacheeResult] = useQuery({
            query: FindRecommendedCoachesDocument, 
            variables: {
                coacheeId: userID,
            },
        });

        return coacheeResult;
    };


    const matchedCoaches = data?.findRecommendedCoaches || [];


    const matchedCoachesNames = matchedCoaches.map(
        (coach) => `${coach.firstName} ${coach.lastName}`,
    );


    const RecommendedCoaches = matchedCoaches
        .slice(0, 4)
        .map((coach, index) => ({
            id: coach.id || 0,
            name: matchedCoachesNames[index] || '',
            imageSource:
                coach.profilePicture &&
                coach.profilePicture !== 'profile picture'
                    ? { uri: coach.profilePicture }
                    : { uri: DEFAULT_PROFILE_PICTURE },
            gainedStars: (coach.reviews || []).reduce(
                (acc, review) => acc + (review.starRating || 0),
                0,
            ),
            mainSport:
                coach.sports && coach.sports.length > 0
                    ? coach.sports[0].type
                    : 'Unknown',
            about: coach.bio || '',
            workplaceAddress: coach.address || '',
        }));

    
    if (RecommendedCoaches.length === 0) {
  
        console.log('No recommended coaches available.');
    }

    const scrollY = new Animated.Value(0);

    const opacity = scrollY.interpolate({
        inputRange: [0, 200], 
        outputRange: [1, -1.2], 
        extrapolate: 'clamp',
    });

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
                        source={{
                            uri: coacheeData?.findCoacheeByID.profilePicture,
                        }} 
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
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false },
                    )}
                    scrollEventThrottle={16}
                >
                    <Animated.View
                        style={[
                            CoacheeDashboardStyle.frameContainer,
                            { opacity: opacity },
                        ]}
                    >
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
                    </Animated.View>

                    <View style={{ flex: 1 }}>
                        <Text style={CoacheeDashboardStyle.header}>
                            Choose a Sport!
                        </Text>

                        <TouchableOpacity
                            style={CoacheeDashboardStyle.tourButton}
                            onPress={handleTour}
                        >
                            <Animated.View style={iconAnimationStyle}>
                                <Icon
                                    name="information-circle-outline"
                                    size={24}
                                    color="#7E3FF0"
                                />
                            </Animated.View>
                            <Text style={CoacheeDashboardStyle.tooltip}>
                                Need help?
                            </Text>
                            <TourModal
                                visible={isTourVisible}
                                onClose={closeTour}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                padding: 30,
                                bottom: '15%',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <ScrollView
                                    ref={scrollViewRef}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={
                                        CoacheeDashboardStyle.sportsContainer
                                    }
                                >
                                    <View style={CoacheeDashboardStyle.rows}>
                                        {sports.map((sport, index) => (
                                            <RadioButton.Item
                                                key={index}
                                                label={sport.label}
                                                value={sport.value}
                                                status={
                                                    selectedSport ===
                                                    sport.value
                                                        ? 'checked'
                                                        : 'unchecked'
                                                }
                                                labelStyle={
                                                    CoacheeDashboardStyle.radioButtonLabel
                                                }
                                                style={
                                                    CoacheeDashboardStyle.radioButton
                                                }
                                                onPress={() =>
                                                    handleSportSelection(
                                                        sport.value,
                                                    )
                                                }
                                                theme={{
                                                    colors: {
                                                        accent: '#7E3FF0',
                                                    },
                                                }}
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
                                seeAllCoaches
                                    ? displayTopCoaches
                                    : displayTopCoaches.slice(0, 2)
                            }
                        />
                    </View>

                    <View style={CoacheeDashboardStyle.recCoachesContainer}>
                        <Text style={CoacheeDashboardStyle.greetings}>
                            {' '}
                            Recommend for you{' '}
                        </Text>
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
        borderRadius: 35, 
        position: 'absolute',
        backgroundColor: '#DED2EA', 
        height: height * 0.16, 
        width: '100%',
        zIndex: 0, 
    },

    nameAndGreetingsContainer: {
        paddingTop: '15%',
        marginLeft: '25%',
        flexDirection: 'row',
        borderBlockColor: '#461a96',
    },

    topCoachesContainer: {
        paddingTop: '1%',
        marginTop: '-15%',
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
        fontWeight: '400',
        marginTop: '5%',
        left: '9%',
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
        borderRadius: 25, 
        width: width * 0.35, 
        height: height * 0.19, 
        margin: 8,
    },
    nestedMiniContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 25, 
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
        borderWidth: 3, 
        width: '90%',
        borderColor: '#7E3FF0', 
        borderRadius: 15, 
        marginTop: '10%',
        marginLeft: 'auto', 
        marginRight: 'auto',
        paddingHorizontal: '2.6%',
    },

    searchBarContainer: {
        width: 300, 
        height: 40, 
    },

    searchBarInputContainer: {
        height: '100%',
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
        paddingVertical: 6, 
        paddingHorizontal: 6, 
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
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingHorizontal: 10, 
    },
    rows: {
        flexDirection: 'row',
        position: 'relative',
        paddingHorizontal: -20, 
    },
    radioButton: {
        marginLeft: -17, 
        borderColor: '#7E3FF0', 
    },
    radioButtonLabel: {
        fontSize: 12, 
        color: '#7E3FF0',
    },
    profileTiles: {
        marginLeft: '3%',
    },
    tourButton: {
        position: 'absolute',
        top: '5%',
        right: '8%',
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
    },
    tooltip: {
        marginTop: 5,
        fontSize: 12,
        color: '#7E3FF0',
    },
});

export default CoacheeDashboard;
