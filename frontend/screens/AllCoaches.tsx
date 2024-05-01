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
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView, KeyboardAvoidingView, TouchableOpacity,} from 'react-native';
import { FindCoachesBySportDocument, FindCoacheeByIdDocument } from '../generated-gql/graphql';
import { useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');





const AllCoaches = ({route}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [searchText, setSearchText] = useState(''); 
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [activeButton, setActiveButton] = useState('All'); // 'All' or 'Favorite'
    
    const { selectedSport } = route.params;

    // Now you can use the selectedSport value in your component logic
    console.log('Selected Sport:', selectedSport);


    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };
    
    const [result] = useQuery({
        query: FindCoachesBySportDocument, // Pass the FindCoachesBySportDocument query
        variables: { sportType: selectedSport }, // Pass the selectedSport as a variable
    });

    const { fetching, data, error } = result;

            
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

        console.log(coacheeData?.findCoacheeByID.firstName)

    if (fetching) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    // Extract coaches data from the GraphQL response
    
    const coaches = data.findCoachesBySport;
    const DEFAULT_PROFILE_PICTURE = require('../assets/default_User.png');

    

        // Map over the coaches array to create a new array of Profile objects
        const AllCoaches: Profile[] = coaches.map(coach => {
            const totalStars = coach.reviews.reduce((acc, review) => acc + review.starRating, 0);
            const averageStars = coach.reviews.length > 0 ? totalStars / coach.reviews.length : 0;
    
            return {
                id: coach.id,
                name: `${coach.firstName} ${coach.lastName}`,
                imageSource: coach.profilePicture?.startsWith("https://res.cloudinary.com")
                    ? { uri: coach.profilePicture }
                    : DEFAULT_PROFILE_PICTURE,
                gainedStars: averageStars, // Use the calculated average stars
                mainSport: selectedSport, // Assuming mainSport is the selected sport
                about: coach.bio,
                workplaceAddress: coach.address,
            };
        });

    return (
        <View style={MyCoaches.container}>
            <View style={MyCoaches.nameAndGreetingsContainer}>
        
            </View>
            <View style={MyCoaches.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("CoacheeDashboard")}>
            <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
            </TouchableOpacity>
            </View>
            
            <TouchableOpacity
                onPress={() => navigation.navigate('NewCoacheeProfile')}>
                <Image
   source={{uri: coacheeData?.findCoacheeByID.profilePicture}}
   style={{width: 40, height: 40, marginLeft:'83%', marginTop: '-10%',  borderRadius: 20,}}/>
            
            </TouchableOpacity>
            

            <KeyboardAvoidingView
            style={MyCoaches.container}
            behavior={Platform.OS === "android" ? 'height' : 'padding'}>
            <View style={MyCoaches.searchContainer}>
                <SearchBar
                 placeholder='Search Coach'
                 onChangeText={handleSearchChange}
                 value={searchText}
                 platform='android'
                 containerStyle={MyCoaches.searchBarContainer}
                 inputContainerStyle={MyCoaches.searchBarInputContainer}/>
            </View>

            <ScrollView  contentInsetAdjustmentBehavior="scrollableAxes" style={{marginTop: "1%", height: 250}}>
               <View>
               <CoachProfiles profiles={activeButton === 'All' ? AllCoaches : FavoriteCoaches}/>
               </View>

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
        paddingTop:"25%",
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
        marginTop: "-10%",
        marginLeft: '9%',
        flexDirection: 'row', 
    },
    imageLabel: {
        fontFamily: 'Roboto',
        fontWeight: '800',
        fontSize: 15,
        color: '#483B5F',
        top: -2
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
        backgroundColor: "#7E3FF0",
        marginTop: "5%",
        marginLeft: "7%",
        width: '85%',
        height: "15%",
        overflow: "hidden",
        borderRadius: 16  
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
    buttonText: {
        color: 'white',
        fontSize: 15,
        lineHeight: 24,
    },
    activeButton: {
        backgroundColor: '#7E3FF0'
    }
   
});

export default AllCoaches;
