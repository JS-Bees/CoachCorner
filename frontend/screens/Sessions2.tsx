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

    
    if (error) {
        return <Text>Error: {error.message}</Text>;
    }
      
   



    if (fetching) return <SplashScreen navigation={navigation} />;
    



    const booking = data?.findCoachByID.bookings;
    if (!booking) return <Text>No bookings found.</Text>;

    const upcomingBookings = booking.filter(booking => booking.status === 'UPCOMING');
    const pendingBookings = booking.filter(booking => booking.status === 'PENDING');
    const completedBookings = booking.filter(booking => booking.status === 'COMPLETED');

        // Modify the sessionsToShow variable to filter based on searchText
        const sessionsToShow = activeButton === 'Upcoming' ? upcomingBookings : activeButton === 'Pending' ? pendingBookings : completedBookings;
        const filteredSessions = sessionsToShow.filter(booking => {
            const coacheeName = `${booking.coachee.firstName} ${booking.coachee.lastName}`;
            return coacheeName.toLowerCase().includes(searchText.toLowerCase());
        });
    
    return (
        <View style={MyCoaches.container}>
            <View style={MyCoaches.nameAndGreetingsContainer}>
        
            </View>
            <View style={MyCoaches.iconContainer}>
            <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
            </TouchableOpacity>
            </View>
            
            <TouchableOpacity
                onPress={navigateToCoachProfile}>
            <Image
                    source={{uri: coachData?.findCoachByID.profilePicture}} // Add your profile image source here
                    style={{width: 40, height: 40, marginLeft:'83%', marginTop: '-10%', borderRadius: 30}}/>
            
            </TouchableOpacity>
            

            <KeyboardAvoidingView
            style={MyCoaches.container}
            behavior={Platform.OS === "android" ? 'height' : 'padding'}>
            <View style={MyCoaches.searchContainer}>
                <SearchBar
                 placeholder='Search for trainee'
                 onChangeText={handleSearchChange}
                 value={searchText}
                 platform='android'
                 containerStyle={MyCoaches.searchBarContainer}
                 inputContainerStyle={MyCoaches.searchBarInputContainer}/>
            </View>

            <View style={MyCoaches.buttonRow}>
            <TouchableOpacity 
            style={[
                MyCoaches.AllCoachesButton,
                activeButton === 'Upcoming' ? MyCoaches.activeButton : null, 
            ]}
                onPress={() => setActiveButton('Upcoming')}>
            <Text style={MyCoaches.buttonText}>Upcoming</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={[
                MyCoaches.AllCoachesButton,
                activeButton === 'Completed' ? MyCoaches.activeButton : null, 
            ]}
                onPress={() => setActiveButton('Completed')}>
            <Text style={MyCoaches.buttonText}>Completed</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={[
                MyCoaches.AllCoachesButton,
                activeButton === 'Pending' ? MyCoaches.activeButton : null, 
            ]}
                onPress={() => setActiveButton('Pending')}>
            <Text style={MyCoaches.buttonText}>Pending</Text>
            </TouchableOpacity>
            </View>

          
            <ScrollView contentInsetAdjustmentBehavior="scrollableAxes" style={{marginTop: "1%", height: 250,}}>
                {filteredSessions.length > 0 ? (
                    <View>
                        <CoacheeSessions sessions={filteredSessions.map(booking => ({
                            coacheeName: `${booking.coachee.firstName} ${booking.coachee.lastName}`,
                            coacheeId: `${booking.coacheeId}`,
                            bookingId: Number(booking.id),
                            serviceType: `${booking.serviceType}`,
                            additionalNotes: `${booking.additionalNotes}`,
                            status: `${booking.status}`,
                            imageSource: { uri: booking.coachee.profilePicture },
                            slotsId: Number(booking.bookingSlots.length > 0 ? booking.bookingSlots[0].id : null),
                            time: booking.bookingSlots.map(slot => ({
                                startTime: slot.startTime,
                                endTime: slot.endTime
                            })),
                            date: booking.bookingSlots.map(slot => slot.date)
                        }))} />
                    </View>
                ) : (
                    <Text style={{ color: 'grey', fontSize: 18,textAlign: 'center', marginTop: '25%'}}>No trainee found.</Text>
                )}
            </ScrollView>
            </KeyboardAvoidingView>


        </View>
    );
};

const MyCoaches = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backgroundContainer: {
        paddingTop: 140,
        borderRadius: 35, // Adjust the value for the desired curve
        position: 'absolute',
        backgroundColor: '#DED2EA', // Color for the background container
        height: height * 0.16, // Adjust the height as a percentage of the screen height
        width: '100%',
        zIndex: 0, // Set a lower z-index to put it behind topContainer
    },


    nameAndGreetingsContainer: {
        paddingTop:"25%",
        marginLeft: '25%',
        flexDirection: 'row', 
    },

    buttonRow:{
        flexDirection: "row"
    },

    

    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    row: {
        flexDirection: 'row',
    },
    miniContainer: {
        borderRadius: 25, // Adjust the value for the desired curve
        width: width * 0.35, // 40% of screen width
        height: height * 0.19, // 20% of screen height
        margin: 8,
    },
    nestedMiniContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 25, // Adjust the value for the desired curve
        margin: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginTop: "-10%",
        marginLeft: '9%',
        flexDirection: 'row', 
    },
    imageLabel: {
        fontFamily: 'Roboto',
        fontWeight: '800',
        fontSize: 15,
        color: '#483B5F',
        top: -2
    },
    imageStyle: {
        width: 65,
        height: 65,
    },
    searchContainer: {
        borderWidth: 3, // Add a border
        width: '90%',
        borderColor: '#7E3FF0', // Set the border color
        borderRadius: 15, // Add border radius to make it rounded
        marginTop: '10%',
        marginLeft: 'auto', // Set left margin to auto
        marginRight: 'auto', // Set right margin to auto
        paddingHorizontal: '2.6%',
    },
    searchBarContainer: {
        // Set the dimensions of the SearchBar container
        width: 300, // Adjust the width as needed
        height: 40, // Adjust the height as needed
    },

    searchBarInputContainer: {

        height: '100%', // Match the height of the container
    },

    frameContainer: {
        backgroundColor: "#7E3FF0",
        marginTop: "5%",
        marginLeft: "7%",
        width: '85%',
        height: "15%",
        overflow: "hidden",
        borderRadius: 16  
    },
  
    
    AllCoachesButton: {
        width: 100, // Adjust the width to make it square
        height: 49, // Adjust the height to make it square
        marginTop: '5%',
        marginLeft: '6%',
        backgroundColor: '#e1d1fa',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Adjust the border radius for rounded corners (optional)
    },
    FavoriteCoachesButton: {
        width: 110, // Adjust the width to make it square
        height: 50, // Adjust the height to make it square
        marginTop: '-14%',
        marginLeft: '62%',
        backgroundColor: '#e1d1f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Adjust the border radius for rounded corners (optional)
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        lineHeight: 24,
    },
    activeButton: {
        backgroundColor: '#7E3FF0'
    }
   
});

export default Booking_Sessions;
