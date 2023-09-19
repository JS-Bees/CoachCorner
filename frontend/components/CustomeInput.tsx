import React, { useState }from "react"
import {View, StyleSheet,TextInput, TextInputProps,TouchableOpacity} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
    value: string
    setValue: (value: string) => void
    placeholder: string
    secureTextEntry?: boolean;
}


const CustomInput: React.FC<CustomInputProps> = ({value, setValue, placeholder, secureTextEntry,}) => {
    
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    
    return (
        <View style = {styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
                        style={styles.input}
            secureTextEntry={!showPassword && secureTextEntry}
            placeholderTextColor='#a19e9e'/>

            {secureTextEntry && (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
                <FontAwesome
                 name={showPassword ? 'eye' : 'eye-slash'}
                 size={20}
                 color='#a19e9e'
                />
                </TouchableOpacity>
      )}

            






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
        shadowOpacity: 5,
        borderColor: '#e8e8e8',
    },

    input: {
        marginLeft: 40,
        textAlignVertical: "center",
        color: '#a19e9e',
    },

    toggleButton: {
        position:"absolute",
        right: 10,
        padding: 10,
    }
})

export default CustomInput;