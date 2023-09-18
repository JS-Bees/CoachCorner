import React from "react"
import {View, StyleSheet,TextInput, TextInputProps} from 'react-native'

interface CustomInputProps extends TextInputProps {
    value: string
    setValue: (value: string) => void
    placeholder: string
}


const CustomInput: React.FC<CustomInputProps> = ({value, setValue, placeholder, secureTextEntry,}) => {
    return (
        <View style = {styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
                        style={styles.input}
            secureTextEntry={secureTextEntry}
            placeholderTextColor='#a19e9e'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: "white",
        borderRadius: 154,
        width: 300,
        shadowColor:"rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        shadowRadius:6,
        elevation: 6,
        shadowOpacity: 500,
        borderColor: '#e8e8e8',
    },

    input: {
        marginLeft: 40,
        textAlignVertical: "center",
        color: '#a19e9e',
    }
})

export default CustomInput;