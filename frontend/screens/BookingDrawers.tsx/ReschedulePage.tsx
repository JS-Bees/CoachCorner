import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { UpdateBookingDataDocument } from '../../generated-gql/graphql';
import { UpdateBookingStatusDocument } from '../../generated-gql/graphql';
import ServiceTypePicker from '../../components/Custom components/ServiceTypePicker';
import { CreateBookingDocument } from '../../generated-gql/graphql';
import CustomInput from '../../components/Custom components/CustomBookingInput';
import Slot from '../../components/SlotsProps';
import AddSlotModal from '../../components/Modals/AddSlots';
import { FindCoachByIdDocument } from '../../generated-gql/graphql';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import SuccessModal from '../../components/Modals/SuccessModal';
import { useMutation, useQuery } from 'urql';
import { parse, formatISO} from 'date-fns';




interface Session {
    selectedSlots: [{slotsId:number; startTime: string; endTime: string; date: string, status: string }];
    coacheeId: string;
    coacheeName: string;
    serviceType: string; // Add this line
    additionalNotes: string; // Add this line if you also need to access additionalNotes
    bookingId: number;
}

interface RouteParams {
    session: Session;
    slotsId: number;
    coacheeId: number;
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
    const { session} = route.params;
    const [isAddSlotModalVisible, setAddSlotModalVisible] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<{
        status: string; startTime: string; endTime: string; date: string; slotsId: number}[]>([]);
        const [serviceType, setServiceType] = useState<string | null>(null);
    const [additionalNotes, setAdditionalNotes] = useState(session.additionalNotes || ''); 
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isBookingProcessing, setIsBookingProcessing] = useState(false);
    const [, updateBookingStatus] = useMutation(UpdateBookingStatusDocument);
    const [, createBookingMutation] = useMutation(CreateBookingDocument);
    

  
    

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const handleNavigateBack = () => {
        navigation.goBack();
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
    
    const handleCreateBooking = async (previousServiceType: string, previousAdditionalNotes: string, previousBookingId: number) => {
        setIsBookingProcessing(true);
    
        try {
            // Cancel the previous booking
            await updateBookingStatus({ updateBookingStatusId: session.bookingId, input: { status: 'CANCELLED' } });
    
            // Create the new booking
            const input = {
                coacheeId: parseInt(session.coacheeId), // Use session.coacheeId directly
                coachId: parseInt(userToken), // Ensure this is the correct field and value
                serviceType: serviceType, // Use the state directly
                additionalNotes: additionalNotes, // Use the state directly
                status: "PENDING"
            };
    
            const slotsInput = selectedSlots.map(slot => {
                const date = parse(slot.date, 'EEEE, do MMMM', new Date());
                const startTime = formatISO(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(slot.startTime.split(':')[0]), parseInt(slot.startTime.split(':')[1])));
                const endTime = formatISO(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(slot.endTime.split(':')[0]), parseInt(slot.endTime.split(':')[1])));
    
                return {
                    status: 'UPCOMING',
                    date: formatISO(date),
                    startTime,
                    endTime,
                };
            });
    
            // Execute the mutation to create the new booking
            const response = await createBookingMutation({
                input: input, 
                slotsInput: slotsInput
            });
    
            if (response.error) {
                console.error('Error creating new booking:', response.error.message);
                // Handle error
            } else {
                console.log('New booking created successfully:', response?.data?.createBooking);
                navigation.goBack();
                // Optionally, you can show a success message or perform other actions
            }
        } catch (error) {
            console.error('Error cancelling previous booking:', error);
            // Handle error
        }
    
        setIsBookingProcessing(false);
    };

    
 
   
    
   


    

    const [{ data: coachData, fetching, error }] = useQuery({
        query: FindCoachByIdDocument, // Use the Coachee query document
        variables: {
            userId: parseInt(userToken) || 0, // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network', // THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });

    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    setUserToken(token);
                } else {
                    console.error('User token is null or empty');
                }
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
                    {/* <CustomInput multiline={false} onChangeText={text => setServiceType(text)} value={serviceType}/> */}
                    <ServiceTypePicker setServiceType={setServiceType} />
                    <Text style={styles.subheaderText}> Additional Notes </Text>
                    <CustomInput style={styles.additionalInput} textAlignVertical="top" multiline={true}  onChangeText={text => setAdditionalNotes(text)} value={additionalNotes}/>

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleCreateBooking}>
                        {isBookingProcessing ? (
                         <ActivityIndicator size="small" color="white" />) : (
                            <Text style={{ color: 'white', fontSize: 16, height: 55, paddingHorizontal: 15, paddingVertical: 15 }}>Save Session</Text>)}
                    </TouchableOpacity>
                    <SuccessModal visible={isSuccessModalVisible}  onClose={() => setSuccessModalVisible(false)}  />
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
    timeStyle:{
        flexDirection: "row"
    },
    textTime:{
        paddingVertical: "1%",
        color:"#908D93",
        marginLeft: "5%"
    },
    textDate:{
        paddingVertical: "1%",
        marginLeft: "10%",
        color:"#908D93"
    },
    cancelButton: {
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-end',
        left: "10%"
    },
    subHeader: {
        color: '#908D93',
    },
})

export default ReschedulePage;
