/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet} from 'react-native';
import React from 'react';
import UserDashboard from './screens/UserDashboard';
import UserProfile from './screens/UserProfile'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';//For buttom nav bar just change "RootStack to = createNativeStackNavigator();"



export type RootStackParams = {
  UserDashboard: any; 
  UserProfile: any;
  Coach: {
    name: string;
  }
}
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="MainScreen">
      <RootStack.Screen name="UserDashboard" component={UserDashboard} />
      <RootStack.Screen name="UserProfile" component={UserProfile} />
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
