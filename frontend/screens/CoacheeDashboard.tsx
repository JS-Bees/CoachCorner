import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useQuery } from 'urql';
import { FindCoacheeByIdDocument } from '../generated-gql/graphql';
import CoachProfiles from '../components/Profile Tiles/CoachProfileTile';
import { SearchBar } from '@rneui/themed'; 
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView, KeyboardAvoidingView, TouchableOpacity,} from 'react-native';

const { width, height } = Dimensions.get('window');





const CoacheeDashboard = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [fontsloaded] = useFonts({
        'Blinker-SemiBold': require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light': require('./../assets/fonts/Blinker-Light.ttf'),
    });

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [searchText, setSearchText] = useState('');
    const [seeAllCoaches, setSeeAllCoaches] = useState(false);
    const handleSeeAllPress = () => {
        setSeeAllCoaches(!seeAllCoaches);
        if (!seeAllCoaches) {
          navigation.navigate('MyCoaches_alt'); 
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

    // Define a function to fetch coachee data by userID (token)
    const useFetchCoacheeByUserID = (userID: any) => {
        const [coacheeResult] = useQuery({
            query: FindCoacheeByIdDocument, // Use the Coachee query document
            variables: {
                userID: parseInt(userID), // Parse the userID (token) to an integer with base 10
            },
        });

        return coacheeResult;
    };

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    // Example usage of the query function
    // Replace 'yourToken' with the actual token or userID you want to fetch
    const {
        data: coacheeData,
        loading: coacheeLoading,
        error: coacheeError,
    } = useFetchCoacheeByUserID(userToken);

    if (!fontsloaded) {
        return null;
    }

    const TopCoaches: Profile[] = [ //max 2
        {
          name: 'Serena Williams',
          imageSource: require('../assets/Woman.png'),
          gainedStars: 5

        },
        {
            name: 'Kobe Brian',
            imageSource: require('../assets/Woman.png'),
            gainedStars: 3
        },
        
    ];

    const RecommendedCoaches: Profile[] = [ // max 2
        {
          name: 'Serena Williams',
          imageSource: require('../assets/Woman.png'),
          gainedStars: 2
        },
        {
            name: 'Kobe Brian',
            imageSource: require('../assets/Woman.png'),
            gainedStars: 4
        }
    ];

   

    return (
        <View style={CoacheeDashboardStyle.container}>
            <View style={CoacheeDashboardStyle.nameAndGreetingsContainer}>
                <Text style={CoacheeDashboardStyle.greetings}>
                    Welcome 
                </Text>
                <Text style={CoacheeDashboardStyle.name}>
                    {coacheeData?.findCoacheeByID?.firstName}!
                </Text>
                
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('CoacheeProfile')}>
            <Image
                    source={require('../assets/Woman.png')} // Add your profile image source here
                    style={{width: 40, height: 40, marginLeft:'10%', marginTop: '-10%'}}/>
            
            </TouchableOpacity>
            <View style={CoacheeDashboardStyle.iconContainer}>
            <Icon name="notifications-outline" size={35} color='#7E3FF0' />
            </View>
            <KeyboardAvoidingView
            style={CoacheeDashboardStyle.container}
            behavior={Platform.OS === "android" ? 'height' : 'padding'}>
            <View style={CoacheeDashboardStyle.searchContainer}>
                <SearchBar
                 placeholder='Search for a sport'
                 onChangeText={handleSearchChange}
                 value={searchText}
                 platform='android'
                 containerStyle={CoacheeDashboardStyle.searchBarContainer}
                 inputContainerStyle={CoacheeDashboardStyle.searchBarInputContainer}/>
            </View>


            <ScrollView  contentInsetAdjustmentBehavior="scrollableAxes" style={{marginTop: "1%", height: 300}}>
            <View style={CoacheeDashboardStyle.frameContainer}> 
                <Text style={CoacheeDashboardStyle.frameText}>Find the right coach for you!</Text>
                <Text style={CoacheeDashboardStyle.frameDescription}>Get trained by expert coaches in different sport fields</Text>
                <Image
                    source={require('../assets/19_Football_Academy-01_generated-removebg-preview.png')} 
                    style={{width: 120, height: 120, marginLeft:'65%', marginTop: '-15%'}}/>
            </View>

            <View style={CoacheeDashboardStyle.topCoachesContainer}>
                <Text style={CoacheeDashboardStyle.greetings}> Top Coaches </Text>
                <TouchableOpacity onPress={handleSeeAllPress}>
                 <Text style={CoacheeDashboardStyle.seeAll}>
                    {seeAllCoaches ? 'See Less' : 'See All'}
                    </Text>
                </TouchableOpacity>
            </View>
            <CoachProfiles profiles={ seeAllCoaches ? TopCoaches: TopCoaches.slice(0, 2)}/>

    

            <View style={CoacheeDashboardStyle.topCoachesContainer}>
                <Text style={CoacheeDashboardStyle.greetings}> Recommend for you </Text>
            </View>
            <CoachProfiles profiles={RecommendedCoaches}/>


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
        paddingTop:"20%",
        marginLeft: '25%',
        flexDirection: 'row', 
    },

    topCoachesContainer:  {
        paddingTop:"10%",
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
        marginLeft: '2%'
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
        marginLeft: '83%',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchContainer: {
        borderWidth: 2, // Add a border
        width: "85%",
        borderColor: '#7E3FF0', // Set the border color
        borderRadius: 15, // Add border radius to make it rounded
        marginTop: "10%",
        marginLeft: '7%',
        paddingHorizontal: 10
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
    frameText: {
        color: "white",
        top: 16,
        left: 18,
        fontSize: 18,
        lineHeight: 24,
    },
    frameDescription: {
        textAlign: "left",
        left: 18,
        top: 25,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: "500",
        color: 'white',
        width: 206
    },

    
    seeAll: {
        color: "#7E3FF0",
        fontSize: 13,
        paddingTop: '1.5%',
        marginLeft: '60%'
    },
    seeAllRecommended: {
        color: "#7E3FF0",
        fontSize: 13,
        paddingTop: '1.5%',
        marginLeft: '25%'
    },
    coachNameText: {
       alignItems:'center',
       justifyContent: "center",
    }
   
});

export default CoacheeDashboard;
