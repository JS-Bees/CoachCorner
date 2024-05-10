import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CoachProfiles from '../components/Profile Tiles/CoachProfileTile';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import { useQuery } from 'urql';
import {
    FindFavoriteCoachesDocument,
    FindCoacheeByIdDocument,
} from '../generated-gql/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from './Authentication/SplashScreen';

const { width, height } = Dimensions.get('window');

const MyCoaches_alt = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation = useNavigation<StackNavigationProp<RootStackParams, keyof RootStackParams>>();
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [searchText, setSearchText] = useState('');
    const [activeButton, setActiveButton] = useState('Favorite'); // 'All' or 'Favorite'

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };
    
    const handleNavigateBack = () => {
        navigation.goBack();
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

    const useFetchCoacheeByUserID = (userID: string) => {
        const [coacheeResult] = useQuery({
            query: FindCoacheeByIdDocument,
            variables: { userId: parseInt(userID) },
        });

        return coacheeResult;
    };

    const { data: coacheeData } = useFetchCoacheeByUserID(userToken || '');

    const [result] = useQuery({
        query: FindFavoriteCoachesDocument, // Pass the FindCoachesBySportDocument query
        variables: {
            userId: userToken ? parseInt(userToken) : 0, // Provide a default value of 0 when userToken is null
        },
        requestPolicy: 'cache-and-network', // Ensure the data is fetched from the network if needed
    });

    const { fetching, data, error } = result;

    if (fetching) return <SplashScreen navigation={navigation} />;
    if (error) return <Text>Error: {error.message}</Text>;

    // Extract coaches data from the GraphQL response
    const contacts = data?.findCoacheeByID.contacts;

    // Check if contacts is not null or undefined before proceeding
    if (!contacts) return <Text>No contacts found.</Text>;

    // Map over the contacts array to create a new array of Profile objects
    const FavoriteCoaches: Profile[] = contacts.map((contact) => {
        const coach = contact.coach;
        const totalStars = coach.reviews.reduce(
            (acc, review) => acc + review.starRating,
            0,
        );
        const averageStars =
            coach.reviews.length > 0 ? totalStars / coach.reviews.length : 0;
        let imageUrl;

        // Check if the profilePicture URL starts with 'https:'
        if (contact.coach.profilePicture.startsWith('https:')) {
            imageUrl = { uri: coach.profilePicture };
        } else {
            // Use the fallback image if the URL does not start with 'https:'
            imageUrl = require('../assets/User.png');
        }

        return {
            id: contact.coachId,
            name: `${coach.firstName} ${coach.lastName}`,
            imageSource: imageUrl,
            gainedStars: averageStars, // Use the calculated average stars
            mainSport: coach.sports.length > 0 ? coach.sports[0].type : '', // Assuming mainSport is the first sport in the array
            about: coach.bio,
            workplaceAddress: coach.address,
            contactId: contact.id,
            contactedStatus: contact.contactedStatus,
        };
    });
    console.log(contacts);

    // const FavoriteCoaches: Profile[] = [ // max 2
    //     {
    //         name: 'John Doe',
    //         imageSource: require('../assets/John_Doe.png'),
    //         gainedStars: 4,
    //         mainSport: "Basketball",
    //         about: "John Doe, a seasoned basketball coach, brings a wealth of expertise to the court, guiding players to reach their full potential with strategic finesse and unwavering dedication.",
    //         workplaceAddress: "123 Main Street, Basketball Court City, Hoopsland, 56789"
    //     },
    //     {
    //         name: 'Jane Smith',
    //         imageSource: require('../assets/Jane_Smith.png'),
    //         gainedStars: 3,
    //         mainSport: "Basketball",
    //         about: "Jane Smith, a dynamic basketball coach, inspires athletes with her passion for the game, fostering a culture of teamwork and excellence.",
    //         workplaceAddress: "Smith's Hoops Academy 456 Court Street Basketballville, Slam Dunk County Hoopsland, 98765"
    //     },

    // ];
    // Filter the FavoriteCoaches array based on the search text
const filteredCoaches = FavoriteCoaches.filter(coach =>
    `${coach.name}`.toLowerCase().includes(searchText.toLowerCase())
);

    return (
        <View style={MyCoaches.container}>
            <View style={MyCoaches.nameAndGreetingsContainer}></View>
            <View style={MyCoaches.iconContainer}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon
                        name="arrow-back-circle-outline"
                        size={30}
                        color="#7E3FF0"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('NewCoacheeProfile')}
            >
                <Image
                    source={{
                        uri: coacheeData?.findCoacheeByID.profilePicture,
                    }} // Add your profile image source here
                    style={{
                        width: 40,
                        height: 40,
                        marginLeft: '83%',
                        marginTop: '-10%',
                        borderRadius: 20,
                    }}
                />
            </TouchableOpacity>

            <KeyboardAvoidingView
                style={MyCoaches.container}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            >
                <View style={MyCoaches.searchContainer}>
                    <SearchBar
                        placeholder="Search Coach"
                        onChangeText={handleSearchChange}
                        value={searchText}
                        platform="android"
                        containerStyle={MyCoaches.searchBarContainer}
                        inputContainerStyle={MyCoaches.searchBarInputContainer}
                    />
                </View>
                <Text style={MyCoaches.buttonText}>Favorite Coaches</Text>

                <ScrollView
 contentInsetAdjustmentBehavior="scrollableAxes"
 style={{ marginTop: '1%', height: 250, left: 12 }}
 contentContainerStyle={{
    flexGrow: 1, // Ensures the container fills available space
    justifyContent: filteredCoaches.length > 0 ? 'flex-start' : 'center', // Center if no coaches
    alignItems: filteredCoaches.length > 0 ? 'flex-start' : 'center', // Align horizontally
 }}
>
 {filteredCoaches.length > 0 ? (
    // Display coaches when they exist
    <CoachProfiles profiles={filteredCoaches} />
 ) : (
    // Center the "No coaches found" text when there are no coaches
    <Text style={{ color: 'grey', fontSize: 18, marginBottom: '40%', textAlign: 'center',}}>No coaches found.</Text>
 )}
</ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const MyCoaches = StyleSheet.create({
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
        paddingTop: '25%',
        marginLeft: '25%',
        flexDirection: 'row',
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
        marginLeft: '9%',
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
        backgroundColor: '#7E3FF0',
        marginTop: '5%',
        marginLeft: '7%',
        width: '85%',
        height: '15%',
        overflow: 'hidden',
        borderRadius: 16,
    },

    AllCoachesButton: {
        width: '80%', // Adjust the width to make it square
        height: 50, // Adjust the height to make it square
        marginTop: '5%',
        marginLeft: '10%',
        backgroundColor: '#461a96',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Adjust the border radius for rounded corners (optional)
    },
    FavoriteCoachesButton: {
        width: 140, // Adjust the width to make it square
        height: 50, // Adjust the height to make it square
        marginTop: '-13%',
        marginLeft: '55%',
        backgroundColor: '#e1d1f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Adjust the border radius for rounded corners (optional)
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        lineHeight: 24,
    },
    activeButton: {
        backgroundColor: '#7E3FF0',
    },
});

export default MyCoaches_alt;
