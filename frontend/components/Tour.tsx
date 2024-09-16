
import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  { id: '1', uri: require('../assets/Tour(1).png'), description: 'Choose and click the sport you want.' },
  { id: '2', uri: require('../assets/Tour(2).png'), description: 'Add the coach you want and get connected' },
  { id: '3', uri: require('../assets/Tour(3).png'), description: 'Contact and arrange a coaching appointment' },
  { id: '4', uri: require('../assets/Tour(4).png'), description: 'You can view your added to favorite coaches here' },
  { id: '5', uri: require('../assets/Tour(5).png'), description: 'You can also add your tasks needed to be done here' },
  { id: '6', uri: require('../assets/Tour(3).png'), description: 'Contact and arrange a coaching appointment' },
];

const TourModal = ({ visible, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    if (visible) {

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, 
        useNativeDriver: true,
      }).start();
    } else {
   
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300, 
        useNativeDriver: true,
      }).start(() => onClose());
    }
  }, [visible]);

  const handleClose = () => {
    setCurrentIndex(0); 
    onClose(); 
  };

  const goToNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.blurBackground, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
          <View style={styles.imageContainer}>
            <Image source={images[currentIndex].uri} style={styles.image} resizeMode="contain" />
          </View>
          <Text style={styles.imageDescription}>{images[currentIndex].description}</Text>
          <View style={styles.buttonContainer}>
            {currentIndex === 4 ? ( 
              <TouchableOpacity onPress={handleClose} style={styles.finishedButton}>
                <Text style={styles.finishedText}>Get Started</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={goToNextImage} style={styles.nextButton} disabled={currentIndex >= images.length - 1}>
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Animated.View>
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
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
  },
  modalContent: {
    width: '85%', 
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, 
  },
  imageContainer: {
    width: '100%',  
    height: width * 0.5, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '115%',
    height: '115%',
    resizeMode: 'contain', 
    borderRadius: 10,
  },
  imageDescription: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10, 
    color: '#7E3FF0', 
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center', 
    width: '100%',
  },
  nextButton: {
    backgroundColor: '#7E3FF0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#7E3FF0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  finishedButton: {
    marginTop: 20,
    backgroundColor: '#7E3FF0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  finishedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', 
    textAlign: 'center',
  },
});

export default TourModal;
