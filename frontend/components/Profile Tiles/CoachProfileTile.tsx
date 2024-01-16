import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
} from 'react-native';
import StarRating from '../StarRating';

interface Profile {
  name: string;
  imageSource: ImageSourcePropType;
  gainedStars: number;
  mainSport: {
    name: string;
    proficiencyColor: string;
  };
  secondaryport: {
    name: string;
    proficiencyColor: string;
  };
}


interface CoachProfilesProp {
  profiles: Profile[];
}



const CoachProfiles: React.FC<CoachProfilesProp> = ({ profiles }) => {
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAll, setShowAll] = useState(false);
  const visibleProfiles = showAll ? profiles : profiles.slice(0.2);

    return (
      <View style={CoachProfileStyle.coachProfiles}>
        {visibleProfiles.map((profile, index) => (
          <View key={index} style={CoachProfileStyle.coachBoxes}>
            <Image
              source={profile.imageSource}
              style={CoachProfileStyle.profileImage}
            />
            <Text style={CoachProfileStyle.coachNameText}>{profile.name}</Text>
            <StarRating gainedStars={profile.gainedStars} starColor="#FECB2E" />
            {profile.mainSport && (
            <View
              style={{
                backgroundColor: profile.mainSport.proficiencyColor,
                width: 20,
                height: 20,
                borderRadius: 10,
                marginVertical: 5,
              }}
            />
          )}
          <Text style={CoachProfileStyle.coachNameText}/>

            
          </View>
        ))}
      </View>
    );
};

const CoachProfileStyle = StyleSheet.create({
    coachProfiles: {
        paddingBottom: '5%',
        flexDirection: 'row'
    
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
        marginTop: '-10%'
    },
    coachBoxes: {
        backgroundColor: "white",
        marginTop: "5%",
        marginLeft: "7%",
        width: 150,
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
  


})

export default CoachProfiles;