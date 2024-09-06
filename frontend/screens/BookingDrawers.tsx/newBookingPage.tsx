import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RootStackParams } from '../../App';
import CustomInput from '../../components/Custom components/CustomBookingInput';
import Slot from '../../components/SlotsProps';
import ServiceTypePicker from '../../components/Custom components/ServiceTypePicker';
import AddSlotModal from '../../components/Modals/AddSlots';
import { CreateBookingDocument} from '../../generated-gql/graphql';
import { FindCoachByIdDocument } from '../../generated-gql/graphql';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse, formatISO } from 'date-fns';
import { useEffect } from 'react';
import SuccessModal from '../../components/Modals/SuccessModal';
import { useMutation, useQuery } from 'urql';

import { StackNavigationProp } from '@react-navigation/stack';



interface RouteParams {
    coacheeId: number;
    coacheeName: string;
}

interface NewBookingPageProps {
    route: {
        params: RouteParams;
    };
}

export interface CoachProfile {
    coachName: string;
   
    
}
  


const NewBookingPage: React.FC<NewBookingPageProps> = ({ route }) => {
    const [isAddSlotModalVisible, setAddSlotModalVisible] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<{
        status: string; startTime: string; endTime: string; date: string}[]>([]);
    const [createBookingResult, createBookingMutation] = useMutation(CreateBookingDocument);
    const [serviceType, setServiceType] = useState<string | null>(null);
    const [additionalNotes, setAdditionalNotes] = useState(' ');
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isBookingProcessing, setIsBookingProcessing] = useState(false);
    const [open, setOpen] = useState(false);
   


    const {coacheeId, coacheeName} = route.params || {}

    console.log(coacheeId, "CoacheeId")
    console.log(coacheeName, "CoacheeName")


    const navigation = useNavigation<StackNavigationProp<RootStackParams, keyof RootStackParams>>();
    const handleNavigateBack = () => {
        setSuccessModalVisible(false); // Close the SuccessModal
        navigation.goBack(); // Navigate back to the previous screen
    };
    

    const handleToggleAddSlotModal = () => {
        setAddSlotModalVisible(!isAddSlotModalVisible);
    };

    const handleAddSlot = (startTime: string, endTime: string, date: string) => {
        // Check if the number of selected slots is less than 3
        if (selectedSlots.length < 3) {
            // Check if the new slot overlaps with any existing slot
            const isOverlapping = selectedSlots.some(slot => {
                return slot.date === date && (
                    (startTime >= slot.startTime && startTime < slot.endTime) ||
                    (endTime > slot.startTime && endTime <= slot.endTime) ||
                    (startTime <= slot.startTime && endTime >= slot.endTime)
                );
            });
    
            if (isOverlapping) {
                alert("You cannot select overlapping slots.");
                return; // Exit function if slots overlap
            }
    
            // If no overlapping slots, add the new slot
            const newSlot = { startTime, endTime, date };
            setSelectedSlots([...selectedSlots, newSlot]);
        } else {
            // Alert the user or provide some feedback that they can't add more slots
            console.log('You can only select up to 3 slots.');
            alert("You can only select up to 3 slots");
        }
    
        handleToggleAddSlotModal(); // Close the modal after adding or alerting
    };
    


    

    const handleCreateBooking = async () => {
        setIsBookingProcessing(true);
    
        // Ensure selectedSlots is defined and populated
        if (!selectedSlots || selectedSlots.length === 0) {
            alert("No slots selected. Please select a slot and try again.");
            setIsBookingProcessing(false); // Reset the processing state
            return;
        }

        if (!serviceType) {
            alert("Please select a service type.");
            setIsBookingProcessing(false);
            return;
        }
    
        // Define slotsInput based on selectedSlots
        const slotsInput = selectedSlots.map(slot => {
            const date = parse(slot.date, 'EEEE, do MMMM', new Date());
    
            // Format startTime and endTime to ISO 8601 format
            const startTime = parse(slot.startTime, "hh:mm a", new Date())
            const endTime = parse(slot.endTime, "hh:mm a", new Date())

            console.log(date, startTime, endTime)
    
            // Include the date in the slotsInput array
            return {
                status: 'UPCOMING',
                date: formatISO(date), // Format the date as an ISO 8601 string
                startTime,
                endTime,
            };

            
        });
    
        const input = {
            coacheeId: coacheeId,
            coachId: parseInt(userToken),
            serviceType: serviceType,
            additionalNotes: additionalNotes || ' ',
            status: "PENDING"
        };
    
        try {
            const { data, error } = await createBookingMutation({
                input,
                slotsInput // Use slotsInput in your mutation
            });
    
            if (error) {
                console.error('Failed to create booking:', error);
                alert("An error occurred while creating the booking. Please try again later.");
            } else {
                console.log('Booking created successfully:', data);
                setIsBookingProcessing(false);
                setSuccessModalVisible(true);
            }
    
        } catch (error) {
            alert("An error occurred while creating the booking. Please try again later.");
            console.error('Error creating booking:', error);
        }
    
        setIsBookingProcessing(false);
    };


    
    const [{ data: coachData, fetching, error }] = useQuery({
        query: FindCoachByIdDocument,
        variables: {
            userId: parseInt(userToken),
        },
        requestPolicy: 'cache-and-network',
    });

    
    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                console.log('token', token);
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

    
    console.log("CoachID", coachData)
    console.log("CoacheeId", coacheeId)

   

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack} style={styles.arrowBack}>
                 <Icon name="arrow-back-circle-outline" size={30} color="#7E3FF0"  />
            </TouchableOpacity>

            <KeyboardAvoidingView style={styles.contentContainter}>
                <Text style={styles.headerText}> Schedule Appointment </Text>
                <Text style={styles.subHeader}>Maximum of 3 slots per session</Text>


                <ScrollView style={styles.scrollView} contentContainerStyle={styles.subContentContainer}>
                    
                    <Text style={styles.subheaderText}>Coach Name</Text>
                    {CoachProfiles[0].coachName ? (
                    <CustomInput value={CoachProfiles[0].coachName} />) : null}
                    <Text style={styles.subheaderText}> Trainee Name </Text>
                    <CustomInput value={`${coacheeName}`}/>

                    <View>
                        <View style={styles.slotsHeader}>
                         <Text style={styles.subheaderText}> Add a slot </Text>
                
                         <TouchableOpacity style={styles.addCircle} onPress={handleToggleAddSlotModal}>
                                <Icon name="add-circle-outline" size={30} color="#7E3FF0"  />
                         </TouchableOpacity>
                         <AddSlotModal visible={isAddSlotModalVisible} onClose={handleToggleAddSlotModal} onAddSlot={handleAddSlot} />
                        </View>
                        <View style={styles.slotsContainer}>
                        {selectedSlots.map((slot, index) => (
                         <Slot key={index} startTime={slot.startTime} endTime={slot.endTime} date={slot.date} />))}
                        </View>
                    </View>

                    <Text style={styles.subheaderText}> Service Type </Text>
                    {/* <CustomInput multiline={false} onChangeText={text => setServiceType(text)}/> */}

                    <ServiceTypePicker setServiceType={setServiceType} />
                    

                    <Text style={styles.subheaderText}> Additional Notes </Text>
                    <CustomInput style={styles.additionalInput} textAlignVertical="top" multiline={true} maxLength={10}  onChangeText={text => setAdditionalNotes(text)} />

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleCreateBooking}>
                        {isBookingProcessing ? (
                         <ActivityIndicator size="small" color="white" />) : (
                            <Text style={{ color: 'white', fontSize: 16, height: 55, paddingHorizontal: 15, paddingVertical: 15 }}>Save Session</Text>)}
                    </TouchableOpacity>
                    <SuccessModal visible={isSuccessModalVisible}  onClose={handleNavigateBack}  />
                </View>
                </ScrollView>

                
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
    subHeader: {
        color: '#908D93',
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
    slotsContainer: {
        padding: "2%",
        alignContent: "flex-start",
        right: "7%"
    }
})

export default NewBookingPage;