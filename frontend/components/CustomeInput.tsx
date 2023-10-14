import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TextInputProps, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    validate?: boolean;
    validateEmail?: (email: string) => boolean;
    clearError: () => void; // Add clearError prop to clear error
}

const CustomInput: React.FC<CustomInputProps> = ({ value, setValue, placeholder, secureTextEntry, validate, validateEmail, clearError }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to handle validation and update isValid state
    const handleValidation = (text: string) => {
        if (validate && validateEmail && placeholder.toLowerCase() === 'email') {
            const isEmailValid = validateEmail(text);
            setIsValid(isEmailValid);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={(text) => {
                    setValue(text);
                    clearError(); // Clear the error when the user types
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
    },

    input: {
        marginLeft: 40,
        textAlignVertical: 'center',
        color: '#a19e9e',
    },

    invalidInput: {
        borderColor: 'red', // Add a red border for invalid input
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
