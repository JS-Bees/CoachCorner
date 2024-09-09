import React, { useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { View, StyleSheet, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

interface SlideInProps {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const SlideInComponent: React.FC<SlideInProps> = ({ isVisible, children, onClose }) => {
  const translateX = useRef(new Animated.Value(width)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateX]);

  const handleBack = () => {
    Animated.timing(translateX, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > width / 2) {
          Animated.timing(translateX, {
            toValue: width,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX }],
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="chevron-back-circle-outline" size={25} color='#7E3FF0' />
        </TouchableOpacity>
      </View>
      <View>
        {children}
      </View>
    </Animated.View>
  );
};



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: "1%",
    bottom: -370,
    width: width, 
    backgroundColor: 'white',
    zIndexL: 100
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: "7%",
    padding: 10,
  },

});

export default SlideInComponent;
