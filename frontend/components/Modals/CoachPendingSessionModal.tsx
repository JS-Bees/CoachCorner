import React, { useEffect, useState } from 'react';
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

interface SessionModalProps {
  visible: boolean;
  session: CoacheeSessions | null;
  toggleOverlay: (session: Session | null) => void;
}


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PendingModal: React.FC<SessionModalProps> = ({ visible, session, toggleOverlay }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [result, updateBookingStatus] = useMutation<UpdateBookingStatusMutation>(UpdateBookingStatusDocument);
  const [loading, setLoading] = useState(false);

  

  const navigateToChat = () => {
    navigation.navigate('CoachChatListsPage');
  };

  const navigateToReSched = () => {
    navigation.navigate("ReschedulePage", { session, slotsId: session?.slotsId, coacheeId: session});
  };
  

  const handleCancelSchedule = () => {
    setLoading(true);
    if (session?.bookingId) {
      const variables = {
        updateBookingStatusId: session.bookingId,
        input: { status: 'CANCELLED' }
      };
      updateBookingStatus(variables).then(() => {
        toggleOverlay(null); 
        navigateToReSched();
        setLoading(false);
      });
    } else {
      console.error("Cannot update status ");
    }
  };

  
  useEffect(() => {
    if (result.error) {
      console.error('Error updating booking status:', result.error.message);
    } else if (result.data) {
      console.log('Booking status updated successfully:', result.data.updateBookingStatus);
      
    }
  }, [result]);

  return (
    <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay(null)} 
    overlayStyle={styles.overlay} animationType="none"  >
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
            <Text style={styles.subtitleText}>  Pending sessions with this trainee</Text>
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

  <View>
  <TouchableOpacity style={styles.button} onPress={handleCancelSchedule}>
      <Text style={styles.re_schedText} >Re-Schedule</Text>
    </TouchableOpacity>
  </View>

   <View>
    <Text style={styles.awaitingText}>Awaiting Trainee Confirmation</Text>
   </View>




      </View>
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
    paddingTop: "5%",
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    paddingTop: "10%",
    flexDirection: 'row',
  },
  subContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: "space-between",
    left: "-2%",
  },
  sessionImage: {
    width: 65,
    height: 65,
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
    fontWeight: "500",
    color: "#908D93",
    justifyContent: "center"
  },
  buttons: {
    bottom: "-66%",
    marginLeft: "-110%"

  },
  buttonContainer:{
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    bottom:  20, 
    left:  0,
    right:  0,
    paddingHorizontal:  10, 
  },
  button: {
    marginTop: '15%',
    marginLeft: '60%',
    width: 140,
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
  },
  awaitingText: {
    top: "35%",
    backgroundColor: 'transparent', 
    borderRadius:  15,
    alignItems: 'center',
    justifyContent: 'center', 
    color:"#908D93",
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
  },
  re_schedText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7E3FF0"
  },
  
});

export default PendingModal;
