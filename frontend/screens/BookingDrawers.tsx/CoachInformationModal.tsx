import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';

const CoachInformationModal = ({ visible, onConfirm }) => {
  return (
    <Modal isVisible={visible} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.scrollView}>
          <Text style={styles.confirmText}>
          Chat with a Client to set a coaching appointment! 📅{'\n'}{'\n'}
          Message the client, and together you can decide a time that’s free for you both! 💬{'\n'}{'\n'}
          Once the appointment details are agreed upon, click the booking icon at the top right of the screen to make an appointment. 📩{'\n'}{'\n'}
          The client will receive the appointment and may confirm or cancel. ✅❌{'\n'}{'\n'}
          Confirmed appointments are visible in the appointments section! 📆{'\n'}{'\n'}
          Happy Coaching! 🏀 ⚽ 🎾
            </Text>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button style={styles.confirmButton} mode="contained" onPress={onConfirm}>
              Ok
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  scrollView: {
    maxHeight: 300, // Adjust the height as needed
  },
  confirmText: {
    fontSize: 18,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    margin: 5,
  },
});

export default CoachInformationModal;
