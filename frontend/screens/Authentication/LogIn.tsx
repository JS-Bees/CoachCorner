import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useState } from 'react';
import SVGComponent from "../../components/UpperSVG";
import BottomComponent from "../../components/BottomSvg";
import CustomInput from "../../components/CustomeInput";
import LogInButton from "../../components/CustomButton";
import { RootStackParams } from "../../App";
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from 'urql'; // Import the Urql hook for queries
import { FindCoachByEmailAndPasswordDocument, FindCoacheeByEmailAndPasswordDocument } from "../../generated-gql/graphql";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


const { width, height } = Dimensions.get('window');

const LogIn = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();


  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token); // Store the token with a key ('userToken' in this case)
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  // Use the GetAllCoachesDocument query to check if the email exists
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
  // const coachError = coachResult.error;
  // const coacheeError = coacheeResult.error;
  // const coachFetching = coachResult.fetching;
  // const coacheeFetching = coacheeResult.fetching;

  const onLogInPressed = () => {
    let token = null; // Initialize the token variable
  
    if ((coachData && coachData.findCoachByEmailAndPassword) || (coacheeData && coacheeData.findCoacheeByEmailAndPassword)) {
      if (coachData && coachData.findCoachByEmailAndPassword) {
        // Email and password match a coach, and the user is a coach
        const userId = coachData.findCoachByEmailAndPassword.id;
        token = userId.toString(); // Customize the token format
        storeToken(token); // Store the token
        navigation.navigate('CoachDashboard');
        console.log('Successfully logged in as a coach :)', 'Token:', token);
      } else {
        // Email and password match a coachee, but the user is not a coach
        const userId = coacheeData.findCoacheeByEmailAndPassword.id;
        token = userId.toString(); // Customize the token format
        storeToken(token); // Store the token
        navigation.navigate('CoacheeDashboard');
        console.log('Successfully logged in as a coachee :)', 'Token:', token);
      }
    } else {
      // Email and password do not match, or data is null, show an error message
      console.error('Email and password do not match');
    }
  };

  const onForgotPressed = () => {
    console.warn("Renewed Password");
    // Add logic for password reset here
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUpA')
  };


  return (
    <View style={Log_In_Style.container}>
      <SVGComponent style={Log_In_Style.svgContainer} />
      <BottomComponent style={Log_In_Style.bottomSVG} />

      <View style={Log_In_Style.iconContainer}>
        <Image source={require('../Authentication/Icons/CoachIcon.png')}
          style={Log_In_Style.CoachIcon} />
        <Text style={Log_In_Style.textStyle}>
          Login
        </Text>
      </View>

      <View style={Log_In_Style.customContainer}>
        <CustomInput placeholder="Email"
          value={Email}
          setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={Password}
          setValue={setPassword}
          secureTextEntry />
        <LogInButton onPress={onForgotPressed} text="Forgot Password?" type="SECONDARY" />
      </View>

      <View style={Log_In_Style.button}>
        <LogInButton text="Login" onPress={onLogInPressed} />
      </View>

      <View style={Log_In_Style.noMargin}>
        <LogInButton text="Don't have an account? Sign up here!" type="TERTIARY" onPress={onSignUpPressed} />
      </View>

    </View>
  );
};

const Log_In_Style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        alignItems: "center",
        zIndex: 0,
        
    },

    customContainer: {
        alignItems: "center",
        padding: 20,
    },

    button: {
        marginTop: height*0.10,
        flex: 1,
        justifyContent: "center",
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
        fontWeight: "900",
        fontFamily: "Roboto",
        color: "#915bc7",
        textAlign: "left"
    },

    
    svgContainer: {
        justifyContent: 'flex-start', // Align to the top
        alignItems: 'center',
        position: 'absolute',
        width: (width),
        height: (height),
        zIndex: 0,
    },
    

    bottomSVG: {
        justifyContent: 'flex-end', 
        position: 'absolute',
        width: (width),
        height: (height),
        zIndex: 0,
    },

   
})

export default LogIn;
