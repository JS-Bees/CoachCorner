import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Menu from "../components/Menu";
import React from 'react';
import { IconButton } from 'react-native-paper';
import SvgComponent from "../components/BackgroundSvg";

const MainScreen = () => {
    return (
        <View style={MainScreenStyle.container}>

            {/* Container for SvgComponent */}
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
        padding: 0,
        marginTop: 0,
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
    svgContainer: {
        alignItems: 'center', // Center the content horizontally
        marginTop: 240 // Adjust the margin-top as needed
    },
});

export default MainScreen;
