import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Animated, Text} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../App';


type IntroSplash = {
  navigation: StackNavigationProp<RootStackParams, keyof RootStackParams>;
};



const IntroSplash: React.FC<IntroSplash> = ({ navigation }) => {
    const [loadingProgress,] = useState(new Animated.Value(0))

    useEffect(() => {
        // Animate the loading bar from center outwards
        Animated.timing(loadingProgress, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }).start();
    
        // Simulate a delay or perform any necessary asynchronous tasks
        const splashTimeout = setTimeout(() => {
          navigation.replace("LogIn");
        }, 4000); // Adjust the delay as needed
    
        // Cleanup the timeout and animation when the component unmounts
        return () => {
          clearTimeout(splashTimeout);
          loadingProgress.setValue(0); // Reset the loading progress value
        };
    }, [navigation, loadingProgress]);

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
                width: loadingProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '75%'], // Expand from 0% to 80%
                }),
                left: loadingProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['50%', '10%'], // Center to spread out
                }),
              },
            ]}
          />
        </View>
    );
}

const SplashStyle =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#7E3FF0'
    },
    logo: {
        marginLeft: "35%",
        marginTop: "-30%",
        height: 120,
        width: 120,
        resizeMode: "contain"
    },
    loader: {
        top: "35%",
        marginLeft: '2.7%',
        height: 5, 
        backgroundColor: 'white', // Color of the loading bar
        borderRadius: 2,
    },
    text: {
        fontSize: 20,
        color: "white",
        marginLeft: "15%",
        top: "35%",
        
    }
})

export default IntroSplash;