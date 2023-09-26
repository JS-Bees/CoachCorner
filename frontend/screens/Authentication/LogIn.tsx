import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Modal,
    TouchableOpacity,
} from 'react-native';
import SVGComponent from '../../components/BackgroundSVG2';
import BottomComponent from '../../components/BottomSvg';
import CustomInput from '../../components/CustomeInput';
import LogInButton from '../../components/CustomButton';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from 'urql';
import {
    FindCoachByEmailAndPasswordDocument,
    FindCoacheeByEmailAndPasswordDocument,
} from '../../generated-gql/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const LogIn = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Clear the email and password state variables when navigating away from the page
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setEmail('');
            setPassword('');
        });

        return unsubscribe;
    }, [navigation]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const storeToken = async (token: string) => {
        try {
            await AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.error('Error storing token:', error);
        }
    };

    const handleLoginError = () => {
        setErrorMessage('Email or password is incorrect ' + Email.trim());
        toggleModal();
    };

    const onLogInPressed = () => {
        let token = null;

        if (
            (coachData && coachData.findCoachByEmailAndPassword) ||
            (coacheeData && coacheeData.findCoacheeByEmailAndPassword)
        ) {
            if (coachData && coachData.findCoachByEmailAndPassword) {
                const userId = coachData.findCoachByEmailAndPassword.id;
                token = userId.toString();
                storeToken(token);
                navigation.navigate('CoachDashboard');
                console.log(
                    'Successfully logged in as a coach :)',
                    'Token:',
                    token,
                );
            } else {
                const userId = coacheeData.findCoacheeByEmailAndPassword.id;
                token = userId.toString();
                storeToken(token);
                navigation.navigate('CoacheeDashboard');
                console.log(
                    'Successfully logged in as a coachee :)',
                    'Token:',
                    token,
                );
            }
        } else {
            handleLoginError();
        }
    };

    const onForgotPressed = () => {
        console.warn('Renewed Password');
        // Add logic for password reset here
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUpA');
    };

    const [coachResult] = useQuery({
        query: FindCoachByEmailAndPasswordDocument,
        variables: {
            email: Email,
            password: Password,
        },
    });

    const [coacheeResult] = useQuery({
        query: FindCoacheeByEmailAndPasswordDocument,
        variables: {
            email: Email,
            password: Password,
        },
    });

    const coachData = coachResult.data;
    const coacheeData = coacheeResult.data;

    return (
        <View style={Log_In_Style.container}>
            <SVGComponent style={Log_In_Style.svgContainer} />
            <BottomComponent style={Log_In_Style.bottomSVG} />

            <View style={Log_In_Style.iconContainer}>
                <Image
                    source={require('../Authentication/Icons/CoachIcon.png')}
                    style={Log_In_Style.CoachIcon}
                />
                <Text style={Log_In_Style.textStyle}>Login</Text>
            </View>

            <View style={Log_In_Style.customContainer}>
                <CustomInput
                    placeholder="Email"
                    value={Email}
                    setValue={setEmail}
                />
                <CustomInput
                    placeholder="Password"
                    value={Password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <LogInButton
                    onPress={onForgotPressed}
                    text="Forgot Password?"
                    type="SECONDARY"
                />
            </View>

            <View style={Log_In_Style.button}>
                <LogInButton text="Login" onPress={onLogInPressed} />
            </View>

            <View style={Log_In_Style.noMargin}>
                <LogInButton
                    text="Don't have an account? Sign up here!"
                    type="TERTIARY"
                    onPress={onSignUpPressed}
                />
            </View>

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={Log_In_Style.modalContainer}>
                    <View style={Log_In_Style.modalContent}>
                        <Text style={Log_In_Style.errorMessage}>
                            {errorMessage}
                        </Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={Log_In_Style.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const Log_In_Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        alignItems: 'center',
        zIndex: 0,
    },

    customContainer: {
        alignItems: 'center',
        padding: 20,
    },

    button: {
        marginTop: height * 0.1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    noMargin: {
        marginTop: 25,
        marginBottom: 400,
    },

    CoachIcon: {
        width: width * 0.2,
        height: height * 0.1,
        padding: 20,
        resizeMode: 'contain',
        maxWidth: 500,
        maxHeight: 500,
    },

    iconContainer: {
        marginTop: 130,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    textStyle: {
        fontSize: 24,
        fontWeight: '900',
        fontFamily: 'Roboto',
        color: '#915bc7',
        textAlign: 'left',
    },

    svgContainer: {
        justifyContent: 'flex-start', // Align to the top
        alignItems: 'center',
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 0,
    },
    bottomSVG: {
        justifyContent: 'flex-end',
        position: 'absolute',
        zIndex: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    errorMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'purple',
    },
    closeButton: {
        fontSize: 16,
        color: 'blue',
    },
});

export default LogIn;
