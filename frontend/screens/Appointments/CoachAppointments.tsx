import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import SvgComponent from '../../components/BackgroundSvg';
import { DataTable, Button, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookingStatus, FindCoachByIdDocument } from '../../generated-gql/graphql';
import { useQuery } from 'urql';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import dayjs from 'dayjs';




const CoachAppointments = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const itemsPerPage = 10; // Set the number of items per page
    const [page, setPage] = useState<number>(0);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [appointmentLabel, setAppointmentLabel] = useState();
    const [selectedCategory, setSelectedCategory] = useState('upcoming'); // Initialize selected category

    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    


    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                console.log('token', token)
                setUserToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchUserToken();
    }, []);

    const [{ data: coachData, fetching, error }]  = useQuery({
        query: FindCoachByIdDocument, // Use the Coachee query document
        variables: {
            userID: parseInt(userToken), // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network',// THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });

    const formatTimestampToTimeString = (timestamp) => {
        const date = dayjs(timestamp);
        // Get the local time in 12-hour format with AM/PM
        const timeString = date.format('h:mm A');
        
        return timeString;
    };

    const getCurrentPageItems = (items) => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    };

    // Handle changing the page
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        setPage(0);
    }, []);

    const getFilteredItems = () => {
        let filteredItems = [];
        switch (selectedCategory) {
            case 'finished':
                filteredItems = finishedAppointments || [];
                break;
            case 'upcoming':
                filteredItems = (coachData?.findCoachByID?.bookings || []).filter((booking) => booking.status === BookingStatus.Confirmed);
                break;
            case 'pending':
                filteredItems = (coachData?.findCoachByID?.bookings || []).filter((booking) => booking.status === BookingStatus.Pending);
                break;
            default:
                break;
        }
        const currentPageItems = getCurrentPageItems(filteredItems);
        return currentPageItems;
    };

    const goBack = () => {
        navigation.goBack();
    };

    const [items] = useState([
        {
            key: 1,
            name: 'Cupcsdsake',
            date: Date.now(),
            location: 'Roxas',
            time: '10:00 AM',
        },
        {
            key: 2,
            name: 'Eclair',
            date: Date.now(),
            location: 'Roxas',
            time: '11:00 AM',
        },
        {
            key: 3,
            name: 'Frozen yogurt',
            date: Date.now(),
            location: 'Roxas',
            time: '12:00 PM',
        },
        {
            key: 4,
            name: 'Gingerbread',
            date: Date.now(),
            location: 'Roxas',
            time: '1:00 PM',
        },
    ]);

    // Sample finished appointments
    const [finishedAppointments] = useState([
        {
            key: 5,
            name: 'Msdsacaron',
            date: Date.now(),
            location: 'Roxas',
            time: '2:00 PM',
        },
        {
            key: 6,
            name: 'Cheesecake',
            date: Date.now(),
            location: 'Roxas',
            time: '3:00 PM',
        },
    ]);

    useEffect(() => {
        setPage(0);
    }, []);

    // Function to format a timestamp into a readable date string
    const formatTimestampToDateString = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(); // Adjust formatting as needed
    };

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

   
    const toggleModal = (item: React.SetStateAction<null>) => {
        setSelectedItem(item);
        setModalVisible(!isModalVisible);
    };


    return (
        <View style={CoachAppointmentStyle.container}>
        <View style={CoachAppointmentStyle.headerContainer}>
            <TouchableOpacity onPress={() => setAppointmentLabel('Category')}>
                <Ionicons name="arrow-back" size={30} style={CoachAppointmentStyle.icon} onPress={goBack} />
            </TouchableOpacity>
            <View style={CoachAppointmentStyle.dropdownContainer}>
                <Text style={CoachAppointmentStyle.appointmentLabel}>
                    {appointmentLabel}
                </Text>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => {
                        setSelectedCategory(itemValue)
                    }}
                    style={{ width: 300 }}
                    
                >
                    <Picker.Item label="Upcoming Appointments" value='upcoming' />
                    <Picker.Item label="Finished Appointments" value='finished' />
                    <Picker.Item label="Pending Appointments" value="pending" />
                </Picker>
            </View>
        </View>
                {selectedCategory === 'finished' && (
    <DataTable>
        {/* Finished Appointments Table Header */}
        <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Date</DataTable.Title>
            <DataTable.Title numeric>Time</DataTable.Title>
            <DataTable.Title numeric>Details</DataTable.Title>
        </DataTable.Header>
        {getFilteredItems().map((item) => (
            <DataTable.Row key={item.key}>
                <DataTable.Cell>
                    <Text>{item.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                    <Text>
                        {formatTimestampToDateString(item.date)}
                    </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                    <Text>{item.time}</Text>
                </DataTable.Cell>
                <View
                    style={{
                        marginRight: '-5%',
                        marginTop: '1.4%',
                    }}
                >
                    <Button onPress={() => toggleModal(item)}>
                        View
                    </Button>
                </View>
            </DataTable.Row>
        ))}
        <DataTable.Pagination
            page={page}
            numberOfPages={itemsPerPage}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
        />
    </DataTable>
)}

{selectedCategory === 'upcoming' && (
    <DataTable>
        {/* Pending Appointments Table Header */}
        <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Date</DataTable.Title>
            <DataTable.Title numeric>Time</DataTable.Title>
            <DataTable.Title>                  Details</DataTable.Title>
        </DataTable.Header>
        
        {getFilteredItems().map((booking) => (
            <DataTable.Row key={booking.id}>
                <DataTable.Cell>
                    <Text>
                    {booking.coachee ? `${booking.coachee.firstName} ${booking.coachee.lastName}` : 'N/A'}
                    </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                    <Text>
                        {formatTimestampToDateString(booking.bookingSlots[0].date)}
                    </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                    <Text>
                        {formatTimestampToTimeString(booking.bookingSlots[0]?.startTime)}
                    </Text>
                </DataTable.Cell>
                <View
                        style={{
                            marginRight: '-5%',
                            marginTop: '1.4%',
                        }}
                    >
                        <Button>
                            View
                        </Button>
                    </View>
            </DataTable.Row>
            
        ))}
        <DataTable.Pagination
            page={page}
            numberOfPages={itemsPerPage}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
        />
    </DataTable>
)}

{selectedCategory === 'pending' && (
    <DataTable>
        {/* Pending Appointments Table Header */}
        <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Date</DataTable.Title>
            <DataTable.Title numeric>Time</DataTable.Title>
            <DataTable.Title>                Status</DataTable.Title>
        </DataTable.Header>
        
        {getFilteredItems().map((booking) => (
            <DataTable.Row key={booking.id}>
                <DataTable.Cell>
                    <Text>
                    {booking.coachee ? `${booking.coachee.firstName} ${booking.coachee.lastName}` : 'N/A'}
                    </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                    <Text>
                        {formatTimestampToDateString(booking.bookingSlots[0].date)}
                    </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                    <Text>
                        {formatTimestampToTimeString(booking.bookingSlots[0]?.startTime)}
                    </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                    <Text>{booking.status}</Text>
                </DataTable.Cell>
            </DataTable.Row>
        ))}
        <DataTable.Pagination
            page={page}
            numberOfPages={itemsPerPage}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
        />
    </DataTable>
)}

         
            {/* Modal for Appointment Details */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={CoachAppointmentStyle.modalContainer}>
                    <View style={CoachAppointmentStyle.modalContent}>
                        <Text>{selectedItem ? selectedItem.name : ''}</Text>
                        <Text>
                            Date:{' '}
                            {selectedItem
                                    ? formatTimestampToDateString(selectedItem.date)
                                : ''}
                        </Text>
                        <Text>
                            Location:{' '}
                            {selectedItem ? selectedItem.location : ''}
                        </Text>
                        <Text>
                            Time: {selectedItem ? selectedItem.time : ''}
                        </Text>
                        <Button onPress={() => setModalVisible(false)}>
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>

            <View style={CoachAppointmentStyle.svgContainer}>
                <SvgComponent> </SvgComponent>
            </View>

            
           
        </View>
       

        
    );
};

const CoachAppointmentStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: '15%',
        paddingHorizontal: 20, // Added paddingHorizontal to center the labels
    },
    icon: {
        top: '-30%',
        left: '-35%',
        color: '#915bc7',
    },
    appointmentLabel: {
        color: '#915BC7',
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 20,
    },
    svgContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: -1,
        width: '100%',
        height: '35%',
        padding: 0,
        margin: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    dropdownContainer: {
        paddingTop: '5%',
        flexDirection: 'row',
        right: '-1%',
        alignItems: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
});

export default CoachAppointments;
