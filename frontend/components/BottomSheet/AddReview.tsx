import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { BottomSheet } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'urql';
import { CreateReviewDocument } from '../../generated-gql/graphql';

interface AddReviewProps {
  isVisible: boolean;
  onClose: () => void;
  coachId: number; // You should ensure that coachId is passed to this component
}

const AddReviewBottomSheet: React.FC<AddReviewProps> = ({ isVisible, onClose, coachId }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [text, onChangeText] = useState('');
  const [rating, setRating] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [, createReview] = useMutation(CreateReviewDocument);

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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const borderColor = isFocused ? '#7E3FF0' : '#E1D1FA';

  const handleStarPress = (value: number) => {
    setRating(value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)} style={styles.star}>
          <Icon name={rating >= i ? 'star' : 'star-outline'} size={40} color='#FECB2E' />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleSendReview = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a star rating.');
      return;
    }

    if (text.trim() === '') {
      Alert.alert('Error', 'Please enter a review.');
      return;
    }

    if (userToken === null) {
      Alert.alert('Error', 'User token not found.');
      return;
    }

    try {
      const reviewData = {
        coachId: coachId,
        coacheeId: parseInt(userToken, 10), // Ensure userToken is correctly converted to a number
        comment: text,
        starRating: rating,
      };

      await createReview({
        input: reviewData,
      });

      Alert.alert('Success', 'Review submitted successfully!');

      onClose(); // Close the bottom sheet after successful submission
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting the review.');
      console.error('Error submitting review:', error);
    }
  };

  return (
    <BottomSheet isVisible={isVisible}>
      <View style={[styles.container, styles.bottomSheetContent]}>
        <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
          <Icon name="close-circle-outline" size={35} color="#7E3FF0" />
        </TouchableOpacity>

        <Text style={styles.header}>Leave a review!</Text>

        <View style={styles.starContainer}>{renderStars()}</View>

        <Text style={styles.header}>What do you think of this coach?</Text>

        <SafeAreaView>
          <TextInput
            style={[styles.inputContainer, { borderColor }]}
            onChangeText={onChangeText}
            value={text}
            multiline={true}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </SafeAreaView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSendReview} style={styles.button}>
            <Text style={{ color: 'white', fontSize: 15, height: 55, paddingHorizontal: 15, paddingVertical: 15 }}>
              Send Review
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  bottomSheetContent: {
    height: 600,
  },
  closeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '15%',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
  },
  star: {
    marginHorizontal: '3%',
  },
  inputContainer: {
    borderWidth: 1.5,
    width: '90%',
    height: '60%',
    left: '6%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#838086',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '7%',
    alignItems: 'center',
    left: '33%',
    width: '40%',
  },
  button: {
    marginTop: '5%',
    marginLeft: '11%',
    backgroundColor: '#7E3FF0',
    width: 335,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
  },
});

export default AddReviewBottomSheet;
