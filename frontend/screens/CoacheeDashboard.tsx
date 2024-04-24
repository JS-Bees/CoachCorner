import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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


const { width, height } = Dimensions.get('window');

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

    const sports = [
        { label: 'Basketball', value: 'Basketball' },
        { label: 'Soccer', value: 'Soccer' },
        { label: 'Tennis', value: 'Tennis' },
        { label: 'Swimming', value: 'Swimming' },                                                              

    ];

    const toggleSportsSelection = () => {
        setSportsVisible(!sportsVisible);
    };


    const handleSeeAllPress = () => {
        setSeeAllCoaches(!seeAllCoaches);
        if (!seeAllCoaches) {
            navigation.navigate('MyCoaches_alt');
        }
    };

    const navigateToNotifications = () => {
        navigation.navigate('NotificationPage');
    };
    const handleButtonClick = () => {
        // If sportsVisible is true and a sport is checked, navigate to AllCoaches
        if (sportsVisible && selectedSport) {
            navigation.navigate('AllCoachesPage', { selectedSport: selectedSport });
        } else {
            toggleSportsSelection(); // Toggle the visibility of sports selection
        }
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
    
    // console.log('Interests:', JSON.stringify(coacheeData?.findCoacheeByID.interests, null, 2));

//     // Define interests of the coachee
//     const coacheeInterests = coacheeData?.findCoacheeByID.interests || [];
//     const coaches = coachData?.coaches || [];

//     // console.log(coaches)
//     // Sort coaches by the number of matching interests in descending order
//     // Matching Algorithm and Hierarcy Recommendation Algorithm being applied
//     const sortedCoaches = coaches.map(coach => ({
//         coach,
//         matchingInterests: coach.interests.filter(coachInterest =>
//         coacheeInterests.some(coacheeInterest =>
//             coacheeInterest.type === coachInterest.type &&
//             coacheeInterest.name === coachInterest.name
//         )).length
//     })).sort((a, b) => b.matchingInterests - a.matchingInterests);

// // Ensure all coaches are considered for matching interests
// // This step might not be necessary if the sorting logic is correct,
// // but it's included here for clarity and to address the concern about initial order.

// // Select the top 2 coaches with the most matching interests
// const matchedCoaches = sortedCoaches.slice(0, 2);

// console.log('Matched Coaches:', matchedCoaches.map(match => `${match.coach.firstName} ${match.coach.lastName}`));
// const matchedCoachesNames = matchedCoaches.map(match => `${match.coach.firstName} ${match.coach.lastName}`);
const coacheeInterests = coacheeData?.findCoacheeByID?.interests || [];
const coaches = coachData?.coaches || [];

console.log(coaches)

const genrePriority = ['Movie Genre', 'Book Genre', 'Music Genre'];
const genreWeights = {
    'Movie Genre': 3,
    'Book Genre': 2,
    'Music Genre': 1
};

const findFirstMatchingInterest = (interests, type) => {
    return interests.find(interest => interest.type === type);
};

const sortedCoaches = coaches.map(coach => {
    if (!coach) {
        console.log("Coach data is undefined.");
        return null;
    }

    let weightedMatchingInterests = 0;
    genrePriority.forEach(type => {
        const coacheeInterest = findFirstMatchingInterest(coacheeInterests, type);
        const coachInterest = findFirstMatchingInterest(coach.interests, type);

        if (coacheeInterest && coachInterest && coacheeInterest.name === coachInterest.name) {
            weightedMatchingInterests += genreWeights[type];
        }
    });

    return { coach, weightedMatchingInterests };
}).filter(coach => coach !== null).sort((a, b) => b.weightedMatchingInterests - a.weightedMatchingInterests);

const matchedCoaches = sortedCoaches.slice(0, 2);

if (matchedCoaches.length === 0) {
    const randomIndex = Math.floor(Math.random() * coaches.length);
    const randomCoach = coaches[randomIndex];
    matchedCoaches.push({ coach: randomCoach, weightedMatchingInterests: 0 });
}

// Use optional chaining and nullish coalescing to safely access properties
console.log('Matched Coaches:', matchedCoaches.map(match => `${match.coach?.firstName ?? 'N/A'} ${match.coach?.lastName ?? 'N/A'}`));
const matchedCoachesNames = matchedCoaches.map(match => `${match.coach?.firstName ?? 'N/A'} ${match.coach?.lastName ?? 'N/A'}`);

    const TopCoaches: Profile[] = [
        //max 2
        {   
            id: 1,
            name: 'Serena Williams',
            imageSource: require('../assets/Serena_Williams_at_2013_US_Open.jpg'),
            gainedStars: 3,
            mainSport: 'Tennis',
            about: "Serena Jameka Williams is an American former professional tennis player.Widely regarded as one of the greatest tennis players of all time, she was ranked world No. 1 in singles by the Women's Tennis.",
            workplaceAddress:
                'So Farms, LL (Company) 6671 W. Indiantown RoadSuite 50-420 Jupiter, FL 33458',
        },
        {   
            id: 2,
            name: 'Kobe Brian',
            imageSource: require('../assets/Kobe_Brian.jpg'),
            gainedStars: 5,
            mainSport: 'Basketball',
            about: 'Kobe Bean Bryant was an American professional basketball player. A shooting guard, he spent his entire 20-year career with the Los Angeles Lakers in the National Basketball Association',
            workplaceAddress: '1551 N. Tustin Ave.Santa Ana, CA 92705',
        },
    ];

    const RecommendedCoaches: Profile[] = [
        // max 2
        {   
            id: matchedCoaches[0]?.coach?.id || 0, 
            name: matchedCoachesNames[0],
            imageSource: require('../assets/John_Doe.png'),
            gainedStars: matchedCoaches[0]?.coach?.reviews.reduce((acc, review) => acc + review.starRating, 0) || 0,
            mainSport: matchedCoaches[0]?.coach?.sports.length > 0 ? matchedCoaches[0].coach.sports[0].type : "Unknown",
            about: matchedCoaches[0]?.coach?.bio,
            workplaceAddress: matchedCoaches[0]?.coach?.address,
        },
        {   
            id: matchedCoaches[1]?.coach?.id || 0, 
            name: matchedCoachesNames[1],
            imageSource: require('../assets/Kobe_Brian.jpg'),
            gainedStars: matchedCoaches[1]?.coach?.reviews.reduce((acc, review) => acc + review.starRating, 0) || 0,
            mainSport: matchedCoaches[1]?.coach?.sports.length > 0 ? matchedCoaches[1].coach.sports[0].type : "Unknown",
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
            <TouchableOpacity onPress={navigateToNotifications}>
                <View style={CoacheeDashboardStyle.iconContainer}>
                    <Icon
                        name="notifications-outline"
                        size={35}
                        color="#7E3FF0"
                    />
                </View>
            </TouchableOpacity>
            <KeyboardAvoidingView
                style={CoacheeDashboardStyle.container}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            >
            <View style={{ flex: 1, justifyContent: 'center', padding: 30 }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={toggleSportsSelection} style={CoacheeDashboardStyle.sportSelectionContainer}>
                        <Text style={{ color: sportsVisible ? 'grey' : 'grey' }}>
                            {sportsVisible ? 'Swipe to the right for more' : 'Choose Sport'}
                            <Icon name={sportsVisible ? 'chevron-up' : 'chevron-down'} size={15} color="#7E3FF0" />
                        </Text>
                    </TouchableOpacity>
                    {sportsVisible && (
                        <View style={CoacheeDashboardStyle.sportsContainer}>
    <ScrollView
        horizontal // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
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
                    onPress={() => setSelectedSport(sport.value)} // Update selectedSport state when clicked
                    theme={{ colors: { accent: '#7E3FF0' } }} // Change accent color to purple (#7E3FF0)
                />
            ))}
        </View>
    </ScrollView>
</View>
                    )}
                </View>
            </View>
                <ScrollView
                    contentInsetAdjustmentBehavior="scrollableAxes"
                    style={{ marginTop: '1%', height: 360 }}
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
                    <TouchableOpacity onPress={handleButtonClick} style={CoacheeDashboardStyle.buttonContainer2}>
                        <Text style={CoacheeDashboardStyle.buttonText}>Find Coach</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={CoacheeDashboardStyle.topCoachesContainer}>
                        <Text style={CoacheeDashboardStyle.greetings}>
                            Top Coaches
                        </Text>
                    </View>
                   <View style={CoacheeDashboardStyle.profileTiles}>
                    <CoachProfiles
                        profiles={
                            seeAllCoaches ? TopCoaches : TopCoaches.slice(0, 2)
                        }
                    />
                   </View>

                    <View style={CoacheeDashboardStyle.topCoachesContainer}>
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
        paddingTop: '20%',
        marginLeft: '25%',
        flexDirection: 'row',
        borderBlockColor: '#461a96',
        // borderWidth: 1,
        // width: '200%'
    },

    topCoachesContainer: {
        paddingTop: '10%',
        marginLeft: '7%',
        flexDirection: 'row',
    },

    greetings: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#656466',
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
        marginTop: '5%',
        marginLeft: '7%',
        width: '85%',
        height: '22%',
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
        marginTop: 10, // Add some margin from the toggle button
    },
    rows: {
        flexDirection: 'row',
        position: 'relative',
        paddingHorizontal: -20, // Adjusted horizontal padding to create less space between buttons
        marginBottom: 10, // Add some margin to separate rows
    },
    radioButton: {
        marginLeft: -17, // Adjusted margin to reduce the space between radio buttons and labels
        fontSize: 10, // Adjust the font size of the label
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
