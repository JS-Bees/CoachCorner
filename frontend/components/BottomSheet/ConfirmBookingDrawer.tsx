import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import LogInButton from '../CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'urql';
import {
  FindCoacheeByIdDocument,
  UpdateBookingStatusDocument,
  FindBookingsByStatusAndCoacheeIdDocument,
  BookingStatus,
} from '../../generated-gql/graphql';
import { useNavigation, useRoute } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const { width } = Dimensions.get('window');

const UPDATE_BOOKING_STATUS_MUTATION = `
  mutation UpdateBookingStatus($id: Int!, $status: BookingStatus!) {
    updateBookingStatus(id: $id, input: { status: $status }) {
      id
      status
    }
  }
`;

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.85;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.3;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const ConfirmBookingDrawer: React.FC<ConfirmBookingDrawerProps> = ({ onClose }) => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // State for success modal
  const [isCancelledModalVisible, setIsCancelledModalVisible] = useState(false); // State for cancelled
  const route = useRoute();
  const [selectedCoach, setSelectedCoach] = useState(route.params?.coach || null);
  const [updateBookingStatusResult, updateBookingStatus] = useMutation(
    UPDATE_BOOKING_STATUS_MUTATION
  );
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  

  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('token', token);
        setUserToken(token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchUserToken();
  }, []);

  const [{ data: coacheeData }] = useQuery({
    query: FindCoacheeByIdDocument,
    variables: {
      userID: parseInt(userToken, 10),
    },
    requestPolicy: 'cache-and-network',
  });

  useEffect(() => {
    setSelectedCoach(route.params?.coach || null);
  }, [route.params]);

  const [{ data: bookingData, fetching, error }] = useQuery({
    query: FindBookingsByStatusAndCoacheeIdDocument,
    variables: {
      status: BookingStatus.Pending,
      coacheeID: parseInt(userToken),
    },
    requestPolicy: 'cache-and-network',
  });

  const dragHandleHeight = 50;
  const dragHandleArea = { top: 0, bottom: dragHandleHeight };

  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gesture) => {
        const { y0 } = gesture;

        if (y0 >= dragHandleArea.top && y0 <= dragHandleArea.bottom) {
          return true;
        }

        return false;
      },
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (_, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (lastGestureDy.current >= MAX_DOWNWARD_TRANSLATE_Y) {
          onClose();
        } else {
          if (gesture.dy > 0) {
            gesture.dy <= DRAG_THRESHOLD;
          } else {
            gesture.dy >= -DRAG_THRESHOLD;
          }
        }
      },
    })
  ).current;

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

  const overlayAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
      outputRange: [0.5, 0.3],
      extrapolate: 'clamp',
    }),
  };

  const handleConfirmBooking = (bookingId: number) => {
    updateBookingStatus({
      id: bookingId,
      status: BookingStatus.Confirmed,
    }).then((result) => {
      if (result.error) {
        console.error('Error updating booking status:', result.error);
      } else {
        console.log('Booking status updated successfully:', result.data);
        setIsBookingConfirmed(true);
        setIsSuccessModalVisible(true);
      }
    });
  };

  const handleCancelBooking = (bookingId: number) => {
    updateBookingStatus({
      id: bookingId,
      status: BookingStatus.Cancelled,
    }).then((result) => {
      if (result.error) {
        console.error('Error updating booking status:', result.error);
      } else {
        console.log('Booking status updated successfully:', result.data);
        setIsCancelledModalVisible(true)
      }
    });
  };

  const handleTextPress = () => {
    // Handle the text press event here.
    // You can implement scrolling logic or any other action you want.
    console.log('Text pressed');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`;
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };
  
  const [fontsloaded] = useFonts({
    'Cairo-Regular': require('./Fonts/Cairo-Regular.ttf'),
  });


  if (!fontsloaded) {
    return null;
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View style={[styles.overlay, overlayAnimation]} />

      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.dragHandle} {...panResponder.panHandlers} />

        <View style={styles.title}>
          <Text style={styles.headerText}>Confirm</Text>
          <Text style={styles.headerText}>Appointment</Text>
        </View>

        <ScrollView
          keyboardDismissMode="on-drag"
          contentInsetAdjustmentBehavior="always"
          style={{ flex: 1 }}
        >
          <View style={styles.content}>
            <Text style={styles.secondHeaderText}>Coach Name</Text>
            <Text style={styles.contentText}>
              {`${selectedCoach?.firstName} ${selectedCoach?.lastName}`}
            </Text>

            <Text style={styles.secondHeaderText}
            onPress={handleTextPress}>Client Name</Text>
            <Text style={styles.contentText}>
              {`${coacheeData?.findCoacheeByID.firstName} ${coacheeData?.findCoacheeByID.lastName}`}
            </Text>

            <Text style={styles.secondHeaderText}>Date</Text>
            {bookingData?.findBookingsByStatusAndCoacheeID.map((booking) =>
              booking.bookingSlots.map((slot) => (
                <Text key={slot.id} style={styles.contentText}>
                  {formatDate(slot.date)}
                </Text>
              ))
            )}
            <Text style={styles.secondHeaderText}>Time</Text>
            {bookingData?.findBookingsByStatusAndCoacheeID.map((booking) =>
              booking.bookingSlots.map((slot) => (
                <View key={slot.id} style={styles.rowContent}>
                  <Text style={styles.secondHeaderText}>Start Time</Text>
                  <Text style={styles.contentTextStart}>
                    {formatTime(slot.startTime)}
                  </Text>
                  <Text style={styles.secondHeaderTextEnd}>End Time</Text>
                  <Text style={styles.contentTextEnd}>
                    {formatTime(slot.endTime)}
                  </Text>
                </View>
              ))
            )}

            <Text style={styles.secondHeaderText}
            onPress={handleTextPress}>Service Type</Text>
            {bookingData?.findBookingsByStatusAndCoacheeID.map((booking) =>
              booking.additionalNotes && (
                <Text key={booking.id} style={styles.contentText}>
                  {booking.serviceType}
                </Text>
              )
            )}

            <Text style={styles.secondHeaderText}
            onPress={handleTextPress}>Additional Notes</Text>
            {bookingData?.findBookingsByStatusAndCoacheeID.map((booking) =>
              booking.additionalNotes && (
                <Text key={booking.id} style={styles.contentText}>
                  {booking.additionalNotes}
                </Text>
              )
            )}
          </View>

          <View style={styles.button}>
            <LogInButton
              text={'Confirm this Appointment'}
              type="CONFIRM"
              onPress={() =>
                handleConfirmBooking(
                  bookingData?.findBookingsByStatusAndCoacheeID[0]?.id || 0
                  )
              }
            />
          </View>

          {/* Success Modal */}
      <Modal
        transparent={true}
        visible={isSuccessModalVisible}
        animationType="fade"
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.successText}>Booking Confirmed!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsSuccessModalVisible(false)} // Close the modal
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

          <View style={styles.cancelButton}>
            <LogInButton text={'Cancel this Appointment'} type="CANCEL" 
             onPress={() =>
              handleCancelBooking(
                bookingData?.findBookingsByStatusAndCoacheeID[0]?.id || 0
                )
            }/>
          </View>

          
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: { elevation: 3 },
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
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 16,
  },



  title: {
    top: '5%',
    alignItems: 'center'
  }, 

  headerText: {
    fontSize: 30,
    fontFamily: 'Inter-Semibold',
    color: '#6352A6'
  },

  secondHeaderText: {
    marginBottom: '1.5%',
    fontFamily: 'Cairo-Regular',
    color: '#636363',
    fontSize: 20

  },
  secondHeaderTextEnd: {
    marginBottom: '1.5%',
    right:"100%",
    fontFamily: 'Cairo-Regular',
    color: '#636363',
    fontSize: 20

  },

  content: {
    alignItems: "flex-start", 
    left: '13%',
    top: "8%"
  },

  rowContent: {
    top: '1%',
    flexDirection: 'row',
    marginBottom: '5%',
    justifyContent: 'space-between'
  },

  contentText:{
    left: '5%',
    marginBottom: '5%',
    fontFamily: 'Cairo-Regular',
    color: '#636363'
  },

  contentTextStart:{
    top: "8%",
    left:"-190%",
    marginBottom:"5%",
    fontFamily: 'Cairo-Regular',
    color: '#636363'
  },
  contentTextEnd:{
    top: "8%",
    left:"-260%",
    marginBottom:"5%",
    fontFamily: 'Cairo-Regular',
    color: '#636363'
  },




  

  button: {
    top: '10%',
    alignItems: 'center'
  },
  cancelButton: {
    top: '10%',
    paddingBottom: '30%'

  },

 
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#915bc7', // Change the font color to light green
  },
  errorText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'red', // Change the font color to red
  },
  modalButton: {
    backgroundColor: '#A378F2', // Change the background color to purple
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    
  },



});

export default ConfirmBookingDrawer;