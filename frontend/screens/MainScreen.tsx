import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Menu from "../components/Menu";
import React from 'react';
import { IconButton } from 'react-native-paper';
import SvgComponent from "../components/BackgroundSvg";

const MainScreen = () => {
    return (
        <View style={MainScreenStyle.container}>
            <View style={MainScreenStyle.svgContainer}>
                <SvgComponent> </SvgComponent>
            </View>
        </View>
        
    )
}

const MainScreenStyle = StyleSheet.create({
    container: {
        flex: 1, // Make the container take up the whole screen
        backgroundColor: 'white', // Set the background color to white
    },  
    svgContainer: {
        position: 'absolute', // Position the SVG container absolutely
        bottom: 0, // Place it at the bottom of the screen
        left: 0, // Align it to the left
        right: 0, // Align it to the right
        alignItems: 'center', // Center the content horizontally
        paddingVertical: 0, //  Add padding for spacing
    },
    sectionTitle: {
        fontSize: 16,
        marginTop: 16,
    },
    screenTitle: {
        fontSize: 24,
        marginTop: 8,
        fontWeight: 'bold',
    },
});
export default MainScreen;
