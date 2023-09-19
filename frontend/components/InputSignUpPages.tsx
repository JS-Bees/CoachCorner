import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TextInputProps, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface InputSignUpPagesProps extends TextInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  passwordToMatch?: string; // Add this prop to compare with another password field
}

const InputSignUpPages: React.FC<InputSignUpPagesProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  passwordToMatch,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    // Check if the password matches the passwordToMatch when value changes
    if (passwordToMatch !== undefined && value !== passwordToMatch) {
      setErrorText('Passwords do not match');
    } else {
      setErrorText('');
    }
  }, [value, passwordToMatch]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, errorText ? styles.errorInputContainer : null]}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={[
            styles.input,
            errorText ? styles.errorInput : null, // Apply error styles
          ]}
          secureTextEntry={!showPassword && secureTextEntry}
          placeholderTextColor="#a19e9e"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#a19e9e"
            />
          </TouchableOpacity>
        )}
      </View>
      {errorText && (
        <Text style={styles.errorText}>{errorText}</Text> // Display error text above the border
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5, // Add margin to separate error text from input field
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: "white",
    borderRadius: 154,
    width: 300,
    paddingHorizontal: 15,
    borderColor: '#e8e8e8',
  },
  errorInputContainer: {
    borderColor: 'red', // Apply red border when there's an error
  },
  input: {
    flex: 1,
    marginLeft: 5,
    textAlignVertical: "center",
    color: '#a19e9e',
  },
  errorInput: {
    borderColor: 'red', // Apply red border when there's an error
  },
  errorText: {
    color: 'red',
    fontSize: 12, // Smaller font size for error text
    marginTop: 10, // Move error text above the border
    marginBottom: 5, // Add margin to separate error text from input field
  },
});

export default InputSignUpPages;

