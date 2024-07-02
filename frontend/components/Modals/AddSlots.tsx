import React, {useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format,} from 'date-fns';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FindOneToOneServiceSlotsByCoachIdDocument, FindCoachByIdDocument} from '../../generated-gql/graphql';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'urql';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface AddSlotModalProps {
  visible: boolean;
  onClose: () => void;
  onAddSlot: (startTime: string, endTime: string, date: string) => void;
}

interface Slot {
  date: string;
  startTime: string;
  endTime: string;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({ visible, onClose, onAddSlot,}) => {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [endTimeError, setEndTimeError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
  const [upcomingSlots, setUpcomingSlots] = useState<Slot[]>([]);
  

  




  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date: Date) => {
    const formattedDate = format(date, "hh:mm a");
    console.log("Start Time has been picked: ", formattedDate);
    setStartDate(date);
    hideStartDatePicker();
  };
  
  
  
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useFetchCoachByUserID = (userID: any) => {
      const [coachResult] = useQuery({
          query: FindCoachByIdDocument, // Use the Coachee query document
          variables: {
              userId: parseInt(userID), // Parse the userID (token) to an integer with base 10
          },
      });

      return coachResult;
  };

  const {
    data: coachData,
  } = useFetchCoachByUserID(userToken);

  const [result] = useQuery({
    query: FindOneToOneServiceSlotsByCoachIdDocument,
    variables: {
      coachId: userToken? parseInt(userToken) : 0, // Provide a default value of 0 when userToken is null
    },
    requestPolicy: 'network-only',
  });

    const { data} = result;
    useEffect(() => {
      if (data) {
        const slots = data.findOneToOneServiceSlotsByCoachId.map(slot => ({
          date: format(new Date(slot.startTime), "yyyy-MM-dd"), // Or extract the date from startTime or another appropriate source
          startTime: slot.startTime,
          endTime: slot.endTime,
        }));
        setUpcomingSlots(slots);
      }
    }, [data]);

    

  
    const handleSave = () => {
      if (startDate && endDate && selectedDate) {
        // Format the new slot's start and end times
        const newStartTime = format(startDate, "hh:mm a");
        const newEndTime = format(endDate, "hh:mm a");
        const newDate = format(selectedDate, "yyyy-MM-dd");
    
        // Check for overlapping slots
        const isOverlap = upcomingSlots.some(slot => {
          const slotStartTime = new Date(slot.startTime);
          const slotEndTime = new Date(slot.endTime);

          const slotStartTimeFormatted = format(slotStartTime, "hh:mm a");
          const slotEndTimeFormatted = format(slotEndTime, "hh:mm a");

    
    
          // Check if the new slot's start time is after the existing slot's start time AND
          // the new slot's end time is before the existing slot's end time
          return (
            (newStartTime >= slotStartTimeFormatted && newEndTime <= slotEndTimeFormatted) &&
            (slot.date === newDate)
          );
        });
        if (!isOverlap) {
          onAddSlot(
            format(startDate, "hh:mm a"),
            format(endDate, "hh:mm a"),
            format(selectedDate, "EEEE, do MMMM"),
          );
          // Reset state values after saving
          setStartDate(null);
          setEndDate(null);
          setSelectedDate(null);
          setEndTimeError('');
          setDateError('');
          setIsSaveDisabled(false);
        } else { 
          // Set error message if there's an overlap
          setIsSaveDisabled(true);
          alert('A one-to-one session has already been reserved for this timeslot');
        }
      }

    };

    const handleEndDateConfirm = (date: Date) => {
      if (startDate && date <= startDate) {
        setEndTimeError('Selected End time must be after start time');
        setIsSaveDisabled(true);
      } else {
        const formattedDate = format(date, "hh:mm a");
        console.log("End Time has been picked: ", formattedDate);
        setEndDate(date);
        setEndTimeError('');
        setIsSaveDisabled(false);
      }
      hideEndDatePicker();
    };
   
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleClose = () => {
    onClose(); // Close the modal
  };


  const handleConfirm = (date: Date) => {
    const currentDate = new Date();
    if (date < currentDate) {
      setSelectedDate(null);
      setIsSaveDisabled(true);
    } else {
      const formattedDate = format(date, "EEEE, do MMMM");
      console.log("A date has been picked: ", formattedDate);
      setSelectedDate(date);
      setDateError('');
      setIsSaveDisabled(false);
    }
    hideDatePicker();
  };
  

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
        <Text style={styles.header}>Add a Session Slot</Text>
        <View style={styles.subContent}>
        <Text style={styles.title}>Select Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.content}>{selectedDate ? format(selectedDate, "EEEE, do MMMM") : 'Choose date'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
         <View>
            {dateError ? <Text style={styles.error}>{dateError}</Text> : null}
         </View>
          <View style={styles.timeContent}>
          <Text style={styles.title}>Select Start Time</Text>
          <TouchableOpacity onPress={showStartDatePicker}>
            <Text style={styles.content}>{startDate ? format(startDate, "hh:mm a") : 'Choose Start Time'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="time"
            onConfirm={handleStartDateConfirm}
            onCancel={hideStartDatePicker}
          />

          <Text style={styles.title}> Select End Time</Text>
          <TouchableOpacity onPress={showEndDatePicker}>
            <Text style={styles.content}>{endDate ? format(endDate, "hh:mm a") : 'Choose End Time'}</Text>
          </TouchableOpacity>
          {endTimeError ? <Text style={styles.error}>{endTimeError}</Text> : null}
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="time"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
          </View>

        </View>
        

      </View>
        <TouchableOpacity onPress={handleSave} style={[styles.saveButton, isSaveDisabled && styles.disabledButton]} disabled={isSaveDisabled}>
            <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="close-circle-outline" size={30} color="#7E3FF0"  />
        </TouchableOpacity>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    top: "2%",
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    width: (screenWidth * 0.9), // Adjust the percentage as needed
    height: (screenHeight * 0.6), // Adjust the percentage as needed
    alignItems: 'flex-start',
  },
  header:{
    fontSize: 22,
    fontWeight: '400',
  },
  title: {
    marginLeft: "3%",
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 20,
  },
  content: {
    bottom: "25%",
    marginLeft: "20%",
    marginBottom: "5%",
    color: '#7E3FF0',
  },
  timeContent: {
    marginTop: "5%",
  },
  subContent:{
    top: "5%",
    paddingVertical: "2%"
  },
  saveButton: {
    bottom: "6.5%",
    marginLeft: "60%",
    padding: 10,
  },
  saveText: {
    color: '#7E3FF0',
    fontSize: 15
  },
  error: {
    color: 'red',
  },
  disabledButton: {
    opacity: 0.5,
  },
  closeButton: {
   bottom: "62%",
   left: "39%",
  },
});

export default AddSlotModal;
