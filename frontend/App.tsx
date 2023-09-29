import React from 'react';
import LogInPage from './screens/Authentication/LogIn';
import SignUpA from './screens/Authentication/SignUpA';
import SignUpCoachee from './screens/Authentication/SignUpForCoachee';
import SignUpCoach from './screens/Authentication/SignUpForCoach';
import CoacheeDashboard from './screens/CoacheeDashboard';
import CoachDashboard from './screens/CoachDashboard';
import CoachBookingDrawer from './screens/BookingDrawers.tsx/CoachBooking';
import Appointments from './screens/Appointments';
import MyClients from './screens/MyClients';
import MyCoaches from './screens/MyCoaches';
import { NavigationContainer } from '@react-navigation/native';
import CoacheeProfile  from './screens/Profiles/CoacheeProfile';
import CoachProfile from './screens/Profiles/CoachProfile';
import SearchList from './screens/SearchList/SearchList';
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
    url: 'http://192.168.1.4:5050/graphql', // replace with actual IP address, change to .env file
    exchanges: [cacheExchange, fetchExchange],
});

export type RootStackParams = {
    LogIn: any;
    SignUpA: any;
    SignUpCoachee: any;
    SignUpCoach: any;
    CoacheeDashboard: any;
    CoachDashboard: any;
    Appointments: any;
    CoacheeProfile: any;
    CoachProfile: any;
    MyClients: any;
    MyCoaches: any;
};

const RootStack = createNativeStackNavigator();

export default function App() {
    <><RootStack.Navigator initialRouteName="ResultsList" />
    <RootStack.Screen name="ResultsList" component={SearchList} /></> 
    return (
        <UrqlProvider value={client}>
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="CoachBookingDrawer" >
                    <RootStack.Screen 
                        name="LogIn" 
                        component={LogInPage} 
                        options={{headerShown: false}}/>
                    <RootStack.Screen 
                        name="SignUpA" 
                        component={SignUpA} 
                        options={{headerShown: false}}/>
                    <RootStack.Screen
                        name="SignUpCoachee"
                        component={SignUpCoachee}
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen
                        name="SignUpCoach"
                        component={SignUpCoach}
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen
                        name="CoacheeDashboard"
                        component={CoacheeDashboard}
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen
                        name="CoachDashboard"
                        component={CoachDashboard}
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen
                        name="CoacheeProfile"
                        component={CoacheeProfile}
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen
                        name="CoachProfile"
                        component={CoachProfile}
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen
                        name="Appointments"
                        component={Appointments}
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen 
                        name="MyClients" 
                        component={MyClients}   
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen 
                        name="MyCoaches" 
                        component={MyCoaches} 
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen 
                        name="CoachBookingDrawer" 
                        component={CoachBookingDrawer} 
                        options={{headerShown: false}}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </UrqlProvider>
    );
}