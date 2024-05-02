import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import CustomInput from '../../components/Custom components/CustomBookingInput';
import Slot from '../../components/SlotsProps';
import AddSlotModal from '../../components/Modals/AddSlots';
import { CreateBookingDocument } from '../../generated-gql/graphql';
import { FindCoachByIdDocument } from '../../generated-gql/graphql';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse, formatISO } from 'date-fns';
import { useEffect } from 'react';
import SuccessModal from '../../components/Modals/SuccessModal';
import { useMutation, useQuery } from 'urql';



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
    const [serviceType, setServiceType] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isBookingProcessing, setIsBookingProcessing] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [endTimeError, setEndTimeError] = useState('');
    const [dateError, setDateError] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);


    const { coacheeId, coacheeName} = route.params || {}

    console.log(coacheeId, "CoacheeId")
    console.log(coacheeName, "CoacheeName")

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
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
            const newSlot = { startTime, endTime, date };
            setSelectedSlots([...selectedSlots, newSlot]);
        } else {
            // Alert the user or provide some feedback that they can't add more slots
            console.log('You can only select up to 3 slots.');
        }
        handleToggleAddSlotModal();
    };
    

    const handleCreateBooking = async () => {

        setIsBookingProcessing(true);

        if (userToken === null) {
            console.error('User token is null');
            alert("User token is missing. Please log in and try again.");
            setIsBookingProcessing(false); // Reset the processing state
            return;
        }
    
        // Check if serviceType or additionalNotes is empty or blank
        if (serviceType.trim() === "" || additionalNotes.trim() === "") {
            alert("Service type or additional notes cannot be blank. Please fill in the missing inputs.");
            setIsBookingProcessing(false); // Reset the processing state
            return;
        }
        
    
        const input = {
            coacheeId: coacheeId,//should be coachID rightnow its showing bookingID
            coachId: parseInt(userToken),
            serviceType: serviceType,
            additionalNotes: additionalNotes,
            status: "PENDING"
        };
    
        const slotsInput = selectedSlots.map(slot => {
            const date = parse(slot.date, 'EEEE, do MMMM', new Date());
    
            // Format startTime and endTime to ISO 8601 format
            const startTime = formatISO(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(slot.startTime.split(':')[0]), parseInt(slot.startTime.split(':')[1])));
            const endTime = formatISO(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(slot.endTime.split(':')[0]), parseInt(slot.endTime.split(':')[1])));
           
            
            // Include the date in the slotsInput array
            return {
                status: 'UPCOMING',
                date: formatISO(date), // Format the date as an ISO 8601 string
                startTime,
                endTime,
            };
        });
    
       
        const { data, error } = await createBookingMutation({
            variables: { input, slotsInput }
        });

    
        try {
            const { data, error } = await createBookingMutation({
                input,
                slotsInput
            });
    
            if (error) {
                console.error('Failed to create booking:', error);
            } else {
                console.log('Booking created successfully:', data);
                setIsBookingProcessing(false);
                setSuccessModalVisible(true);
            }
    
            console.log("Input:", input);
            console.log("Slots Input:", slotsInput);
        } catch (error) {
            alert("An error occurred while creating the booking. Please try again later.");
            console.error('Error creating booking:', error);

        }
        if (!error) {
            setSuccessModalVisible(true);
            setSelectedSlots([]);
            setServiceType('');
            setAdditionalNotes('');
          
        }
    
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
                        {selectedSlots.map((slot, index) => (
                         <Slot key={index} startTime={slot.startTime} endTime={slot.endTime} date={slot.date} />))}
                    </View>

                    <Text style={styles.subheaderText}> Service Type </Text>
                    <CustomInput multiline={false} onChangeText={text => setServiceType(text)} />
                    <Text style={styles.subheaderText}> Additional Notes </Text>
                    <CustomInput style={styles.additionalInput} textAlignVertical="top" multiline={true}  onChangeText={text => setAdditionalNotes(text)}/>

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
})

export default NewBookingPage;
