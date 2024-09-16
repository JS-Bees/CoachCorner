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
import SplashScreen from './Authentication/LoadingSplash';




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
    const pollingInterval = 1000;
    const [sortOption, setSortOption] = useState<'date' | 'alphabetical'>('date');
    const [filterMessage, setFilterMessage] = useState('Filtered by name');
    const [visibleSessionsCount, setVisibleSessionsCount] = useState(4);

 



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
            userId: userToken ? parseInt(userToken) : 0, 
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

    const toggleSortOption = () => {
        if (sortOption === 'alphabetical') {
            setSortOption('date');
            setFilterMessage('Filtered by date');
        } else {
            setSortOption('alphabetical');
            setFilterMessage('Filtered by name');
        }
    };



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
        let sessionsToShow =
        activeButton === 'Upcoming' ? upcomingBookings : activeButton === 'Pending' ? pendingBookings : completedBookings;

        // Apply sorting based on the selected filter option
        sessionsToShow = sessionsToShow.sort((a, b) => {
            if (sortOption === 'date') {
                const dateA = new Date(a.bookingSlots[0].date).getTime();
                const dateB = new Date(b.bookingSlots[0].date).getTime();
               
                return dateA - dateB;
            } else if (sortOption === 'alphabetical') {
                const coachA = a.coach?.firstName || '';
                const coachB = b.coach?.firstName || '';

                return coachA.localeCompare(coachB);
            }
            return 0;
        });
        const filteredSessions = sessionsToShow.filter(booking => {
            const coacheeName = `${booking.coach.firstName} ${booking.coach.lastName}`;
            return coacheeName.toLowerCase().includes(searchText.toLowerCase());
        });

        const visibleSessions = filteredSessions.slice(0, visibleSessionsCount);

        
        const handleSeeMore = () => {
            setVisibleSessionsCount(prevCount => prevCount + 4); 
        };

    
    
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
                {upcomingBookings.length > 0 && (
                <View style={MyCoaches.badgeContainer}>
                <Text style={MyCoaches.badgeText}>{upcomingBookings.length}</Text>
                </View>)}
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
                {pendingBookings.length > 0 && (
                <View style={MyCoaches.badgeContainer}>
                <Text style={MyCoaches.badgeText}>{pendingBookings.length}</Text>
            </View>)}
            </TouchableOpacity>
            </View>

            <View style={MyCoaches.filterIconContainer}>
            <Text style={{ color: '#7E3FF0', marginTop: 5, marginRight: "5%",}}>{filterMessage}</Text>
                    <TouchableOpacity onPress={toggleSortOption}>
                    
                        <Icon name="filter-outline" size={30} color="#7E3FF0" />
                        
                    </TouchableOpacity>
                  
                    
            </View>


            <ScrollView
    contentInsetAdjustmentBehavior="scrollableAxes"
    style={{ marginTop: "1%", height: 250, marginLeft: 12 }}
>
    {visibleSessions.length > 0 ? (
        <View>
            <CoachSessions
                sessions={visibleSessions.map(booking => ({
                    coachName: `${booking.coach.firstName} ${booking.coach.lastName}`,
                    bookingId: Number(booking.id),
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
             {visibleSessionsCount < filteredSessions.length && (
                                <TouchableOpacity onPress={handleSeeMore} style={MyCoaches.seeMoreButton}>
                                    <Text style={MyCoaches.seeMoreText}>See More</Text>
                                </TouchableOpacity>
            )}

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
        borderRadius: 35, 
        position: 'absolute',
        backgroundColor: '#DED2EA', 
        height: height * 0.16, 
        width: '100%',
        zIndex: 0, 
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center', 
        paddingHorizontal: 20, 
        marginTop: "5%"
    },

    miniContainer: {
        borderRadius: 25, 
        width: width * 0.35, 
        height: height * 0.19, 
        margin: 8,
    },
    nestedMiniContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 25, 
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
        borderWidth: 3, 
        width: '90%',
        borderColor: '#7E3FF0', 
        borderRadius: 15, 
        marginTop: '10%',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        paddingHorizontal: '2.6%',
    },
    searchBarContainer: {
      
        width: 300, 
        height: 40, 
    },

    searchBarInputContainer: {

        height: '100%', 
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
        width: 100, 
        height: 49, 
        backgroundColor: '#e1d1fa',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
    },
    FavoriteCoachesButton: {
        width: 110, 
        height: 50, 
        marginTop: '-14%',
        marginLeft: '62%',
        backgroundColor: '#e1d1f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        lineHeight: 24,
    },
    activeButton: {
        backgroundColor: '#7E3FF0'
    },
    badgeContainer: {
        position: 'absolute',
        right: -10,
        top: -10,
        backgroundColor: '#7E3FF0',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2, 
        borderColor: 'white', 
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    filterIconContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        paddingTop: "3%",
        marginRight: "6%",
    },
    seeMoreButton: {
        backgroundColor: 'transparent', 
        borderRadius: 15,            
        paddingVertical: 5,        
        paddingHorizontal: 20,      
        marginVertical: 10,         
        alignSelf: 'center',      
        borderColor: "#7E3FF0" ,
        borderWidth: 1

    },
    seeMoreText: {
        color: '#7E3FF0',           
        fontSize: 16,                   
        textAlign: 'center',        
    },
   
});

export default Trainee_Sessions;
