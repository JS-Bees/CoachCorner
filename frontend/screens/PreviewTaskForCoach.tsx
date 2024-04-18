import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

const PreviewTask = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { title, description, date } = route.params.task;

  // Function to convert projected date to actual date format
  const convertToDate = (projectedDate: string) => {
    const projectedTimestamp = Date.parse(projectedDate);
    if (!isNaN(projectedTimestamp)) {
      const actualDate = new Date(projectedTimestamp);
      return actualDate.toLocaleDateString(); // Adjust format as needed
    }
    return ''; // Return empty string if date cannot be parsed
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleNavigateBack}>
        <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0'/>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          editable={false}
        />
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity style={styles.dateButton} disabled>
          <TextInput
            style={styles.input}
            value={convertToDate(date)} // Convert projected date to actual date
            editable={false}
          />
        </TouchableOpacity>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          multiline
          textAlignVertical='top'
          editable={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9', // Light gray background
  },
  content: {
    marginTop: 80, // Lowered down
  },
  iconContainer: {
    position: 'absolute',
    top: 40, // Lowered down
    left: 16,
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', // Darker text color
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF', // White background
    color: '#333', // Darker text color
  },
  dateButton: {
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF', // White background
  },
  descriptionInput: {
    minHeight: 100, // Adjust as needed
  },
});

export default PreviewTask;