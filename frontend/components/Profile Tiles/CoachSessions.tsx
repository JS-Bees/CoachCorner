import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity
} from 'react-native';
import PendingModal from '../Modals/CoachPendingSessionModal';
import UpcomingModal from '../Modals/CoachUpcomingSessionModal';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import { format} from 'date-fns';

interface Session {
  coachName: string;
  bookingId: number;
  status: string; 
  serviceType: string;
  imageSource: ImageSourcePropType;
  time: { startTime: string; endTime: string }[]; // Array of objects with startTime and endTime
  date: string[]; // Array of strings for multiple dates
}


interface CoachSessionsProp {
  sessions: Session[];
}



const CoachSessions: React.FC<CoachSessionsProp> = ({ sessions }) => {

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isPendingModalVisible, setPendingModalVisible] = useState(false);
  const [isUpcomingModalVisible, setUpcomingModalVisible] = useState(false);

  const toggleOverlay = (session: Session | null) => {
    setSelectedSession(session);
    if (session) {
      if (session.status === 'PENDING') {
        setPendingModalVisible(true);
        setUpcomingModalVisible(false);
      } else if (session.status === 'UPCOMING') {
        setPendingModalVisible(false);
        setUpcomingModalVisible(true);
      }
    } else {
      setPendingModalVisible(false);
      setUpcomingModalVisible(false);
    }
  };
  
  

 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAll, setShowAll] = useState(false);
  const visibleProfiles = showAll ? sessions : sessions.slice();

  
    return (
      <View style={CoachProfileStyle.coachProfiles}>
      {visibleProfiles.map((session, index) => (
        <TouchableOpacity
          key={index}
          style={[
            CoachProfileStyle.coachBoxes,
            index % 2 === 1 ? { marginLeft: '8%' } : null, // Add marginLeft for every second tile
            index >= 2 ? { marginTop: '5%' } : null // Add marginTop for tiles starting from the third one
          ]}
          onPress={() => toggleOverlay(session)}
        >
          <Image
            source={session.imageSource}
            style={CoachProfileStyle.profileImage}
          />
          <Text style={CoachProfileStyle.coachNameText}>{session.coachName}</Text>
          <View style={CoachProfileStyle.subtitleContainer}>
          {session.time.length > 0 && (
          <Text style={CoachProfileStyle.subtitleText}>
             {`${format(new Date(session.time[0].startTime), 'h:mma')} - ${format(new Date(session.time[0].endTime), 'h:mma')}`}
          </Text>)}
          {session.date.length > 0 && (
          <Text style={[CoachProfileStyle.subtitleText, { textAlign: 'center' }]}>
             {format(new Date(session.date[0]), 'MMMM d, EEEE')}
          </Text>)}
       
          </View>
        </TouchableOpacity>
      ))}
        
        <PendingModal
        visible={isPendingModalVisible}
        session={selectedSession}
        toggleOverlay={() => setPendingModalVisible(false)}
      />
      <UpcomingModal
        visible={isUpcomingModalVisible}
        session={selectedSession}
        toggleOverlay={() => setUpcomingModalVisible(false)}
      />
    </View>
    );
};

const CoachProfileStyle = StyleSheet.create({
     coachProfiles: {
       paddingBottom: '5%',
       flexDirection: 'row',
      flexWrap: "wrap",
    },
    frameContainer: {
        backgroundColor: "#7E3FF0",
        marginTop: "5%",
        marginLeft: "7%",
        width: '85%',
        height: "15%",
        overflow: "hidden",
        borderRadius: 16  
    },
    profileImage: {
        width: 40,
        height: 40,
        marginTop: '-5%',
        borderRadius: 20
    },
    coachBoxes: {
        backgroundColor: "white",
        marginTop: "5%",
        marginLeft: "7%",
        width: (screenWidth * 0.4), // Adjust the percentage as needed
        height: (screenHeight * 0.19), // Adjust the percentage as needed
        borderRadius: 16,  
        borderColor: "#7E3FF0",
        borderWidth: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    coachNameText: {
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    seeAll: {
      color: "#7E3FF0",
      fontSize: 13,
      paddingTop: '1.5%',
      marginLeft: '47%'
    },
    subtitleContainer: {
      alignItems: "center",
      alignSelf: "center",
      paddingTop: "5%"
    },
    sportText: {
      color: "#7E3FF0",
      fontWeight: "400"
    },
    subtitleText: {
      color: "#908D93",
      fontSize: 13
    },
    
  
})

export default CoachSessions;