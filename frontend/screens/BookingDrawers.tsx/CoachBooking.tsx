
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
import { useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CoachInformationModal from './CoachInformationModal';


interface RouteParams {
    coacheeId: string
    coacheeFirstName: string
    coacheeLastName: string
    
}



const CoachBookingDrawer = () => {
    const route = useRoute()
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

    const showInformationModal = () => {
        setConfirmModalVisible(true);
    };

    const hideInformationModal = () => {
        setConfirmModalVisible(false);
    };


    

    const coacheeId = route.params?.coacheeId;
    const coacheeFirstName = route.params?.coacheeFirstName;
    const coacheeLastName = route.params?.coacheeLastName
    console.log('Coachee ID:', coacheeId);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null); 
  

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
        query: FindCoachByIdDocument, 
        variables: {
            userID: parseInt(userToken), 
        },
        requestPolicy: 'cache-and-network',
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
            <Text style={styles.text}>{`${coacheeFirstName} ${coacheeLastName}`}</Text>
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
                {isDrawerVisible && <BookingDrawer onClose={handleClose} coacheeId={coacheeId}/>}

            </Modal>
            
            <View>
            <TouchableOpacity onPress={showInformationModal}>
            <MaterialCommunityIcons name="information" size={24} color="#6E5DB0" style={styles.iconContainer}/>
            </TouchableOpacity>
            </View>            
            <CoachInformationModal
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

    iconContainer: {
        alignItems: 'center', 
        marginLeft: '70%',
        marginTop: '-3%'
      },
})


export default CoachBookingDrawer;