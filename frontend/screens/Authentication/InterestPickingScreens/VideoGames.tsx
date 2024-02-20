import React, { useState } from 'react';
import CustomCheckBox from '../../../components/Custom components/CustomCheckBox';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons'

type Game = 'PUBG' | 'DOTA' | 'LOL' | 'Valorant' | 'Overwatch';

const ChooseVideoGames = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [checkedGames, setCheckedGames] = useState<Record<Game, boolean>>({
        PUBG: false,
        DOTA: false,
        LOL: false,
        Valorant: false,
        Overwatch: false,
    });

    const handleCheckboxChange = (game: Game) => {
      setCheckedGames((prevCheckedGames) => {
        const newCheckedGames = { ...prevCheckedGames };
        const checkedCount = Object.values(newCheckedGames).filter((value) => value).length;
  
        if (checkedCount === 4 && !newCheckedGames[game]) {
          // If trying to check more than 4, uncheck the current checkbox
          newCheckedGames[game] = false;
        } else {
          // Toggle the state of the clicked checkbox
          newCheckedGames[game] = !newCheckedGames[game];
        }
  
        return newCheckedGames;
      });
    };

    const areAnyChecked = Object.values(checkedGames).some((value) => value);
    const isMaxChecksReached = Object.values(checkedGames).filter((value) => value).length >= 4;

  const handleButtonPress = () => {
    navigation.navigate("InterestPickingHobby");
  };
  

  return (
    <View style={styles.container}>

  
      <TouchableOpacity onPress={() => navigation.navigate("SignUpCoachee")} style={styles.iconContainer}>
      <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
     </TouchableOpacity>
     <Text style={styles.header}> Which of these games are you familiar with?</Text>
     <Text style={styles.subtitle}>Choose maximum of 3</Text>

      <View style={styles.checkboxContainer}>
        <CustomCheckBox checked={checkedGames.PUBG} checkedColor='#7E3FF0' label="PUBG" onPress={() => handleCheckboxChange('PUBG')} />
        <CustomCheckBox checked={checkedGames.DOTA} checkedColor='#7E3FF0' label="DOTA" onPress={() => handleCheckboxChange('DOTA')} />
        <CustomCheckBox checked={checkedGames.LOL} checkedColor='#7E3FF0' label="LOL: Wildrift" onPress={() => handleCheckboxChange('LOL')} />
        <CustomCheckBox checked={checkedGames.Valorant} checkedColor='#7E3FF0' label="Valorant" onPress={() => handleCheckboxChange('Valorant')} />
        <CustomCheckBox checked={checkedGames.Overwatch} checkedColor='#7E3FF0' label="Overwatch" onPress={() => handleCheckboxChange('Overwatch')} />
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

export default ChooseVideoGames;
