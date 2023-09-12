import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/Profile'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';//For buttom nav bar just change "RootStack to = createNativeStackNavigator();"


export type RootStackParams = {
  MainScreen: any; 
  Sports: any
  Profile: any;
  Coach: {
    name: String;
  }
}
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="MainScreen">
      <RootStack.Screen name="MainScreen" component={MainScreen} />
      {/* <RootStack.Screen name="Coach" component={CoachScreen} /> */}
      <RootStack.Screen name="Profile" component={ProfileScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
