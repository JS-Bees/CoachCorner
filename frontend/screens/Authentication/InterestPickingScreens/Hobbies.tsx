import React, { useState } from 'react';
import CustomCheckBox from '../../../components/Custom components/CustomCheckBox';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons'

type Music = 'Reading a Book' | 'Playing Games' | 'Playing Sports' | 'Arts and Crafts' | 'Hiking' | 'Gardening';

const ChooseHobbies = ({route}) => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [checkedHobby, setCheckedGames] = useState<Record<Music, boolean>>({
        "Reading a Book": false,
        "Playing Games": false,
        "Playing Sports": false,
        "Arts and Crafts": false,  
        Hiking: false,  
        Gardening: false,  
        
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
      <Text style={styles.header}>Favorite ways to relax on weekends?</Text>
      <Text style={styles.subtitle}>Choose 3 Activities</Text>

      <View style={styles.checkboxContainer}>
        <CustomCheckBox checked={checkedHobby['Reading a Book']} checkedColor='#7E3FF0' label="Reading a Book" onPress={() => handleCheckboxChange('Reading a Book')} />
        <CustomCheckBox checked={checkedHobby['Playing Games']} checkedColor='#7E3FF0' label="Playing Games" onPress={() => handleCheckboxChange('Playing Games')} />
        <CustomCheckBox checked={checkedHobby['Playing Sports']} checkedColor='#7E3FF0' label="Playing Sports" onPress={() => handleCheckboxChange('Playing Sports')} />
        <CustomCheckBox checked={checkedHobby['Arts and Crafts']} checkedColor='#7E3FF0' label="Arts and Crafts" onPress={() => handleCheckboxChange('Arts and Crafts')} />
        <CustomCheckBox checked={checkedHobby.Hiking} checkedColor='#7E3FF0' label="Hiking" onPress={() => handleCheckboxChange('Hiking')} />
        <CustomCheckBox checked={checkedHobby.Gardening} checkedColor='#7E3FF0' label="Gardening" onPress={() => handleCheckboxChange('Gardening')} />
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
