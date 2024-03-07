import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import React, { useState, } from 'react';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CoacheeProfile from '../components/Profile Tiles/CoacheeProfileTile';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView, KeyboardAvoidingView, TouchableOpacity,} from 'react-native';



const { width, height } = Dimensions.get('window');





const MyClients_alt = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [searchText, setSearchText] = useState(''); 
    const [activeButton, setActiveButton] = useState('All'); // 'All' or 'Favorite'
    

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const navigateToCoachProfile = () => {
        navigation.navigate("NewCoachProfile");
    };




    const AllTrainees: Profile[] = [ 
        {
            name: 'Angelina Maverick',
            imageSource: require('../assets/angelina.jpg'),
            mainSport: "Basketball",
            achievements: "None at the moment",
            affliations: "Basketball Charter",
            about: "Angelina Maverick is a dedicated student with a passion for basketball. Despite facing challenges in taking basketball as part of her Physical Education curriculum, Angelina remains determined to improve her skills and overcome obstacles."
            
        },
        {
            name: 'Jane Smith',
            imageSource: require('../assets/Jane_Smith.png'),
            mainSport: "Basketball",
            about: "Jane Smith, a dynamic basketball coach, inspires athletes with her passion for the game, fostering a culture of teamwork and excellence.",
            affliations: "Basketball Charter, US Basketball Federation",
           
        },
      

    ];

    const FavoriteTrainees: Profile[] = [ // max 2
        {
            name: 'John Doe',
            imageSource: require('../assets/John_Doe.png'), 
            mainSport: "Basketball",
            about: "John Doe, a seasoned basketball coach, brings a wealth of expertise to the court, guiding players to reach their full potential with strategic finesse and unwavering dedication.",
     
        },
        {
            name: 'Jane Smith',
            imageSource: require('../assets/Jane_Smith.png'),
            mainSport: "Basketball",
            about: "Jane Smith, a dynamic basketball coach, inspires athletes with her passion for the game, fostering a culture of teamwork and excellence.",
            affliations: "Basketball Charter, US Basketball Federation",
        },
        
    ];



   

    return (
        <View style={MyCoaches.container}>
            <View style={MyCoaches.nameAndGreetingsContainer}>
        
            </View>
            <View style={MyCoaches.iconContainer}>
            <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
            </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={navigateToCoachProfile}>
            <Image
                    source={require('../assets/Woman.png')} // Add your profile image source here
                    style={{width: 40, height: 40, marginLeft:'83%', marginTop: '-10%'}}/>
            
            </TouchableOpacity>
            

            <KeyboardAvoidingView
            style={MyCoaches.container}
            behavior={Platform.OS === "android" ? 'height' : 'padding'}>
            <View style={MyCoaches.searchContainer}>
                <SearchBar
                 placeholder='Search for a sport'
                 onChangeText={handleSearchChange}
                 value={searchText}
                 platform='android'
                 containerStyle={MyCoaches.searchBarContainer}
                 inputContainerStyle={MyCoaches.searchBarInputContainer}/>
            </View>

            <TouchableOpacity 
            style={[
                MyCoaches.AllCoachesButton,
                activeButton === 'All' ? MyCoaches.activeButton : null, 
            ]}
                onPress={() => setActiveButton('All')}>
            <Text style={MyCoaches.buttonText}>All Trainees</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[MyCoaches.FavoriteCoachesButton,
            activeButton === 'Favorite' ? MyCoaches.activeButton : null,
            ]}
                onPress={() => setActiveButton('Favorite')}>
            <Text style={MyCoaches.buttonText}>Favorite Trainees</Text>
            </TouchableOpacity>



            <ScrollView  contentInsetAdjustmentBehavior="scrollableAxes" style={{marginTop: "1%", height: 250}}>
               <View>
               <CoacheeProfile coacheeProfiles={activeButton === 'All' ? AllTrainees : FavoriteTrainees}/>
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
        backgroundColor: '#7E3FF0'
    }
   
});

export default MyClients_alt;
