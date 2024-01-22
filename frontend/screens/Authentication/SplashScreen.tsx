import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Animated } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../App';


type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParams, 'SplashScreen'>;
};



const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    const [loadingProgress, setLoadingProgress] = useState(new Animated.Value(0))

    useEffect(() => {
        // Simulate a delay or perform any necessary asynchronous tasks
        const splashTimeout = setTimeout(() => {
          // Navigate to the main screen or perform other actions
            navigation.replace('LogIn');

        }, 3000); 

        Animated.timing(loadingProgress, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
        }).start();
    
        // Cleanup the timeout when the component unmounts
        return () => clearTimeout(splashTimeout);
        loadingProgress.setValue(0);
    }, [navigation, loadingProgress]);

    return (
        <View style = {SplashStyle.container}>
            <Image source={require('./Icons/transparent.png')}
            style={[SplashStyle.logo, { tintColor: 'white' }]}/>

            <Animated.View
                style={[
                    SplashStyle.loader,
                    {
                      width: loadingProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '20%'],
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
        backgroundColor: '#7E3FF0'
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
        backgroundColor: 'white', // Color of the loading bar
        borderRadius: 2
    },
})

export default SplashScreen;