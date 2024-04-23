import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
} from 'react-native';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


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
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    if (upcoming.length ===   0) {
        return null; // Or return a placeholder view
    }

    // Extract the first session
   
    
    const firstTwoSessions = upcoming.slice(0,  3);
    
    return(
        <View style={style.container}>
          {firstTwoSessions.map((session, index) => (
             <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Sessions')} // Navigate to the Sessions page
             >
                 <View style={style.sessionBoxes}>
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
        width: (screenWidth * 0.85), // Adjust the percentage as needed
        height: (screenHeight * 0.11), // Adjust the percentage as needed
    },
    sessionContent: {
        marginTop: "3.5%",        
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