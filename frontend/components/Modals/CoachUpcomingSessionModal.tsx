import React, { useEffect } from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay, Icon } from '@rneui/themed';
import CoacheeSessions from '../Profile Tiles/CoacheeSessionsTiles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UpdateBookingStatusDocument } from '../../generated-gql/graphql';
import { UpdateBookingStatusMutation } from '../../generated-gql/graphql';
import { useMutation } from 'urql';
import { RootStackParams } from '../../App';
import {format} from 'date-fns';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface SessionModalProps {
  visible: boolean;
  session: CoacheeSessions | null;
  toggleOverlay: (session: Session | null) => void;
}


const UpcomingModal: React.FC<SessionModalProps> = ({ visible, session, toggleOverlay }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [result, updateBookingStatus] = useMutation<UpdateBookingStatusMutation>(UpdateBookingStatusDocument);

  

  const navigateToChat = () => {
    navigation.navigate('ChatPage');
  };

  
  const navigateToReSched = () => {
    navigation.navigate("ReschedulePage", { session, slotsId: session?.slotsId });
  };
  

  const handleCancelSchedule = () => {
    if (session?.bookingId) {
      const variables = {
        updateBookingStatusId: session.bookingId,
        input: { status: 'CANCELLED' }
      };
      updateBookingStatus(variables);
      toggleOverlay(null); // Close the modal
    } else {
      console.error("Cannot update status ");
    }
  };
  
  
  useEffect(() => {
    if (result.error) {
      console.error('Error updating booking status:', result.error.message);
    } else if (result.data) {
      console.log('Booking status updated successfully:', result.data.updateBookingStatus);
      // Optionally, you can perform actions based on the result, such as updating local state or displaying a success message
    }
  }, [result]);


  

  return (
    <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay(null)} 
    overlayStyle={styles.overlay} animationType="fade"  >
      <View style={styles.container}>
        {session && (
          <>
          <View style={styles.imageContainer}>
          <Image source={session.imageSource} style={styles.sessionImage} />
          <TouchableOpacity onPress={navigateToChat}>
              <View style={styles.imageContainer}>
                <Icon name="chat" type="material" color="#7E3FF0" />
              </View>
            </TouchableOpacity>
          </View>
            <Text style={styles.sessionName}>{session.coacheeName}</Text>
            <Text style={styles.subtitleText}>  Upcoming sessions with this trainee</Text>
          </>
        )}

        <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Service Type</Text>
            <Text style={styles.subtitleText}>{session?.serviceType}</Text>
            <Text style={styles.titleText}>Additional Notes</Text>
            <Text style={styles.subtitleText}>{session?.additionalNotes}</Text>


            <View style={styles.contentText}>
            <Text style={styles.titleText}>Time</Text>
            <Text style={styles.titleText}>Date</Text>   
            
          </View>
        </View>
        <View style={styles.subContent}>
        <FlatList
            data={session?.time}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            <View style={styles.timeRow}>
            <Text style={styles.subcontentText}>
              {format(new Date(item.startTime), 'h:mm a')} - {format(new Date(item.endTime), 'h:mm a')}
            </Text>
      </View>
    )}
  />
         <FlatList
    data={session?.date.map(item => format(new Date(item), 'MMMM d, EEEE'))}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={styles.dateRow}>
        <Text style={styles.subcontentText}>
          {item}
        </Text>
      </View>
    )}
  />
</View>


{/* <View style={styles.buttons}> */}
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSchedule}>
      <Text style={styles.cancelText}>Cancel Schedule</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={navigateToReSched}>
      <Text style={styles.Text} >Re-Schedule</Text>
    </TouchableOpacity>
  </View>
</View>


      {/* </View> */}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 15,
    height: "75%",
    width: "85%",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer:{
    paddingTop: "10%",
    left: "10%"
  },
  contentText: {
    top: "5%",
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    paddingTop: "10%",
    flexDirection: 'row',
  },
  subContent: {
    top: "5%",
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: "space-between",
    left: "-2%",
  },
  sessionImage: {
    width: (screenWidth * 0.17),
    height: (screenWidth * 0.17),
    marginBottom: 10,
    borderRadius: 50,
  },
  sessionName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#7E3FF0"
  },
  subtitleText: {
    paddingTop: "3%",
    color:"#908D93"
  },
  titleText: {
    color: "#7E3FF0",
    fontSize: 15,
    fontWeight: '500',
    marginRight: "45%"
  },
  contentTitleText:{
    color: "#7E3FF0",
    fontSize: 15,
    fontWeight: '500',
    marginRight: "40%"
  },
  subcontentText: {
    paddingTop: "3%",
    color:"#908D93",
    marginLeft: "12%",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7E3FF0"
  },
  Text: {
    fontSize: 15,
    fontWeight: "600",
    color: "white"
  },
  buttons: {
    backgroundColor: 'red',
    bottom: "-50%",
    marginLeft: "-110%"

  },
  buttonContainer:{
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    bottom:  '-30%', 
    left:  0,
    right:  0,
    paddingHorizontal:  10, 
  },
  button: {
    backgroundColor: '#7E3FF0', // Set the background color for the cancel button
      width: (screenWidth * 0.36), // Adjust the percentage as needed
      height: (screenHeight * 0.07), // Adjust the percentage as needed
    borderRadius:  15,
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom:  10
  },
  cancelButton: {
    backgroundColor: 'transparent', // Set the background color for the cancel button
      width: (screenWidth * 0.38), // Adjust the percentage as needed
      height: (screenHeight * 0.08), // Adjust the percentage as needed
    borderRadius:  15,
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom:  10
  },
  dateText: {
    marginLeft: "15%",
    paddingTop: "3%",
    color:"#908D93",
 },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30
  }
});

export default UpcomingModal;
