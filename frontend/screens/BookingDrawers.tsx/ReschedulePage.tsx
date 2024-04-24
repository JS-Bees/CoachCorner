import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { UpdateBookingDataDocument } from '../../generated-gql/graphql';
import CustomInput from '../../components/Custom components/CustomBookingInput';
import Slot from '../../components/SlotsProps';
import AddSlotModal from '../../components/Modals/AddSlots';
import { FindCoachByIdDocument } from '../../generated-gql/graphql';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import SuccessModal from '../../components/Modals/SuccessModal';
import { useMutation, useQuery } from 'urql';
import { parse, formatISO, format } from 'date-fns';



interface Session {
    selectedSlots: Array<{slotsId:number; startTime: string; endTime: string; date: string }>;
    coacheeId: number;
    coacheeName: string;
    serviceType: string; // Add this line
    additionalNotes: string; // Add this line if you also need to access additionalNotes
    bookingId: number;
}

interface RouteParams {
    session: Session;
    slotsId: number;
}

interface ReschedulePageProps {
    route: {
        params: RouteParams;
    };
}

export interface CoachProfile {
    coachName: string;
    
}
  


const ReschedulePage: React.FC<ReschedulePageProps> = ({ route }) => {
    const { session, slotsId } = route.params;
    const [isAddSlotModalVisible, setAddSlotModalVisible] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<{
        status: string; startTime: string; endTime: string; date: string}[]>([]);
    const [serviceType, setServiceType] = useState(session.serviceType || ''); 
    const [additionalNotes, setAdditionalNotes] = useState(session.additionalNotes || ''); 
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isBookingProcessing, setIsBookingProcessing] = useState(false);
    const [result, updateBookingData] = useMutation(UpdateBookingDataDocument);
    

  
    

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleToggleAddSlotModal = () => {
        setAddSlotModalVisible(!isAddSlotModalVisible);
    };

    const handleAddSlot = (startTime: string, endTime: string, date: string) => {
        const newSlot = { status: 'UPCOMING', startTime, endTime, date };
        setSelectedSlots(prevSlots => [...prevSlots, newSlot]);
        handleToggleAddSlotModal();
    };

    

   
    const handleUpdateBooking = async () => {
        setIsBookingProcessing(true);
        // Prepare variables for the mutation
        const variables = {
          bookingId: session.bookingId,
          updateSlotsIds: slotsId, // Include the IDs of slots to update
          deleteSlotsIds: [], // No slots to delete in this case
          bookingData: {
            serviceType,
            additionalNotes,
          },
          updateSlots: selectedSlots.map(slot => {
            const date = parse(slot.date, 'EEEE, do MMMM', new Date());
            const startTime = formatISO(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(slot.startTime.split(':')[0]), parseInt(slot.startTime.split(':')[1])));
            const endTime = formatISO(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(slot.endTime.split(':')[0]), parseInt(slot.endTime.split(':')[1])));
            return {
                id: slotsId, // Include the ID of each slot to update
                date:formatISO(date),
                startTime: startTime,
                endTime: endTime,
                status: slot.status,
            };
        }),
          addSlots: [], // No new slots to add in this case
        };
         
      
        // Execute the mutation
        const response = await updateBookingData(variables);
      
        // Handle the response
        if (response.error) {
          console.error('Error updating booking:', response.error.message);
        } else {
          console.log('Booking updated successfully:', response?.data?.updatePendingBooking);
          navigation.goBack();
          // Optionally, you can perform actions based on the result, such as displaying a success message
        }
        setIsBookingProcessing(false);
    };
    
    


    

    const [{ data: coachData, fetching, error }] = useQuery({
        query: FindCoachByIdDocument, // Use the Coachee query document
        variables: {
            userId: parseInt(userToken), // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network', // THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });

    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setUserToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
    
        fetchUserToken();
    }, []);

    const CoachProfiles: CoachProfile[] = [
        {
            coachName: (coachData?.findCoachByID.firstName + " " + coachData?.findCoachByID.lastName),
        },

    ]




    
   

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack} style={styles.arrowBack}>
                 <Icon name="arrow-back-circle-outline" size={30} color="#7E3FF0"  />
            </TouchableOpacity>

            <KeyboardAvoidingView style={styles.contentContainter}>
                <Text style={styles.headerText}> Schedule Appointment </Text>


                <ScrollView style={styles.scrollView} contentContainerStyle={styles.subContentContainer}>
                    
                    <Text style={styles.subheaderText}>Coach Name</Text>
                    {CoachProfiles[0].coachName ? (
                    <CustomInput value={CoachProfiles[0].coachName} />) : null}
                    <Text style={styles.subheaderText}> Trainee Name </Text>
                    <CustomInput value={`${session.coacheeName}`}/>


                    <View>
                        <View style={styles.slotsHeader}>
                         <Text style={styles.subheaderText}>Change Schedule </Text>
                         <TouchableOpacity style={styles.addCircle} onPress={handleToggleAddSlotModal}>
                                <Icon name="add-circle-outline" size={30} color="#7E3FF0"  />
                         </TouchableOpacity>
                         <AddSlotModal visible={isAddSlotModalVisible} onClose={handleToggleAddSlotModal} onAddSlot={handleAddSlot} />
                        </View>
                        {selectedSlots.map((slot, index) => (
                         <Slot key={index} startTime={slot.startTime} endTime={slot.endTime} date={slot.date} />))}
                    </View>


                    <Text style={styles.subheaderText}> Service Type </Text>
                    <CustomInput multiline={false} onChangeText={text => setServiceType(text)} value={serviceType}/>
                    <Text style={styles.subheaderText}> Additional Notes </Text>
                    <CustomInput style={styles.additionalInput} textAlignVertical="top" multiline={true}  onChangeText={text => setAdditionalNotes(text)} value={additionalNotes}/>

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleUpdateBooking}>
                        {isBookingProcessing ? (
                         <ActivityIndicator size="small" color="white" />) : (
                            <Text style={{ color: 'white', fontSize: 16, height: 55, paddingHorizontal: 15, paddingVertical: 15 }}>Save Session</Text>)}
                    </TouchableOpacity>
                    <SuccessModal visible={isSuccessModalVisible}  onClose={() => setSuccessModalVisible(false)}  />
                </View>
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={handleUpdateBooking}>
            {isBookingProcessing ? (
        <ActivityIndicator size="small" color="white" />
        ) : (
         <Text style={{ color: 'white', fontSize: 16, height: 55, paddingHorizontal: 15, paddingVertical: 15 }}>Save Session</Text> )}</TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    arrowBack: {
        top: "10%",
        marginLeft: "10%"
    },
    addCircle: {
        bottom: "-4%",
        marginLeft: "2%"
    },
    headerIcons: {
        paddingBottom: "5%",
        marginLeft: "13%",
        flexDirection: "row"
    },
    slotsHeader: {
        flexDirection: "row"
    },
    contentContainter: {
        flex: 1,
        alignItems: "flex-start",
        top: "13%",
        marginLeft: "10%",
        paddingBottom: "5%",
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    subContentContainer: {
        padding: "2%",
        paddingBottom: 50, // Ensure there is enough padding at the bottom for the button
    },
    slotHeader: {
        flexDirection: "row"
    },
    headerText: {
        bottom: "1%",
        marginLeft: "-3%",
        fontSize: 25,
        fontWeight: "400",
    },
    subheaderText: {
        marginTop: "5%",
        marginBottom: "2%",
        fontSize: 18,
        fontWeight: "400"
    },
    additionalInput: {
        height: 100
    },
    buttonContainer: {
       marginTop: "5%",
       marginLeft: "-1%",
       paddingBottom: "15%"
    },
    button: {
        backgroundColor: '#7E3FF0',
        width: 310,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
    },
})

export default ReschedulePage;
