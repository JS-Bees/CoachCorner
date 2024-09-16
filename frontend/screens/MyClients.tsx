import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { DataTable, Button, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from 'urql';
import { FindCoachByIdDocument } from '../generated-gql/graphql';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

const MyCoaches = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [page, setPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userID, setUserID] = useState<number>(Number); 

  const navigateToCoachBookingPage = (item) => {
    navigation.navigate('CoachBookingDrawer', { coachee: item.coachee, coacheeId: item.coacheeId, coachId: item.coachId, coacheeFirstName: item.coachee.firstName, coacheeLastName: item.coachee.lastName});
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
        setUserID(parseInt(storedUserID));
      }
    } catch (error) {
      console.error('Error fetching userID from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchUserIDFromStorage();


  const [{ data, fetching, error }] = useQuery({
    query: FindCoachByIdDocument,
    variables: { userID },
    requestPolicy: 'cache-and-network',
  });
  

  if (fetching) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }


  const coachingRelationships = data?.findCoachByID?.coachingRelationships || [];



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
          <TouchableOpacity
            key={index}
            onPress={() => navigateToCoachBookingPage(item)}>
            <DataTable.Row key={index}>
          <DataTable.Cell>
            <Text>{item.coachee.firstName} {item.coachee.lastName} {" "}</Text>
          </DataTable.Cell>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <TouchableOpacity onPress={() => navigateToCoachBookingPage(item)}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#915BC7" style={{ marginRight: 10 }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToCoachBookingPage(item)}>
                <AntDesign name="book" size={24} color="#915BC7" style={{ marginRight: 10 }}/>
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
    marginTop: '15%',
    alignItems: 'center', 
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
    marginTop: 10, 
    marginHorizontal: 16, 
  },

  searchBar: {
    backgroundColor: '#F3F3F3', 
    borderRadius: 10, 
  },

  searchBarInput: {
    fontSize: 16, 
  },
});

export default MyCoaches;
