import React from 'react';
import LogInPage from './screens/Authentication/LogIn';
import RolePicking from './screens/Authentication/RolePicking';
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
import MyCoaches_alt from './screens/MyCoaches_alt';
import SplashScreen from './screens/Authentication/SplashScreen';
import ChatPage from './screens/Chat';
import SearchList from './screens/SearchList/SearchList';
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

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
    // url: 'http://192.168.1.4:5050/graphql',
    url: apiUrl!,
    exchanges: [cacheExchange, fetchExchange],
});

export type RootStackParams = {
    LogIn: any;
    LogIn_alt: any;
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
    ClientAppointments: any, 
    MyCoaches_alt: any,
    BookingPage: any,
    ChatPage: any,
    SplashScreen: any
};

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <UrqlProvider value={client}>
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="RolePicking">
                <RootStack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="LogIn"
                        component={LogInPage}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="RolePicking"
                        component={RolePicking}
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
                        component={TabNavigator}
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
                        options={{headerShown: false}}
                    />
                     <RootStack.Screen 
                        name="ClientBookingDrawer" 
                        component={ClientBookingDrawer} 
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen 
                        name="MyCoaches_alt" 
                        component={MyCoaches_alt} 
                        options={{headerShown: false}}
                        />
                    <RootStack.Screen 
                        name="ChatPage" 
                        component={ChatPage} 
                        options={{headerShown: false}}
                        />
                </RootStack.Navigator>
            </NavigationContainer>
        </UrqlProvider>
    );
}
function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Coaches') {
              iconName = 'sports';
            } else if (route.name === 'Sessions') {
              iconName = 'schedule';
            } else if (route.name === 'Chats') {
              iconName = 'chat';
            }
  
            // You can return any component here for the icon
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#7E3FF0', // Color for the active tab
          inactiveTintColor: '#CEC2DA', // Color for the inactive tabs
        }}
      >
        <Tab.Screen name="Home" component={CoacheeDashboard} options={{ headerShown: false }} />
        <Tab.Screen name="Coaches" component={MyCoaches_alt} options={{ headerShown: false }} />
        <Tab.Screen name="Sessions" component={CoachAppointments} options={{ headerShown: false }} />
        <Tab.Screen name="Chats" component={ChatPage} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }