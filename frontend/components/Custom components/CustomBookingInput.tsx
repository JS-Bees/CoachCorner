import React, {useState} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface CustomInputProps {
    style?: object; 
    textAlignVertical?: 'top' | 'center' | 'bottom'
    multiline?: boolean;
    value?: string;
    editable?: boolean;
    onChangeText: (text: string) => void;
    maxLength: number
}

const CustomInput: React.FC<CustomInputProps> = ({style, textAlignVertical, multiline, value, editable, onChangeText}) => {
  

  const [isFocused, setIsFocused] = useState(false)
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style, isFocused ? styles.focusedInput : null]}
        multiline={multiline || false}
        textAlignVertical={textAlignVertical}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        maxLength={editable ? 40 : undefined}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 45,
    width: "90%",
    borderWidth: 1,
    borderColor: '#D4C5ED',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  focusedInput: {
    borderColor: '#7E3FF0', 
  },
  
});

export default CustomInput;
