import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import SvgComponent from '../components/BackgroundSvg';
import { DataTable, Button, IconButton } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons'; // Import FontAwesome icons

const Appointments = () => {
    const [page, setPage] = useState<number>(0);
    const [showFinishedAppointments, setShowFinishedAppointments] =
        useState(false);
    const [appointmentLabel, setAppointmentLabel] = useState('Upcoming Appointments');

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

    const from = page;
    const to = Math.min((page + 1) * items.length, items.length);

    const toggleModal = (item: React.SetStateAction<null>) => {
        setSelectedItem(item);
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={CoachAppointmentStyle.container}>
            <View style={CoachAppointmentStyle.headerContainer}>
                <Text style={CoachAppointmentStyle.appointmentLabel}>
                    {appointmentLabel}
                </Text>
                <IconButton
                    icon={({ color, size }) => (
                        <Octicons
                            name={
                                showFinishedAppointments ? 'tasklist' : 'circle'
                            }
                            size={24} // Adjust size as needed
                            color={showFinishedAppointments ? 'green' : 'gray'} // Change color as desired
                            onPress={() => {
                                setShowFinishedAppointments(!showFinishedAppointments);
                                setAppointmentLabel(
                                    showFinishedAppointments
                                        ? 'Upcoming Appointments'
                                        : 'Finished Appointments'
                                );
                            }}
                        />
                    )}
                />
            </View>

            {showFinishedAppointments ? (
                <DataTable>
                    {/* Finished Appointments Table Header */}
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title numeric>Date</DataTable.Title>
                        <DataTable.Title numeric>Time</DataTable.Title>
                        <DataTable.Title numeric>Details</DataTable.Title>
                    </DataTable.Header>
                    {finishedAppointments.map((item) => (
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
                </DataTable>
            ) : (
                <DataTable>
                    {/* Upcoming Appointments Table Header */}
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title numeric>Date</DataTable.Title>
                        <DataTable.Title numeric>Time</DataTable.Title>
                        <DataTable.Title numeric>Details</DataTable.Title>
                    </DataTable.Header>
                    {items.slice(from, to).map((item) => (
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
    appointmentLabel: {
        color: '#915BC7',
        fontFamily: 'Blinker-SemiBold',
        fontSize: 25,
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
});

export default Appointments;
