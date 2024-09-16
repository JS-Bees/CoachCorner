import React from 'react';
import { CheckBox, Text } from 'react-native-elements';
import { View } from 'react-native';

interface CustomCheckBoxProps {
  label: string;
  checkedColor: string;
  onPress: () => void;
  checked: boolean; 
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ label, checkedColor, onPress, checked }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '15%' }}>
      <CheckBox 
        checked={checked}
        onPress={onPress}
        checkedColor={checkedColor}
      />
      <Text>{label}</Text>
    </View>
  );
};

export default CustomCheckBox;
