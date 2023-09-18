/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import UserDashboard from './screens/UserDashboard';
import UserProfile from './screens/UserProfile'
import CoachDashboard from './screens/CoachDashboard';
import Appointments from './screens/Appointments';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';//For buttom nav bar just change "RootStack to = createNativeStackNavigator();"


export type RootStackParams = {
  UserDashboard: any; 
  UserProfile: any;
  CoachDashboard: any;
  Appointments: any;
}


const RootStack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="CoachDashboard">
      <RootStack.Screen name="UserDashboard" component={UserDashboard} />
      <RootStack.Screen name="CoachDashboard" component={CoachDashboard} />
      <RootStack.Screen name="UserProfile" component={UserProfile} />
      <RootStack.Screen name="Appointments" component={Appointments} />
      </RootStack.Navigator>
    </NavigationContainer>

    
  );
}

