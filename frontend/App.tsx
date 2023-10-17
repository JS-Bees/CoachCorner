import React from 'react';
import LogInPage from './screens/Authentication/LogIn';
import SignUpA from './screens/Authentication/SignUpA';
import SignUpCoachee from './screens/Authentication/SignUpForCoachee';
import SignUpCoach from './screens/Authentication/SignUpForCoach';
import CoachProfile from './screens/Profile/CoachProfile';
import CoacheeProfile from './screens/Profile/CoacheeProfile';
import CoacheeDashboard from './screens/CoacheeDashboard';
import CoachDashboard from './screens/CoachDashboard';
import CoachBookingDrawer from './screens/BookingDrawers.tsx/CoachBooking';
import ClientBookingDrawer from './screens/BookingDrawers.tsx/ClientBooking';
import CoachAppointments from './screens/Appointments/CoachAppointments';
import ClientAppointments from './screens/Appointments/ClientAppointmens';
import MyClients from './screens/MyClients';
import MyCoaches from './screens/MyCoaches';
import SearchList from './screens/SearchList/SearchList';
import { enGB, registerTranslation } from 'react-native-paper-dates';
registerTranslation('en-GB', enGB);
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

const apiUrl = process.env.EXPO_PUBLIC_API_ENDPOINT;

const client = new Client({
    url: apiUrl!,
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
    SearchList: any;
    CoachBookingDrawer: any;
    ClientBookingDrawer: any;
    ConfirmBookingDrawer: any;
    CoachAppointments: any;
    ClientAppointments: any;
};

const RootStack = createNativeStackNavigator();

export default function App() {
    return (
        <UrqlProvider value={client}>
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="LogIn">
                    <RootStack.Screen
                        name="LogIn"
                        component={LogInPage}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="SignUpA"
                        component={SignUpA}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="SignUpCoachee"
                        component={SignUpCoachee}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="SignUpCoach"
                        component={SignUpCoach}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="CoacheeDashboard"
                        component={CoacheeDashboard}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="CoachDashboard"
                        component={CoachDashboard}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="CoacheeProfile"
                        component={CoacheeProfile}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="CoachProfile"
                        component={CoachProfile}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="CoachAppointments"
                        component={CoachAppointments}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="ClientAppointments"
                        component={ClientAppointments}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="MyClients"
                        component={MyClients}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="MyCoaches"
                        component={MyCoaches}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="SearchList"
                        component={SearchList}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="CoachBookingDrawer"
                        component={CoachBookingDrawer}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="ClientBookingDrawer"
                        component={ClientBookingDrawer}
                        options={{ headerShown: false }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </UrqlProvider>
    );
}
