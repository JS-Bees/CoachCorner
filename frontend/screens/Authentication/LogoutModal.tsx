import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal'; // Import the modal component

const LogoutConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal isVisible={visible} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.confirmText}>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.confirmButton}
              mode="contained"
              onPress={onConfirm}
            >
              Yes
            </Button>
            <Button
              style={styles.cancelButton}
              mode="outlined"
              onPress={onCancel}
            >
              No
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
  confirmText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    margin: 5,
  },
  cancelButton: {
    flex: 1,
    margin: 5,
  },
});

export default LogoutConfirmationModal;
