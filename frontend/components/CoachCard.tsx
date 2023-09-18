import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react';

interface Props {
    name: String;
    onPress: (name: String) => void
}

const CoachCard: React.FC<Props> =({name, onPress}) => {
    return (
        <TouchableOpacity onPress={() => onPress(name)}>
        <View style={styles.container}>
            <Text>{name}</Text>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#efefef'
    },
});
export default CoachCard