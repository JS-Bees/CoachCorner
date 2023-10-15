import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TextInputProps, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface InputSignUpPagesProps extends TextInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  passwordToMatch?: string;
  checkForInteger?: boolean;
  checkEmailEnding?: boolean;
  editable?: boolean; // Add the editable prop
}

const InputSignUpPages: React.FC<InputSignUpPagesProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  passwordToMatch,
  checkForInteger, 
  checkEmailEnding,
  editable, // Add the editable prop
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (passwordToMatch !== undefined && value !== passwordToMatch) {
      setErrorText('Passwords do not match');
    } else if (checkForInteger && /\d/.test(value)) {
      setErrorText('Input cannot contain numbers');
    } else if (checkEmailEnding && value.trim() !== '') {
      if (!value.match(/.{5,}@gmail.com$/)) {
        setErrorText('Invalid email, should end with "@gmail.com"');
      } else if (
        !value.endsWith('.com') &&
        !value.endsWith('.co.uk') &&
        !value.endsWith('.edu')
      ) {
        setErrorText('Invalid email ending');
      } else {
        setErrorText('');
      }
    } else {
      setErrorText('');
    }
  }, [value, passwordToMatch, checkForInteger, checkEmailEnding]);
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          errorText ? styles.errorInputContainer : null,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={!showPassword && secureTextEntry}
          placeholderTextColor="#a19e9e"
          style={[
            styles.input,
            errorText ? styles.errorInput : null,
          ]}
          editable={editable}
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
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
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
    borderColor: 'red',
  },
  input: {
    flex: 1,
    marginLeft: 5,
    textAlignVertical: "center",
    color: '#a19e9e',
    paddingRight: 30,
  },
  errorContainer: {
    marginTop: 5, // Adjust this margin as needed
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default InputSignUpPages;
