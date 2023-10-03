import React, { useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, Platform, ScrollView, Text, StyleSheet, View, SafeAreaView } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import LogInButton from '../CustomButton';
import { TextInput, Portal, Modal, Button } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";

const WINDOW_HEIGHT = Dimensions.get('window').height;

const { width } = Dimensions.get('window');

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.85;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.3;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const BookingDrawer = ({ onClose }: { onClose: () => void }) => {
  const onSubmitPressed = () => {};
   
  const [selectedDates, setSelectedDates] = useState([]);
  const [open, setOpen] = useState(false);

  const onDismiss = () => {
    setOpen(false);
  };

  const onConfirm = (params) => {
    setOpen(false);
    setSelectedDates(params.dates);
  };
  

  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (lastGestureDy.current >= MAX_DOWNWARD_TRANSLATE_Y) {
          // The gesture has moved down to the lowest screen point
          onClose(); // Close the booking drawer
        } else {
          if (gesture.dy > 0) {
            // Dragging down
            gesture.dy <= DRAG_THRESHOLD;
          } else {
            // Dragging up
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

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      { /* Overlay */}
      <Animated.View style={[styles.overlay, overlayAnimation]} />

      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.dragHandle} {...panResponder.panHandlers} />


        <View style={styles.title}>
          <Text style ={styles.headerText}> Book </Text>
          <Text style ={styles.headerText}> Appointment </Text>
        </View>

       <ScrollView
       keyboardDismissMode='on-drag'
       contentInsetAdjustmentBehavior = 'always'>
       <View style = {styles.content}>
          <Text style={styles.contentText}> Coach Name</Text>
          <TextInput style = {styles.input}
          underlineColor = "transparent"
          maxLength={30}/>

          <Text style={styles.contentText}>Client Name</Text>
          <TextInput style={styles.input}
          underlineColor = "transparent"
          maxLength={30}/>

          <View style = {styles.rowContent}>
          <Text style={styles.contentText}> Date</Text>
          <Text style={styles.contentTime}> Time</Text>
          </View>

        

          <View style = {styles.rowContent}>
          <SafeAreaProvider>
           <View>
              <TextInput style = {styles.dateInput}
              underlineColor = "transparent"
              label = 'Select Date'
              editable={false}/>
           </View>
          </SafeAreaProvider>       

          

          <TextInput style = {styles.timeInput}
          underlineColor = "transparent"
          maxLength={10}/>
          </View>

          <Text style={styles.contentText}> Service Type</Text>
          <TextInput style = {styles.input}
          underlineColor = "transparent"
          maxLength={40}/>

          <Text style={styles.contentText}> Additional Notes</Text>
          <ScrollView style={styles.additionalInputContainer}>
              <TextInput
                style={styles.additionalInput}
                underlineColor="transparent"
                maxLength={200}
                multiline
              />
            </ScrollView>   
        </View>
        <LogInButton text={'Submit'} onPress={onSubmitPressed}
            type='QUARTERNARY' />
       </ScrollView>
     
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

  content: {
    alignItems: "flex-start", 
    left: '13%',
    top: "9%"
  },

  rowContent: {
    flexDirection: 'row',
  },

  contentText:{
    fontFamily: 'Cairo_Regular',
    color: '#636363'
  },

  contentTime:{
    fontFamily: 'Cairo_Regular',
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
  }



});

export default BookingDrawer;
