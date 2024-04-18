import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity
} from 'react-native';

interface UpcomingSession {
    traineeName: string;
    imageSource: ImageSourcePropType;
    time: { startTime: string; endTime: string }[];  
    date: string[];  
}

interface UpcomingSessionsProp {
    upcoming: UpcomingSession[];
}

const UpcomingDashboard: React.FC<UpcomingSessionsProp> = ({upcoming}) => {

    if (upcoming.length ===   0) {
        return null; // Or return a placeholder view
    }

    // Extract the first session
   
    
    const firstTwoSessions = upcoming.slice(0,  3);
    
    return(
        <View style={style.container}>
          {firstTwoSessions.map((session, index) => (
             <TouchableOpacity key={index} style={style.sessionBoxes}>
                 <View style={style.sessionContent}>
                     <Image source={session.imageSource} style={style.profileImage}/>
                     <View style={style.textContainer}>
                         <Text style={style.nameText}>{session.traineeName}</Text>
                         {session.time.map((time, timeIndex) => (
                             timeIndex ===   0 ? (
                                 <Text key={`time-${timeIndex}`} style={style.subtitleText}>
                                     {`${time.startTime} - ${time.endTime} on ${session.date[0]}`}
                                 </Text>
                             ) : null
                         ))}
                     </View>
                 </View>
             </TouchableOpacity>
         ))}
        </View>
     )
}

const style = StyleSheet.create({
    container: {
        flex:  1,
        paddingBottom: 10
    },
    sessionBoxes: {
        marginTop: "4%",
        marginLeft: "8%",
        bottom: "-1%",
        backgroundColor: "white",
        borderRadius:  10,   
        borderColor: "#7E3FF0",
        borderWidth:  1,
        width:  335,  
        height:  80
    },
    sessionContent: {
        marginTop: "3%",        
        flexDirection: "row",
        alignItems: "center", // Align items vertically in the center
        justifyContent: "space-between", // Space out items horizontally
        paddingHorizontal: "2%",
        marginRight: "35%",
        marginLeft: "3%"
    },
    profileImage: {
        width:  40,
        height:  40,
        borderRadius:  20
    },
    textContainer: {
        flex:  1, // Take up the remaining space
        marginLeft:  10, // Add some space between the image and the text
    },
    nameText: {
        color: "#7E3FF0",
        fontWeight: "500"
    },
    subtitleText: {
        color: "#908D93",
        fontSize:  13,
        paddingTop:  5, // Add some space between the name and the time
    },
})

export default UpcomingDashboard;