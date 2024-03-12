import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import BottomComponent from '../components/SVGs/BottomSvg';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useQuery } from 'urql';
// import { FindCoachByIdDocument } from '../generated-gql/graphql';
import { BackHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CoachDashboard = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    // const isFocused = useIsFocused();

    const [fontsloaded] = useFonts({
        'Blinker-SemiBold': require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light': require('./../assets/fonts/Blinker-Light.ttf'),
    });

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token

    useEffect(() => {
        const backAction = () => {
            if (useIsFocused()) {
                // Prevent navigating back when the screen is focused
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => {
            backHandler.remove();
        };
    }, [useIsFocused]);

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
    // const useFetchCoachByUserID = (userID: any) => {
    //     const [coachResult] = useQuery({
    //         query: FindCoachByIdDocument, // Use the Coachee query document
    //         variables: {
    //             userID: parseInt(userID), // Parse the userID (token) to an integer with base 10
    //         },
    //     });

    //     return coachResult;
    // };

    // // Example usage of the query function
    // // Replace 'yourToken' with the actual token or userID you want to fetch
    // const {
    //     data: coachData,
    //     loading: coacheeLoading,
    //     error: coacheeError,
    // } = useFetchCoachByUserID(userToken);

    // if (!fontsloaded) {
    //     return null;
    // }

    return (
        <View style={CoachDashboardStyle.container}>
            <View style={CoachDashboardStyle.backgroundContainer}></View>
            <View style={CoachDashboardStyle.topContainer}>
                <View style={[CoachDashboardStyle.topMiniContainer]}>
                    <View style={CoachDashboardStyle.profileImageContainer}>
                    <Image
                    source={{uri: coacheeData?.findCoacheeByID.profilePicture}} // Add your profile image source here
                    style={{
                        width: 40,
                        height: 40,
                        marginLeft: '10%',
                        marginTop: '-10%',
                        borderRadius: 20,
                    }}
                />
                    </View>
                    <View style={CoachDashboardStyle.nameAndGreetingsContainer}>
                        <Text style={CoachDashboardStyle.greetings}>
                            Welcome Back!
                        </Text>
                        <Text style={CoachDashboardStyle.name}>
                            {/* {coachData?.findCoachByID?.firstName} */}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={CoachDashboardStyle.middleContainer}>
                <View style={CoachDashboardStyle.row}>
                    <TouchableOpacity
                        style={[
                            CoachDashboardStyle.miniContainer,
                            { backgroundColor: '#DED2EA', marginVertical: 20 },
                        ]}
                        onPress={() => navigation.navigate('MyClients')}
                    >
                        <View style={CoachDashboardStyle.nestedMiniContainer}>
                            <Text style={CoachDashboardStyle.imageLabel}>
                                My Clients
                            </Text>
                            <Image
                                source={require('../assets/Client.png')}
                                style={[CoachDashboardStyle.imageStyle]}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            CoachDashboardStyle.miniContainer,
                            { backgroundColor: '#F2E9FB' },
                        ]}
                        onPress={() => navigation.navigate('CoachAppointments')}
                    >
                        <View style={CoachDashboardStyle.nestedMiniContainer}>
                            <Text style={CoachDashboardStyle.imageLabel}>
                                Appointments
                            </Text>
                            <Image
                                source={require('../assets/Appointment.png')}
                                style={CoachDashboardStyle.imageStyle}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={CoachDashboardStyle.row}>
                    <View
                        style={[
                            CoachDashboardStyle.miniContainer,
                            { backgroundColor: '#D8C7F9', marginVertical: 20 },
                        ]}
                    >
                        <View style={CoachDashboardStyle.nestedMiniContainer}>
                            <Text
                                style={[
                                    CoachDashboardStyle.imageLabel,
                                    { fontSize: 14 },
                                ]}
                            >
                                My Notes
                            </Text>
                            <Image
                                source={require('../assets/Writing.png')}
                                style={[CoachDashboardStyle.imageStyle]}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[
                            CoachDashboardStyle.miniContainer,
                            { backgroundColor: '#D2CBDF' },
                        ]}
                        onPress={() => navigation.navigate('CoachProfile')}
                    >
                        <View style={CoachDashboardStyle.nestedMiniContainer}>
                            <Text style={CoachDashboardStyle.imageLabel}>
                                My Profile
                            </Text>
                            <Image
                                source={require('../assets/Profile.png')}
                                style={CoachDashboardStyle.imageStyle}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomComponent style={CoachDashboardStyle.bottomSVG} />
        </View>
    );
};

const CoachDashboardStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
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
        borderRadius: (width * 0.3) / 2, // Half of the screen width
        width: width * 0.3, // 40% of screen width
        height: width * 0.3, // 40% of screen width (to create a circle)
        marginEnd: '70%', // Add some space between the topMiniContainer and other content
        marginTop: '32%', // 5% margin top (adjust this value as needed)
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: (width * 0.3) / 2, // Make the container circular
        overflow: 'hidden', // Clip the content to the circle
        alignItems: 'center',
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
        fontFamily: 'Blinker-Light',
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
        fontFamily: 'Roboto',
        fontWeight: '800',
        fontSize: 15,
        color: '#483B5F',
        top: -2,
    },
    imageStyle: {
        width: 65,
        height: 65,
        alignContent: 'center',
        alignItems: 'center',
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
        width: width,
        height: height,
        zIndex: 0,
    },
});

export default CoachDashboard;
