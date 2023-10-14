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
        top: '3%'
    },

    container_PRIMARY: {
        backgroundColor: '#6441a4',
        width: 300,
    },

    container_TERTIARY: {

    },

    container_QUARTERNARY: {

        marginTop: '20%',
        left: "13%",
        width: "75%",
        backgroundColor: '#6441a4', 
        bottom: "1%"
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
    },

    text_QUARTERNARY: {
        color: 'white'
    },

    


})

export default LogInButton