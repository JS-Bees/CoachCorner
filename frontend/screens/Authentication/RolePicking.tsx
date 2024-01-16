import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import SVGComponent from "../../components/SVGs/UpperSVG";
import BottomComponent from "../../components/SVGs/BottomSvg";
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParams } from "../../App";
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Octicons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');

const RolePicking = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    return (
        <View style={Rolepickingstyle.container}>
            <SVGComponent style={Rolepickingstyle.svgContainer} />
            <BottomComponent style={Rolepickingstyle.bottomSVG} />

            <View style={Rolepickingstyle.iconContainer}>
                <Image
                    source={require('../Authentication/Icons/CoachIcon.png')}
                    style={Rolepickingstyle.CoachIcon}
                />
                <Text style={Rolepickingstyle.textStyle}>
                    What is your role in sports?
                </Text>
            </View>
            <View>
                
                <View style = {Rolepickingstyle.icons}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('SignUpCoach')}
                        style={Rolepickingstyle.iconButton}>
                      <MaterialIcons name='sports' size={60} color={"#6441A4"}/>
                      <Text style={Rolepickingstyle.textStyle}> Coach </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('SignUpCoachee')}
                        style={Rolepickingstyle.iconButton}>
                      <MaterialIcons name='sports-handball' size={60} color={"#6441A4"}/>
                      <Text style={Rolepickingstyle.textStyle}> Trainee </Text>
                    </TouchableOpacity>
                </View>

             
            </View>
        </View>
    );
};

const Rolepickingstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        alignItems: 'center',
        zIndex: 0,
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
   
  

    icons: {
        paddingTop: '15%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    iconButton: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '7%'
    },
    
   
});

export default RolePicking;
