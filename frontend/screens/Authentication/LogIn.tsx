import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import SVGComponent from '../../components/UpperSVG';
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
    const [EmailPasswordError, setEmailPasswordError] = useState('');
    const [isLoading, setLoading] = useState(false); // Add loading state

    const [coachResult, executeCoachQuery] = useQuery({
        query: FindCoachByEmailAndPasswordDocument,
        variables: {
            email: Email,
            password: Password,
        },
        pause: true,
        
        
    });

    const [coacheeResult, executeCoacheeQuery] = useQuery({
        query: FindCoacheeByEmailAndPasswordDocument,
        variables: {
            email: Email,
            password: Password,
        },
        pause: true, // Pause the query initially
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearCredentials();
        });
    
        return () => {
            unsubscribe();
            clearCredentials();
        };
    }, []);

    // Clear the email and password state variables when navigating away from the page
    const clearCredentials = async () => {
        setEmail('');
        setPassword('');
        setEmailPasswordError('');
    
        await executeCoachQuery({
            variables: {
                email: '',
                password: '',
            },
        });
    
        await executeCoacheeQuery({
            variables: {
                email: '',
                password: '',
            },
        });
    };

    console.log(Email + ' This is the current email')
    console.log(Password + ' This is the current pass')

    const storeToken = async (token: string) => {
        try {
            await AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.error('Error storing token:', error);
        }
    };

    const handleLoginError = () => {
        if (!Email && !Password) {
            setEmailPasswordError('  ');
        }
        else if (!Email || !Password) { // Check if both Email and Password are empty
            setEmailPasswordError('Invalid Email or Password');
        } else if(coachResult.error) {
            setEmailPasswordError('User not found')
            if(EmailPasswordError === 'User not found') {
                setEmailPasswordError(' ')
            }
            return;
        }else if(coacheeResult.error) {
            setEmailPasswordError('User not found')
            if(EmailPasswordError === 'User not found') {
                setEmailPasswordError(' ')
            }
            return;
        } 
        
        else {
            setEmailPasswordError(' '); // Clear the error message
        }
    };
 

    const onLogInPressed = async () => {

            setLoading(true); // Start loading
            console.log(coacheeResult.data?.findCoacheeByEmailAndPassword.isCoach)
            console.log(coachResult.data?.findCoachByEmailAndPassword.isCoach)
  
                await executeCoacheeQuery({
                    variables: {
                        email: Email,
                        password: Password,
                    },
              });

               await executeCoachQuery({
                    variables: {
                        email: Email,
                        password: Password,
                    },
                });
            
    
    
    };

    useEffect(() => {
        handleLoginError()
        if(isLoading) {
            setEmailPasswordError(' ')
            setLoading(false)
        }
    }, [coachResult, coacheeResult])
        
    useEffect(() => {    
        if (coachResult.data && coachResult.data.findCoachByEmailAndPassword) {
            const userId = coachResult.data.findCoachByEmailAndPassword.id;
            storeToken(userId.toString());
            navigation.navigate('CoachDashboard');
            console.log(
                'Successfully logged in as a coach :)',
                'Token:',
                userId.toString(),
            );
        } else if (
            coacheeResult.data &&
            coacheeResult.data.findCoacheeByEmailAndPassword
        ) {
            const userId = coacheeResult.data.findCoacheeByEmailAndPassword.id;
            storeToken(userId.toString());
            navigation.navigate('CoacheeDashboard');
            console.log(
                'Successfully logged in as a coachee :)',
                'Token:',
                userId.toString(),
            );
        }
        setLoading(false); // Stop loading
    }, [coachResult.data?.findCoachByEmailAndPassword.email, coacheeResult.data?.findCoacheeByEmailAndPassword.email])


    const onForgotPressed = () => {
        // console.warn('Renewed Password');
        // Add logic for password reset here
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUpA');
    };
    const clearError = () => {
        setEmailPasswordError('');
    };

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
            <View><Text></Text></View>
            <View><Text></Text></View>
                <CustomInput
                    iconSource1={require('../Authentication/Icons/Email1.png')}
                    placeholder="Email"
                    value={Email}
                    setValue={setEmail}
                    clearError={clearError}
                />
                <View><Text></Text></View>
                <View><Text></Text></View>
                <CustomInput
                    iconSource2={require('../Authentication/Icons/Password1.png')}
                    placeholder="Password"
                    value={Password}
                    setValue={setPassword}
                    secureTextEntry
                    clearError={clearError}
                />
                <Text style={Log_In_Style.errorTextPassword}>
                    {EmailPasswordError}
                </Text>
                <LogInButton
                    onPress={onForgotPressed}
                    text="Forgot Password?"
                    type="SECONDARY"
                />
            </View>

            <View style={Log_In_Style.button}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#915bc7" /> // Show loading indicator
                ) : (
                    <LogInButton text="Login" onPress={onLogInPressed} />
                 )} 
            </View>

            <View style={Log_In_Style.noMargin}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Roboto', fontSize: 12}}>
                        Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={onSignUpPressed}>
                        <Text style={{ color: '#6441A4', fontFamily: 'Roboto', fontSize: 12}}>Sign up here!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const Log_In_Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        alignItems: 'center',
        zIndex: 0,
        justifyContent: 'space-between', // Vertical alignment adjusted
    },

    customContainer: {
        alignItems: 'center',
        padding: 20,
    },

    button: {
        marginTop: height * 0.05,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    noMargin: {
        marginTop: height * 0.02, // Responsive marginTop
        marginBottom: height * 0.2, // Responsive marginBottom
    },

    CoachIcon: {
        width: width * 0.4, // Responsive width
        height: height * 0.2, // Responsive height
        resizeMode: 'contain',
        maxWidth: 500,
        maxHeight: 500,
    },

    iconContainer: {
        marginTop: height * 0.12, // Responsive marginTop
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    textStyle: {
        fontSize: 30,
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
    errorTextEmail: {
        fontSize: 12,
        color: 'red',
        marginLeft: '-65%',
        top: '6%',
    },
    errorTextPassword: {
        fontSize: 12,
        color: 'red',
        top: '8%',
    },
});

export default LogIn;