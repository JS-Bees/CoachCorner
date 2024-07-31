import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Animated } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../App';


type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParams, keyof RootStackParams>;
};



const LoadingSplash: React.FC<SplashScreenProps> = ({ navigation }) => {
    const [loadingProgress, setLoadingProgress] = useState(new Animated.Value(0))

    useEffect(() => {
        // Simulate a delay or perform any necessary asynchronous tasks
        const splashTimeout = setTimeout(() => {
          // Navigate to the main screen or perform other actions

        }, 2000); 

        Animated.timing(loadingProgress, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    
        // Cleanup the timeout when the component unmounts
        return () => {
            clearTimeout(splashTimeout);
            loadingProgress.setValue(0); // Reset the loading progress value
        };
    }, [navigation, loadingProgress]);

    return (
        <View style = {SplashStyle.container}>
            <Image source={require('./Icons/transparent.png')}
            style={[SplashStyle.logo, { tintColor: '#7E3FF0' }]}/>

            <Animated.View
                style={[
                    SplashStyle.loader,
                    {
                      width: loadingProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '10%'],
                      }),
                    },
                  ]}
            />

        </View>
        
    )
}

const SplashStyle =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logo: {
        marginLeft: "35%",
        marginTop: "-50%",
        height: 120,
        width: 120,
        resizeMode: "contain"
    },
    loader: {
        marginLeft: '40%',
        height: 5, 
        backgroundColor: '#7E3FF0', // Color of the loading bar
        borderRadius: 2
    },
})

export default LoadingSplash;