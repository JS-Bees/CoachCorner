
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    Alert,
    BackHandler,
    Animated,
    Button,
    FlatList
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useQuery } from 'urql';
import { FindCoachByIdDocument } from '../generated-gql/graphql';
import { FindBookingsOfCoachDocument } from '../generated-gql/graphql';
import UpcomingDashboard from '../components/Profile Tiles/UpcomingDashboardTiles';
import { format } from 'date-fns';
import { SearchBar } from '@rneui/themed'; 
import Icon from 'react-native-vector-icons/Ionicons'
import { KeyboardAvoidingView, TouchableOpacity,} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars'; 
import { Modal } from 'react-native';
import TourModal from '../components/TourForCoach';
import { Divider } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

interface Booking {
    status: string,
    coachee: {
        firstName: string;
        lastName: string;
        profilePicture: string;
    };
    bookingSlots: {
        id: number;
        date: string;
        startTime: string;
        endTime: string;
    }[];
}



const NewCoachDashboard = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

   

    const [fontsloaded] = useFonts({
        'Blinker-SemiBold': require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light': require('./../assets/fonts/Blinker-Light.ttf'),
    });

    const [userToken, setUserToken] = useState<string | null>(null); 
    const [searchText, setSearchText] = useState('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isTourVisible, setTourVisible] = useState(false);
    const [slotsForSelectedDate, setSlotsForSelectedDate] = React.useState([]);
    const [animation] = useState(new Animated.Value(0)); 

    const handleTour = () => {
        setTourVisible(true);
      };
    
      const closeTour = () => {
        setTourVisible(false);
      };

      useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animation]);

    const iconAnimationStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10], 
                }),
            },
        ],
    };

   

    useFocusEffect(
        React.useCallback(() => {

          const onBackPress = () => {

            Alert.alert(
              'Exit App',
              'Are you sure you want to exit the app?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => {},
                },
                {
                  text: 'Exit',
                  onPress: () => BackHandler.exitApp(),
                },
              ],
              { cancelable: true }
            );
    

            return true;
          };
    
          const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    

          return () => {
            backHandler.remove();
          };
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


    const useFetchCoachByUserID = (userID: any) => {
        const [coachResult] = useQuery({
            query: FindCoachByIdDocument, 
            variables: {
                userId: parseInt(userID), 
            },
        });

        return coachResult;
    };

    const [{ data: bookingsData, fetching: bookingsFetching, error: bookingsError }] = useQuery({
        query: FindBookingsOfCoachDocument,
        variables: {
            userId: parseInt(userToken ?? '0'), 
        },
    });

    if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        return null; 
    }

    const upcomingBookings = bookingsData?.findCoachByID.bookings.filter((booking: Booking) => booking.status === 'UPCOMING');
    

    
    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };


    const {
        data: coachData,
        loading: coachLoading,
        error: coachError,
    } = useFetchCoachByUserID(userToken);

    if (!fontsloaded) {
        return null;
    }

    
    const navigateToCoachProfile = () => {
        navigation.navigate("NewCoachProfile");
    };

    const filteredBookings = searchText.trim() === '' 
    ? upcomingBookings 
    : upcomingBookings?.filter(booking => {
        const traineeName = `${booking.coachee.firstName} ${booking.coachee.lastName}`.toLowerCase();
        return traineeName.includes(searchText.toLowerCase());
    });
    


    const markedDates = upcomingBookings?.reduce((acc: any, booking: Booking) => {
        booking.bookingSlots.forEach(slot => {
            const formattedDate = format(new Date(slot.date), 'yyyy-MM-dd');
            acc[formattedDate] = {
                selected: true,
                marked: true,
                selectedColor: '#7E3FF0',
            };
        });
        return acc;
    }, {});

    

    const selectedBooking = filteredBookings?.find(booking =>
        booking?.bookingSlots?.some(slot => format(new Date(slot.date), 'yyyy-MM-dd') === selectedDate)
    );

    const handleDayPress = (day) => {
        const selectedDate = day.dateString;
        setSelectedDate(selectedDate);
        

        const selectedBookings = upcomingBookings?.filter(booking => 
            booking.bookingSlots.some(slot => 
                format(new Date(slot.date), 'yyyy-MM-dd') === selectedDate
            )
        );
    

        const filteredSlots = selectedBookings?.flatMap(booking =>
            booking.bookingSlots.filter(slot =>
                format(new Date(slot.date), 'yyyy-MM-dd') === selectedDate
            ).map(slot => ({
                ...slot,
                coachee: booking.coachee
            }))
        );
    
        setSlotsForSelectedDate(filteredSlots);
        setModalVisible(true);
    };
    
    
    

    return (
        <View style={CoacheeDashboardStyle.container}>
            <View style={CoacheeDashboardStyle.nameAndGreetingsContainer}>
                <Text style={CoacheeDashboardStyle.greetings}>Welcome Back Coach!</Text>
            </View>
            <TouchableOpacity onPress={navigateToCoachProfile}>
                <Image
                    source={{ uri: coachData?.findCoachByID.profilePicture }}
                    style={{
                        width: 40,
                        height: 40,
                        marginLeft: '10%',
                        marginTop: '-10%',
                        borderRadius: 20,
                    }}
                />
            </TouchableOpacity>
            <KeyboardAvoidingView
                style={CoacheeDashboardStyle.container}
                behavior={Platform.OS === "android" ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS === "android" ? 0 : 0}
            >
                <View style={CoacheeDashboardStyle.searchContainer}>
                    <SearchBar
                        placeholder='Search client name...'
                        onChangeText={handleSearchChange}
                        value={searchText}
                        platform='android'
                        containerStyle={CoacheeDashboardStyle.searchBarContainer}
                        inputContainerStyle={CoacheeDashboardStyle.searchBarInputContainer}
                    />
                </View>
                <ScrollView>
                    <View>
                    <View style={CoacheeDashboardStyle.calendarContainer}>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />
  <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={CoacheeDashboardStyle.modalCalendar}>
    <View style={CoacheeDashboardStyle.modalContent}>
        <Text style={CoacheeDashboardStyle.modalHeader}>Your Scheduled Meetings for Today: </Text>
        <Divider style={{ marginVertical: 10 }} />
        <ScrollView style={CoacheeDashboardStyle.scrollContainer}>
                    {slotsForSelectedDate.length > 0 ? (
                        slotsForSelectedDate.map((slot, index) => (
                            <View key={index}>
                                <Text style={CoacheeDashboardStyle.modalText}>
                                    Coachee: {slot.coachee.firstName} {slot.coachee.lastName}
                                </Text>
                                <Text style={CoacheeDashboardStyle.modalText}>
                                    {format(new Date(slot.startTime), 'h:mm a')} - {format(new Date(slot.endTime), 'h:mm a')}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={CoacheeDashboardStyle.modalText}>No bookings for this date</Text>
                    )}
                </ScrollView>
        <TouchableOpacity
            style={CoacheeDashboardStyle.closeButton}
            onPress={() => setModalVisible(false)}
        >
            <Text style={CoacheeDashboardStyle.closeButtonText}>Close</Text>
        </TouchableOpacity>
    </View>
</View>


            </Modal>
        </View>
                
                <ScrollView contentInsetAdjustmentBehavior="scrollableAxes" style={{ marginTop: "1%", height: 350 }}>
                    <View style={CoacheeDashboardStyle.topCoachesContainer}>
                        <Text style={CoacheeDashboardStyle.upcomingHeader}> Upcoming Appointments </Text>
                        
            <TouchableOpacity style={CoacheeDashboardStyle.tourButton} onPress={handleTour}>
                <Animated.View style={iconAnimationStyle}>
                    <Icon name="information-circle-outline" size={24} color="#7E3FF0" />
                </Animated.View>
                <Text style={CoacheeDashboardStyle.tooltip}>Need help?</Text>
                <TourModal visible={isTourVisible} onClose={closeTour} />
            </TouchableOpacity>
                    </View>
                    {filteredBookings && filteredBookings.length > 0 ? (
                        <UpcomingDashboard
                            upcoming={(filteredBookings || []).map((booking: Booking) => ({
                                traineeName: `${booking.coachee.firstName} ${booking.coachee.lastName.split(' ')[0]}`,
                                imageSource: { uri: booking.coachee.profilePicture },
                                time: booking.bookingSlots.map((slot) => ({
                                    startTime: format(new Date(slot.startTime), 'h:mm a'),
                                    endTime: format(new Date(slot.endTime), 'h:mm a'),
                                })),
                                date: booking.bookingSlots.map((slot) => format(new Date(slot.date), 'MMMM dd')),
                                isHighlighted: booking.bookingSlots.some(slot => format(new Date(slot.date), 'yyyy-MM-dd') === selectedDate),
                            }))}
                        />
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 20, color: "#d3d3d3" }}>
                            No Sessions at the moment
                        </Text>
                    )}
                </ScrollView>
                    </View>
                </ScrollView>
                
            </KeyboardAvoidingView>
            
        </View>
    );
};

const CoacheeDashboardStyle = StyleSheet.create({
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
        paddingTop:"15%",
        marginLeft: '25%',
        flexDirection: 'row', 
    },

    topCoachesContainer:  {
        paddingTop:"5%",
        marginLeft: '7%',
        flexDirection: 'row', 
    },
    

    greetings: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#656466',
    },
    upcomingHeader: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#656466',
    },
    topRatedHeader: {

        bottom: "-2%",
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#656466',
    },
    name: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#7E3FF0',
        marginLeft: '2%'
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
        marginLeft: '83%',
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
    upcomingSessionContainer: {
        marginTop:  20, 
    },
    topRatedContainer: {
        bottom: "-1%"
    },

    coachNameText: {
       alignItems:'center',
       justifyContent: "center",
    },
    calendarButton: {
        backgroundColor: '#7E3FF0',
        padding: 5, 
        borderRadius: 10, 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10, 
        marginTop: 5, 
        width: '40%', 
        alignSelf: 'center', 
    },
    calendarButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        borderRadius: 15,
        height: "75%",
        width: "85%",
        backgroundColor: '#FFFFFF', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: '#7E3FF0',
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', 
        bottom: 20, 
        right: 20, 
    },
    closeButtonText: {
        color: '#7E3FF0',
        fontSize: 16,
    },
        highlightedTile: {
        backgroundColor: '#7E3FF0', 
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
        normalTile: {
        backgroundColor: '#ffffff', 
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    tourButton: {
        position: 'absolute',
        top: '5%',
        right: '8%',
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
    },
      tooltip: {
        marginTop: 5,
        fontSize: 12,
        color: '#7E3FF0',
    },
    calendarContainer: {
        paddingHorizontal: "5%",
        paddingVertical: "2%"
    },
    modalCalendar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalText: {
        color: 'black',
        fontSize: 16,
        padding: 10,
    },
    modalHeader: {
        color: '#7E3FF0',
        fontSize: 16,
        padding: 10,
        fontWeight: "500"
    },
    modalContent: {
        height: "75%",
        width: "85%",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    scrollContainer: {
        flex: 1, 
    },
   
    
   
});

export default NewCoachDashboard;