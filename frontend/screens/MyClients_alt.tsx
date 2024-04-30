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
import CoacheeProfile from '../components/Profile Tiles/CoacheeProfileTile';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import { useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    FindCoacheesOfCoachDocument,
    FindCoachByIdDocument,
} from '../generated-gql/graphql';

const { width, height } = Dimensions.get('window');

const MyClients_alt = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [userToken, setUserToken] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');
    const [activeButton, setActiveButton] = useState('All'); // 'All' or 'Favorite'

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const navigateToCoacheeProfile = () => {
        navigation.navigate('NewCoachProfile');
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
            query: FindCoachByIdDocument,
            variables: { userId: parseInt(userID) },
        });

        return coacheeResult;
    };

    const { data: coachData } = useFetchCoacheeByUserID(userToken || '');

    const [result] = useQuery({
        query: FindCoacheesOfCoachDocument,
        variables: {
            userId: userToken ? parseInt(userToken) : 0, // Provide a default value of 0 when userToken is null
        },
    });

    const { fetching, data, error } = result;
    if (fetching) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const contacts = data?.findCoachByID.contacts;
    if (!contacts) return <Text>No contacts found.</Text>;

    const FavoriteCoachees: Profile[] = contacts
        .filter((contact) => contact.contactedStatus === true)
        .map((contact) => {
            const coachee = contact.coachee;

            return {
                id: contact.coacheeId,
                name: `${coachee.firstName} ${coachee.lastName}`,
                imageSource: { uri: coachee.profilePicture },
                contactId: contact.id,
                contactedStatus: contact.contactedStatus,
                about: coachee.bio,
            };
        });

    console.log(contacts);
    // Filter coachees based on search text
    const filteredCoachees = FavoriteCoachees.filter(coachee =>
        `${coachee.name}`.toLowerCase().includes(searchText.toLowerCase())
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

            <TouchableOpacity onPress={navigateToCoacheeProfile}>
                <Image
                    source={{ uri: coachData?.findCoachByID.profilePicture }} // Add your profile image source here
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
                        placeholder="Search trainee"
                        onChangeText={handleSearchChange}
                        value={searchText}
                        platform="android"
                        containerStyle={MyCoaches.searchBarContainer}
                        inputContainerStyle={MyCoaches.searchBarInputContainer}
                    />
                </View>

                <ScrollView
  contentInsetAdjustmentBehavior="scrollableAxes"
  style={{ marginTop: '1%', height: 250, left: 12 }}
  contentContainerStyle={{
    flexGrow: 1, // Ensures the container fills available space
    justifyContent: filteredCoachees.length > 0 ? 'flex-start' : 'center', // Center if no trainees
    alignItems: filteredCoachees.length > 0 ? 'flex-start' : 'center', // Align horizontally
  }}
>
  {filteredCoachees.length > 0 ? (
    // Display coachees when they exist
    <CoacheeProfile coacheeProfiles={filteredCoachees} />
  ) : (
    // Center the "No trainee found" text when there are no coachees
    <Text style={{ color: 'grey', fontSize: 18, marginBottom: '40%', textAlign: 'center',}}>No trainee found.</Text>
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
        width: 110, // Adjust the width to make it square
        height: 50, // Adjust the height to make it square
        marginTop: '5%',
        marginLeft: '8%',
        backgroundColor: '#e1d1fa',
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

export default MyClients_alt;
