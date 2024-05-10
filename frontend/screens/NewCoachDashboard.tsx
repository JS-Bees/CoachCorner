
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

   

    const [fontsloaded] = useFonts({
        'Blinker-SemiBold': require('./../assets/fonts/Blinker-SemiBold.ttf'),
        'Blinker-Light': require('./../assets/fonts/Blinker-Light.ttf'),
    });

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [searchText, setSearchText] = useState('');

    useFocusEffect(
        React.useCallback(() => {
          // When the screen is focused, add a back button event listener
          const onBackPress = () => {
            // Optionally, you can show a confirmation dialog
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
    
            // Return true to indicate that we've handled the back button press
            return true;
          };
    
          const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          // Cleanup function
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

    // Define a function to fetch coachee data by userID (token)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useFetchCoachByUserID = (userID: any) => {
        const [coachResult] = useQuery({
            query: FindCoachByIdDocument, // Use the Coachee query document
            variables: {
                userId: parseInt(userID), // Parse the userID (token) to an integer with base 10
            },
        });

        return coachResult;
    };

    const [{ data: bookingsData, fetching: bookingsFetching, error: bookingsError }] = useQuery({
        query: FindBookingsOfCoachDocument,
        variables: {
            userId: parseInt(userToken ?? '0'), // Use userToken instead of userID
        },
    });

    if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        return null; // or an error message
    }

    const upcomingBookings = bookingsData?.findCoachByID.bookings.filter((booking: Booking) => booking.status === 'UPCOMING');
    

    
    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    // Example usage of the query function
    // Replace 'yourToken' with the actual token or userID you want to fetch
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
    ? upcomingBookings // If search text is empty, show all bookings
    : upcomingBookings?.filter(booking => {
        // Filter bookings whose trainee name includes the search text (case insensitive)
        const traineeName = `${booking.coachee.firstName} ${booking.coachee.lastName}`.toLowerCase();
        return traineeName.includes(searchText.toLowerCase());
    });

    return (
        <View style={CoacheeDashboardStyle.container}>
            <View style={CoacheeDashboardStyle.nameAndGreetingsContainer}>
                <Text style={CoacheeDashboardStyle.greetings}>
                    Welcome Back Coach!
                </Text>
                
            </View>
            <TouchableOpacity onPress={navigateToCoachProfile}>
            <Image
                    source={{uri: coachData?.findCoachByID.profilePicture}} // Add your profile image source here
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
                keyboardVerticalOffset={Platform.OS === "android" ?  0 :  0}>
                <View style={CoacheeDashboardStyle.searchContainer}>
                    <SearchBar
                     placeholder='Search client name...'
                     onChangeText={handleSearchChange}
                    value={searchText}
                    platform='android'
                     containerStyle={CoacheeDashboardStyle.searchBarContainer}
                     inputContainerStyle={CoacheeDashboardStyle.searchBarInputContainer}/>
                </View>
                

                <ScrollView contentInsetAdjustmentBehavior="scrollableAxes" style={{marginTop: "1%", height: 350}}>
            <View style={CoacheeDashboardStyle.topCoachesContainer}>
                <Text style={CoacheeDashboardStyle.upcomingHeader}> Upcoming Sessions </Text>
            </View>
            {filteredBookings && filteredBookings.length > 0 ? (
                <UpcomingDashboard
                    upcoming={(filteredBookings || []).map((booking: Booking) => ({
                        traineeName: `${booking.coachee.firstName} ${booking.coachee.lastName}`,
                        imageSource: { uri: booking.coachee.profilePicture },
                        time: booking.bookingSlots.map((slot) => ({
                            startTime: format(new Date(slot.startTime), 'h:mm a'),
                            endTime: format(new Date(slot.endTime), 'h:mm a'),
                        })),
                        date: booking.bookingSlots.map((slot) => format(new Date(slot.date), 'MMMM dd')),
                    }))}
                />
            ) : (
                <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 20, color: "#d3d3d3"  }}>
                    No Sessions at the moment
                </Text>
            )}
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
        borderRadius: 35, // Adjust the value for the desired curve
        position: 'absolute',
        backgroundColor: '#DED2EA', // Color for the background container
        height: height * 0.16, // Adjust the height as a percentage of the screen height
        width: '100%',
        zIndex: 0, // Set a lower z-index to put it behind topContainer
    },


    nameAndGreetingsContainer: {
        paddingTop:"20%",
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
    upcomingSessionContainer: {
        marginTop:  20, // Adjust this value as needed
    },
    topRatedContainer: {
        bottom: "-1%"
    },

    coachNameText: {
       alignItems:'center',
       justifyContent: "center",
    }
   
});

export default NewCoachDashboard;