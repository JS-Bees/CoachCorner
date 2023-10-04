import React, { useRef, useState } from 'react';
import { Animated, PanResponder, Platform, StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import SVGComponent from '../UpperSVG';
import DragSheetButton from '../DragSheetButton';
import { ListItemProps } from '../ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateCoachingRelationshipDocument } from '../../generated-gql/graphql';
import { CreateReviewDocument } from '../../generated-gql/graphql';
import { FindCoachByIdReviewDocument } from '../../generated-gql/graphql';
import { useMutation, useQuery } from 'urql'
import Modal from 'react-native-modal';
import RatingWithStars from './RatingWithStars';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const { width, height } = Dimensions.get('window');

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.9;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.5;

const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 100;

interface DraggableBottomSheetProps {
  onClose: () => void;
  coachData: ListItemProps['data'];  
}



const DraggableBottomSheet: React.FC<DraggableBottomSheetProps> = ({ onClose, coachData }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [, createCoachingRelationship] = useMutation(CreateCoachingRelationshipDocument); // Initialize the mutation
  const [, createReviewMutation] = useMutation(CreateReviewDocument);

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0); // Initialize with the default rating

  const submitReview = async () => {
    try {
      const coacheeId = await AsyncStorage.getItem('userToken');

      if (coacheeId) {
        const variables = {
          coachId: coachData.id,
          coacheeId: parseInt(coacheeId),
          starRating: rating,
          comment: review,
        };

        const { data, error } = await createReviewMutation(variables); // Replace with your mutation function

        if (data) {
          // Handle success, e.g., show a success message
          console.log('Review submitted successfully:', data);
        
          // Close the "Add a Review" modal
          closeSecondModal();
          resetReviewAndRating();
        } else if (error) {
          // Handle error, e.g., show an error message
          console.error('Error submitting review:', error);
        }
      } else {
        console.error('coacheeId not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };





  const onAddPressed = async () => {
    try {
      const coacheeId = await AsyncStorage.getItem('userToken');

      if (coacheeId) {
        const variables = {
          coachId: coachData.id,
          coacheeId: parseInt(coacheeId),
        };

        const { data, error } = await createCoachingRelationship(variables);

        if (data) {
          // Handle success, e.g., show a success message
          console.log('Added to Coach:', data);
        
          // Close the bottom sheet
          setIsBottomSheetOpen(false);
          onClose();
        } else if (error) {
          // Handle error, e.g., show an error message
          console.error('Error adding coach:', error);
        }
      } else {
        console.error('coacheeId not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error adding coach:', error);
    }
  };
  const [{ data: coachReviewsData }] = useQuery({
    query: FindCoachByIdReviewDocument,
    variables: { userID: coachData.id }, // Pass the coach's ID as the userID variable
    requestPolicy: 'cache-and-network',// THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
  });


  const onSeeReviewPressed = () => {
    setModalVisible(true);
  }
  const closeModal = () => {
    setModalVisible(false);
  }


  const onOpenSecondModalPressed = () => {
    setSecondModalVisible(true);
  }

  const closeSecondModal = () => {
    setSecondModalVisible(false);
  }

  const resetReviewAndRating = () => {
    setReview(''); // Reset the review to an empty string
    setRating(0); // Reset the rating to its initial value (0 in this case)
  };



  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (_, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy > DRAG_THRESHOLD) {
          // Dragged down beyond the threshold, so close the bottom sheet
          setIsBottomSheetOpen(false);
          onClose();
        }
      },
    })
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start(() => {
      // Detect if the bottom sheet is fully open or closed
      setIsBottomSheetOpen(lastGestureDy.current === MAX_DOWNWARD_TRANSLATE_Y);
      setIsShowOverlay(lastGestureDy.current === MAX_UPWARD_TRANSLATE_Y)
      // Call the onClose prop when the sheet is closed
      if (lastGestureDy.current === MAX_DOWNWARD_TRANSLATE_Y) {
        onClose();
      }
    });
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Transparent overlay */}
      {isBottomSheetOpen && (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill]}
          activeOpacity={1}
          onPress={() => {
            setIsBottomSheetOpen(false);
            onClose();
          }}
        />
      )}

      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]} {...panResponder.panHandlers}>
        <View style={styles.draggableArea}>
          <View style={styles.dragHandle} />
        </View>
        <SVGComponent/>
        <View style = {styles.imageContainer}>
        <Image resizeMode='cover' source={require('../BottomSheet/User.png')}
        style ={{width: 100, height: 100}}/>

        <View style= {styles.row}>
          <Text style={styles.textCoach}>{coachData.firstName + ' ' + coachData.lastName}</Text>
          <Text style={styles.textSport}> {coachData.sport} </Text>
    
        </View>
        <View style={styles.button}>
            <DragSheetButton text={'Add to My Coaches'} onPress={onAddPressed}/>
          </View>
      </View>

      <ScrollView style={styles.scrollViewContainer}>
      <Text style={styles.textSport}> Bio </Text>
      <TextInput style={styles.textInput}
        // underlineColor='transparent'
        value={coachData.bio}
        editable={false}/>

      <Text style={styles.textSport}> Workplace Address </Text>
      <TextInput style={styles.textInput}
        // underlineColor='transparent'
        value={coachData.workplaceAddress}
        editable={false}/>
      <Text style={styles.textSport}> Affiliates </Text>
      <TextInput style={styles.textInput}
        // underlineColor='transparent'
        value={coachData.affiliations}
        editable={false}/>

      </ScrollView>

     <View style = {styles.Reviews}>
     <DragSheetButton text={"Check Reviews"} type='TERTIARY' onPress={onSeeReviewPressed}/>
     <DragSheetButton text={"Add a Review"}type='TERTIARY' onPress={onOpenSecondModalPressed}/>
     </View>
      </Animated.View>

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
       <View style={styles.modalContainer}>
         {/* First modal content here */}
         <Text>Coach Reviews</Text>
          <ScrollView>
            {coachReviewsData &&
              coachReviewsData.findCoachByID &&
              coachReviewsData.findCoachByID.reviews.map((review, index) => (
                <View key={index} style={styles.reviewContainer}>

                  <Text>{review.coachee.firstName} {review.coachee.lastName}</Text>
                  <RatingWithStars rating={review.starRating} />
                  <Text>{review.comment}</Text>
                </View>
              ))}
          </ScrollView>
         <TouchableOpacity onPress={closeModal}>
           <Text>Close</Text>
         </TouchableOpacity>
       </View>
     </Modal>
      {/* Second Modal */}
      <Modal isVisible={isSecondModalVisible} onBackdropPress={closeSecondModal}>
  <View style={styles.modalContainer}>
    {/* Second modal content here */}
    <Text>Enter Reviews</Text>
    <ScrollView>
      {/* Text input for the review */}
      <TextInput
        style={styles.textInput}
        placeholder="Enter your review"
        multiline
        numberOfLines={4}
        value={review}
        onChangeText={(text) => setReview(text)}
      />

      {/* Rating input */}
      <TextInput
  style={styles.textInput}
  placeholder="Enter your Rating (1-5)"
  keyboardType="numeric" // Only allow numeric input
  value={rating.toString()} // Use the rating state as the value
  onChangeText={(text) => {
    // Validate and set the rating as a number between 1 and 5
    const numericRating = parseInt(text);
    if (!isNaN(numericRating) && numericRating >= 1 && numericRating <= 5) {
      setRating(numericRating);
    }
  }}
/>
    </ScrollView>

    {/* Submit Review button */}
    <TouchableOpacity onPress={submitReview}>
      <Text>Submit Review</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {
      closeSecondModal();
      resetReviewAndRating(); // Call the reset function when closing the modal
    }}>
      <Text>Close</Text>
    </TouchableOpacity>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },

  bottomSheet: {
    position: 'absolute',
    width: '100%',
    right: '-50%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: { elevation: 10 },
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: '#F9FBFC',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    width: 500,
    height: 50,
    backgroundColor: "#DED2EA",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: 'white',
    borderRadius: 10,
  },
 
  imageContainer: {
    top: -215,
    paddingVertical: 20,
    left: 30,
  },

  row: {
    top: -70,
    left: 110,
    alignItems: 'flex-start'
  },

  textCoach: { 
    fontSize: 25,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: '#915bc7',
  },

  textSport: {
    left: 4,
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '600',
    color: '#757575',

  },

  button: {
    top: -65,
    left: 100
    
  },

  scrollViewContainer: {
    top: -250,
    width: 325,
    left: 30,
    marginBottom: -200
  },
  Reviews : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '5%'

  },

  textInput: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: "grey",
  },

  svgContainer: {
    justifyContent: 'flex-start', // Align to the top
    alignItems: 'center',
    width: (width),
    height: (height),
    zIndex: 0,
  },

  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  reviewContainer: {
    marginBottom: 20,
  },


});

export default DraggableBottomSheet;

