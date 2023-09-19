import { View, Text, StyleSheet} from "react-native";
import React, { useState } from 'react';
import InputSignUpPages from "./InputSignUpPages";
import { RootStackParams } from "../App";
import {useNavigation} from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';




const SignUp = () => {
    const [First_Name, setFirst_Name] = useState('');
    const [Last_Name, setLast_Name] = useState('');


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation 
    = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    return (
        <View style={Log_In_Style.container}>
        
        <View style={Log_In_Style.iconContainer}>
            <Text style={Log_In_Style.textStyle}>
                Sign Up
            </Text>
        </View>

       <View style={Log_In_Style.customContainer}>
            <InputSignUpPages placeholder="First Name" 
                         value={First_Name} 
                         setValue={setFirst_Name} />
            <InputSignUpPages placeholder="Last Name" 
                         value={Last_Name} 
                         setValue={setLast_Name}/>
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

    iconContainer: {
        marginTop: 10,
        padding: 20,
    },
    
    textStyle: {
        fontSize: 24,
        fontWeight: "900",
        fontFamily: "Roboto",
        color: "#915bc7",
        textAlign: "left"
    },

   
})

export default SignUp;