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
        height: 40,
        top: '3%'
    },

    container_PRIMARY: {
        marginTop: '5%',
        backgroundColor: '#7E3FF0',
        width: 300,
        borderRadius: 15,
        alignItems: 'center',
    },
    container_SECONDARY:{
        marginTop: '-10%',
        alignItems: 'flex-end',
        marginLeft: '60%'

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

    container_CANCEL: {
        paddingVertical: 5,
    },

    container_CONFIRM: {
        height: 50,
       
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

    text_CONFIRM: {
        color: '#6441A4',
        fontSize: 20
    },

    text_CANCEL: {
        color:  '#D22E2E',
        fontSize: 15
    },


    


})

export default LogInButton