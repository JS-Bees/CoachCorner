import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface ServiceTypePickerProps {
  setServiceType: React.Dispatch<React.SetStateAction<string | null>>;
}

const ServiceTypePicker: React.FC<ServiceTypePickerProps> = ({ setServiceType }) => {
  const [serviceType, setLocalServiceType] = useState<string | null>(null);

  const handleServiceTypeChange = (value: string | null) => {
    console.log('Selected value:', value); 
    setLocalServiceType(value);
    setServiceType(value); 
  };

  console.log('Current serviceType:', serviceType); 

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 5, paddingTop: 5 }}>
        <Picker
          selectedValue={serviceType}
          onValueChange={handleServiceTypeChange}
          style={{ height: 50, width: '90%' }}
        >
          <Picker.Item label="Choose a service type..." value={null} />
          <Picker.Item label="One-to-one" value="one-to-one" />
          <Picker.Item label="Group" value="group" />
        </Picker>
      </View>
    </View>
  );
};

export default ServiceTypePicker;
