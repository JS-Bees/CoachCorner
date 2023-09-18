import { View, Text, TouchableOpacity } from "react-native";
import React from 'react';
import { Button } from 'react-native-paper';

const ProfileScreen = () => {
    return (
        <View>
            <Text>Profile Screen</Text>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
            </Button>
            <Text>John Doe</Text>
            <TouchableOpacity><Text>Edit Profile</Text></TouchableOpacity>
        </View>
    )
}
export default ProfileScreen