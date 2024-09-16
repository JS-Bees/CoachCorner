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

import { BackHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CoachDashboard = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();


    const [fontsloaded] = useFonts({
        'Blinker-SemiBold': require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light': require('./../assets/fonts/Blinker-Light.ttf'),
    });

    const [userToken, setUserToken] = useState<string | null>(null); 

    useEffect(() => {
        const backAction = () => {
            if (useIsFocused()) {
      
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

 
    return (
        <View style={CoachDashboardStyle.container}>
            <View style={CoachDashboardStyle.backgroundContainer}></View>
            <View style={CoachDashboardStyle.topContainer}>
                <View style={[CoachDashboardStyle.topMiniContainer]}>
                    <View style={CoachDashboardStyle.profileImageContainer}>
                        <Image
                            source={{
                                uri: coacheeData?.findCoacheeByID
                                    .profilePicture,
                            }} 
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
        borderRadius: 35, 
        position: 'absolute',
        backgroundColor: '#DED2EA', 
        height: height * 0.16, 
        width: '100%',
        zIndex: 0, 
    },
    topContainer: {
        borderRadius: 20, 
        backgroundColor: '#B69AF0', 
        height: `${20}%`, 
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        top: 0, 
        left: 0,
        right: 0,
        zIndex: 1, 
        marginTop: Platform.OS === 'ios' ? 10 : -30, 
        flexDirection: 'row', 
    },
    topMiniContainer: {
        borderRadius: (width * 0.3) / 2, 
        width: width * 0.3, 
        height: width * 0.3, 
        marginEnd: '70%', 
        marginTop: '32%', 
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: (width * 0.3) / 2, 
        overflow: 'hidden', 
        alignItems: 'center',
    },
    nameAndGreetingsContainer: {
        width: width * 0.42, 
        height: width * 0.35,
        overflow: 'hidden', 
        alignItems: 'center',
        flexDirection: 'column', 
        justifyContent: 'center', 
        marginTop: '-30%', 
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
    bottomSVG: {
        justifyContent: 'flex-end',
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 0,
    },
});

export default CoachDashboard;
