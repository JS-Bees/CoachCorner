
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
   
} from 'react-native';
import React, { useState } from 'react';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
   } from "react-native-popup-menu";
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';




const ChatPage = () => {

    

 
    

    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    return (
        <View style={ChatStyle.container}>
            <View style={ChatStyle.iconContainer}>
            <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="chevron-back-outline" size={30} color='#7E3FF0' />
            </TouchableOpacity>
            </View>

           <View style={ChatStyle.headerContainer}>
                <TouchableOpacity
                     onPress={() => navigation.navigate('CoacheeProfile')}>
                 <Image
                     source={require('../assets/Woman.png')} // Add your profile image source here
                     style={{width: 40, height: 40, marginLeft:'25%', marginTop: '-10%'}}/>
            
                </TouchableOpacity>

                <Text style={ChatStyle.headerText}> Jane Smith </Text>
                <MenuProvider>
                    <Menu> 
                        <MenuTrigger
                            text=''
                            customStyles={{triggerWrapper: {top: -20}}}>

                        </MenuTrigger>
                        <MenuOption>
                            <MenuOption  text="Save" />
                        </MenuOption>
                    </Menu>
                </MenuProvider>
                
           </View>

          


        </View>

    )
}

const ChatStyle  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    iconContainer: {
        marginTop: "15%",
        marginLeft: "9%"
    },
    headerContainer: {
        flexDirection: "row",
        bottom: "6%",
        left: "6%"
    },
    headerText: {
       fontSize: 18,
       marginLeft: 10,
    },
})

export default ChatPage;