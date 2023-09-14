import { View, Text, StyleSheet, Dimensions, Image, Platform, TouchableOpacity} from "react-native";
import React from 'react';
import { Button } from 'react-native-paper';
import SvgComponent from "../components/BackgroundSvg";
import { RootStackParams } from '../App';
import {useNavigation} from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const { width, height } = Dimensions.get('window');

const UserDashboard = () => {
    const navigation 
    = useNavigation<NativeStackNavigationProp<RootStackParams>>()
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
                <Text numberOfLines= {1}style={UserDashboardStyle.name}>John Doe</Text>
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
                <View style={[UserDashboardStyle.miniContainer, { backgroundColor: '#F2E9FB' }]}>
                    <View style={UserDashboardStyle.nestedMiniContainer}>
                    <Text style={UserDashboardStyle.imageLabel}>
                         Appointments</Text>
                        <Image source={require('../assets/Appointment.png')} style={[UserDashboardStyle.imageStyle]} />
                    </View>
                </View>
                </View>
                <View style={UserDashboardStyle.row}>
                <View style={[UserDashboardStyle.miniContainer,  { backgroundColor: '#A378F2', marginVertical: 20 }]}>
                    <View style={UserDashboardStyle.nestedMiniContainer}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: '#483B5F',}}>
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
                    labelStyle={{ color: 'white', fontSize: 20 }}
                    onPress={() => console.log('Pressed')}>Find Coach</Button>
                </View>
            </View>
            <View style={UserDashboardStyle.svgContainer}>
                <SvgComponent> </SvgComponent>
            </View>
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
        backgroundColor: '#9787B8', // Purple background color
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
        marginEnd: 255, // Add some space between the topMiniContainer and other content
        marginTop: 80,
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
        width: '150%',
        height: '100%',
        overflow: 'hidden', // Clip the content to the circle
        alignItems: 'center'
    },
    greetings: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        marginTop: 20
    },
    name: {
        color: 'white',
        paddingRight: 70
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
        fontSize: 13.5,
        fontWeight: 'bold',
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
    svgContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 0, // Set a lower z-index to put it behind mini-containers
    },
});

export default UserDashboard;
