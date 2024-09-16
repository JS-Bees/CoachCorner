import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';

const ClientInformationModal = ({ visible, onConfirm }) => {
  return (
    <Modal isVisible={visible} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.scrollView}>
          <Text style={styles.confirmText}>
            Chat with a Coach to set a coaching appointment! 📅{'\n'}{'\n'}
            Coaches don’t have a fixed schedule for their appointments. 🕒{'\n'}{'\n'}
            Message the coach, and together you can decide a time that’s free for you both! 💬{'\n'}{'\n'}
            Once the appointment is set, a message will be sent to the booking icon at the top right of the screen. 📩{'\n'}{'\n'}
            Confirm or cancel the appointment as you wish! ✅❌{'\n'}{'\n'}
            Confirmed appointments are visible in the appointments section! 📆{'\n'}{'\n'}
            Happy Training! 🏀 ⚽ 🎾
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
    maxHeight: 300, 
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

export default ClientInformationModal;
