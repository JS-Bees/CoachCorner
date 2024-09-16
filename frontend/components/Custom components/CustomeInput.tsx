import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TextInputProps, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    validate?: boolean;
    validateEmail?: (email: string) => boolean;
    clearError: () => void;
    iconSource1?: any; 
    iconSource2?: any;
}

const CustomInput: React.FC<CustomInputProps> = ({ value, setValue, placeholder, secureTextEntry, validate, validateEmail, clearError, iconSource1, iconSource2 }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleValidation = (text: string) => {
        if (validate && validateEmail && placeholder.toLowerCase() === 'email') {
            const isEmailValid = validateEmail(text);
            setIsValid(isEmailValid);
        }
    };

    return (
        <View style={styles.container}>
            {iconSource1 && (
                <Image source={iconSource1} style={styles.icon1} />
            )}
             {iconSource2 && (
                <Image source={iconSource2} style={styles.icon2} />
            )}

            <TextInput
                value={value}
                onChangeText={(text) => {
                    setValue(text);
                    clearError();
                    handleValidation(text);
                }}
                placeholder={placeholder}
                style={[styles.input, !isValid && styles.invalidInput]}
                secureTextEntry={!showPassword && secureTextEntry}
                placeholderTextColor="#a19e9e"
            />

            {secureTextEntry && (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
                    <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#a19e9e" />
                </TouchableOpacity>
            )}

            {!isValid && <Text style={styles.validationMessage}>Invalid {placeholder}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 154,
        width: 300,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: -10,
        shadowRadius: 6,
        elevation: 6,
        shadowOpacity: 5,
        borderColor: '#e8e8e8',
        flexDirection: 'row', 
    },

    icon1: {
        position: 'absolute',
        left: '5%',
        top: 5,
        width: 32,
        height: 32,
        marginVertical: 'auto',
    },

    icon2: {
        position: 'absolute',
        left: '7%',
        top: 5,
        width: 23,
        height: 23,
        marginVertical: 'auto',
    },

    input: {
        marginLeft: 40,
        textAlignVertical: 'center',
        color: '#a19e9e',
    },

    invalidInput: {
        borderColor: 'red',
    },

    toggleButton: {
        position: 'absolute',
        right: 10,
        padding: 10,
    },

    validationMessage: {
        color: 'red',
        fontSize: 12,
        marginLeft: 10,
    },
});

export default CustomInput;
