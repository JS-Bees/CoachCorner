import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useState } from 'react';
import SVGComponent from '../../components/BackgroundSVG2';
import BottomComponent from "../../components/BottomSvg";
import CustomInput from "../../components/CustomeInput";
import LogInButton from "../../components/CustomButton";
import { RootStackParams } from "../../App";
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from 'urql'; // Import the Urql hook for queries
import { GetAllCoachesDocument } from "../../generated-gql/graphql";

const { width, height } = Dimensions.get('window');

const LogIn = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // Use the GetAllCoachesDocument query to check if the email exists
  const [result] = useQuery({
    query: GetAllCoachesDocument,
    variables: {
      // Pass the email as a variable to the query
      email: Email,
    },
  });

  const { data, fetching, error } = result;

  const onLogInPressed = async () => {
    try {
      // Check if fetching is true, indicating that the query is still loading
      if (fetching) {
        console.log("Loading...");
        return;
      }

      if (error) {
        console.error(error);
        // Handle query errors (e.g., display an error message to the user)
        return;
      }

      // If the query returns data, it means the email exists in the backend
      if (data && data.length > 0) {
        // Email exists, you can proceed with password validation or other login logic
        // Once the login is successful, navigate to the user dashboard or another relevant screen
        navigation.navigate('UserDashboard');
      } else {
        // Email doesn't exist, show an error message to the user
        console.error('Email does not exist');
      }
    } catch (err) {
      console.error(err);
      // Handle unexpected errors (e.g., network issues).
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
