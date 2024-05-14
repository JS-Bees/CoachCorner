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
import LogInButton from '../../components/Custom components/CustomButton';
import SlideInComponent from '../../components/SlideInComponent';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from 'urql';
import {
    // FindCoachByEmailAndPasswordDocument,
    // FindCoacheeByEmailAndPasswordDocument,
    CoachLoginDocument,
    CoacheeLoginDocument,
} from '../../generated-gql/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingSpinner from '../../components/LoadingIndicator';
const { width, height } = Dimensions.get('window');

const LogIn = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [CoachOrCoachee, setCoachOrCoachee] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [EmailPasswordError, setEmailPasswordError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSlideInVisible, setIsSlideInVisible] = useState(false);

    const handleEmailChange = (text: string) => {
        setEmail(text);
        // Clear error message when email is changed
        if (EmailPasswordError) {
            setEmailPasswordError('');
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        // Clear error message when password is changed
        if (EmailPasswordError) {
            setEmailPasswordError('');
        }
    };

    const handleOpenSlideIn = () => {
        setIsSlideInVisible(true);
    };

    const handleCloseSlideIn = () => {
        setIsSlideInVisible(false);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const [coachResult, executeCoachLogin] = useMutation(CoachLoginDocument);
    const [coacheeResult, executeCoacheeLogin] =
        useMutation(CoacheeLoginDocument);
    console.log('Is coach result running', coachResult);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setEmail('');
            setPassword('');
            setEmailPasswordError('');
            setLoading(false); // Reset isLoading to false when navigating back
        });

        return unsubscribe;
    }, [navigation]);

    const storeToken = async (token: string) => {
        try {
            await AsyncStorage.setItem('userToken', token);
            console.log('Async token:', token); // Add this line to log the async token
        } catch (error) {
            console.error('Error storing token:', error);
        }
    };

    // const handleLoginErrorCoach = () => {
    //     const errorMessage = coachResult.error
    //         ? coachResult.error.message.replace('[GraphQL] ', '')
    //         : 'An error occurred';
    //     setEmailPasswordError(errorMessage);
    // };

    // const handleLoginErrorCoachee = () => {
    //     const errorMessage = coacheeResult.error
    //         ? coacheeResult.error.message.replace('[GraphQL] ', '')
    //         : 'An error occurred';
    //     setEmailPasswordError(errorMessage);
    // };

    const onLogInPressed = async () => {
        if (isLoading) return;

        setLoading(true); // Start loading

        console.log('Email value', Email);
        console.log('Password value', Password);
        console.log('Coach or coachee useState value', CoachOrCoachee);

        // setTimeout(async () => {
        try {
            if (!Email || !Password) {
                setEmailPasswordError('Email and Password cannot be empty.');
                setLoading(false); // Stop loading before returning
                return;
            }

            // Check the results of the query after it's completed
            if (CoachOrCoachee === 'coach') {
                const coachData = await executeCoachLogin({
                    email: Email,
                    password: Password,
                });
                console.log(coachData);
                if (coachData.data) {
                    await storeToken(coachData.data.coachLogin.id.toString()); // Store token
                    navigation.navigate('NewCoachDashboard'); // Navigate to coach dashboard
                } else if (coachData.error) {
                    console.log('Coach error message is being ran');
                    const errorMessage = coachData.error
                        ? coachData.error.message.replace('[GraphQL] ', '')
                        : 'An error occurred';
                    setEmailPasswordError(errorMessage);
                    //handleLoginErrorCoach;
                }
            } else if (CoachOrCoachee === 'coachee') {
                const coacheeData = await executeCoacheeLogin({
                    email: Email,
                    password: Password,
                });
                console.log(coacheeData);
                if (coacheeData.data) {
                    await storeToken(
                        coacheeData.data.coacheeLogin.id.toString(),
                    ); // Store token
                    navigation.navigate('CoacheeDashboard'); // Navigate to coachee dashboard
                } else if (coacheeData.error) {
                    console.log('Coach error message is being ran');
                    const errorMessage = coacheeData.error
                        ? coacheeData.error.message.replace('[GraphQL] ', '')
                        : 'An error occurred';
                    setEmailPasswordError(errorMessage);
                    // handleLoginErrorCoachee;
                }
            } else {
                console.log('This is being run before logging in');
                setEmailPasswordError('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setEmailPasswordError('An error occurred during login.');
        } finally {
            setLoading(false); // Ensure loading stops
        }
        //     500;
        // }); // 200ms delay to ensure state has updated
    };

    const onForgotPressed = () => {
        // Add logic for password reset here
    };

    const onSignUpPressed = () => {
        if (CoachOrCoachee === 'coach') {
            navigation.navigate('SignUpCoach');
            console.log('Navigating to signup for coach');
        } else {
            navigation.navigate('SignUpCoachee');
            console.log('Navigating to signup for coachee');
        }
    };

    const handleCoachButtonPress = () => {
        setCoachOrCoachee('coach');
        handleOpenSlideIn();
    };

    const handleTraineeButtonPress = () => {
        setCoachOrCoachee('coachee');
        handleOpenSlideIn();
    };

    return (
        <View style={Log_In_Style.container}>
            <View style={Log_In_Style.imageContainer}>
                <Image
                    source={require('../../assets/stretching.png')}
                    style={Log_In_Style.CoachIcon}
                />
            </View>
            <Text style={Log_In_Style.textStyle}>Login</Text>
            <Text style={Log_In_Style.subtitleText}>You are logging as?</Text>
            <View style={Log_In_Style.buttonsContainer}>
                {!isSlideInVisible && (
                    <View style={Log_In_Style.buttonsContainer}>
                        <TouchableOpacity onPress={handleCoachButtonPress}>
                            <Text style={Log_In_Style.buttonsText}>Coach</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleTraineeButtonPress}>
                            <Text style={Log_In_Style.buttonsText}>
                                Trainee
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <SlideInComponent
                    isVisible={isSlideInVisible}
                    onClose={handleCloseSlideIn}
                >
                    <View>
                        <Text style={Log_In_Style.detailsStyle}>
                            Enter the required details to access your account.
                        </Text>
                    </View>

                    <View style={Log_In_Style.customContainer}>
                        <Input
                            leftIcon={
                                <Icon
                                    name="envelope"
                                    size={20}
                                    color="#7E3FF0"
                                />
                            }
                            placeholder="johnsmith@gmail.com"
                            value={Email}
                            onChangeText={handleEmailChange}
                            errorMessage={EmailPasswordError}
                        />
                        <Input
                            leftIcon={
                                <Icon name="lock" size={25} color="#7E3FF0" />
                            }
                            placeholder="Password"
                            value={Password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={!isPasswordVisible}
                            errorMessage={EmailPasswordError}
                            rightIcon={
                                <TouchableOpacity
                                    onPress={togglePasswordVisibility}
                                >
                                    <Icon
                                        name={
                                            isPasswordVisible
                                                ? 'eye-slash'
                                                : 'eye'
                                        }
                                        size={19}
                                        color="#7E3FF0"
                                    />
                                </TouchableOpacity>
                            }
                        />
                        {/* <LogInButton
                            onPress={onForgotPressed}
                            text="Forgot Password?"
                            type="SECONDARY"
                        /> */}
                    </View>

                    <View style={Log_In_Style.button}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#915bc7" />
                        ) : (
                            <LogInButton
                                text="Login"
                                onPress={onLogInPressed}
                            />
                        )}
                    </View>

                    <View style={Log_In_Style.noMargin}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: -1,
                            }}
                        >
                            <Text
                                style={{ fontFamily: 'Roboto', fontSize: 12 }}
                            >
                                Don't have an account?{' '}
                            </Text>
                            <TouchableOpacity onPress={onSignUpPressed}>
                                <Text
                                    style={{
                                        color: '#6441A4',
                                        fontFamily: 'Roboto',
                                        fontSize: 12,
                                    }}
                                >
                                    Sign up here!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SlideInComponent>
            </View>
        </View>
    );
};

const Log_In_Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        zIndex: 0,
        justifyContent: 'space-between', // Vertical alignment adjusted
    },
    keyboardAvoidContainer: {
        flex: 1,
    },

    customContainer: {
        alignItems: 'center',
        marginLeft: '4%',
        paddingRight: 15,
        paddingLeft: 15,
        paddingVertical: -15,
    },

    button: {
        marginTop: height * 0.05,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    noMargin: {
        marginTop: height * 0.03, // Responsive marginTop
        marginBottom: height * 0.2, // Responsive marginBottom
        alignItems: 'center',
    },

    CoachIcon: {
        width: width * 0.4, // Responsive width
        height: height * 0.2, // Responsive height
        resizeMode: 'contain',
        maxWidth: 500,
        maxHeight: 500,
    },

    imageContainer: {
        marginTop: height * 0.12, // Responsive marginTop
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    textStyle: {
        fontSize: 25,
        fontWeight: '200',
        fontFamily: 'Roboto',
        color: '#7E3FF0',
        justifyContent: 'flex-end',
        marginLeft: '10%',
        marginTop: -60,
    },

    detailsStyle: {
        fontSize: 15,
        fontWeight: '200',
        fontFamily: 'Roboto',
        color: '#656466',
        marginLeft: '10%',
        marginTop: '2%',
        paddingRight: 15,
        paddingLeft: 2,
    },
    subtitleText: {
        bottom: 23,
        fontSize: 15,
        fontWeight: '200',
        fontFamily: 'Roboto',
        color: '#656466',
        marginLeft: '10%',
    },

    errorTextEmail: {
        fontSize: 12,
        color: 'red',
        marginLeft: -65,
        top: 6,
    },
    errorTextPassword: {
        fontSize: 12,
        color: 'red',
        top: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        bottom: '70%',
        justifyContent: 'space-between',
        marginLeft: '12%',
    },
    buttonsText: {
        fontSize: 18,
        marginRight: '30%',
    },
});

export default LogIn;
