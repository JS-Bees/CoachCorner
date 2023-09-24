/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import CoacheeDashboard from '././screens/CoacheeDashboard';
import LogInPage from './screens/Authentication/LogIn';
import SignUP from './screens/Authentication/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import CoacheeProfile  from './screens/Profiles/CoacheeProfile';
import CoachProfile from './screens/Profiles/CoachProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';//For buttom nav bar just change "RootStack to = createNativeStackNavigator();"


// for urql
import {
    Client,
    Provider as UrqlProvider,
    cacheExchange,
    fetchExchange,
} from 'urql';


const client = new Client({
    // url: 'http://localhost:5050/graphql',
    url: 'http://192.168.254.142:5050/graphql', // replace with actual IP address, change to .env file
    exchanges: [cacheExchange, fetchExchange],
});

export type RootStackParams = {
  LogIn: any;
  SignUpA: any;
  SignUpCoachee: any;
  SignUpCoach: any;
  CoacheeDashboard: any; 
  UserProfile: any;
  CoachDashboard: any;
  Appointments: any;
  MyClients: any;
  MyCoaches: any;
  CoachSample: any;
}


const RootStack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="CoachProfile">
      <RootStack.Screen name="UserDashboard" component={UserDashboard} />
      <RootStack.Screen name="LogIn" component={LogInPage} />
      <RootStack.Screen name="CoacheeProfile" component={CoacheeProfile} />
      <RootStack.Screen name="CoachProfile" component={CoachProfile} />
      <RootStack.Screen name="SignUp" component={SignUP} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}






