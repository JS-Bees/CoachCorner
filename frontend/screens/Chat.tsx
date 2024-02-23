import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import React from 'react';
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
            <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
            </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('CoacheeProfile')}>
            <Image
                    source={require('../assets/Woman.png')} // Add your profile image source here
                    style={{width: 40, height: 40, marginLeft:'83%', marginTop: '-10%'}}/>
            
            </TouchableOpacity>


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

    }
})

export default ChatPage;