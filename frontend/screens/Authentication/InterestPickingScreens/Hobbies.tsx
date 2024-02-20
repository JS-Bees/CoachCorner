import React, { useState } from 'react';
import CustomCheckBox from '../../../components/Custom components/CustomCheckBox';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons'

type Hobby = 'Reading' | 'Singing' | 'Playing' | 'Writing';

const ChooseHobbies = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [checkedGames, setCheckedGames] = useState<Record<Hobby, boolean>>({
        Reading: false,
        Singing: false,
        Playing: false,
        Writing: false,  
    });

    const handleCheckboxChange = (game: Hobby) => {
      setCheckedGames((prevCheckedGames) => {
        const newCheckedHobby = { ...prevCheckedGames };
        const checkedCount = Object.values(newCheckedHobby).filter((value) => value).length;
  
        if (checkedCount === 4 && !newCheckedHobby[game]) {
          // If trying to check more than 4, uncheck the current checkbox
          newCheckedHobby[game] = false;
        } else {
          // Toggle the state of the clicked checkbox
          newCheckedHobby[game] = !newCheckedHobby[game];
        }
  
        return newCheckedHobby;
      });
    };

    const areAnyChecked = Object.values(checkedGames).some((value) => value);
    const isMaxChecksReached = Object.values(checkedGames).filter((value) => value).length >= 4;


  const handleButtonPress = () => {
    navigation.navigate("InterestPickingMovie");
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.navigate("InterestPickingGames")} style={styles.iconContainer}>
      <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
     </TouchableOpacity>
      <Text style={styles.header}> Which of these do you like to do during downtime?</Text>
      <Text style={styles.subtitle}>Choose maximum of 3</Text>

      <View style={styles.checkboxContainer}>
        <CustomCheckBox checked={checkedGames.Reading} checkedColor='#7E3FF0' label="Reading books" onPress={() => handleCheckboxChange('Reading')} />
        <CustomCheckBox checked={checkedGames.Singing} checkedColor='#7E3FF0' label="Singing/Kareoke" onPress={() => handleCheckboxChange('Singing')} />
        <CustomCheckBox checked={checkedGames.Playing} checkedColor='#7E3FF0' label="Playing mobile games" onPress={() => handleCheckboxChange('Playing')} />
        <CustomCheckBox checked={checkedGames.Writing} checkedColor='#7E3FF0' label="Writing" onPress={() => handleCheckboxChange('Writing')} />
    
      </View>

      <TouchableOpacity
        style={[styles.button, (!areAnyChecked || isMaxChecksReached) && styles.disabledButton]}
        onPress={handleButtonPress}
        disabled={!areAnyChecked || isMaxChecksReached}
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
