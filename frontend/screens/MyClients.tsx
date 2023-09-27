import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { DataTable, Button, Searchbar } from 'react-native-paper';

const MyClients = () => {
    const [page, setPage] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>(''); // Add state for search query

    const [items] = useState([
        {
            key: 1,
            name: 'Cupcake',
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

    

    const toggleModal = (item: any) => {
        setSelectedItem(item);
        setModalVisible(!isModalVisible);
    };

    const itemsPerPage = 4; // Number of items to display per page

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    return (
        <View style={MyClientsStyle.container}>
            <View style={MyClientsStyle.labelContainer}>
                <Text style={MyClientsStyle.appointmentLabel}>My Clients</Text>
            </View>

            {/* Add Searchbar */}
            <View style={MyClientsStyle.searchBarContainer}>
                <Searchbar
                    placeholder="Search clients"
                    onChangeText={(query) => setSearchQuery(query)}
                    value={searchQuery}
                    style={MyClientsStyle.searchBar}
                    inputStyle={MyClientsStyle.searchBarInput}
                />
            </View>
            <DataTable>
                {filteredItems.slice(from, to).map((item) => (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell>
                            <Text>{item.name}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                        </DataTable.Cell>
                        <View style={{ marginRight: '-5%', marginTop: '1.4%' }}>
                            <Button onPress={() => toggleModal(item)}>
                                View
                            </Button>
                        </View>
                    </DataTable.Row>
                ))}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={MyClientsStyle.modalContainer}>
                        <View style={MyClientsStyle.modalContent}>
                            <Text>{selectedItem ? selectedItem.name : ''}</Text>
                            <Text>
                                Date:{' '}
                                {selectedItem
                                    ? formatTimestampToDateString(
                                          selectedItem.date,
                                      )
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

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(filteredItems.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${filteredItems.length}`}
                    showFastPaginationControls
                />
            </DataTable>
        </View>
    );
};

const MyClientsStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    labelContainer: {
        marginTop: '15%', // Adjust the margin as needed
        alignItems: 'center', // Center the label horizontally
    },

    appointmentLabel: {
        color: '#915BC7',
        fontFamily: 'Blinker-Light',
        fontSize: 30,
        textAlign: 'center',
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
    searchBarContainer: {
        marginTop: 10, // Adjust the margin as needed
        marginHorizontal: 16, // Add horizontal margin for spacing
    },

    // Style for the Searchbar component
    searchBar: {
        backgroundColor: '#F3F3F3', // Background color
        borderRadius: 10, // Border radius for rounded corners
    },

    // Style for the input field of the Searchbar
    searchBarInput: {
        fontSize: 16, // Font size
    },
});

export default MyClients;
