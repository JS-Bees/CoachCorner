import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Modal} from 'react-native'
import BookingDrawer from '../../components/BottomSheet/BookingDrawer';
import { Divider, Text} from 'react-native-paper';
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useState} from 'react'

const CoachBookingDrawer = () => {

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    

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
            <Text style={styles.text}>Coach Name</Text>
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