import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity
} from 'react-native';
import SessionModal from '../Modals/UpcomingSessionModal';
interface Session {
  coachName: string;
  imageSource: ImageSourcePropType;
  sport: string;
  time: { startTime: string; endTime: string }[]; // Array of objects with startTime and endTime
  date: string[]; // Array of strings for multiple dates
}


interface CoachSessionsProp {
  sessions: Session[];
}



const Session: React.FC<CoachSessionsProp> = ({ sessions }) => {

  const [visibleOverlay, setVisibleOverlay] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const toggleOverlay = (session: Session | null) => {
    setSelectedSession(session);
    setVisibleOverlay(!visibleOverlay);
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
          <Text style={CoachProfileStyle.sportText}>{session.sport}</Text>
          {session.time.length > 0 && (
          <Text style={CoachProfileStyle.subtitleText}>
            {session.time[0].startTime} - {session.time[0].endTime}
          </Text>)}
          {session.date.length > 0 && (
          <Text style={[CoachProfileStyle.subtitleText, { textAlign: 'center' }]}>
            {session.date[0]}
          </Text>)}
       
          </View>
        </TouchableOpacity>
      ))}
        <SessionModal 
        visible={visibleOverlay} 
        session={selectedSession} 
        toggleOverlay={toggleOverlay}
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
        width: 155,
        height: 150,
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

export default Session;