import { View, Text, StyleSheet, Dimensions, Image, Platform, TouchableOpacity} from "react-native";
import React from 'react';
import { Button } from 'react-native-paper';
import BottomComponent from "../components/BottomSvg";
import { RootStackParams } from '../App';
import {useNavigation} from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {useFonts} from 'expo-font'

const { width, height } = Dimensions.get('window');

const UserDashboard = () => {
    const navigation 
    = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    
    const [fontsloaded] = useFonts({
        'Blinker-SemiBold':require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light':require('./../assets/fonts/Blinker-Light.ttf'),
      });
    
      if(!fontsloaded) {
        return null;
      }
    
    return (
        <View style={UserDashboardStyle.container}>
        <View style={UserDashboardStyle.backgroundContainer}></View>
        <View style={UserDashboardStyle.topContainer}>
          <View style={[UserDashboardStyle.topMiniContainer]}>
            <View style={UserDashboardStyle.profileImageContainer}>
              <Image
                source={require('../assets/User.png')} // Add your profile image source here
                style={UserDashboardStyle.profileImage}/>
            </View>
            <View style={UserDashboardStyle.nameAndGreetingsContainer}>
                <Text style={UserDashboardStyle.greetings}>Welcome Back!</Text>
                <Text style={[UserDashboardStyle.name, {paddingRight: '50%'}]}>John Doe</Text>
            </View>
        </View>
        </View>
            <View style={UserDashboardStyle.middleContainer}>
                <View style={UserDashboardStyle.row}>
                <View style={[UserDashboardStyle.miniContainer, { backgroundColor: '#DED2EA', marginVertical: 20 }]}>
                    <View style={UserDashboardStyle.nestedMiniContainer}>
                    <Text style={UserDashboardStyle.imageLabel}>
                        My Coaches</Text>
                        <Image source={require('../assets/Coach.png')} style={[UserDashboardStyle.imageStyle]} />
                    </View>
                </View>
                <TouchableOpacity
                    style={[UserDashboardStyle.miniContainer, { backgroundColor: '#F2E9FB' }]}
                    onPress={() => navigation.navigate('Appointments')}>
                    <View style={UserDashboardStyle.nestedMiniContainer}>
                    <Text style={UserDashboardStyle.imageLabel}>Appointments</Text>
                    <Image source={require('../assets/Appointment.png')} style={UserDashboardStyle.imageStyle} />
                    </View>
                </TouchableOpacity>
                </View>
                <View style={UserDashboardStyle.row}>
                <View style={[UserDashboardStyle.miniContainer,  { backgroundColor: '#D8C7F9', marginVertical: 20 }]}>
                    <View style={UserDashboardStyle.nestedMiniContainer}>
                    <Text style={{fontSize: 14, fontFamily: 'Blinker-SemiBold', color: '#483B5F',}}>
                        Personal Progress</Text>
                        <Image source={require('../assets/Progress.png')} style={[UserDashboardStyle.imageStyle]} />
                    </View>
                </View>
                <TouchableOpacity
                    style={[UserDashboardStyle.miniContainer, { backgroundColor: '#D2CBDF' }]}
                    onPress={() => navigation.navigate('UserProfile')}>
                    <View style={UserDashboardStyle.nestedMiniContainer}>
                    <Text style={UserDashboardStyle.imageLabel}>My Profile</Text>
                    <Image source={require('../assets/Profile.png')} style={UserDashboardStyle.imageStyle} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={UserDashboardStyle.buttonContainer}>
            <Button mode="contained"  
                    style={{ backgroundColor: '#A378F2' , width: 270,  justifyContent: 'center', alignItems: 'center'  }} 
                    labelStyle={{ color: 'white', fontFamily: 'Blinker-SemiBold',fontSize: 22 }}
                    onPress={() => console.log('Pressed')}>Find Coach</Button>
                </View>
            </View>
            <BottomComponent style= {UserDashboardStyle.bottomSVG}/>
        </View>
    )
}

const UserDashboardStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },  
    backgroundContainer: {
        borderRadius: 35, // Adjust the value for the desired curve
        position: 'absolute',
        backgroundColor: '#DED2EA', // Color for the background container
        height: height * 0.16, // Adjust the height as a percentage of the screen height
        width: '100%',
        zIndex: 0, // Set a lower z-index to put it behind topContainer
      },
    topContainer: {
        borderRadius: 20, // Adjust the value for the desired curve
        backgroundColor: '#B69AF0', // Purple background color
        height: `${20}%`, // Responsive height
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', // Position the top container absolutely
        top: 0, // Place it at the top of the screen
        left: 0,
        right: 0,
        zIndex: 1, // Set a higher z-index to put it in front
        marginTop: Platform.OS === 'ios' ? 10 : -30, // Adjust the marginTop based on the platform
        flexDirection: 'row', // To align items horizontally

    },
    topMiniContainer: {
        borderRadius: (width * 0.30) / 2, // Half of the screen width
        width: width * 0.30, // 40% of screen width
        height: width * 0.30, // 40% of screen width (to create a circle)
        marginEnd: '70%', // Add some space between the topMiniContainer and other content
        marginTop: '32%', // 5% margin top (adjust this value as needed)
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: (width * 0.30) / 2, // Make the container circular
        overflow: 'hidden', // Clip the content to the circle
        alignItems: 'center'
      },
      nameAndGreetingsContainer: {
        width: width * 0.42, // Adjust the width as needed
        height: width * 0.35,
        overflow: 'hidden', // Clip the content to the circle
        alignItems: 'center',
        flexDirection: 'column', // Stack children vertically
        justifyContent: 'center', // Center content horizontally
        marginTop: '-30%', // 5% margin top (adjust this value as needed)
      },
    greetings: {
        fontFamily: 'Blinker-SemiBold',
        fontSize: 22,
        color: 'white',
    },
    name: {
        color: 'white',
    },
    profileImage: {
        marginTop: 12,
        width: '80%',
        height: '80%',
        resizeMode: 'cover',
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
    imageLabel: {
        fontFamily: 'Blinker-SemiBold',
        fontSize: 15,
        color: '#483B5F',
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
    // svgContainer: {
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     alignItems: 'center',
    //     zIndex: -1, // Set a lower z-index to put it behind mini-containers
    //     width: '100%', // Expand to full width
    //     height: '35%', // Set the height as a percentage of the screen height
    //     padding: 0,
    //     margin: 0,
    // },
    bottomSVG: {
        justifyContent: 'flex-end', 
        position: 'absolute',
        width: (width),
        height: (height),
        zIndex: 0,
    },
});

export default UserDashboard;
