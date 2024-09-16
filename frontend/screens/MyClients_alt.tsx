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
import { StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from './Authentication/LoadingSplash';

const { width, height } = Dimensions.get('window');

const MyClients_alt = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams, keyof RootStackParams>>();
    const [userToken, setUserToken] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');
    const [activeButton, setActiveButton] = useState('All'); 
    const [lastRefetchTime, setLastRefetchTime] = useState<Date | null>(null); 
    const pollingInterval = 1000;

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

    const [result, refetch] = useQuery({
        query: FindCoacheesOfCoachDocument,
        variables: {
            userId: userToken ? parseInt(userToken) : 0,
        },
        requestPolicy: 'cache-and-network',
    });

    const { fetching, data, error } = result;

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
            setLastRefetchTime(new Date());
        }, pollingInterval);

        return () => clearInterval(interval);
    }, [refetch, pollingInterval]);

    if (fetching) return <SplashScreen navigation={navigation} />;
    if (error) return <Text>Error: {error.message}</Text>;

    const contacts = data?.findCoachByID.contacts;
    if (!contacts) return <Text>No contacts found.</Text>;

    const FavoriteCoachees: Profile[] = contacts
        .filter((contact) => contact.contactedStatus === true)
        .map((contact) => {
            const coachee = contact.coachee;

            return {
                id: contact.coacheeId,
                name: `${coachee.firstName} ${coachee.lastName.split(' ')[0]}`,
                imageSource: { uri: coachee.profilePicture },
                contactId: contact.id,
                contactedStatus: contact.contactedStatus,
                about: coachee.bio,
            };
        });

    console.log(contacts);
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
                    source={{ uri: coachData?.findCoachByID.profilePicture }} 
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
    flexGrow: 1, 
    justifyContent: filteredCoachees.length > 0 ? 'flex-start' : 'center', 
    alignItems: filteredCoachees.length > 0 ? 'flex-start' : 'center', 
  }}
>
  {filteredCoachees.length > 0 ? (

    <CoacheeProfile coacheeProfiles={filteredCoachees} />
  ) : (

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
        width: 110,
        height: 50,
        marginTop: '5%',
        marginLeft: '8%',
        backgroundColor: '#e1d1fa',
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

export default MyClients_alt;
