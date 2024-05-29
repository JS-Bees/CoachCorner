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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchBar } from '@rneui/themed';
import CoachSessions from '../components/Profile Tiles/CoachSessionTiles';
import Icon from 'react-native-vector-icons/Ionicons'
import { FindBookingsOfCoacheeDocument, FindCoacheeByIdDocument } from '../generated-gql/graphql';
import { useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, KeyboardAvoidingView, TouchableOpacity,} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from './Authentication/SplashScreen';




const { width, height } = Dimensions.get('window');

interface CoacheeSessionsProps {
    sessions: CoacheeSessionsProps[];
    onSessionPress?: (session: CoacheeSessionsProps) => void;
}




const Trainee_Sessions: React.FC<CoacheeSessionsProps> = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation = useNavigation<StackNavigationProp<RootStackParams, keyof RootStackParams>>();
    const [searchText, setSearchText] = useState(''); 
    const [activeButton, setActiveButton] = useState('Upcoming'); 
    const [userToken, setUserToken] = useState<string | null>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const pollingInterval = 5000;
 



    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };
        
    const handleNavigateBack = () => {
        navigation.goBack();
    };

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

    const useFetchCoacheeByUserID = (userID: string) => {
        const [coacheeResult] = useQuery({
            query: FindCoacheeByIdDocument,
            variables: { userId: parseInt(userID) },
        });
        return coacheeResult;
    };

    const { data: coacheeData } = useFetchCoacheeByUserID(userToken || '');

    const [result, refetch] = useQuery({
        query: FindBookingsOfCoacheeDocument, 
        variables: {
            userId: userToken ? parseInt(userToken) : 0, // Provide a default value of 0 when userToken is null
        },
        requestPolicy: 'network-only',
    });

    const { data, error, fetching} = result;


    useEffect(() => {
    if (data) {
    setBookings(data.findCoacheeByID.bookings);}
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
    const booking = data?.findCoacheeByID.bookings;
    if (!booking) return <Text>No bookings found.</Text>;

    const upcomingBookings = booking.filter(booking => booking.status === 'UPCOMING');
    const pendingBookings = booking.filter(booking => booking.status === 'PENDING');
    const completedBookings = booking.filter(booking => booking.status === 'COMPLETED');

        // Modify the sessionsToShow variable to filter based on searchText
        const sessionsToShow = activeButton === 'Upcoming' ? upcomingBookings : activeButton === 'Pending' ? pendingBookings : completedBookings;
        const filteredSessions = sessionsToShow.filter(booking => {
            const coacheeName = `${booking.coach.firstName} ${booking.coach.lastName}`;
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
                onPress={() => navigation.navigate('NewCoacheeProfile')}>
            <Image
                    source={{uri: coacheeData?.findCoacheeByID.profilePicture}} // Add your profile image source here
                    style={{width: 40, height: 40, marginLeft:'83%', marginTop: '-10%',  borderRadius: 20,}}/>
            
            </TouchableOpacity>
            

            <KeyboardAvoidingView
            style={MyCoaches.container}
            behavior={Platform.OS === "android" ? 'height' : 'padding'}>
            <View style={MyCoaches.searchContainer}>
                <SearchBar
                 placeholder='Search for coach name'
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

            <ScrollView
    contentInsetAdjustmentBehavior="scrollableAxes"
    style={{ marginTop: "1%", height: 250, marginLeft: 12 }}
>
    {filteredSessions.length > 0 ? (
        <View>
            <CoachSessions
                sessions={filteredSessions.map(booking => ({
                    coachName: `${booking.coach.firstName} ${booking.coach.lastName}`,
                    bookingId: Number(booking.id), // Convert string to number
                    serviceType: `${booking.serviceType}`,
                    status: `${booking.status}`,
                    imageSource: { uri: booking.coach.profilePicture },
                    time: booking.bookingSlots.map(slot => ({
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                    })),
                    date: booking.bookingSlots.map(slot => slot.date),
                }))}
            />
        </View>
    ) : (
        <Text style={{ color: 'grey', fontSize: 18, textAlign: 'center', marginTop: '25%' }}>
            No coach found.
        </Text>
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
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    row: {
        flexDirection: 'row',
    },
    
    buttonRow:{
        flexDirection: "row"
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

export default Trainee_Sessions;
