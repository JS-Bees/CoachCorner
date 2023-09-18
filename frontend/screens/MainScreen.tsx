import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Menu from "../components/Menu";
import React from 'react';
import { IconButton } from 'react-native-paper';

const MainScreen = () => {
    return (
        <View>
          <Text style={MainScreenStyle.screenTitle}>Coaches</Text>
            <Text style={MainScreenStyle.sectionTitle}>Coaches Near You</Text>
            <Text>Zedan fahaito</Text>
            <IconButton icon="rocket" size={30}/>
            <Text style={MainScreenStyle.sectionTitle}>Most Popular Coaches</Text>
            <Text>Patin Blight</Text>
            <Menu />
        </View>
    )
}
const MainScreenStyle = StyleSheet.create({
  container: {
  padding: 16,
  marginTop: 24,
  },
  sectionTitle: {
  fontSize: 16,
  marginTop: 16,
  },
  screenTitle: {
  fontSize: 24,
  marginTop: 8,
  fontWeight: 'bold',
  },
});

export default MainScreen;