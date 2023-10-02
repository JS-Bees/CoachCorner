import React, { useRef } from 'react';
import { Animated, Dimensions, PanResponder, Platform, StyleSheet, View } from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.8;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.3;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const BookingDrawer = ({ onClose }: {onClose: () => void}) => {

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
            (gesture.dy <= DRAG_THRESHOLD) 
              
          } else {
            // Dragging up
             (gesture.dy >= -DRAG_THRESHOLD) 
             
          }
        }
      },
    }),
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
        <View style={styles.dragHandle} />
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
    backgroundColor: 'white',
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
});

export default BookingDrawer;
