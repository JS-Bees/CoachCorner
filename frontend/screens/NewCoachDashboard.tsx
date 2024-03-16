
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useQuery } from 'urql';
import { FindCoachByIdDocument } from '../generated-gql/graphql';
import UpcomingSession from '../components/Profile Tiles/UpcomingSessionTiles';
import CoachProfiles from '../components/Profile Tiles/CoachProfileTile';
import { SearchBar } from '@rneui/themed'; 
import Icon from 'react-native-vector-icons/Ionicons'
import { KeyboardAvoidingView, TouchableOpacity,} from 'react-native';

const { width, height } = Dimensions.get('window');





const NewCoachDashboard = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

   

    const [fontsloaded] = useFonts({
        'Blinker-SemiBold': require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light': require('./../assets/fonts/Blinker-Light.ttf'),
    });

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [searchText, setSearchText] = useState('');


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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useFetchCoachByUserID = (userID: any) => {
        const [coachResult] = useQuery({
            query: FindCoachByIdDocument, // Use the Coachee query document
            variables: {
                userId: parseInt(userID), // Parse the userID (token) to an integer with base 10
            },
        });

        return coachResult;
    };

    
    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    // Example usage of the query function
    // Replace 'yourToken' with the actual token or userID you want to fetch
    const {
        data: coachData,
        loading: coachLoading,
        error: coachError,
    } = useFetchCoachByUserID(userToken);

    if (!fontsloaded) {
        return null;
    }

    const navigateToNotifications = () => {
        navigation.navigate("NotificationPage");
    };
    const navigateToCoachProfile = () => {
        navigation.navigate("NewCoachProfile");
    };

    const upcoming = [ // only max two to show 
       {
        traineeName: 'Angelina Maverick',
        imageSource: require('../assets/angelina.jpg'),
        time: [
            { startTime: "9:00 AM", endTime: "10:00 AM" }, // the first of the upcoming time  and date should be displayed
            { startTime: "2:00 PM", endTime: "3:00 PM" } ],
        date: ["Fri 25 June", "Sat 26 June"],
       },
       {
        traineeName: 'Jane Smith',
        imageSource: require('../assets/Jane_Smith.png'),
        time: [
            { startTime: "9:00 AM", endTime: "10:00 AM" },
            { startTime: "2:00 PM", endTime: "3:00 PM" } ],
        date: ["Fri 25 June", "Sat 26 June"],
       },
       {
        traineeName: 'Jane Smith',
        imageSource: require('../assets/Jane_Smith.png'),
        time: [
            { startTime: "2:00 PM", endTime: "3:00 PM" } ],
        date: ["Sat 26 June"],
       },
      
    ]

    const profiles = [ // only max four to show 
       {
            name: 'Kobe Brian',
            imageSource: require('../assets/Kobe_Brian.jpg'),
            gainedStars: 5,
            mainSport: "Basketball",
            about: "Kobe Bean Bryant was an American professional basketball player. A shooting guard, he spent his entire 20-year career with the Los Angeles Lakers in the National Basketball Association",
            workplaceAddress: "1551 N. Tustin Ave.Santa Ana, CA 92705"
        },
        {
            name: 'John Doe',
            imageSource: require('../assets/John_Doe.png'), 
            gainedStars: 4,
            mainSport: "Basketball",
            about: "John Doe, a seasoned basketball coach, brings a wealth of expertise to the court, guiding players to reach their full potential with strategic finesse and unwavering dedication.",
            workplaceAddress: "123 Main Street, Basketball Court City, Hoopsland, 56789"
        },
        
      
    ]
    

    

    return (
        <View style={CoacheeDashboardStyle.container}>
            <View style={CoacheeDashboardStyle.nameAndGreetingsContainer}>
                <Text style={CoacheeDashboardStyle.greetings}>
                    Welcome Back Coach!
                </Text>
                
            </View>
            <TouchableOpacity onPress={navigateToCoachProfile}>
            <Image
                    source={{uri: coachData?.findCoachByID.profilePicture}} // Add your profile image source here
                    style={{
                        width: 40,
                        height: 40,
                        marginLeft: '10%',
                        marginTop: '-10%',
                        borderRadius: 20,
                    }}
                />
            
            </TouchableOpacity>
           <TouchableOpacity onPress={navigateToNotifications}>
           <View style={CoacheeDashboardStyle.iconContainer}>
            <Icon name="notifications-outline" size={35} color='#7E3FF0' />
            </View>
           </TouchableOpacity>
            <KeyboardAvoidingView
                style={CoacheeDashboardStyle.container}
                behavior={Platform.OS === "android" ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS === "android" ?  0 :  0}>
                <View style={CoacheeDashboardStyle.searchContainer}>
                    <SearchBar
                     placeholder='Search anything...'
                     onChangeText={handleSearchChange}
                    value={searchText}
                    platform='android'
                     containerStyle={CoacheeDashboardStyle.searchBarContainer}
                     inputContainerStyle={CoacheeDashboardStyle.searchBarInputContainer}/>
                </View>
                

                <ScrollView  contentInsetAdjustmentBehavior="scrollableAxes" style={{marginTop: "1%", height: 350}}>
                    <View style={CoacheeDashboardStyle.topCoachesContainer}>
                        <Text style={CoacheeDashboardStyle.upcomingHeader}> Upcoming Sessions </Text>
                    </View>
                    <UpcomingSession upcoming={upcoming} />
                    <View style={CoacheeDashboardStyle.topCoachesContainer}>
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
        paddingTop:"20%",
        marginLeft: '25%',
        flexDirection: 'row', 
    },

    topCoachesContainer:  {
        paddingTop:"5%",
        marginLeft: '7%',
        flexDirection: 'row', 
    },
    

    greetings: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#656466',
    },
    upcomingHeader: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#656466',
    },
    topRatedHeader: {

        bottom: "-2%",
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
    upcomingSessionContainer: {
        marginTop:  20, // Adjust this value as needed
    },
    topRatedContainer: {
        bottom: "-1%"
    },

    coachNameText: {
       alignItems:'center',
       justifyContent: "center",
    }
   
});

export default NewCoachDashboard;
