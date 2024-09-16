import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
 
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
            CoacheeProfileStyle.coacheeList,
          ]}
            onPress={() => handleProfileClick(coacheeProfiles)}
        >
          <View style={CoacheeProfileStyle.listContainer}>
          <Image
            source={coacheeProfiles.imageSource}
            style={CoacheeProfileStyle.profileImage}
          />
          <Text style={CoacheeProfileStyle.coacheeNameText}>{coacheeProfiles.name}</Text>
          <Text style={CoacheeProfileStyle.sport}>{coacheeProfiles.mainSport}</Text>
          </View>
          <View style={CoacheeProfileStyle.divider}></View>
        </TouchableOpacity>
      ))}

    </View>
    );
};

const CoacheeProfileStyle = StyleSheet.create({
    coacheeProfiles: {
        paddingBottom: '5%',
        flexWrap: "wrap",
        marginTop: "5%",
    },
    frameContainer: {
        backgroundColor: "#7E3FF0",
        overflow: "hidden",
        borderRadius: 16  
    },
    profileImage: {
        width: 40,
        height: 40,
        marginTop: '1%',
        borderRadius: 20
    },
    coacheeList:{
      alignContent: "center",
      marginLeft: "5%"
    },

    coacheeNameText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      marginLeft: "15%"
    },
    seeAll: {
      color: "#7E3FF0",
      fontSize: 13,
      paddingTop: '1.5%',
      marginLeft: '47%'
    },
    sport:{
      color: "#7E3FF0",
    },
    listContainer: {

      flexDirection: "row",
      paddingVertical: "3%"
    },
    divider: {
      height: 1,
        backgroundColor: '#e0e0e0',
        width: '175%',
        marginVertical: 4,
    }

})

export default CoacheeProfile;