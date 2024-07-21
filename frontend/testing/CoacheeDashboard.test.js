import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    Alert,
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RootStackParams } from '../App';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useQuery } from 'urql';
import CoachProfiles from '../components/Profile Tiles/CoachProfileTile';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import { FindCoacheeByIdDocument, GetSortedCoachesDocument } from '../generated-gql/graphql';
import { RadioButton } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const DEFAULT_PROFILE_PICTURE = require('../assets/default_User.png');

const CoacheeDashboard = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [fontsloaded] = useFonts({
        'Blinker-SemiBold': require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light': require('./../assets/fonts/Blinker-Light.ttf'),
    });

    const [userToken, setUserToken] = useState<string | null>(null);
    const [seeAllCoaches, setSeeAllCoaches] = useState(false);
    const [selectedSport, setSelectedSport] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    'Exit App',
                    'Are you sure you want to exit the app?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Exit', onPress: () => BackHandler.exitApp() },
                    ],
                    { cancelable: true }
                );
                return true;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => backHandler.remove();
        }, [])
    );

    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setUserToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchUserToken();
    }, []);

    const { data: coacheeData, loading: coacheeLoading, error: coacheeError } = useQuery({
        query: FindCoacheeByIdDocument,
        variables: { userId: parseInt(userToken || '0') },
    });

    const { data: coachData, loading: coachLoading, error: coachError } = useQuery({
        query: GetSortedCoachesDocument,
    });

    if (!fontsloaded) {
        return null;
    }

    const sports = [
        { label: 'Basketball', value: 'Basketball' },
        { label: 'Soccer', value: 'Soccer' },
        { label: 'Tennis', value: 'Tennis' },
        { label: 'Swimming', value: 'Swimming' },
        { label: 'Volleyball', value: 'Volleyball' },
    ];

    const handleSeeAllPress = () => {
        setSeeAllCoaches(!seeAllCoaches);
        if (!seeAllCoaches) {
            navigation.navigate('MyCoaches_alt');
        }
    };

    const handleIconPress = () => {
        scrollViewRef.current?.scrollTo({ x: width, animated: true });
    };

    const handleSportSelection = (sport: string) => {
        setSelectedSport(sport);
        navigation.navigate('AllCoachesPage', { selectedSport: sport });
    };

    const coacheeInterests = coacheeData?.findCoacheeByID?.interests || [];
    const coaches = coachData?.coaches || [];

    const genreTypes = ['MovieGenre', 'BookGenre', 'MusicGenre'];

    const findMatchingInterestsCount = (coacheeInterests, coachInterests) => {
        return genreTypes.reduce((count, genreType) => {
            const coacheeInterest = coacheeInterests.find(interest => interest.type === genreType);
            const coachInterest = coachInterests.find(interest => interest.type === genreType);
            return count + (coacheeInterest && coachInterest && coacheeInterest.name === coachInterest.name ? 1 : 0);
        }, 0);
    };

    const matchedCoaches = coaches.map(coach => {
        if (!coach) {
            return null;
        }
        const matchingInterestCount = findMatchingInterestsCount(coacheeInterests, coach.interests);
        return { coach, matchingInterestCount };
    }).filter(coach => coach !== null).sort((a, b) => b.matchingInterestCount - a.matchingInterestCount);

    const topCoachesByStarRating = (coaches) => {
        if (!coaches || coaches.length === 0) {
            return [];
        }
        const coachesWithTotalStarRatings = coaches.map((coach) => {
            const totalStarRating = coach.reviews.reduce((acc, review) => acc + (review.starRating ?? 0), 0);
            return { ...coach, totalStarRating };
        });

        return coachesWithTotalStarRatings.sort((a, b) => b.totalStarRating - a.totalStarRating).slice(0, 2);
    };

    const topCoaches = topCoachesByStarRating(coachData?.coaches);

    const displayTopCoaches = topCoaches.map((coach) => ({
        id: coach.id,
        name: `${coach.firstName} ${coach.lastName}`,
        imageSource: !coach.profilePicture || !coach.profilePicture.startsWith('https://res')
            ? DEFAULT_PROFILE_PICTURE
            : { uri: coach.profilePicture },
        gainedStars: coach.totalStarRating,
        mainSport: coach.sports?.[0]?.type ?? 'Unknown',
        about: coach.bio,
        workplaceAddress: coach.address,
    }));

    const RecommendedCoaches = matchedCoaches.slice(0, 2).map((match) => ({
        id: match.coach.id,
        name: `${match.coach.firstName} ${match.coach.lastName}`,
        imageSource: match.coach.profilePicture === 'profile picture'
            ? DEFAULT_PROFILE_PICTURE
            : { uri: match.coach.profilePicture },
        gainedStars: match.coach.reviews.reduce((acc, review) => acc + review.starRating, 0),
        mainSport: match.coach.sports?.[0]?.type ?? 'Unknown',
        about: match.coach.bio,
        workplaceAddress: match.coach.address,
    }));

    return (
        <View style={CoacheeDashboardStyle.container}>
            <View style={CoacheeDashboardStyle.nameAndGreetingsContainer}>
                <Text style={CoacheeDashboardStyle.greetings}>Welcome </Text>
                <Text style={CoacheeDashboardStyle.name}>{coacheeData?.findCoacheeByID?.firstName}!</Text>
            </View>
            <View style={CoacheeDashboardStyle.imageContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('NewCoacheeProfile')}>
                    <Image
                        source={{ uri: coacheeData?.findCoacheeByID.profilePicture }}
                        style={CoacheeDashboardStyle.profileImage}
                    />
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                style={CoacheeDashboardStyle.container}
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            >
                <ScrollView
                    contentInsetAdjustmentBehavior="scrollableAxes"
                    style={{ marginTop: '10%', height: 360 }}
                >
                    <View style={CoacheeDashboardStyle.frameContainer}>
                        <Text style={CoacheeDashboardStyle.frameText}>
                            Find the right coach for you!
