import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Modal,
    Button,
    ActivityIndicator,
    ImageSourcePropType,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';
import { CreateContactDocument, FindCoacheeByIdDocument } from '../generated-gql/graphql';
import { FindBookingsOfCoachDocument } from '../generated-gql/graphql';
import { Calendar } from 'react-native-calendars'; 
import { useMutation, useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Divider } from 'react-native-elements';

type PreviewPageRouteProp = RouteProp<RootStackParams, 'PreviewPage'>;
type PreviewPageNavigationProp = NativeStackNavigationProp<
    RootStackParams,
    'PreviewPage'
>;

interface PreviewPageProps {
    route: PreviewPageRouteProp;
    navigation: PreviewPageNavigationProp;
}

interface ChatMessage {
    id: number;
    message: string;
    sender: string;
    imageUrl: ImageSourcePropType;
    contactedStatus: boolean;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ route }) => {
    const [userToken, setUserToken] = useState<string | null>(null); 
    const [isFavorite, setIsFavorite] = useState(false);
    const [, createContact] = useMutation(CreateContactDocument);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
    const [showAvailability, setShowAvailability] = useState(false);
    const [slotsForSelectedDate, setSlotsForSelectedDate] = React.useState([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);


    const navigation =  useNavigation<NativeStackNavigationProp<RootStackParams>>();


        const useFetchCoacheeByUserID = (userID: any) => {
            const [coacheeResult] = useQuery({
                query: FindCoacheeByIdDocument, 
                variables: {
                    userId: parseInt(userID),
                },
            });
    
            return coacheeResult;
        };
        const {
            data: coacheeData,
            loading: coacheeLoading,
            error: coacheeError,
        } = useFetchCoacheeByUserID(userToken);

        


    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                console.log('token', token);
                setUserToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchUserToken();
    }, []);


    useEffect(() => {
        if (coacheeData && coacheeData.findCoacheeByID) {
          const contacts = coacheeData.findCoacheeByID.contacts;
    
          if (contacts && contacts.length > 0) {
            console.log('Profile ID:', profile.id);
            console.log('Contacts:', contacts);
    

            const isProfileInContacts = contacts.some((contact) => {
              console.log('Contact Coach ID:', contact.coach.id);
              return parseInt(profile.id) ===(contact.coach.id);
            });
    
            setIsFavorite(isProfileInContacts);
            console.log('Is Profile in Contacts:', isProfileInContacts);
          } else {
            console.log('No contacts found');
          }
        } else {
          console.log('CoacheeData or findCoacheeByID is not available');
        }
      }, [coacheeData]); 

    
    const handleAddToFavorites = async () => {
        try {
            
            if (isFavorite || isLoading) {
                return;
            }
            setIsLoading(true);

            const result = await createContact({
                input: {
                    coachId: profile.id,
                    coacheeId: parseInt(userToken),
                    contactedStatus: true,
                },
            });

           
            if (result) {
                
                setIsFavorite(true);
                setIsModalVisible(true); 
            }
        } catch (error) {
            console.error('Error adding coach to favorites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleButtonPress = () => {
        const coachId = profile.id; 
    
        
        const isCoachInFavorites = coacheeData?.findCoacheeByID.contacts.some(contact => contact.id === coachId);
        console.log(isCoachInFavorites)
        if (!isCoachInFavorites) {
            handleAddToFavorites();
        }
        navigation.navigate('ChatList');
    };

    

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleSeeReviewsPress = () => {
        navigation.navigate('ReviewsPage', {
            profile: profile,
        });
    };

   
    const handleSeeCredentialsPress = () => {
        
        navigation.navigate('CredentialsPage', {
          coachId: profile.id, 
          
        });
      };
      

    const { profile, gainedStars } = route.params || {};

    const totalStars = 5;



   
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < totalStars; i++) {
            stars.push(
                <View key={i} style={styles.starsContainer}>
                    <Icon
                        name={i < gainedStars ? 'star' : 'star-outline'}
                        size={20}
                        color="#FECB2E"
                    />
                </View>,
            );
        }
        return stars;
    };

    const [{ data: bookingsData, fetching: bookingsFetching, error: bookingsError }] = useQuery({
      query: FindBookingsOfCoachDocument,
      variables: {
          userId: profile.id
      },
    });
    const upcomingData = bookingsData?.findCoachByID?.bookings.filter((booking: Booking) => booking.status === 'UPCOMING');

    const markedDates = upcomingData?.reduce((acc: any, booking: Booking) => {
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

  const handleToggleAvailability = () => {
    setIsCalendarModalVisible(true);
  };

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);
    
    
    const selectedBookings = upcomingData?.filter(booking => 
        booking?.bookingSlots?.some(slot => 
            format(new Date(slot?.date), 'yyyy-MM-dd') === selectedDate
        )
    );

    const filteredSlots = selectedBookings?.flatMap(booking =>
        booking?.bookingSlots?.filter(slot =>
            format(new Date(slot.date), 'yyyy-MM-dd') === selectedDate
        ).map(slot => ({
            ...slot,
            coachee: booking.coachee
        }))
    );

    setSlotsForSelectedDate(filteredSlots);
  };




  

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={profile?.imageSource}
                    style={styles.profileImage}
                /> 
                <TouchableOpacity
                    onPress={handleNavigateBack}
                    style={styles.iconContainer}
                >
                    <Icon name="arrow-back-circle" size={30} color="#FECB2E" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.heartIconContainer}
                    onPress={handleAddToFavorites}
                >
                    <Icon name="bookmark" size={30} color="#FECB2E" />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.name}>{profile?.name}</Text>
                <TouchableOpacity onPress={handleToggleAvailability}>
                 <Text style={styles.availaibilityText}>{showAvailability ? "Hide Availability" : "See Availability"}</Text>
              </TouchableOpacity>
              <View>
              </View>
            </View>
            <View>
            {showAvailability && (
               <Calendar
                markedDates={markedDates}/>)}
            </View>
            <View style={styles.starsContainer}>
                {renderStars()}
                <View style={styles.reviewsContainer}>
                    <TouchableOpacity onPress={handleSeeReviewsPress}style={styles.gap}>
                        <Text style={styles.reviewText}>See Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSeeCredentialsPress} style={styles.gap}>
                        <Text style={styles.reviewText}>See Credentials</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.aboutText}>About</Text>
            </View>
            <View style={styles.aboutContainer}>
                <Text style={styles.about}>{profile?.about}</Text>
            </View>

            <View style={styles.addressContainer}>
                <Text style={styles.aboutText}>Workplace Address</Text>
            </View>
            <View style={styles.worplaceAddressContainer}>
                <Text style={styles.workplaceAddressText}>
                    {profile?.workplaceAddress}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleButtonPress}
                >
                <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            height: 55,
                            paddingHorizontal: 15,
                            paddingVertical: 15,
                        }}
                    >
                        {isFavorite ? 'Proceed to ChatList' : 'Add this coach'}
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={isCalendarModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsCalendarModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsCalendarModalVisible(false)}
                        >
                            <Icon name="close" size={30} color="#7E3FF0" />
                        </TouchableOpacity>
                       <View>
                         <Icon name="information-circle-outline" size={24} color="#7E3FF0"/>
                          <Text style={styles.modalMessage}>
                              Some dates are already booked, but other time slots might be still available.
                          </Text>
                       </View>
                       <View style={styles.timeSlotContainer}>
                        <Text>Taken Timeslots for this date:</Text>
                       <Divider style={{ marginVertical: 10 }} />
                       <View>
                       {slotsForSelectedDate.length > 0 ? (
                        slotsForSelectedDate.map((slot, index) => (
                            <View key={index}>
                                <Text>
                                    {format(new Date(slot.startTime), 'h:mm a')} - {format(new Date(slot.endTime), 'h:mm a')}
                                </Text>
                            </View>
                        ))
                      ) : (
                          <Text>No timeslots taken</Text>
                       )}
                    </View>
                       </View>
                       <View style={styles.calendarContainer}>
                       <Calendar
                            markedDates={markedDates}
                            onDayPress={handleDayPress}
                            theme={{
                                todayTextColor: '#7E3FF0',
                                selectedDayBackgroundColor: '#7E3FF0',
                                arrowColor: '#7E3FF0',
                            }}
                        />
                       </View>
                    </View>
                </View>
            </Modal>
            {isLoading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#7E3FF0" /> 
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', 
  },
  profileImage: {
    width: "100%", 
    height: "50%",
    resizeMode: 'cover', 
    marginTop: "-110%"
  },
  iconContainer: {
    position: 'absolute',
    top: "7%",
    left: "6%",
    zIndex: 1,
  },
  heartIconContainer: {
    position: 'absolute',
    top: "6%",
    left: "5%",
    zIndex: 1,
    flexDirection: "row",
    marginLeft: "85%"
  },
  header: {
    position: 'absolute',
    bottom: "45%", 
    alignItems: 'flex-start',
    left: "5%",
  },
  name: {
    fontFamily: "Roboto",
    fontWeight: '200',
    fontSize: 25
  },
  starsContainer: {
    flexDirection: 'row',
    bottom: "79.5%",
    left: "1.6%"
  },
  reviewsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    bottom: "80%"
  },
  gap: {
    marginLeft: "5%", 
  },
  reviewText: {
    fontWeight: "500",
    fontSize: 15,
    color: "#7E3FF0"
  },
  availaibilityText: {
    fontWeight: "500",
    fontSize: 15,
    color: "#7E3FF0",
  },
  content: {
    position: 'absolute',
    bottom: "36%", 
    alignItems: 'center',
    left: "5%"
  },
  aboutText: {
    fontFamily: "Roboto",
    fontWeight: '200',
    fontSize: 20
  },
  aboutContainer:{
    position: 'absolute',
    bottom: "35%",
    left: "6%",
    width: "85%"
  },
  about: {
    position: "absolute",
    textAlign: "justify",
    lineHeight: 20, 
    fontFamily: "Roboto",
    fontWeight: '200',
    color: '#908D93',
  },
  buttonContainer:{
    position: 'absolute',
    bottom: "2%", 
    alignItems: 'center',
    left: "3%",
    width: "85%"
  },
  button: {
    marginTop: '5%',
    marginLeft: '11%',
    backgroundColor: '#7E3FF0',
    width: 350,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
  },
  addressContainer: {
    position: 'absolute',
    bottom: "20%", 
    alignItems: 'center',
    left: "5%"
  },
  worplaceAddressContainer: {
    position: 'absolute',
    bottom: "19%", 
    left: "6%",
    width: "85%"
  },
  workplaceAddressText: {
    position: "absolute",
    textAlign: "justify",
    lineHeight: 20, 
    fontFamily: "Roboto",
    fontWeight: '200',
    color: '#908D93',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: "center"
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 9999,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    height: "95%",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalButton: {
    borderWidth: 2,
    borderColor: "#7E3FF0", 
    borderRadius: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: "#fff", 
    alignItems: 'center', 
  },
  modalTextButton: {
    color: "#7E3FF0", 
    fontSize: 16, 
  },
  modalMessage: {
    fontSize: 15,
    marginBottom: 20,
    color: '#7E3FF0',
  },
  timeSlotContainer: {
    top: "50%",
    alignContent: "flex-start",
    marginRight: "50%"
  },
  calendarContainer: {
    marginTop: "45%",
    position: 'absolute',
  }
});

export default PreviewPage;