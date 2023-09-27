import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import SVGComponent from '../../components/BackgroundSVG2';
import BottomComponent from '../../components/BottomSvg';
import LogInButton from '../../components/CustomButton';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const { width, height } = Dimensions.get('window');

const SignUpA = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    return (
        <View style={signUpA.container}>
            <SVGComponent style={signUpA.svgContainer} />
            <BottomComponent style={signUpA.bottomSVG} />

            <View style={signUpA.iconContainer}>
                <Image
                    source={require('../Authentication/Icons/CoachIcon.png')}
                    style={signUpA.CoachIcon}
                />
                <Text style={signUpA.textStyle}>
                    What is your role in sports?
                </Text>
            </View>

            <View style={signUpA.button}>
                <LogInButton
                    text="I want to coach"
                    onPress={() => navigation.navigate('SignUpCoach')}
                />
            </View>

            <View style={signUpA.noMargin}>
                <LogInButton
                    text="I want to train"
                    onPress={() => navigation.navigate('SignUpCoachee')}
                />
            </View>
        </View>
    );
};

const signUpA = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        alignItems: 'center',
        zIndex: 0,
    },
    customContainer: {
        alignItems: 'center',
        padding: 20,
    },
    button: {
        marginTop: height * 0.1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMargin: {
        marginTop: 25,
        marginBottom: 400,
    },
    CoachIcon: {
        width: width * 0.2,
        height: height * 0.1,
        padding: 20,
        resizeMode: 'contain',
        maxWidth: 500,
        maxHeight: 500,
    },
    iconContainer: {
        marginTop: 130,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 24,
        fontWeight: '900',
        fontFamily: 'Roboto',
        color: '#915bc7',
        textAlign: 'left',
    },
    svgContainer: {
        justifyContent: 'flex-start', // Align to the top
        alignItems: 'center',
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 0,
    },
    bottomSVG: {
        justifyContent: 'flex-end',
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 0,
    },
    optionContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    optionImage: {
        width: 100, // Adjust the image size as needed
        height: 100, // Adjust the image size as needed
        resizeMode: 'cover',
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#915bc7',
        fontWeight: 'bold',
    },
});

export default SignUpA;
