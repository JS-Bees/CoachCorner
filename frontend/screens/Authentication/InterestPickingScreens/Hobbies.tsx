import React, { useState } from 'react';
import CustomCheckBox from '../../../components/Custom components/CustomCheckBox';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons'

type Music = 'Rock' | 'Jazz' | 'Classical' | 'Pop' | 'K-Pop' | 'OPM';

const ChooseHobbies = ({route}) => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [checkedHobby, setCheckedGames] = useState<Record<Music, boolean>>({
        Rock: false,
        Jazz: false,
        Classical: false,
        Pop: false,  
        "K-Pop": false,  
        OPM: false,  
        
    });
    const { firstName, lastName, email, password, workplaceAddress, birthday, coachOrCoachee /* Add other data */ } = route.params;
    const { selectedSports } = route.params;

    const handleCheckboxChange = (MusicGenre: Music) => {
      setCheckedGames((prevCheckedHobby) => {
        const newCheckedHobby = { ...prevCheckedHobby };
        const checkedCount = Object.values(newCheckedHobby).filter((value) => value).length;
  
        if (checkedCount === 4 && !newCheckedHobby[MusicGenre]) {
          // If trying to check more than 4, uncheck the current checkbox
          newCheckedHobby[MusicGenre] = false;
        } else {
          // Toggle the state of the clicked checkbox
          newCheckedHobby[MusicGenre] = !newCheckedHobby[MusicGenre];
        }
  
        return newCheckedHobby;
      });
    };

    const checkedCount = Object.values(checkedHobby).filter((value) => value).length;
    const isMaxChecksReached = checkedCount === 3;

    const handleGoBack = () => {
      navigation.goBack();
    };

const handleButtonPress = () => {
  // Filter out the selected hobbies
  const selectedHobbies = Object.keys(checkedHobby)
      .filter(MusicGenre => checkedHobby[MusicGenre])
      .map(MusicGenre => ({
        MusicGenre
      }));
  
  // Log the selected hobbies data
  console.log(selectedHobbies);
  console.log(selectedSports)
  console.log(firstName)
  console.log(birthday)
  navigation.navigate("InterestPickingGames", 
  { selectedHobbies, 
    selectedSports,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    birthday: birthday,
    workplaceAddress: workplaceAddress,
    coachOrCoachee: coachOrCoachee,
  });
};


  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={handleGoBack} style={styles.iconContainer}>
      <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
     </TouchableOpacity>
      <Text style={styles.header}> Which genre of music do you prefer to enjoy during your downtime?</Text>
      <Text style={styles.subtitle}>Choose maximum of 3</Text>

      <View style={styles.checkboxContainer}>
        <CustomCheckBox checked={checkedHobby.Rock} checkedColor='#7E3FF0' label="Rock" onPress={() => handleCheckboxChange('Rock')} />
        <CustomCheckBox checked={checkedHobby.Jazz} checkedColor='#7E3FF0' label="Jazz" onPress={() => handleCheckboxChange('Jazz')} />
        <CustomCheckBox checked={checkedHobby.Classical} checkedColor='#7E3FF0' label="Classical" onPress={() => handleCheckboxChange('Classical')} />
        <CustomCheckBox checked={checkedHobby.Pop} checkedColor='#7E3FF0' label="Pop" onPress={() => handleCheckboxChange('Pop')} />
        <CustomCheckBox checked={checkedHobby['K-Pop']} checkedColor='#7E3FF0' label="K-Pop" onPress={() => handleCheckboxChange('K-Pop')} />
        <CustomCheckBox checked={checkedHobby.OPM} checkedColor='#7E3FF0' label="OPM" onPress={() => handleCheckboxChange('OPM')} />
    
      </View>


      <TouchableOpacity
        style={[styles.button, !isMaxChecksReached && styles.disabledButton]}
        onPress={handleButtonPress}
        disabled={!isMaxChecksReached}
        >
        <Text style={{ color: 'white', fontSize: 15, height: 40, paddingHorizontal: 10, paddingVertical: 10 }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: '10%',
    fontSize: 16,
    fontWeight: '200',
    fontFamily: 'Roboto',
    color: '#656466',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: '5%',
    fontSize: 14,
    fontWeight: '200',
    fontFamily: 'Roboto',
    color: '#908D93',
    textAlign: 'center',
  },
  checkboxContainer: {
    marginTop: '5%',
  },
  button: {
    marginTop: '5%',
    marginLeft: '11%',
    backgroundColor: '#7E3FF0',
    width: 300,
    borderRadius: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D4C5ED', 
  },
  iconContainer: {
    marginTop: "15%",
    marginLeft: "9%"
  },
});

export default ChooseHobbies;
