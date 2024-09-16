import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity
} from 'react-native';
import CoacheePendingModal from '../Modals/CoacheePendingModal';
import CoacheeUpcomingModal from '../Modals/CoacheeUpcomingModal';
import CoacheeCompletedModal from '../Modals/CoacheeCompletedSessionModal';

import { format} from 'date-fns';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface Session {
  coachName: string;
  bookingId: number;
  status: string; 
  serviceType: string;
  imageSource: ImageSourcePropType;
  time: { startTime: string; endTime: string }[]; 
  date: string[]; 
}


interface CoacheeSessionsProp {
  sessions: Session[];
}



const CoachSessions: React.FC<CoacheeSessionsProp> = ({ sessions }) => {

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isPendingModalVisible, setPendingModalVisible] = useState(false);
  const [isUpcomingModalVisible, setUpcomingModalVisible] = useState(false);
  const [isCompletedModalVisible, setCompletedModalVisible] = useState(false);

  const toggleOverlay = (session: Session | null) => {
    setSelectedSession(session);
    if (session) {
      if (session.status === 'PENDING') {
        setPendingModalVisible(true);
        setUpcomingModalVisible(false);
        setCompletedModalVisible(false);
      } else if (session.status === 'UPCOMING') {
        setPendingModalVisible(false);
        setUpcomingModalVisible(true);
        setCompletedModalVisible(false);
      } else if (session.status === 'COMPLETED') {
        setPendingModalVisible(false);
        setUpcomingModalVisible(false);
        setCompletedModalVisible(true);
      }

    } else {
      setPendingModalVisible(false);
      setUpcomingModalVisible(false);
      setCompletedModalVisible(false);
    }
  };
  
  const [showAll, setShowAll] = useState(false);
  const visibleProfiles = showAll ? sessions : sessions.slice();

  
    return (
      <View style={CoachProfileStyle.coachProfiles}>
      {visibleProfiles.map((session, index) => (
        <TouchableOpacity
          key={index}
          style={[
            CoachProfileStyle.coachBoxes,
            index % 2 === 1 ? { marginLeft: '8%' } : null, 
            index >= 2 ? { marginTop: '5%' } : null 
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
        
     <CoacheePendingModal
        visible={isPendingModalVisible}
        session={selectedSession}
        toggleOverlay={() => setPendingModalVisible(false)}
      />
      <CoacheeUpcomingModal
        visible={isUpcomingModalVisible}
        session={selectedSession}
        toggleOverlay={() => setUpcomingModalVisible(false)}
      />
      <CoacheeCompletedModal
        visible={isCompletedModalVisible}
        session={selectedSession}
        toggleOverlay={() => setCompletedModalVisible(false)}
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
      backgroundColor: 'white',
      marginTop: '5%',
      marginLeft: '5%', 
      width: (screenWidth * 0.4), 
      height: (screenHeight * 0.19), 
      borderRadius: 16,
      borderColor: '#7E3FF0',
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