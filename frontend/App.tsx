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
import NewCoacheeProfile from './screens/Profile/NewCoacheeProfile';
import NewCoachDashboard from './screens/NewCoachDashboard';
import MyClients from './screens/MyClients';
import MyCoaches from './screens/MyCoaches';
import MyCoaches_alt from './screens/MyCoaches_alt';
import MyClients_alt from './screens/MyClients_alt';
import Booking_Sessions from './screens/Sessions';
import SplashScreen from './screens/Authentication/SplashScreen';
import ChatPage from './screens/Chat';
import SearchList from './screens/SearchList/SearchList';
import ChooseVideoGames from './screens/Authentication/InterestPickingScreens/VideoGames';
import ChooseHobbies from './screens/Authentication/InterestPickingScreens/Hobbies';
import ChooseMovies from './screens/Authentication/InterestPickingScreens/MovieGenre';
import PreviewPage from './screens/PreviewPage';
import CoacheePreviewPage from './screens/CoacheePreviewPage';
import ReviewsPage from './screens/ReviewsPage';
import NewCoachProfile from './screens/Profile/NewCoachProfile';
import NotificationPage from './screens/NotificationPage';
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
    url: 'http://192.168.1.4:5050/graphql',
    // url: apiUrl!,
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
    NewCoacheeProfile: any;
    MyClients: any;
    MyCoaches: any;
    SearchList: any;
    CoachBookingDrawer: any;
    ClientBookingDrawer: any;
    ConfirmBookingDrawer: any;
    CoachAppointments: any;
    ClientAppointments: any, 
    NewCoachDashboard: any, 
    NewCoachProfile: any,
    MyCoaches_alt: any,
    BookingPage: any,
    ChatPage: any,
    ChooseVideoGames: any,
    ChooseHobbies: any,
    ChooseMovies: any,
    SplashScreen: any,
    PreviewPage: any,
    ReviewsPage: any,
    BookingSessions: any,
    NotificationPage: any,
    CoacheePreviewPage: any, 
    
};

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CoachTab =  createBottomTabNavigator();

export default function App() {
    return (
        <UrqlProvider value={client}>
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="NewCoachDashboard">
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
                        name="NewCoachDashboard"
                        component={NewCoachTabNavigator}
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
                        name="NewCoachProfile"
                        component={NewCoachProfile}
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
                        name="NewCoacheeProfile"
                        component={NewCoacheeProfile}
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
                        name="MyClients_alt"
                        component={MyClients_alt}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen 
                        name="ChatPage" 
                        component={ChatPage} 
                        options={{headerShown: false}}
                        />
                    <RootStack.Screen 
                        name="InterestPickingGames" 
                        component={ChooseVideoGames} 
                        options={{headerShown: false}}
                        />
                    <RootStack.Screen 
                        name="InterestPickingHobby" 
                        component={ChooseHobbies} 
                        options={{headerShown: false}}
                        />
                    <RootStack.Screen 
                        name="InterestPickingMovie" 
                        component={ChooseMovies} 
                        options={{headerShown: false}}
                        />
                    <RootStack.Screen 
                        name="PreviewPage" 
                        component={PreviewPage} 
                        options={{headerShown: false}}
                        />
                    <RootStack.Screen 
                        name="CoacheePreviewPage" 
                        component={CoacheePreviewPage} 
                        options={{headerShown: false}}
                        />
                    <RootStack.Screen 
                        name="ReviewsPage" 
                        component={ReviewsPage} 
                        options={{headerShown: false}}
                        />
                    <RootStack.Screen 
                        name="NotificationPage" 
                        component={NotificationPage} 
                        options={{headerShown: false}}
                        />
                </RootStack.Navigator>
            </NavigationContainer>
        </UrqlProvider>
    );
}

function TabNavigator() {
    const getTabBarIcon = (routeName: string) => {
      switch (routeName) {
        case 'Home':
          return 'home';
        case 'Coaches':
          return 'sports';
        case 'Sessions':
          return 'schedule';
        case 'Chats':
          return 'chat';
        default:
          return null;
      }
    };

 
  

    
  
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = getTabBarIcon(route.name);
            return iconName ? <MaterialIcons name={iconName} size={size} color={color} /> : null;
          },
          tabBarActiveTintColor: '#7E3FF0', // Color for the active tab
          tabBarInactiveTintColor: '#CEC2DA', // Color for the inactive tabs
        })}
      >
        <Tab.Screen name="Home" component={CoacheeDashboard} options={{ headerShown: false }} />
        <Tab.Screen name="Coaches" component={MyCoaches_alt} options={{ headerShown: false }} />
        <Tab.Screen name="Sessions" component={Booking_Sessions} options={{ headerShown: false }} />
        <Tab.Screen name="Chats" component={ChatPage} options={{ headerShown: false }} />
      </Tab.Navigator>
    );

}

function NewCoachTabNavigator() {

    const coachTabBarIcon= (routeName: string) => {
        switch (routeName) {
          case 'Home':
            return 'home';
          case 'Trainees':
            return 'sports';
          case 'Sessions':
            return 'schedule';
          case 'Chats':
            return 'chat';
          default:
            return null;
        }
    };

    return (
      <CoachTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = coachTabBarIcon(route.name);
            return iconName ? <MaterialIcons name={iconName} size={size} color={color} /> : null;
          },
          tabBarActiveTintColor: '#7E3FF0', // Color for the active tab
          tabBarInactiveTintColor: '#CEC2DA', // Color for the inactive tabs
        })}
      >
        <CoachTab.Screen name="Home" component={NewCoachDashboard} options={{ headerShown: false }} />
        <CoachTab.Screen name="Trainees" component={MyClients_alt} options={{ headerShown: false }} />
        <CoachTab.Screen name="Sessions" component={ClientAppointments} options={{ headerShown: false }} />
        <CoachTab.Screen name="Chats" component={ChatPage} options={{ headerShown: false }} />
      </CoachTab.Navigator>
    );
  }