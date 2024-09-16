import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../App';

type IntroSplashProps = {
  navigation: StackNavigationProp<RootStackParams, keyof RootStackParams>;
};

const IntroSplash: React.FC<IntroSplashProps> = ({ navigation }) => {
  const [loadingProgress] = useState(new Animated.Value(0));
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
  
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); 
      setIsInitialized(true);
    };

    initializeApp();


    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingProgress, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(loadingProgress, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();


    const splashTimeout = setTimeout(() => {
      if (isInitialized) {
        navigation.replace("LogIn");
      }
    }, 4000);

    return () => {
      clearTimeout(splashTimeout);
      loadingProgress.setValue(0); 
    };
  }, [navigation, loadingProgress, isInitialized]);

  return (
    <View style={SplashStyle.container}>
      <Text style={SplashStyle.text}>Get Started with Coach Corner!</Text>
      <Image
        source={require('./Icons/transparent.png')}
        style={[SplashStyle.logo, { tintColor: 'white' }]}
      />
      <Animated.View
        style={[
          SplashStyle.loader,
          {
            left: loadingProgress.interpolate({
              inputRange: [0, 1],
              outputRange: ['10%', '65%'], 
            }),
          },
        ]}
      />
    </View>
  );
};

const SplashStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#7E3FF0',
  },
  logo: {
    marginLeft: "35%",
    marginTop: "-30%",
    height: 120,
    width: 120,
    resizeMode: "contain",
  },
  loader: {
    bottom: "12%",
    marginLeft: "2%",
    position: 'absolute',
    height: 5,
    width: '20%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  text: {
    fontSize: 20,
    color: "white",
    marginLeft: "15%",
    top: "35%",
  },
});

export default IntroSplash;
