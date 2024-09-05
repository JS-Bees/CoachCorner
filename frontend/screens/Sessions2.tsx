import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { SearchBar } from '@rneui/themed';
import CoacheeSessions from '../components/Profile Tiles/CoacheeSessionsTiles';
import Icon from 'react-native-vector-icons/Ionicons'
import { FindBookingsOfCoachDocument } from '../generated-gql/graphql';
import { FindCoachByIdDocument } from '../generated-gql/graphql';
import { useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, KeyboardAvoidingView, TouchableOpacity,} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from './Authentication/SplashScreen';




const { width, height } = Dimensions.get('window');

interface CoachSessionsProps {
    sessions: CoachSessionsProps[];
    onSessionPress?: (session: CoachSessionsProps) => void;
}




const Booking_Sessions: React.FC<CoachSessionsProps> = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState(''); 
    const [activeButton, setActiveButton] = useState('Upcoming'); 
    const [userToken, setUserToken] = useState(null); // State to store the user token
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [bookings, setBookings] = useState([]);

 

    useEffect(() => {
        const fetchToken = async () => setUserToken(await AsyncStorage.getItem('userToken'));
        fetchToken();
    }, []);

    const { data: coachData } = useQuery({
        query: FindCoachByIdDocument,
        variables: { userId: parseInt(userToken, 10) }
    });

    const { data, error, fetching, refetch } = useQuery({
        query: FindBookingsOfCoachDocument,
        variables: { userId: parseInt(userToken, 10) || 0 },
        requestPolicy: 'network-only'
    });


    useEffect(() => {
        if (data) setBookings(data.findCoachByID.bookings);
    }, [data]);

    useEffect(() => {
        const interval = setInterval(refetch, 1000);
        return () => clearInterval(interval);
    }, []);

    if (error) return <Text>Error: {error.message}</Text>;
    if (fetching) return <SplashScreen navigation={navigation} />;
    

    const filterBookings = (status) => bookings.filter(b => b.status === status);
    const sessionsToShow = {
        'Upcoming': filterBookings('UPCOMING'),
        'Pending': filterBookings('PENDING'),
        'Completed': filterBookings('COMPLETED')
    }[activeButton];

    const filteredSessions = sessionsToShow?.filter(b => 
        `${b.coachee.firstName} ${b.coachee.lastName}`.toLowerCase().includes(searchText.toLowerCase())
    );

    
    useEffect(() => {
        if (data) {
        setBookings(data.findCoachByID.bookings);}
    }, [data]);

    useEffect(() => {
        const intervalId = setInterval(() => {
          refetch(); // Manually trigger the query
        }, pollingInterval);
      
        return () => clearInterval(intervalId);
    }, []);

    
    
    if (error) return <Text>Error: {error.message}</Text>;
    if (fetching) return <SplashScreen navigation={navigation} />;
    
    const filterBookings = (status) => bookings.filter(b => b.status === status);
    const sessionsToShow = {
        'Upcoming': filterBookings('UPCOMING'),
        'Pending': filterBookings('PENDING'),
        'Completed': filterBookings('COMPLETED')
    }[activeButton];

    const filteredSessions = sessionsToShow?.filter(b => 
        `${b.coachee.firstName} ${b.coachee.lastName}`.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("NewCoachProfile")}>
                    <Image source={{ uri: coachData?.findCoachByID.profilePicture }} style={styles.profileImage} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "android" ? 'height' : 'padding'}>
                <SearchBar
                    placeholder='Search for trainee'
                    onChangeText={setSearchText}
                    value={searchText}
                    platform='android'
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInputContainer}
                />
                <View style={styles.buttonRow}>
                    {['Upcoming', 'Completed', 'Pending'].map(btn => (
                        <TouchableOpacity
                            key={btn}
                            style={[styles.button, activeButton === btn && styles.activeButton]}
                            onPress={() => setActiveButton(btn)}>
                            <Text style={styles.buttonText}>{btn}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <ScrollView style={{ marginTop: "1%", height: 250 }}>
                    {filteredSessions.length ? (
                        <CoacheeSessions sessions={filteredSessions.map(b => ({
                            coacheeName: `${b.coachee.firstName} ${b.coachee.lastName}`,
                            coacheeId: b.coacheeId,
                            bookingId: b.id,
                            serviceType: b.serviceType,
                            additionalNotes: b.additionalNotes,
                            status: b.status,
                            imageSource: { uri: b.coachee.profilePicture },
                            slotsId: b.bookingSlots[0]?.id,
                            time: b.bookingSlots.map(s => ({ startTime: s.startTime, endTime: s.endTime })),
                            date: b.bookingSlots.map(s => s.date)
                        }))} />
                    ) : <Text style={styles.noTraineeText}>No trainee found.</Text>}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    iconContainer: { marginTop: "-10%", marginLeft: '9%', flexDirection: 'row' },
    profileImage: { width: 40, height: 40, marginLeft: '83%', marginTop: '-10%', borderRadius: 30 },
    searchBarContainer: { width: 300, height: 40 },
    searchBarInputContainer: { height: '100%' },
    buttonRow: { flexDirection: "row", marginTop: '5%' },
    button: { width: 100, height: 49, marginLeft: '6%', backgroundColor: '#e1d1fa', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    buttonText: { color: 'white', fontSize: 15, lineHeight: 24 },
    activeButton: { backgroundColor: '#7E3FF0' },
    noTraineeText: { color: 'grey', fontSize: 18, textAlign: 'center', marginTop: '25%' }
});

export default Booking_Sessions;