import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity
} from 'react-native';
import StarRating from '../StarRating';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface Profile {
  id: string;
  name: string;
  imageSource: ImageSourcePropType;
  gainedStars: number;
  mainSport: string,
  about: string;
  workplaceAddress: string;
}

interface CoachProfilesProp {
  profiles: Profile[];
}



const CoachProfiles: React.FC<CoachProfilesProp> = ({ profiles }) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAll, setShowAll] = useState(false);
  const visibleProfiles = showAll ? profiles : profiles.slice();

  const handleProfileClick = (profile: Profile) => {
    
    navigation.navigate("PreviewPage", {
      id: profile.id,
      profile: profile,
      gainedStars: profile.gainedStars,});
  };
  

    return (
      <View style={CoachProfileStyle.coachProfiles}>
      {visibleProfiles.map((profile, index) => (
        <TouchableOpacity
          key={index}
          style={[
            CoachProfileStyle.coachBoxes,
            index % 2 === 1 ? { marginLeft: '9%' } : null, // Add marginLeft for every second tile
            index >= 2 ? { marginTop: '5%' } : null // Add marginTop for tiles starting from the third one
          ]}
          onPress={() => handleProfileClick(profile)}
        >
          <Image
            source={profile.imageSource}
            style={CoachProfileStyle.profileImage}
          />
          <Text style={CoachProfileStyle.coachNameText}>{profile.name}</Text>
          <StarRating gainedStars={profile.gainedStars} starColor="#FECB2E" />
          <Text style={CoachProfileStyle.sport}>{profile.mainSport}</Text>
        </TouchableOpacity>
      ))}
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
        marginTop: '1%',
        borderRadius: 20
    },
    coachBoxes: {
      backgroundColor: 'white',
      marginTop: '5%',
      marginLeft: '5%', // Adjust the margin for better alignment
      width: (screenWidth * 0.38), // Adjust the percentage as needed
      height: (screenHeight * 0.25), // Adjust the percentage as needed
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
    sport:{
      color: "#7E3FF0",
    }
  


})

export default CoachProfiles;