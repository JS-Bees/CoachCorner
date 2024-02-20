import React, { useState} from 'react';
import { CheckBox, Text,} from 'react-native-elements';
import { View } from 'react-native'


interface CustomCheckBoxProps {
  label: string;
  checkedColor: string;
  onPress: () => void;
  checked?: boolean;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ label, checkedColor, onPress }) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
    onPress();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: "15%"}}>
      <CheckBox 
        checked={checked}
        onPress={toggleCheckbox}
        checkedColor={checkedColor}
      />
      <Text>{label}</Text>
    </View>
  );
};

export default CustomCheckBox;