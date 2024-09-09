
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageRequireSource, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { RouteProp } from '@react-navigation/native'; // Import RouteProp

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from "../../../App"

interface SlideItem {
    key: string;
    title: string;
    text: string;
    image: ImageRequireSource;
    backgroundColor: string;

}

interface IntroInterestsProps {
    route: RouteProp<RootStackParams, keyof RootStackParams>; // Type the route prop
    navigation: StackNavigationProp<RootStackParams, keyof RootStackParams>;
}


const slides = [
    {
      key: 'somethun',
      title: 'Great Job!',
      text: 'Now we move on to getting your preferred interests to match you with fellow users!',
      image: require('../../../assets/connect-.png'),
      backgroundColor: '#7E3FF0',
    },
];
  

const IntroInterests: React.FC<IntroInterestsProps> = ({ navigation, route }) => {
  const [showRealApp, setShowRealApp] = useState(false);
  const userType = route.params?.userType;


  const _renderItem = ({ item, index }: { item: SlideItem; index: number }) => {
    // Change text color for the middle slide
    const textColor = index === 1 ? '#7E3FF0' : 'white'; // Middle slide index is 1
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={[styles.text, { color: textColor }]}>{item.text}</Text>
      </View>
    );
  };
  
  const _onDone = () => {
    setShowRealApp(true);
  };

  useEffect(() => {
    if (showRealApp) {
      if (userType === 'coach') {
        navigation.replace('SportsPicking');
      } else {
        navigation.replace('InterestPickingHobby');
      }
    }
  }, [showRealApp, navigation, userType]);

  const _renderDoneButton = () => (
    <TouchableOpacity onPress={_onDone}>
        <Text style={styles.bottomButtonText}>Get Started</Text>
    </TouchableOpacity>
    );



    return (
        <AppIntroSlider
            renderItem={_renderItem}
            data={slides}
            renderDoneButton={_renderDoneButton}
            bottomButton={false} // Disable default bottom button
        />
    );
  
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 320,
    height: 320,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
    bottomButtonText: {
    marginTop: "10%",
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
},
});

export default IntroInterests;
