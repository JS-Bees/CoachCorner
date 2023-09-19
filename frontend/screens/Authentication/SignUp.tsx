import { View, Text, StyleSheet, TextInput, Pressable, Platform} from "react-native";
import React, { useState } from 'react';
import InputSignUpPages from "../../components/InputSignUpPages";
import DateTimePicker from "@react-native-community/datetimepicker";
import LogInButton from "../../components/CustomButton";
import { RootStackParams } from "../../App";
import {useNavigation} from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



const SignUp = () => {
    const [First_Name, setFirst_Name] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Repeat_Password, setRepeat_Password] = useState('');
    const [StreetAdd, setStreetAddress] = useState('');
    const [City, setCity] = useState('');
    const [Postal, setPostal] = useState('');
    const [dateOfBirth, setDateofBirth] = useState('');

    const [date, setdate] = useState(new Date());
    const [showPicker, setShowPicker] = useState (false);

    const onSignUpPressed= () => {
        console.warn("Account Created")
    }

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = ({type}: any, selectedDate: any) => {
        if (type == 'set') {
            const currentDate = selectedDate
            setdate(currentDate)
            if (Platform.OS === 'android') {
                toggleDatePicker();
                setDateofBirth(currentDate.toDateString());
            }
        } else {
            toggleDatePicker();
        }

    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation 
    = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    return (
        <View style={Log_In_Style.container}>
        
        <View style={Log_In_Style.iconContainer}>
            <Text style={Log_In_Style.textStyle}>
                Create Account
            </Text>
        </View>

       <View style={Log_In_Style.customContainer}>
            <InputSignUpPages placeholder="Full Name" 
                         value={First_Name} 
                         setValue={setFirst_Name}/>
            <InputSignUpPages placeholder="Email" 
                         value={Email} 
                         setValue={setEmail}/>
       </View>

       <View style={Log_In_Style.customContainer}>
       <InputSignUpPages placeholder="Password" 
                         value={Password} 
                         setValue={setPassword}
                         secureTextEntry/>
        <InputSignUpPages placeholder="Repeat Password" 
                         value={Repeat_Password} 
                         setValue={setRepeat_Password}
                         secureTextEntry/>
       </View>

       <View style={Log_In_Style.birthdayContainer}>
            <Text style={Log_In_Style.birthdayText}>
              Date of Birth
            </Text>

            {showPicker && (
                <DateTimePicker
                mode="date"
                display="spinner"
                value={date} 
                onChange={onChange}/>
            )}

         {!showPicker && (
             <Pressable 
             onPress = {toggleDatePicker}>
            <TextInput
                style={Log_In_Style.birthdayBorder} 
            placeholder="Sat Aug 24 2001"
            value={dateOfBirth}
            onChangeText={setDateofBirth}
            editable={false}/>
            </Pressable>
         )}   
        </View>

        <View style={Log_In_Style.AdressContainer}>
        <Text style={Log_In_Style.birthdayText}>
                Address Information
            </Text>

            <InputSignUpPages placeholder="Street Address" 
                             value={StreetAdd} 
                            setValue={setStreetAddress}/>
            <InputSignUpPages placeholder="City" 
                             value={City} 
                            setValue={setCity}/>    
            <InputSignUpPages placeholder="Postal Code" 
                             value={Postal} 
                            setValue={setPostal}/>             
        </View>

        
       <View style = {Log_In_Style.button}>
       <LogInButton text="Sign Up" onPress={onSignUpPressed}/>      
       </View>

        
       </View>


    )

}

const Log_In_Style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        zIndex: 0,
        
    },

    customContainer: {
        alignItems: "center",
        padding: 10,
    },

    button: {
        marginTop: 25,
        justifyContent: "center",
        alignItems: 'center',
    },

    iconContainer: {
        alignItems: "center",
        marginTop: 10,
        padding: 20,
    },

    AdressContainer: {
        marginTop: 30,
        marginLeft: 50,
        justifyContent: 'flex-start',
    },
    

    birthdayContainer: {
        marginTop: 10,
        marginLeft: 50,
        justifyContent: 'flex-start',
    },


    birthdayBorder: {
        height: 40,
        backgroundColor: "white",
        borderRadius: 154,
        width: 300,
        shadowColor:"rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        shadowRadius:6,
        elevation: 6,
        shadowOpacity: 5,
        borderColor: '#e8e8e8',
    },

    birthdayText: {
        color: '#a19e9e',
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