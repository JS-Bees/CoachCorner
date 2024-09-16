import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Animated } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../App';


type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParams, keyof RootStackParams>;
};



const LoadingBar: React.FC<SplashScreenProps> = ({ navigation }) => {
    const [loadingProgress, setLoadingProgress] = useState(new Animated.Value(0))

    useEffect(() => {
        
        const splashTimeout = setTimeout(() => {
          

        }, 2000); 

        Animated.timing(loadingProgress, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    
       
        return () => {
            clearTimeout(splashTimeout);
            loadingProgress.setValue(0); 
        };
    }, [navigation, loadingProgress]);

    return (
        <View style = {SplashStyle.container}>

            <Animated.View
                style={[
                    SplashStyle.loader,
                    {
                      width: loadingProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '30%'],
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
        backgroundColor: 'trainsparent'
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
        height: 6, 
        backgroundColor: '#7E3FF0', 
        borderRadius: 2
    },
})

export default LoadingBar;