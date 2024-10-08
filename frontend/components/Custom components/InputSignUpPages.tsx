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
  editable?: boolean;
}

const InputSignUpPages: React.FC<InputSignUpPagesProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  passwordToMatch,
  checkForInteger,
  checkEmailEnding,
  editable = true
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value.trim() !== '') {
      if (passwordToMatch !== undefined && value !== passwordToMatch) {
        setErrorText('Passwords do not match');
      } else if (secureTextEntry && value.length < 5) {
        setErrorText('Password must be at least 5 characters long');
      } else if (secureTextEntry && !/\d/.test(value)) {
        setErrorText('Password must contain at least one number');
      } else if (checkForInteger && /\d/.test(value)) {
        setErrorText('Input cannot contain numbers');
      } else if (checkEmailEnding) {
        if (!value.match(/.{5,}@.+\.(com|co\.uk|edu|ph|gov)$/)) {
          setErrorText('Invalid email, please input a proper email');
        } else {
          setErrorText('');
        }
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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputStyle = {
    height: 40,
    borderColor: isFocused ? '#7E3FF0' : (editable ? '#D4C5ED' : '#D8D5DB'),
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 40,
    paddingRight: 10,
    width: 300,
    flexDirection: 'row',
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
            inputStyle,
            errorText ? styles.errorInput : null,
          ]}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {secureTextEntry && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}>
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
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  focusedInputContainer: {
    borderColor: 'blue',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, 
    top: 5,
  }
});

export default InputSignUpPages;
