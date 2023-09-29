import React, { useRef, useState } from 'react';
import { Animated, PanResponder, Platform, StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import SVGComponent from '../UpperSVG';
import DragSheetButton from '../DragSheetButton';

const WINDOW_HEIGHT = Dimensions.get('window').height;


const { width, height } = Dimensions.get('window');

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.9;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.5;

const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = height * 0.05;

interface DraggableBottomSheetProps {

  onClose: () => void; // Define the onClose prop
}

const DraggableBottomSheet: React.FC<DraggableBottomSheetProps> = ({ onClose }) => {
  const onAddPressed = () => {
    console.log('Added to Coach')
  }

  const onSeePressed = () => {
    console.log('Pressed')
  }
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
 
  

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
      useNativeDriver: false,
    }).start(() => {
      // Detect if the bottom sheet is fully open or closed
      setIsBottomSheetOpen(lastGestureDy.current === MAX_DOWNWARD_TRANSLATE_Y);
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
          <Text style={styles.textCoach}> Coach Name</Text>
          <Text style={styles.textSport}> Main Sport </Text>
    
        </View>
        <View style={styles.button}>
            <DragSheetButton text={'Add to My Coaches'} onPress={onAddPressed}/>
          </View>
      </View>

      <ScrollView style={styles.scrollViewContainer}>
      <Text style={styles.textSport}> Bio </Text>
      <TextInput style={styles.textInput}
        underlineColor='transparent'
        editable={false}/>

      <Text style={styles.textSport}> Workplace Address </Text>
      <TextInput style={styles.textInput}
        underlineColor='transparent'
        editable={false}/>
      <Text style={styles.textSport}> Affiliates </Text>
      <TextInput style={styles.textInput}
        underlineColor='transparent'
        editable={false}/>

      </ScrollView>

     <View style = {styles.Reviews}>
     <DragSheetButton text={"See My Reviews"} type='TERTIARY' onPress={onSeePressed}/>
     </View>
     
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    marginRight: 'auto',
    
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
    backgroundColor: '#F9FBFC',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    height: height * 0.05,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    width: width * 0.2,
    height: 6,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
 
  imageContainer: {
    top: -height * 0.25,
    paddingVertical: 20,
    left: 30,
  },

  row: {
    top: -height * 0.10,
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
    left: width * 0.04,
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '600',
    color: '#757575',

  },

  button: {
    top: -height * 0.09,
   paddingHorizontal: 110,
  },

  scrollViewContainer: {
    top: -250,
    width: 325,
    left: 30,
    marginBottom: -200
  },
  Reviews : {
    paddingBottom: 30,
    left: 90

  },

  textInput: {
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
  }


});

export default DraggableBottomSheet;
