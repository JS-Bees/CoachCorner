import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation } from 'urql';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { UpdateCoachTaskDocument } from '../generated-gql/graphql';

const PreviewTask = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { id, title, description, date: originalDate } = route.params.task;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [date, setDate] = useState(new Date(originalDate)); // Convert to JS Date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [, executeMutation] = useMutation(UpdateCoachTaskDocument);

  const handleEditTask = () => {
    setIsEditing(true); // Enable editing when pressing the edit button
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true); // Show date picker
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false); // Hide date picker
  };

  const handleConfirm = (selectedDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today to midnight
  
    // Check if selectedDate is today or in the past
    if (selectedDate <= today) {
      Alert.alert("Invalid Date", "Please select a future date.");
    } else {
      setDate(selectedDate); // Set new date
    }
  
    hideDatePicker(); // Hide date picker modal
  };

  const handleSaveTask = async () => {
    try {
      const result = await executeMutation({
          updateCoachTaskId: id,
          input: {
            completionStatus: "UNCOMPLETED", // Default completion status
            date: date.toISOString(), // Send as ISO 8601 formatted string
            description: newDescription,
            title: newTitle,
          },
      });

      if (result.error) {
        console.error("Error updating task:", result.error);
        Alert.alert("Error", "Failed to update task. Please try again.");
      } else {
        setIsEditing(false); // Disable editing after successful mutation
        Alert.alert(
          "Success",
          "Task updated successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack(); // Navigate back on success
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const convertToDate = (dateObj: Date) => {
    return dateObj.toLocaleDateString(); // Format to a readable date
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleNavigateBack}>
        <Icon name="arrow-back-circle-outline" size={30} color="#7E3FF0" />
      </TouchableOpacity>

      <View style={styles.editIconContainer}>
      <TouchableOpacity onPress={handleEditTask} style={styles.editButtonBorder}>
        <Text style={styles.editButtonFontStyle}>Edit</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputEditable]}
          value={isEditing ? newTitle : title}
          onChangeText={setNewTitle}
          multiline
          editable={isEditing}
        />
        
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity onPress={isEditing ? showDatePicker : null}> 
          <TextInput
            style={[styles.input, isEditing && styles.inputEditable]} 
            value={convertToDate(date)}
            editable={false} // Text field not editable, but clickable when editing
          />
        </TouchableOpacity>
        
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput, isEditing && styles.inputEditable]} 
          value={isEditing ? newDescription : description}
          onChangeText={setNewDescription}
          multiline
          textAlignVertical="top"
          editable={isEditing}
        />
      </View>

      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  content: {
    marginTop: "30%",
    marginLeft: "5%"
  },
  iconContainer: {
    position: 'absolute',
    marginTop: "17%",
    marginLeft: "10%",
    zIndex: 1,
  },
  editIconContainer: {
    position: 'absolute',
    width: "100%",
    height: "40%",
    marginTop: "17%",
    left: "75%",
    zIndex: 1,
  },
  label: {
    marginTop: "5%",
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    right: "2%",
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#FFFFFF',
    color: '#838086',
  },
  inputEditable: {
    borderColor: '#7E3FF0', // Change border color when editable
    borderWidth: 1
    
  },
  descriptionInput: {
    minHeight: 100, 
  },
  saveButton: {
    backgroundColor: "#7E3FF0",
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    left: "3%",
    borderRadius: 50, // Ensures a circular shape
    borderWidth: 1, // Adjust as needed
    borderColor: '#7E3FF0', // Choose your border color
    width: "25%",
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontStyle: "italic",
  },
  editButtonFontStyle: {
    color: "#7E3FF0",
    fontStyle: "italic",
  },
  editButtonBorder: {
    paddingVertical: 10,
    borderRadius: 50, // Ensures a circular shape
    borderWidth: 1, // Adjust as needed
    borderColor: '#7E3FF0', // Choose your border color
    width: "25%",
    alignItems: "center"
  },
});

export default PreviewTask;
