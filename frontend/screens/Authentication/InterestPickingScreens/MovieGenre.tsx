import React, { useState } from 'react';
import CustomCheckBox from '../../../components/Custom components/CustomCheckBox';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons'


type Movie = 'Action' | 'Comedy' | 'Horror' | 'Romance';

const ChooseMovies = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [checkedGames, setCheckedGames] = useState<Record<Movie, boolean>>({
        Action: false,
        Comedy: false,
        Horror: false,
        Romance: false,
        
    });

    const handleCheckboxChange = (game: Movie) => {
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
    // Your logic when the button is pressed
    console.log('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("InterestPickingHobby")} style={styles.iconContainer}>
      <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
     </TouchableOpacity>
      <Text style={styles.header}> Which of these type of movies do you like?</Text>
      <Text style={styles.subtitle}>Choose maximum of 3</Text>

      <View style={styles.checkboxContainer}>
        <CustomCheckBox checked={checkedGames.Action} checkedColor='#7E3FF0' label="Action" onPress={() => handleCheckboxChange('Action')} />
        <CustomCheckBox checked={checkedGames.Comedy} checkedColor='#7E3FF0' label="Comedy" onPress={() => handleCheckboxChange('Comedy')} />
        <CustomCheckBox checked={checkedGames.Horror} checkedColor='#7E3FF0' label="Horror" onPress={() => handleCheckboxChange('Horror')} />
        <CustomCheckBox checked={checkedGames.Romance} checkedColor='#7E3FF0' label="Romance" onPress={() => handleCheckboxChange('Romance')} />
    
      </View>

      <TouchableOpacity
        style={[styles.button, (!areAnyChecked || isMaxChecksReached) && styles.disabledButton]}
        onPress={handleButtonPress}
        disabled={!areAnyChecked || isMaxChecksReached}
      >
        <Text style={{ color: 'white', fontSize: 15, height: 40, paddingHorizontal: 10, paddingVertical: 10 }}>Submit</Text>
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

export default ChooseMovies;
