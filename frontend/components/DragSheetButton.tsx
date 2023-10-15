import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const DragSheetButton = ({ onPress, text, type = 'PRIMARY' }) => {
    
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, styles[`container_${type}`]]}
        >
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        height: 40,
        borderRadius: 100,
        width: 200,
    },

    container_PRIMARY: {
        backgroundColor: '#6441a4',
    },

    container_TERTIARY: {},
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Roboto',
    },

    text_TERTIARY: {
        fontFamily: 'Roboto',
        color: '#915bc7',
        fontWeight: '900'
    },

    text_SECONDARY: {
        color: '#a19e9e',
    },

    text_QUARTERNARY: {
        color: 'white',
    },
});

export default DragSheetButton;
