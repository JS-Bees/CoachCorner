
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
    const [userToken, setUserToken] = useState<string | null>(null); 
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
        query: FindCoacheeByIdDocument, 
        variables: {
            userID: parseInt(userToken), 
        },
        requestPolicy: 'cache-and-network',
    });

  
    useEffect(() => {
    if (coachId) {
 
        const coachBookings = coacheeData?.findCoacheeByID?.bookings || [];


        const hasPendingBooking = coachBookings.some(
            (booking) => booking.coachId === coachId && BookingStatus.Pending
        );

        setIsButtonDisabled(!hasPendingBooking ); 
    }
    }, [coacheeData, coachId]);

 
    const handleBookingAction = () => {

        setIsButtonDisabled(true);
      };

    const handleOpenBottomSheet = () => {
        if (coachId && coach && !isButtonDisabled) { 
          const coachBookings = coacheeData?.findCoacheeByID?.bookings || [];
          const hasPendingBooking = coachBookings.some(
            (booking) => booking.coachId === coachId && booking.status === BookingStatus.Pending
          );
      
          if (hasPendingBooking) {
            setIsDrawerVisible(true); 
          } else {
            setIsButtonDisabled(true);  
          }
        } else {
          console.log('Invalid coach, coachId, or button is disabled'); 
        }
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
            <Text style={styles.text}>{`${coach?.firstName} ${coach?.lastName}`}</Text>
            <Divider style ={styles.divider}/>
            </View>

            <TouchableOpacity
            onPress={handleOpenBottomSheet}
            style={[
             styles.button,
             isButtonDisabled && styles.disabledButton, 
            ]}
            disabled={isButtonDisabled} 
            >
            <MaterialCommunityIcons
             name="book-account-outline"
            size={40}
            color={isButtonDisabled ? 'grey' : '#6E5DB0'}
            />
            </TouchableOpacity>

            
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDrawerVisible}
                onRequestClose={handleOpenBottomSheet}>  
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
        alignItems: 'center', 
        marginLeft: '70%',
        marginTop: '-3%'
      },
    
})


export default ClientBookingDrawer;