import React from 'react'
import {Pressable, Text, StyleSheet } from 'react-native'

const LogInButton = ({onPress, text, type = "PRIMARY"}) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create( {
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        height: 40,
        borderRadius: 100,
        width: 300,
    },

    container_PRIMARY: {
        backgroundColor: '#6441a4',
    },

    container_TERTIARY: {

    },

 
    text: {
        fontWeight: "bold",
        color: 'white',
        fontFamily: 'Roboto'
    },

    text_TERTIARY: {
        color: 'grey'
    },

    text_SECONDARY: {
        color: '#a19e9e'
    }


})

export default LogInButton