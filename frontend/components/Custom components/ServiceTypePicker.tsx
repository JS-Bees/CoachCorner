import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface ServiceTypePickerProps {
  setServiceType: React.Dispatch<React.SetStateAction<string | null>>;
}

const ServiceTypePicker: React.FC<ServiceTypePickerProps> = ({ setServiceType }) => {
  const [serviceType, setLocalServiceType] = useState<string | null>(null);

  const handleServiceTypeChange = (value: string | null) => {
    console.log('Selected value:', value); // For debugging
    setLocalServiceType(value);
    setServiceType(value); // Update the parent component's state
  };

  console.log('Current serviceType:', serviceType); // For debugging

  return (
    <View style={{ flex: 1 }}>
      {/* Other components */}
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
      {/* Other components */}
    </View>
  );
};

export default ServiceTypePicker;
