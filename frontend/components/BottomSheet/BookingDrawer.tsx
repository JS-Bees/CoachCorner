
import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet,
  Platform,
  Easing,
} from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LogInButton from '../Custom components/CustomButton';
import { Button, TextInput} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItemProps } from '../ListItem';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'urql';
import {
  FindCoachByIdDocument,
  FindCoacheeByIdDocument,
  CreateBookingDocument,
} from '../../generated-gql/graphql';
import { RootStackParams } from '../../App';
import { useNavigation, useRoute } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native';
import  dayjs from "dayjs"

const WINDOW_HEIGHT = Dimensions.get('window').height;
const { width } = Dimensions.get('window');

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.9;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.3;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

interface BookingDrawerProps {
  onClose: () => void;
  coacheeData: ListItemProps['data'];
  coacheeId: string; 
  coachId: string
}

const BookingDrawer: React.FC<BookingDrawerProps> = ({ coacheeId, coachId, onClose }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute();
  
  const [userToken, setUserToken] = useState<string | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isSelectingStartTime, setIsSelectingStartTime] = useState(true);
  const [isSelectingEndTime, setIsSelectingEndTime] = useState(true);
  const [selectedClient, setSelectedClient] = useState(route.params?.coachee || null)
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = React.useState(false)
  const [serviceType, setServiceType] = useState<string>('');
  const [addNotes, setAddNotes] = useState<string>('');
  const [, createBookingForCoach] = useMutation(CreateBookingDocument);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleErrorModal = () => {
    setErrorModalVisible(!errorModalVisible);
  };


  const onSubmitPressed = async () => {
    setIsLoading(true);
    try {
      if (
        !coachData?.findCoachByID.id ||
        !coacheeData?.findCoacheeByID.id ||
        !coacheeId || 
        !date|| 
        !serviceType.trim() ||
        !addNotes.trim() 
      ) {
        setErrorMessage('Please fill in all the required fields.');
        setErrorModalVisible(true);
    
        return;
      }

   
      

      const variables = {
        input: {
          coachId: coachData?.findCoachByID?.id || 0,
          coacheeId: coacheeId,
          serviceType: serviceType || '',
          additionalNotes: addNotes || '',
          status: 'PENDING',
        },
        slotsInput: [
          {
            date: date || new Date(),
            endTime: selectedEndTime?.toISOString(), 
            startTime: selectedStartTime?.toISOString(), 
          },
        
        ],
      };

      const { data: createBookingData, error, fetching } = await createBookingForCoach(variables);

      if (error) {
        console.error('Error:', error);
      } else {
        if (createBookingData?.createBooking?.id) {
          const bookingId = createBookingData.createBooking.id;
          console.log('Booking Sent Successfully. Booking ID:', bookingId);
          setSuccessMessage('Booking Sent Successfully');
          toggleModal();
          setDate(null); 
          setServiceType('');
          setAddNotes('');
          setSelectedStartTime(null); 
          setSelectedEndTime(null); 
        } else {
          console.error('Booking creation failed. Data:', createBookingData);
        }
      }

    } catch (error) {
      console.error('Error Submitting Booking:');
    } finally {
      setIsLoading(false) ;
    }
  };

  const onDismissSingle = React.useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onConfirmSingle = React.useCallback((params) => {
    setOpen(false);
    
    if (params.date < currentDate) {
      setErrorModalVisible(true);
      setErrorMessage('Please select date that is not before current date.');
    } else {
      setDate(params.date);
    }
  }, [setOpen, setDate, currentDate]);
 


  const showTimePicker = (selectingStartTime: boolean) => {
    setIsSelectingStartTime(selectingStartTime);
    setTimePickerVisibility(true);
  };

  const showTimePickerEndTime = (selectingEndTime : boolean) => {
    setIsSelectingEndTime(selectingEndTime);
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time: Date | null) => {
    if (isSelectingStartTime) {
      setSelectedStartTime(time);
    } else {
      if (time && selectedStartTime && time <= selectedStartTime) {
        setErrorModalVisible(true);
        setErrorMessage('End time must be later than start time.');
        setSelectedEndTime(null); 
      } else {
        console.log('Selected End Time:', formatTimeWithoutSeconds(time))
        setSelectedEndTime(time);
      }
    }
    hideTimePicker();
  };

  const handleTextInputPress = (selectingStartTime: boolean) => {

    showTimePicker(selectingStartTime);
    console.log(selectedEndTime)

  };

  const formatTimeWithoutSeconds = (time: Date | null) => {
    return time ? dayjs(time).format('h:mm A'): '';
  };

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

  const [{ data: coachData, fetching, error }] = useQuery({
    query: FindCoachByIdDocument,
    variables: {
      userID: parseInt(userToken, 10),
    },
    requestPolicy: 'cache-and-network',
  });

  const [{ data: coacheeData }] = useQuery({
    query: FindCoacheeByIdDocument,
    variables: {
      userID: parseInt(userToken, 10),
    },
    requestPolicy: 'cache-and-network',
  });

  useEffect(() => {
    setSelectedClient(route.params?.coachee || null)
  }, [route.params])


  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        if (e.nativeEvent.locationX < DRAG_THRESHOLD) {
          return false;
        }
        return true;
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
          easing: Easing.bezier(0.1, 0, 0, 0.1),
        }),
      },
    ],
    zIndex: 0
    
  };
  

  const overlayAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
      outputRange: [0.5, 0.1], 
      extrapolate: 'clamp',
    }),
    zIndex: -1
  };

  
  const [fontsLoaded] = useFonts({
    'Cairo-Regular': require('./Fonts/Cairo-Regular.ttf'),
    'Inter-Semibold': require('./Fonts/Inter-SemiBold.otf')
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers} >
      <Animated.View style={[styles.overlay, overlayAnimation]} />

      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.dragHandle} {...panResponder.panHandlers} />

        <View style={[styles.title, {marginBottom: '10%'}]}>
          <Text style={styles.headerText}> Book </Text>
          <Text style={styles.headerText}> Appointment </Text>
        </View> 

        

        <KeyboardAwareScrollView enableOnAndroid={true}>
          <ScrollView keyboardDismissMode="on-drag" contentInsetAdjustmentBehavior="always"
         style={{ zIndex: 1 }}>
          <View style={[styles.content, {marginTop: '5%'}]}>
            <Text style={styles.contentText}> Coach Name</Text>
            <TextInput
              style={styles.input}
              underlineColor="transparent"
              maxLength={30}
              editable={false}
              value={`${coachData?.findCoachByID?.firstName} ${coachData?.findCoachByID?.lastName}`}
            />

            <Text style={styles.contentText}>Client Name</Text>
            <TextInput
              style={styles.input}
              underlineColor="transparent"
              maxLength={30}
              editable={false}
              value={`${selectedClient?.firstName} ${selectedClient?.lastName}`}
            />

            <Text style={styles.contentText}> Date</Text>
            <Button onPress={() => setOpen(true)} uppercase={false} style={styles.dateButton}>
              Select Date
            </Button>

            <SafeAreaProvider>
              <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                <DatePickerModal
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date = {date}
                  onConfirm={onConfirmSingle}
                />
                <TextInput
                  underlineColor="white"
                  style={{
                    top: '-50%',
                    alignItems: 'flex',
                    height: 40,
                    backgroundColor: 'white',
                    width: width * 0.74,
                  }}
                  value={date ? date.toLocaleDateString() : ''}
                  editable={false}
                />
              </View>
            </SafeAreaProvider>

            <Text style={styles.contentText}> Time</Text>
            

            <View style={styles.rowContent}>
              <TouchableOpacity onPress={() => handleTextInputPress(true)}>
                <TextInput
                  underlineColor="white"
                  placeholder="Start Time"
                  value={formatTimeWithoutSeconds(selectedStartTime) ?? ''}
                  editable={false}
                  style={{
                    backgroundColor: 'white',
                    width: '129%',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTextInputPress(false)}>
                <TextInput
                  underlineColor="white"
                  placeholder="End Time"
                  value={formatTimeWithoutSeconds(selectedEndTime) ?? ''}
                  editable={false}
                  style={{
                    backgroundColor: 'white',
                    width: '70%',
                    marginLeft: '25%',
                  }}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker} 
                is24Hour={false}
              />
            </View>

            <Text style={styles.contentText}> Service Type</Text>
            <TextInput
              style={styles.input}
              underlineColor="transparent"
              maxLength={40}
              value={serviceType}
              onChangeText={(text) => setServiceType(text)}
            />

            <Text style={styles.contentText}> Additional Notes</Text>   
            <ScrollView style={styles.additionalInputContainer}>
              <TextInput
                style={styles.additionalInput}
                underlineColorAndroid="white"
                underlineColor="white"
                maxLength={200}
                multiline
                value={addNotes}
                onChangeText={(text) => setAddNotes(text)}
              />
            </ScrollView>
          </View>
          <View>
            <LogInButton text={'Submit'} onPress={onSubmitPressed} type="QUINARY" />
          </View>
          {isLoading ? (
      
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null}

          {showModal && (
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <Text style={styles.successText}>{successMessage}</Text>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                    toggleModal();
                    navigation.navigate('MyClients');
                  }}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </Pressable>
              </View>
            </View>
          )}

          {errorModalVisible && (
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <Text style={styles.errorText}>{errorMessage}</Text>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                    toggleErrorModal();
                  }}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </Pressable>
              </View>
            </View>
          )}
          
        </ScrollView>
        </KeyboardAwareScrollView>
      </Animated.View>
    </View>
  );

 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    zIndex: 3
    
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

  content: {
    alignItems: "flex-start", 
    left: '13%',
    top: "9%"
  },

  rowContent: {
    top: '1%',
    flexDirection: 'row',
    marginBottom: '5%',
    justifyContent: 'space-between'
  },

  contentText:{
    fontFamily: 'Cairo-Regular',
    color: '#636363'
  },

  contentTime:{
    fontFamily: 'Cairo-Regular',
    color: '#636363',
    left: width * 0.3
  },

  input: {
    marginBottom: '5%',
    backgroundColor: 'white',
    borderRadius: 5,
    width: '75%',
    paddingHorizontal: "1%"
  },

  dateInput: {
    marginBottom: '5%',
    backgroundColor: 'white',
    borderRadius: 5,
    width: '33%',
    paddingHorizontal: "1%"
  },

  timeInput: {
    marginBottom: '5%',
    marginLeft: '6%',
    backgroundColor: 'white',
    borderRadius: 5,
    width: '36%',
    paddingHorizontal: "1%"
  },

  additionalInput: {
    verticalAlign: "top",
    padding: 10,
    backgroundColor: 'white',
  },

  additionalInputContainer: {
    marginBottom: '5%',
    backgroundColor: 'white',
    borderRadius: 5,
    width: '75%',
    textAlignVertical: 'top',
    padding: 10,
    height: 150
  },

  button: {
    top: '10%'
  },

  dateButton: { 
    left: '10%',
    top: '-4.3%'
  },

  timeButton: { 
    left: '10%',
    top: '-4.3%'
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
    color: '#915bc7', 
},
errorText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'red',
},
modalButton: {
    backgroundColor: '#A378F2', 
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

export default BookingDrawer;

