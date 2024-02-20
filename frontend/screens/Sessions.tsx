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
import Session from '../components/Profile Tiles/CoachSessionsTiles';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView, KeyboardAvoidingView, TouchableOpacity,} from 'react-native';



const { width, height } = Dimensions.get('window');

interface CoachSessionsProps {
    sessions: Session[];
    onSessionPress?: (session: Session) => void;
}




const Booking_Sessions: React.FC<CoachSessionsProps> = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [searchText, setSearchText] = useState(''); 
    const [activeButton, setActiveButton] = useState('Upcoming'); 
 
    

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

 


    const Upcoming: Session[] = [ //max 2
        {
            coachName: 'Serena Williams',
            imageSource: require('../assets/Serena_Williams_at_2013_US_Open.jpg'),
            sport: "Tennis",
            time: [
                { startTime: "9:00 AM", endTime: "10:00 AM" },
                { startTime: "2:00 PM", endTime: "3:00 PM" } ],
            date: ["Fri 25 June", "Sat 26 June"],
      }
       

            
    ];

    const Pending: Session[] = [ // max 2
        {
            coachName: 'Kobe Bryant',
            imageSource: require('../assets/Kobe_Brian.jpg'),
            sport: "Basketball",
            time: [
                { startTime: "9:00 AM", endTime: "10:00 AM" },
                { startTime: "2:00 PM", endTime: "3:00 PM" }, ],
            date: ["Fri 25 June", "Sat 26 June"],
        },
      
    ];



   

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
                    source={require('../assets/Woman.png')} // Add your profile image source here
                    style={{width: 40, height: 40, marginLeft:'83%', marginTop: '-10%'}}/>
            
            </TouchableOpacity>
            

            <KeyboardAvoidingView
            style={MyCoaches.container}
            behavior={Platform.OS === "android" ? 'height' : 'padding'}>
            <View style={MyCoaches.searchContainer}>
                <SearchBar
                 placeholder='Search for coach name'
                 onChangeText={handleSearchChange}
                 value={searchText}
                 platform='android'
                 containerStyle={MyCoaches.searchBarContainer}
                 inputContainerStyle={MyCoaches.searchBarInputContainer}/>
            </View>

            <TouchableOpacity 
            style={[
                MyCoaches.AllCoachesButton,
                activeButton === 'Upcoming' ? MyCoaches.activeButton : null, 
            ]}
                onPress={() => setActiveButton('Upcoming')}>
            <Text style={MyCoaches.buttonText}>Upcoming</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[MyCoaches.FavoriteCoachesButton,
            activeButton === 'Pending' ? MyCoaches.activeButton : null,
            ]}
                onPress={() => setActiveButton('Pending')}>
            <Text style={MyCoaches.buttonText}>Pending</Text>
            </TouchableOpacity>



            <ScrollView  contentInsetAdjustmentBehavior="scrollableAxes" style={{marginTop: "1%", height: 250}}>
               <View>
               <Session sessions={activeButton === 'Upcoming' ? Upcoming: Pending}
             />
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
        width: 100, // Adjust the width to make it square
        height: 50, // Adjust the height to make it square
        marginTop: '-13%',
        marginLeft: '67%',
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

export default Booking_Sessions;
