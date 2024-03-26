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

       <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0'/>
            </TouchableOpacity>
       </View>
      
      <View style={styles.content}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
        />
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity style={styles.dateButton}>
          <TextInput
            style={styles.input}
            value={convertToDate(date)} // Convert projected date to actual date
          />
        </TouchableOpacity>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input]}
          value={description}
          multiline
          textAlignVertical='top'
        />
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

export default PreviewTask;
