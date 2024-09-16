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
import SplashScreen from './Authentication/LoadingSplash';

const { width, height } = Dimensions.get('window');

const MyCoaches_alt = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams, keyof RootStackParams>>();
    const [userToken, setUserToken] = useState<string | null>(null); 
    const [searchText, setSearchText] = useState('');
    const [activeButton, setActiveButton] = useState('Favorite'); 
    const [lastRefetchTime, setLastRefetchTime] = useState<Date | null>(null); 
    const pollingInterval = 1000;

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

    const [result, refetch] = useQuery({
        query: FindFavoriteCoachesDocument, 
        variables: {
            userId: userToken ? parseInt(userToken) : 0, 
        },
        requestPolicy: 'cache-and-network', 
    });

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
            setLastRefetchTime(new Date());
        }, pollingInterval);

        return () => clearInterval(interval);
    }, [refetch, pollingInterval]);

    const { fetching, data, error } = result;

    if (fetching) return <SplashScreen navigation={navigation} />;
    if (error) return <Text>Error: {error.message}</Text>;


    const contacts = data?.findCoacheeByID.contacts;


    if (!contacts) return <Text>No contacts found.</Text>;


    const FavoriteCoaches: Profile[] = contacts.map((contact) => {
        const coach = contact.coach;
        const totalStars = coach.reviews.reduce(
            (acc, review) => acc + review.starRating,
            0,
        );
        const averageStars =
            coach.reviews.length > 0 ? totalStars / coach.reviews.length : 0;
        let imageUrl;


        if (contact.coach.profilePicture.startsWith('https:')) {
            imageUrl = { uri: coach.profilePicture };
        } else {

            imageUrl = require('../assets/User.png');
        }

        return {
            id: contact.coachId,
            name: `${coach.firstName} ${coach.lastName}`,
            imageSource: imageUrl,
            gainedStars: averageStars, 
            mainSport: coach.sports.length > 0 ? coach.sports[0].type : '', 
            about: coach.bio,
            workplaceAddress: coach.address,
            contactId: contact.id,
            contactedStatus: contact.contactedStatus,
        };
    });
    console.log(contacts);

   
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
                    }} 
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
    flexGrow: 1, 
    justifyContent: filteredCoaches.length > 0 ? 'flex-start' : 'center', 
    alignItems: filteredCoaches.length > 0 ? 'flex-start' : 'center', 
 }}
>
 {filteredCoaches.length > 0 ? (
   
    <CoachProfiles profiles={filteredCoaches} />
 ) : (

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
        borderRadius: 35, 
        position: 'absolute',
        backgroundColor: '#DED2EA', 
        height: height * 0.16, 
        width: '100%',
        zIndex: 0, 
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
        backgroundColor: '#7E3FF0',
        marginTop: '5%',
        marginLeft: '7%',
        width: '85%',
        height: '15%',
        overflow: 'hidden',
        borderRadius: 16,
    },

    AllCoachesButton: {
        width: '80%', 
        height: 50, 
        marginTop: '5%',
        marginLeft: '10%',
        backgroundColor: '#461a96',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
    },
    FavoriteCoachesButton: {
        width: 140, 
        height: 50, 
        marginTop: '-13%',
        marginLeft: '55%',
        backgroundColor: '#e1d1f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
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
