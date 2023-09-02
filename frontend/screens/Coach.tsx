import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react';
import { RootStackParams } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CoachCard from "../components/CoachCard";

type Props = NativeStackScreenProps<RootStackParams, "Coach">
   

const CoachScreen = ({route, navigation}: Props) => {
    return (
   <View style={styles.container}>
    <Text style={styles.screenTitle}>{route.params.name}</Text>
    <Text>Related Coaches</Text>
    <CoachCard name="Jack" onPress={()=>{
        navigation.navigate("Coach",{name:"Jack"})
    }}/>
   </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#efefef'
    },
    screenTitle: {
        fontSize: 24,
        marginTop: 8,
        fontWeight: 'bold'
    },
});
export default CoachScreen