import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import SvgComponent from "../components/BackgroundSvg";
import { DataTable, Button} from 'react-native-paper';



const Appointments = () => {
  const [page, setPage] = useState<number>(0);

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

  const from = page;
  const to = Math.min((page + 1) * items.length, items.length);

  const toggleModal = (item: React.SetStateAction<null>) => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };


  return (
    <View style={CoachApppointmentStyle.container}>
        <Text style={CoachApppointmentStyle.appointmentLabel}>Upcoming Appointments</Text>
      <DataTable>
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
              <Text>{formatTimestampToDateString(item.date)}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text>{item.time}</Text>
            </DataTable.Cell>
            <View style={{marginRight: '-5%', marginTop: '1.4%'}}>
                <Button
                  onPress={() => toggleModal(item)}>View
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
        <View style={CoachApppointmentStyle.modalContainer}>
          <View style={CoachApppointmentStyle.modalContent}>
            <Text>{selectedItem ? selectedItem.name : ''}</Text>
            <Text>Date: {selectedItem ? formatTimestampToDateString(selectedItem.date) : ''}</Text>
            <Text>Location: {selectedItem ? selectedItem.location : ''}</Text>
            <Text>Time: {selectedItem ? selectedItem.time : ''}</Text>
            <Button onPress={() => setModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

        {/* <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1} of ${items.length}`}
          showFastPaginationControls
        /> */}
      </DataTable>
      

      <View style={CoachApppointmentStyle.svgContainer}>
      <SvgComponent> </SvgComponent>
      </View>
    </View>
  );
};

const CoachApppointmentStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },  
    appointmentLabel: {

        color: '#915BC7',
        fontFamily: 'Blinker-SemiBold',
        fontSize: 25,
        textAlign: 'center', // Center the text horizontally
        marginTop: '15%',
        marginBottom: '5%',
        flex: 0.1, // Vertically center the text within its container
      },
    svgContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: -1, // Set a lower z-index to put it behind mini-containers
        width: '100%', // Expand to full width
        height: '35%', // Set the height as a percentage of the screen height
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
