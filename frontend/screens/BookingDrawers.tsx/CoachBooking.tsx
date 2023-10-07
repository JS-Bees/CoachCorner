/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Modal} from 'react-native'
import BookingDrawer from '../../components/BottomSheet/BookingDrawer';
import { Divider, Text} from 'react-native-paper';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useState, useEffect} from 'react'
import { useQuery } from 'urql';
import { FindCoachByIdDocument } from '../../generated-gql/graphql';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



const CoachBookingDrawer = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token

    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                console.log('token', token)
                setUserToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchUserToken();
    }, []);

    const [{ data: coachData, fetching, error }]  = useQuery({
        query: FindCoachByIdDocument, // Use the Coachee query document
        variables: {
            userID: parseInt(userToken), // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network',// THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });
    

    const handleOpenBottomSheet = () => {
        setIsDrawerVisible(!isDrawerVisible);
    };

    const handleClose = () => {

        setIsDrawerVisible(false);
    };
      


  

    const [fontsloaded] = useFonts({
        'Inter-Semibold': require('./Inter-SemiBold.otf'),
    });

  
    if (!fontsloaded) {
        return null;
    }

    

   
    return (
        <View style = {styles.container}>
            <View style={styles.upperContainer}>
            <Image source={require('./User.png')} style={styles.imageContainer}/>
            <Text style={styles.text}>{`${coachData?.findCoachByID?.firstName} ${coachData?.findCoachByID?.lastName}`}</Text>
            <Divider style ={styles.divider}/>
            </View>

            <TouchableOpacity onPress={handleOpenBottomSheet} style={styles.button}>
            <MaterialCommunityIcons name="book-account-outline" size={40} color="#6E5DB0" />
            </TouchableOpacity>

            
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDrawerVisible}
                onRequestClose={handleOpenBottomSheet}>
                {isDrawerVisible && <BookingDrawer onClose={handleClose}/>}
            </Modal>

            

        </View>

        
    )
    

}

const imageSize = 50;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
    upperContainer: {
        top: '10%'
    },
    imageContainer: {
        left: '10 %',
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    },
    text: {
        top: '-45%',
        left: '25%',
        fontSize: 15,
        fontFamily: 'Inter-Semibold'
    },

    button: {
        top: '2%',
        left: '82%'
      
    },

    divider: {
       justifyContent: "center",
        left: '5%',
        top: '-10%',
        width: '90%',
        color:'grey'
    }
})


export default CoachBookingDrawer;