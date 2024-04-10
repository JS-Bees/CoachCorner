import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface AddSlotModalProps {
  visible: boolean;
  onClose: () => void;
  onAddSlot: (startTime: string, endTime: string, date: string) => void;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({ visible, onClose, onAddSlot }) => {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [endTimeError, setEndTimeError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);




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
    setStartDate(date);
    hideStartDatePicker();
  };

  const handleSave = () => {
    if (startDate && endDate && selectedDate) {
      onAddSlot(format(startDate, "hh:mm a"), format(endDate, "hh:mm a"), format(selectedDate, "EEEE, do MMMM"));
    }
  };

  const handleEndDateConfirm = (date: Date) => {
    if (startDate && date <= startDate) {
      setEndTimeError('End time must be after start time');
      setIsSaveDisabled(true);
    } else {
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
      setDateError('Date must be after or equal to the current date');
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
          <Text style={styles.title}>Start Time</Text>
          <TouchableOpacity onPress={showStartDatePicker}>
            <Text style={styles.content}>{startDate ? format(startDate, "hh:mm a") : 'Choose Start Time'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="time"
            onConfirm={handleStartDateConfirm}
            onCancel={hideStartDatePicker}
          />

          <Text style={styles.title}>End Time</Text>
          <TouchableOpacity onPress={showEndDatePicker}>
            <Text style={styles.content}>{endDate ? format(endDate, "hh:mm a") : 'Choose End Time'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="time"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
          {endTimeError ? <Text style={styles.error}>{endTimeError}</Text> : null}
           <Text style={styles.title}>Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.content}>{selectedDate ? format(selectedDate, "EEEE, do MMMM") : 'Choose date'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {dateError ? <Text style={styles.error}>{dateError}</Text> : null}
          
        </View>
        <TouchableOpacity onPress={handleSave} style={[styles.saveButton, isSaveDisabled && styles.disabledButton]} disabled={isSaveDisabled}>
            <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text>Close</Text>
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
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    width: '85%',
    height: '38%',
    alignItems: 'flex-start',
  },
  title: {
    marginLeft: "10%",
    color: '#7E3FF0',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 20,
    borderBottomColor: "#D4C5ED",
    borderBottomWidth: 1
  },
  content: {
    bottom: "30%",
    marginLeft: "15%",
  },
  saveButton: {
    bottom: '37%',
    marginLeft: "60%",
    padding: 10,
  },
  saveText: {
    color: '#7E3FF0'
  },
  error: {
    color: 'red',
    marginLeft: '10%',
  },
  disabledButton: {
    opacity: 0.5,
  },
  closeButton: {
   bottom: "10%",
   right: "30%",
  },
});

export default AddSlotModal;
