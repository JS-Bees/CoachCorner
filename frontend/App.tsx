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
import CoachSearchPage from './screens/MyCoaches_alt';
import MyClients_alt from './screens/MyClients_alt';
import Booking_Sessions from './screens/Sessions';
import LoadingSplash from './screens/Authentication/LoadingSplash';
import ChatPage from './screens/Chat';
import SearchList from './screens/SearchList/SearchList';
import ChooseSport from './screens/Authentication/InterestPickingScreens/ChooseSport';
import ChooseVideoGames from './screens/Authentication/InterestPickingScreens/VideoGames';
import ChooseHobbies from './screens/Authentication/InterestPickingScreens/Hobbies';
import ChooseMovies from './screens/Authentication/InterestPickingScreens/MovieGenre';
import PreviewPage from './screens/PreviewPage';
import CoacheePreviewPage from './screens/CoacheePreviewPage';
import ReviewsPage from './screens/ReviewsPage';
import CredentialsPage from './screens/CredentialsPage';
import NewCoachProfile from './screens/Profile/NewCoachProfile';
import NotificationPage from './screens/NotificationPage';
import AllCoaches from './screens/AllCoaches';
import EditInterests from './screens/EditInterestsForCoachee';
import EditInterestsForCoach from './screens/EditInterestForCoach';
import NewBookingPage from './screens/BookingDrawers.tsx/newBookingPage';
import ChatListPage from './screens/ChatLists';
import CoachChatPage from './screens/ChatCoach';
import CoachChatListsPage from './screens/ChatListsCoach';
import Trainee_Sessions from './screens/TraineeSessions';
import MyCoaches_alt from './screens/MyCoaches_alt';
import ReschedulePage from './screens/BookingDrawers.tsx/ReschedulePage';
import ProgressTracker from './screens/ProgressTrackerForCoach';
import ProgressTrackerForCoachee from './screens/ProgressTrackerForCoachee';
import AddTaskPage from './screens/AddTaskForCoachee';
import AddTaskPageForCoach from './screens/AddTaskForCoach';
import PreviewTask from './screens/PreviewTaskForCoach';
import PreviewTaskForCoachee from './screens/PreviewTaskForCoachee';
import ReviewsPageCoach from './screens/ReviewsPageCoach';
import LandingPage from './screens/Authentication/Landing Pages/LandingPage';
import IntroInterests from './screens/Authentication/Landing Pages/IntroInterests';
import { enGB, registerTranslation } from 'react-native-paper-dates';
registerTranslation('en-GB', enGB);
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { CopilotProvider } from 'react-native-copilot';
import IntroSplash from './screens/Authentication/IntroSplash';
import { StatusBar } from 'react-native';
import SeeAll from './screens/seeAll';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';//For buttom nav bar just change "RootStack to = createNativeStackNavigator();"

// for urql
import {
    Client,
    Provider as UrqlProvider,
    cacheExchange,
    fetchExchange,
    // dedupExchange,
    subscriptionExchange,
} from 'urql';

import { createClient as createWSClient, SubscribePayload } from 'graphql-ws';

const apiUrl = process.env.EXPO_PUBLIC_API_ENDPOINT;

const apiUrlWs = process.env.EXPO_PUBLIC_API_ENDPOINT_WS;

const wsClient = createWSClient({
    // url: 'ws://192.168.1.8:5050/graphql',
    url: apiUrlWs!,
});

let token = '';
let clientId = '';
let tokenUpdateIntervalId;

async function updateToken() {
    const newToken = await AsyncStorage.getItem('JwtToken');
    const newUserToken = await AsyncStorage.getItem('userToken');
    token = newToken || '';
    clientId = newUserToken || '';

    if (token && token !== '') {
        clearInterval(tokenUpdateIntervalId);

        tokenUpdateIntervalId = setInterval(async () => {
            await updateToken();
        }, 5000);
    }
}

tokenUpdateIntervalId = setInterval(updateToken, 500);

const client = new Client({
    // url: 'http://192.168.1.8:5050/graphql',
    url: apiUrl!,

    fetchOptions: () => ({
        headers: {
            authorization: token ? `${token}` : '  ',
        },
    }),

    exchanges: [
        cacheExchange,
        fetchExchange,
        subscriptionExchange({
            forwardSubscription(operation) {
                return {
                    subscribe: (sink) => {
                        const dispose = wsClient.subscribe(
                            operation as SubscribePayload,
                            sink,
                        );
                        return {
                            unsubscribe: dispose,
                        };
                    },
                };
            },
        }),
    ],
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
    CoachChatPage: any;
    CoachChatListsPage: any;
    ClientAppointments: any;
    NewCoachDashboard: any;
    NewCoachProfile: any;
    MyCoaches_alt: any;
    BookingPage: any;
    ChatPage: any;
    chooseSport: any;
    ChooseVideoGames: any;
    ChooseHobbies: any;
    ChooseMovies: any;
    SplashScreen: any;
    PreviewPage: any;
    ReviewsPage: any;
    CredentialsPage: any;
    BookingSessions: any;
    NotificationPage: any;
    CoacheePreviewPage: any;
    AllCoaches: any;
    NewBookingPage: any;
    EditInterests: any;
    EditInterestForCoach: any;
    ChatList: any;
    ProgressTracker: any;
    ProgressTrackerForCoachee: any;
    AddTaskPage: any;
    Trainee_Sessions: any;
    ReschedulePage: any;
    AddTaskPageForCoachee: any;
    PreviewTask: any;
    PreviewTaskForCoachee: any;
    ReviewsPageCoach: any;
    IntroSplash: any;
    LandingPage: any;
    IntroInterests: any;
    seeAll: any;
};

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CoachTab = createBottomTabNavigator();

export default function App() {
    <StatusBar hidden={true} />;
    return (
        <UrqlProvider value={client}>
            <NavigationContainer>
                <CopilotProvider stopOnOutsideClick>
                    <RootStack.Navigator initialRouteName="IntroSplash">
                        <RootStack.Screen
                            name="SplashScreen"
                            component={LoadingSplash}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="IntroSplash"
                            component={IntroSplash}
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
                            name="LandingPage"
                            component={LandingPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="IntroInterests"
                            component={IntroInterests}
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
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="ClientBookingDrawer"
                            component={ClientBookingDrawer}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="MyCoaches_alt"
                            component={CoachSearchPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="MyClients_alt"
                            component={MyClients_alt}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="ChatPage"
                            component={ChatPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="ChatList"
                            component={ChatListPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="SportPicking"
                            component={ChooseSport}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="InterestPickingGames"
                            component={ChooseVideoGames}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="InterestPickingHobby"
                            component={ChooseHobbies}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="InterestPickingMovie"
                            component={ChooseMovies}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="AllCoachesPage"
                            component={AllCoaches}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="PreviewPage"
                            component={PreviewPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="CoacheePreviewPage"
                            component={CoacheePreviewPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="ReviewsPage"
                            component={ReviewsPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="CredentialsPage"
                            component={CredentialsPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="NotificationPage"
                            component={NotificationPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="NewBookingPage"
                            component={NewBookingPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="EditProfile"
                            component={EditInterests}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="EditProfileForCoach"
                            component={EditInterestsForCoach}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="AddTaskPage"
                            component={AddTaskPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="ReschedulePage"
                            component={ReschedulePage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="AddTaskPageForCoach"
                            component={AddTaskPageForCoach}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="PreviewTask"
                            component={PreviewTask}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="PreviewTaskForCoachee"
                            component={PreviewTaskForCoachee}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="CoachChatPage"
                            component={CoachChatPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="CoachChatListsPage"
                            component={CoachChatListsPage}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="ReviewsPageCoach"
                            component={ReviewsPageCoach}
                            options={{ headerShown: false }}
                        />
                        <RootStack.Screen
                            name="SeeAll"
                            component={SeeAll}
                            options={{ headerShown: false }}
                        />
                    </RootStack.Navigator>
                </CopilotProvider>
            </NavigationContainer>
        </UrqlProvider>
    );
}

function TabNavigator() {
    const getTabBarIcon = (routeName: string) => {
        switch (routeName) {
            case 'Home':
                return 'home';
            case 'My Coaches':
                return 'sports';
            case 'Appointments':
                return 'schedule';
            case 'Taskboard':
                return 'list';
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
                    return iconName ? (
                        <MaterialIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    ) : null;
                },
                tabBarActiveTintColor: '#7E3FF0', // Color for the active tab
                tabBarInactiveTintColor: '#CEC2DA', // Color for the inactive tabs
            })}
        >
            <Tab.Screen
                name="Home"
                component={CoacheeDashboard}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="My Coaches"
                component={MyCoaches_alt}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Appointments"
                component={Trainee_Sessions}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Taskboard"
                component={ProgressTrackerForCoachee}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Chats"
                component={ChatListPage}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}

function NewCoachTabNavigator() {
    const coachTabBarIcon = (routeName: string) => {
        switch (routeName) {
            case 'Home':
                return 'home';
            case 'Trainees':
                return 'sports';
            case 'Appointments':
                return 'schedule';
            case 'Taskboard':
                return 'list';
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
                    return iconName ? (
                        <MaterialIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    ) : null;
                },
                tabBarActiveTintColor: '#7E3FF0', // Color for the active tab
                tabBarInactiveTintColor: '#CEC2DA', // Color for the inactive tabs
            })}
        >
            <CoachTab.Screen
                name="Home"
                component={NewCoachDashboard}
                options={{ headerShown: false }}
            />
            <CoachTab.Screen
                name="Trainees"
                component={MyClients_alt}
                options={{ headerShown: false }}
            />
            <CoachTab.Screen
                name="Appointments"
                component={Booking_Sessions}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Taskboard"
                component={ProgressTracker}
                options={{ headerShown: false }}
            />
            <CoachTab.Screen
                name="Chats"
                component={CoachChatListsPage}
                options={{ headerShown: false }}
            />
        </CoachTab.Navigator>
    );
}
