/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { DataTable, Button, Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from 'urql';
import { FindCoachByIdDocument } from '../generated-gql/graphql';

const MyCoaches = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [page, setPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userID, setUserID] = useState<number | null>(null); // Initialize userID state

  const goBack = () => {
    navigation.goBack();
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = (item: any) => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };

  const itemsPerPage = 4;

  // Fetch userID from AsyncStorage
  const fetchUserIDFromStorage = async () => {
    try {
      const storedUserID = await AsyncStorage.getItem('userToken');
      if (storedUserID) {
        setUserID(parseInt(storedUserID));
      }
    } catch (error) {
      console.error('Error fetching userID from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchUserIDFromStorage(); // Fetch userID when the component mounts
  }, []);

  // Use the fetched userID to query coaching relationships
  const [{ data, fetching, error }] = useQuery({
    query: FindCoachByIdDocument,
    variables: { userID },
    requestPolicy: 'cache-and-network',// THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
  });

  if (fetching) {
    // Handle loading state here
    return <Text>Loading...</Text>;
  }

  if (error) {
    // Handle error state here
    return <Text>Error: {error.message}</Text>;
  }

  // Assuming data.findCoachByID returns an object with a coachingRelationships field
  const coachingRelationships = data?.findCoachByID?.coachingRelationships || [];


  // Filter items based on the search query
  const filteredItems = coachingRelationships.filter((item) =>
    `${item.coachee.firstName} ${item.coachee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredItems)

  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  return (
    <View style={MyCoachStyle.container}>
      <View style={MyCoachStyle.labelContainer}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} style={MyCoachStyle.icon} onPress={goBack} />
        </TouchableOpacity>
        <Text style={MyCoachStyle.appointmentLabel}>My Clients</Text>
      </View>
      {/* Searchbar */}
      <View style={MyCoachStyle.searchBarContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={MyCoachStyle.searchBar}
          inputStyle={MyCoachStyle.searchBarInput}
        />
      </View>
      <DataTable>
      <DataTable.Header>
    <DataTable.Title>Name</DataTable.Title>
  </DataTable.Header>
        {filteredItems.slice(from, to).map((item, index) => (
          <DataTable.Row key={index}>
          <DataTable.Cell>
            <Text>{item.coachee.firstName} {item.coachee.lastName} {" "}</Text>
          </DataTable.Cell>
          <View style={{ marginRight: '-5%', marginTop: '1.4%' }}>
            <Button onPress={() => toggleModal(item)}>
              View Appointment
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
          <View style={MyCoachStyle.modalContainer}>
            <View style={MyCoachStyle.modalContent}>
              <Text>{selectedItem ? selectedItem.coachee.firstName : ''} {selectedItem ? selectedItem.coachee.lastName : ''}</Text>
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

const MyCoachStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  labelContainer: {
    marginTop: '15%', // Adjust the margin as needed
    alignItems: 'center', // Center the label horizontally
  },
  icon: {
    left: '-40%',
    color: '#915bc7',
  },
  appointmentLabel: {
    top: '-10%',
    color: '#915BC7',
    fontFamily: 'Roboto',
    fontWeight: '700',
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

export default MyCoaches;
