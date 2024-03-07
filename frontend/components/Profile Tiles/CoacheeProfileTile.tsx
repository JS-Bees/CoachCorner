import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';

interface CoacheeProfile {
  name: string;
  imageSource: ImageSourcePropType;
  mainSport: string,
  about: string;
  affliations: string; 
  achievements: string;
}


interface CoacheeProfilesProp {
  coacheeProfiles: CoacheeProfile[];
}



const CoacheeProfile: React.FC<CoacheeProfilesProp> = ({ coacheeProfiles }) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAll, setShowAll] = useState(false);
  const visibleProfiles = showAll ? coacheeProfiles : coacheeProfiles.slice();

  const handleProfileClick = (profile: CoacheeProfile) => {
    navigation.navigate("CoacheePreviewPage", {
      profile: profile,});
  };
  

    return (
      <View style={CoacheeProfileStyle.coacheeProfiles}>
      {visibleProfiles.map((coacheeProfiles, index) => (
        <TouchableOpacity
          key={index}
          style={[
            CoacheeProfileStyle.coacheeBoxes,
            index % 2 === 1 ? { marginLeft: '9%' } : null, // Add marginLeft for every second tile
            index >= 2 ? { marginTop: '5%' } : null // Add marginTop for tiles starting from the third one
          ]}
            onPress={() => handleProfileClick(coacheeProfiles)}
        >
          <Image
            source={coacheeProfiles.imageSource}
            style={CoacheeProfileStyle.profileImage}
          />
          <Text style={CoacheeProfileStyle.coacheeNameText}>{coacheeProfiles.name}</Text>
          <Text style={CoacheeProfileStyle.sport}>{coacheeProfiles.mainSport}</Text>
        </TouchableOpacity>
      ))}
    </View>
    );
};

const CoacheeProfileStyle = StyleSheet.create({
    coacheeProfiles: {
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
        marginTop: '1%',
        borderRadius: 20
    },
    coacheeBoxes: {
        backgroundColor: "white",
        marginTop: "4%",
        marginLeft: "4%",
        width: 150,
        height: 140,
        borderRadius: 16,  
        borderColor: "#7E3FF0",
        borderWidth: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    coacheeNameText: {
      textAlign: 'center',
        textAlignVertical: 'center',
    },
    seeAll: {
      color: "#7E3FF0",
      fontSize: 13,
      paddingTop: '1.5%',
      marginLeft: '47%'
    },
    sport:{
      color: "#7E3FF0",
    }
  


})

export default CoacheeProfile;