import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { CreateCoacheeTaskDocument } from '../generated-gql/graphql';
import { useMutation } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskPage = () => {

   const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
  const [, executeMutation] = useMutation(CreateCoacheeTaskDocument);

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: React.SetStateAction<Date>) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    // Validate that all required inputs are filled in
    if (!title || !description || !date) {
      Alert.alert('Missing Data', 'Please fill in all required inputs: Title, Date, and Description.');
      return; // Exit the function without executing the mutation
    }

    try {
      const result = await executeMutation({
          input: {
            coacheeId: parseInt(userToken), // Ensure proper conversion to integer
            completionStatus: "UNCOMPLETED",
            date: date.toISOString(), // Format date to ISO 8601
            description: description,
            title: title,
          },
        },
      );

      if (result.error) {
        console.error("Error creating task:", result.error);
        Alert.alert("Error", "Failed to create task. Please try again.");
      } else {
        Alert.alert(
          "Success",
          "Task created successfully!",
          [
            {
              text: "OK",
              onPress: handleNavigateBack, // Navigate back after success
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error during mutation:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }

    // Reset input fields
    setTitle('');
    setDescription('');
    setDate(new Date()); // Reset date to current date
  };

  const handleDelete = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

       <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0'/>
            </TouchableOpacity>
       </View>
      
      <View style={styles.content}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Title..."
      />
       <Text style={styles.label}>Date:</Text>
      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <Icon name="calendar-outline" size={20} color="#7E3FF0" style={{bottom: "100%", left: "10%"}} />
        <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, { height: 250 }]}
        onChangeText={setDescription}
        value={description}
        placeholder="Description..."
        multiline
        textAlignVertical='top'
      />
      
     <View style={styles.buttonsContainer}>
     <TouchableOpacity onPress={handleSave}>
        <Text style={styles.addButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
     </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  content: {
    top: "10%"
  },
  iconContainer: {
    top: "5%",
    marginLeft: "2%"
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  dateButton: {
    borderRadius: 4,
    padding: 12,
    alignItems: 'flex-start',
  },
  dateButtonText: {
    bottom: "40%",
    color: 'grey',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: "row"
  },
  addButtonText: {
    color: '#7E3FF0',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: "italic"
  },
  deleteButtonText: {
    color: 'red',
    marginLeft: "82%",
    fontSize: 16,
    fontWeight: '400',
    fontStyle: "italic"
  },
});

export default AddTaskPage;
