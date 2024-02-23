/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Modal, Button} from 'react-native'
import { Divider, Text} from 'react-native-paper';
import { useFonts } from 'expo-font';
import ConfirmBookingDrawer from '../../components/BottomSheet/ConfirmBookingDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useState, useEffect} from 'react'
import { useQuery } from 'urql';
import { useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BookingStatus, FindCoacheeByIdDocument } from '../../generated-gql/graphql';
import ClientInformationModal from './ClientInformationModal';

interface RouteParams {
    coachId?: string
    coach?: any
    coachFirstName: string
    coachLastName: string
}

const ClientBookingDrawer= () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
    const showInformationModal = () => {
        setConfirmModalVisible(true);
    };

    const hideInformationModal = () => {
        setConfirmModalVisible(false);
    };

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [isModalVisible, setIsModalVisible] = useState(false);    
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const route = useRoute()

    const coach = route.params?.coach;
    const coachId = route.params?.coachId;
   
    
    console.log('Coach ID:', coachId);
    console.log('Coach:', coach);

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

    const [{ data: coacheeData, fetching, error }]  = useQuery({
        query: FindCoacheeByIdDocument, // Use the Coachee query document
        variables: {
            userID: parseInt(userToken), // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network',// THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });

  
    useEffect(() => {
    if (coachId) {
        // Extract relevant booking data for the coach
        const coachBookings = coacheeData?.findCoacheeByID?.bookings || [];

        // Check if there is a pending booking status for the coach with the coachee
        const hasPendingBooking = coachBookings.some(
            (booking) => booking.coachId === coachId && BookingStatus.Pending
        );

        setIsButtonDisabled(!hasPendingBooking ); // Disable the button if there are no pending bookings
    }
    }, [coacheeData, coachId]);

    // Keith
    const handleBookingAction = () => {
        // Function to be called when booking is confirmed or canceled
        setIsButtonDisabled(true);
      };
    // End Keith

    const handleOpenBottomSheet = () => {
        if (coachId && coach && !isButtonDisabled) { // Add a condition to check if the button is not disabled
          const coachBookings = coacheeData?.findCoacheeByID?.bookings || [];
          const hasPendingBooking = coachBookings.some(
            (booking) => booking.coachId === coachId && booking.status === BookingStatus.Pending
          );
      
          if (hasPendingBooking) {
            setIsDrawerVisible(true); // Show the bottom sheet if there is a pending booking
          } else {
            setIsButtonDisabled(true);  // Automatically disable the button if there are no pending bookings
          }
        } else {
          console.log('Invalid coach, coachId, or button is disabled'); // Log an error if coach, coachId is missing, or the button is disabled
        }
    };
    
    const handleClose = () => {
        setIsDrawerVisible(false); // Close the bottom sheet
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
            <Text style={styles.text}>{`${coach?.firstName} ${coach?.lastName}`}</Text>
            <Divider style ={styles.divider}/>
            </View>

            <TouchableOpacity
            onPress={handleOpenBottomSheet}
            style={[
             styles.button,
             isButtonDisabled && styles.disabledButton, // Apply disabled styles if isButtonDisabled is true
            ]}
            disabled={isButtonDisabled} // Disable the button based on isButtonDisabled
            >
            <MaterialCommunityIcons
             name="book-account-outline"
            size={40}
            color={isButtonDisabled ? 'grey' : '#6E5DB0'} // Change color if button is disabled
            />
            </TouchableOpacity>

            
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDrawerVisible}
                onRequestClose={handleOpenBottomSheet}>  
                {/* Keith handleBookingAction*/}
                {isDrawerVisible && <ConfirmBookingDrawer onClose={handleClose} onBookingAction={handleBookingAction}/>}
            </Modal>
            
            <View>
            <TouchableOpacity onPress={showInformationModal}>
            <MaterialCommunityIcons name="information" size={24} color="#6E5DB0" style={styles.iconContainer}/>
            </TouchableOpacity>
            </View>
            <ClientInformationModal
                visible={isConfirmModalVisible}
                onConfirm={hideInformationModal}
            />

            

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
    },

    disabledButton :{
        opacity: 0.5
    },

    iconContainer: {
        alignItems: 'center', // Center the icon horizontally
        marginLeft: '70%',
        marginTop: '-3%'
      },
    
})


export default ClientBookingDrawer;