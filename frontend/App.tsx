/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import CoacheeDashboard from './screens/CoacheeDashboard';
import LogInPage from './screens/Authentication/LogIn';
import SignUpA from './screens/Authentication/SignUpA';
import SignUpCoachee from './screens/Authentication/SignUpForCoachee';
import SignUpCoach from './screens/Authentication/SignUpForCoach';
import UserProfile from './screens/UserProfile';
import CoachDashboard from './screens/CoachDashboard';
import Appointments from './screens/Appointments';
import MyClients from './screens/MyClients';
import MyCoaches from './screens/MyCoaches';
import { NavigationContainer } from '@react-navigation/native';
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
};

const RootStack = createNativeStackNavigator();

export default function App() {
    return (
        <UrqlProvider value={client}>
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="LogIn">
                    <RootStack.Screen name="LogIn" component={LogInPage} />
                    <RootStack.Screen name="SignUpA" component={SignUpA} />
                    <RootStack.Screen
                        name="SignUpCoachee"
                        component={SignUpCoachee}
                    />
                    <RootStack.Screen
                        name="SignUpCoach"
                        component={SignUpCoach}
                    />
                    <RootStack.Screen
                        name="CoacheeDashboard"
                        component={CoacheeDashboard}
                    />
                    <RootStack.Screen
                        name="CoachDashboard"
                        component={CoachDashboard}
                    />
                    <RootStack.Screen
                        name="UserProfile"
                        component={UserProfile}
                    />
                    <RootStack.Screen
                        name="Appointments"
                        component={Appointments}
                    />
                    <RootStack.Screen name="MyClients" component={MyClients} />
                    <RootStack.Screen name="MyCoaches" component={MyCoaches} />
                </RootStack.Navigator>
            </NavigationContainer>
        </UrqlProvider>
    );
}
