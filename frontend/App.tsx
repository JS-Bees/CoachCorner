/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import UserDashboard from './screens/UserDashboard';
import LogInPage from './screens/Authentication/LogIn';
import SignUp from './screens/Authentication/SignUp';
import UserProfile from './screens/UserProfile'
import CoachDashboard from './screens/CoachDashboard';
import Appointments from './screens/Appointments';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';//For buttom nav bar just change "RootStack to = createNativeStackNavigator();"


// for urql
import {
    Client,
    Provider as UrqlProvider,
    cacheExchange,
    fetchExchange,
} from 'urql';


const client = new Client({
    // url: 'http://localhost:5050/graphql',
    url: 'http://192.168.1.3:5050/graphql', // replace with actual IP address, change to .env file
    exchanges: [cacheExchange, fetchExchange],
});

export type RootStackParams = {
  LogIn: any;
  SignUp: any;
  UserDashboard: any; 
  UserProfile: any;
  CoachDashboard: any;
  Appointments: any;
}


const RootStack = createNativeStackNavigator();

export default function App() {


  return (
     <UrqlProvider value={client}>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="LogIn">
          <RootStack.Screen name="LogIn" component={LogInPage} />
          <RootStack.Screen name="SignUp" component={SignUp} />
          <RootStack.Screen name="UserDashboard" component={UserDashboard} />
          <RootStack.Screen name="CoachDashboard" component={CoachDashboard} />
          <RootStack.Screen name="UserProfile" component={UserProfile} />
          <RootStack.Screen name="Appointments" component={Appointments} />
          </RootStack.Navigator>
        </NavigationContainer>
      </UrqlProvider>    
  );

}






