import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { DataTable, Button, Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation } from 'urql';
import { FindCoacheeByIdDocument } from '../generated-gql/graphql';
import { UpdateCoachingRelationshipActiveStatusDocument } from '../generated-gql/graphql';

const MyCoaches = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [page, setPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userID, setUserID] = useState<number>(0);

  const navigateToClientBookingPage = (item) => {
    navigation.navigate('ClientBookingDrawer', { coachId: item.coachId, coach: item.coach});
  };


  const goBack = () => {
    navigation.goBack();
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = (item: any) => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };

  const itemsPerPage = 10;

  const fetchUserIDFromStorage = async () => {
    try {
      const storedUserID = await AsyncStorage.getItem('userToken');
      if (storedUserID) {
        setUserID(parseInt(storedUserID, 10)); // Parse the storedUserID as an integer
      }
    } catch (error) {
      console.error('Error fetching userID from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchUserIDFromStorage();
  }, []);

  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: FindCoacheeByIdDocument,
    variables: { userID },
    requestPolicy: 'cache-and-network',
  });

  const coachingRelationships = data?.findCoacheeByID?.coachingRelationships || [];

  const [, executeMutation] = useMutation(UpdateCoachingRelationshipActiveStatusDocument);

  // Function to handle the "Remove" button click
  const handleRemoveClick = async (relationshipId: number) => {
    try {
      console.log(relationshipId);
      console.log('Before executing mutation');

      // Execute the mutation to update the active status to false
      const response = await executeMutation({
        id: relationshipId,
        active: false,
      });

      // Log the response data
      console.log('Mutation response:', response);

      // Reexecute the query to fetch updated data
      reexecuteQuery();
      console.log('After reexecuting query');

      // Optionally, you can display a success message or perform other actions here
    } catch (error) {
      // Handle any errors that occur during the mutation
      console.error('Error removing coach:', error);
    }
  };

  if (fetching) {
    // Handle loading state here
    return <Text>Loading...</Text>;
  }

  if (error) {
    // Handle error state here
    return <Text>Error: {error.message}</Text>;
  }

  // Filter items based on the search query
  const filteredItems = coachingRelationships.filter((item) =>
    `${item.coach.firstName} ${item.coach.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  return (
    <View style={MyCoachStyle.container}>
      <View style={MyCoachStyle.labelContainer}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} style={MyCoachStyle.icon} onPress={goBack} />
        </TouchableOpacity>
        <Text style={MyCoachStyle.appointmentLabel}>My Coaches</Text>
      </View>
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
        {filteredItems.slice(from, to).map((item, index) => (
          <TouchableOpacity
          key={index}
          onPress={() => navigateToClientBookingPage(item)}>
            <DataTable.Row key={index}>
            <DataTable.Cell>
              <Text>{item.coach.firstName} {item.coach.lastName} </Text>
            </DataTable.Cell>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button onPress={() => toggleModal(item)}>
                View Appointments
              </Button>
              <TouchableOpacity onPress={() => handleRemoveClick(item.id)}>
                <Ionicons name="trash-outline" size={24} color="red" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            </View>
          </DataTable.Row>
          </TouchableOpacity>
        ))}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={MyCoachStyle.modalContainer}>
            <View style={MyCoachStyle.modalContent}>
              <Text>{selectedItem ? selectedItem.coach.firstName : ''} {selectedItem ? selectedItem.coach.lastName : ''}</Text>
              <Text>
                Sport: {selectedItem ? selectedItem.coach.sport : ''}
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
