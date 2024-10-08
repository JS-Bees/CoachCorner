import React, { useEffect } from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay, Icon } from '@rneui/themed';
import CoachSessions from '../Profile Tiles/CoacheeSessionsTiles';
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
  session: CoachSessions | null;
  toggleOverlay: (session: Session | null) => void;
}

//make a component for custom start and end time 
//make another component for multiple dates 

const CoacheePendingModal: React.FC<SessionModalProps> = ({ visible, session, toggleOverlay }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [result, updateBookingStatus] = useMutation<UpdateBookingStatusMutation>(UpdateBookingStatusDocument);

  

  const navigateToChat = () => {
    navigation.navigate('ChatList');
  };

  const handleConfirmSchedule = () => {
    if (session?.bookingId) {
      const variables = {
        updateBookingStatusId: session.bookingId,
        input: { status: 'UPCOMING' }
      };
      updateBookingStatus(variables);
      toggleOverlay(null); // Close the modal
      alert('Confirmed Schedule');
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

  // console.log("Session in modal:", session)

  

  return (
    <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay(null)} 
    overlayStyle={styles.overlay} animationType="none"  >
      <View style={styles.container}>
        {session && (
          <>
          <View style={styles.imageContainer}>
          <Image source={session.imageSource} style={styles.sessionImage} />
          <TouchableOpacity onPress={navigateToChat}>
              <View style={styles.chatIconContainer}>
                <Icon name="chat" type="material" color="#7E3FF0" />
              </View>
            </TouchableOpacity>
          </View>
            <Text style={styles.sessionName}>{session.coachName}</Text>
            <Text style={styles.subtitleText}>  Pending sessions with this coach</Text>
          </>
        )}

        <View style={styles.contentContainer}>

            <Text style={styles.titleText}>Service Type</Text>
            <Text style={styles.subtitleText}>{session?.serviceType}</Text>

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
    <TouchableOpacity style={styles.cancelButton} onPress={handleConfirmSchedule}>
      <Text style={styles.cancelText}>Confirm Schedule</Text>
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
    position: "relative"
  },
  container: {
    alignItems: "center",
    padding: 20,
    position: 'relative', 
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: '#7E3FF0', 
    padding: 1, 
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
    color:"#7E3FF0",
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
  buttonContainer: {
    position: 'absolute',
    top: "135%", 
    left: 15, 
    alignItems: 'center',
    paddingVertical: "5%",
    justifyContent: 'center',
 },
 cancelButton: {
    borderColor: '#7E3FF0', 
    borderWidth: 1,
    width: (screenWidth * 0.38), 
    height: (screenHeight * 0.07), 
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
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


export default CoacheePendingModal;

