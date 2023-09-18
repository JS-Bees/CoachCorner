import { View, Text, StyleSheet, Dimensions, Image} from "react-native";
import React, { useState } from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SVGComponent from '../../components/backgroundSVG2';
import BottomComponent from "../../components/BottomSvg";
import CustomInput from "../../components/CustomeInput";
import LogInButton from "../../components/CustomButton";
import { RootStackParams } from "../../App";
import {useNavigation} from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const { width, height } = Dimensions.get('window');
const onLogInPressed = () => {
    console.warn("Logged in")
}
const onSignInPressed = () => {
    console.warn("Created Account")
}
const onForgotPressed = () => {
    console.warn("Renewed Password")
}

const LogIn = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation 
    = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    return (
        <View style={Log_In_Style.container}>
        <SVGComponent style={Log_In_Style.svgContainer} />
        <BottomComponent style= {Log_In_Style.bottomSVG}/>
        
        <View style={Log_In_Style.iconContainer}>
            <Image source={require('../Authentication/Icons/CoachIcon.png')}
                    style={Log_In_Style.CoachIcon}/>
            <Text style={Log_In_Style.textStyle}>
                Login
            </Text>
        </View>

       <View style={Log_In_Style.customContainer}>
            <CustomInput placeholder="Email" 
                         value={Email} 
                         setValue={setEmail} />
            <CustomInput placeholder="Password" 
                         value={Password} 
                         setValue={setPassword}
                         secureTextEntry/>
            <LogInButton onPress={onForgotPressed} text="Forgot Password?" type = "SECONDARY"/> 
       </View>

       <View style = {Log_In_Style.button}>
       <LogInButton text="Login" onPress={onLogInPressed}/>      
       </View>

        <View style={Log_In_Style.noMargin}>
        <LogInButton onPress={onSignInPressed} text="Don't have an account? Sign up here!" type = "TERTIARY"/> 
        </View>

        </View>

    )

}

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
        marginTop:90,
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

