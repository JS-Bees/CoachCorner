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
import { useQuery } from 'urql';
import {
  FindCoachByEmailAndPasswordDocument,
  FindCoacheeByEmailAndPasswordDocument,
} from '../../generated-gql/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');


const LogIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [EmailPasswordError, setEmailPasswordError] = useState('');
  const [isLoading, setLoading] = useState(false); // Add loading state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSlideInVisible, setIsSlideInVisible] = useState(false);

  const handleOpenSlideIn = () => {
    setIsSlideInVisible(true);
  };

  const handleCloseSlideIn = () => {
    setIsSlideInVisible(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const [coachResult, executeCoachQuery] = useQuery({
    query: FindCoachByEmailAndPasswordDocument,
    variables: {
      email: Email,
      password: Password,
    },
    pause: false,
  });

  const [coacheeResult, executeCoacheeQuery] = useQuery({
    query: FindCoacheeByEmailAndPasswordDocument,
    variables: {
      email: Email,
      password: Password,
    },
    pause: false, // Pause the query initially
  });

  // Clear the email and password state variables when navigating away from the page
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setEmail('');
      setPassword('');
      setEmailPasswordError('');
    });

    return unsubscribe;
  });

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const handleLoginError = () => {
    if (!Email || Password) {
      setEmailPasswordError('Invalid Email or Password');
    } else {
      setEmailPasswordError('Invalid Email or Password'); // Clear the error message
    }
  };

  const onLogInPressed = () => {
    // Check if email and password are provided
    if (!Email || !Password) {
      handleLoginError();
      return; // Don't proceed with the login attempt
    }

    executeCoachQuery({
      variables: {
        email: Email,
        password: Password,
      },
      pause: true,
    });

    executeCoacheeQuery({
      variables: {
        email: Email,
        password: Password,
      },
      pause: true,
    });

    const coachData = coachResult.data;
    const coacheeData = coacheeResult.data;
    console.log('coach data', coachData);
    console.log('coach data', coacheeData);
    if (
      (coachData && coachData.findCoachByEmailAndPassword) ||
      (coacheeData && coacheeData.findCoacheeByEmailAndPassword)
    ) {
      setLoading(true); // Start loading
      if (coachData && coachData.findCoachByEmailAndPassword) {
        const userId = coachData.findCoachByEmailAndPassword.id;
        storeToken(userId.toString());
        navigation.navigate('CoachDashboard');
        console.log(
          'Successfully logged in as a coach :)',
          'Token:',
          userId.toString(),
        );
      } else {
        const userId = coacheeData?.findCoacheeByEmailAndPassword.id;
        storeToken(userId.toString());
        navigation.navigate('CoacheeDashboard');
        console.log(
          'Successfully logged in as a coachee :)',
          'Token:',
          userId?.toString(),
        );
      }
    } else {
      handleLoginError();
    }
    setLoading(false); // Stop loading
  };

  const onForgotPressed = () => {
    // console.warn('Renewed Password');
    // Add logic for password reset here
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUpA');
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
        <Text style={Log_In_Style.subtitleText}>
            You are logging as? 
          </Text>
        <View style={Log_In_Style.buttonsContainer} >
        {!isSlideInVisible && (
          <View style={Log_In_Style.buttonsContainer}>
              <TouchableOpacity onPress={handleOpenSlideIn}>
          <Text style={Log_In_Style.buttonsText}>Coach</Text>
           </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenSlideIn}>
           <Text style={Log_In_Style.buttonsText}>Trainee</Text>
          </TouchableOpacity>
          </View>
        )}

        <SlideInComponent isVisible={isSlideInVisible} onClose={handleCloseSlideIn}>
        <View>
          <Text style={Log_In_Style.detailsStyle}>
            Enter the required details to access your account and find the right
            coach for you
          </Text>
        </View>
       
        <View style={Log_In_Style.customContainer}>
          <View>
            <Text></Text>
          </View>
          <Input
            leftIcon={
              <Icon name="envelope" size={20} color="#7E3FF0" />
            }
            placeholder="johnsmith@gmail.com"
            value={Email}
            onChangeText={setEmail}
            errorMessage={EmailPasswordError}
          />
          <View>
          </View>
          <Input
            leftIcon={
              <Icon name="lock" size={25} color="#7E3FF0" />
            }
            placeholder="Password"
            value={Password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            errorMessage={EmailPasswordError}
            rightIcon={
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Icon
                    name={isPasswordVisible ? 'eye-slash' : 'eye'}
                    size={19}
                    color="#7E3FF0"
                  />
                </TouchableOpacity>
              }
          />
          <LogInButton
            onPress={onForgotPressed}
            text="Forgot Password?"
            type="SECONDARY"
          />
        </View>

        <View style={Log_In_Style.button}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#915bc7" />
          ) : (
            <LogInButton text="Login" onPress={onLogInPressed} />
          )}
        </View>

        <View style={Log_In_Style.noMargin}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '-1%'}}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 12, }}>
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
    paddingVertical: '-15%'
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
    marginTop: '-60%',
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
    bottom: "23%",
    fontSize: 15,
    fontWeight: '200',
    fontFamily: 'Roboto',
    color: '#656466',
    marginLeft: '10%',
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
  buttonsContainer: {
    flexDirection: "row",
    bottom: "70%",
    justifyContent: "space-between",
    marginLeft: "12%"
  },
  buttonsText: {
    fontSize: 18,
    marginRight: "30%"
  }
});

export default LogIn;