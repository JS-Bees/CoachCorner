import React, { useState } from 'react';
import CustomCheckBox from '../../../components/Custom components/CustomCheckBox';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons'

type Book = 'Relaxing' | 'Socializing' | 'Traveling' | 'Exercising' | 'Shopping' | 'Hobbies';

const ChooseVideoGames = ({route}) => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [checkedGames, setCheckedGames] = useState<Record<Book, boolean>>({
        Relaxing: false,
        Socializing: false,
        Traveling: false,
        Exercising: false,
        Shopping: false,
        Hobbies: false,
    });
 
    const { firstName, lastName, email, password, workplaceAddress, birthday, coachOrCoachee  } = route.params;
    const { selectedHobbies } = route.params;
    const { selectedSports } = route.params;


    const handleCheckboxChange = (BookGenre: Book) => {
      setCheckedGames((prevCheckedGames) => {
        const newCheckedGames = { ...prevCheckedGames };
        const checkedCount = Object.values(newCheckedGames).filter((value) => value).length;
  
        if (checkedCount === 4 && !newCheckedGames[BookGenre]) {

          newCheckedGames[BookGenre] = false;
        } else {
       
          newCheckedGames[BookGenre] = !newCheckedGames[BookGenre];
        }
  
        return newCheckedGames;
      });
    };

    const checkedCount = Object.values(checkedGames).filter((value) => value).length;
    const isMaxChecksReached = checkedCount === 3;

    const handleGoBack = () => {
      navigation.goBack();
    };


    const handleButtonPress = () => {
  
      const selectedGames = Object.keys(checkedGames)
          .filter(BookGenre => checkedGames[BookGenre])
          .map(BookGenre => ({
            BookGenre
          }));
      

      console.log(selectedGames);
      console.log(firstName)
 
      navigation.navigate("InterestPickingMovie", 
      { selectedSports,
        selectedHobbies, 
        selectedGames,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthday: birthday,
        workplaceAddress: workplaceAddress,
        coachOrCoachee: coachOrCoachee,
      });
      console.log(selectedSports)
    };
    

  return (
    <View style={styles.container}>

  
      <TouchableOpacity onPress={handleGoBack} style={styles.iconContainer}>
      <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
     </TouchableOpacity>
     <Text style={styles.header}>What do you prefer to do on your down time?</Text>
     <Text style={styles.subtitle}>Choose 3 Activities</Text>

      <View style={styles.checkboxContainer}>
        <CustomCheckBox checked={checkedGames.Relaxing} checkedColor='#7E3FF0' label="Relaxing" onPress={() => handleCheckboxChange('Relaxing')} />
        <CustomCheckBox checked={checkedGames.Socializing} checkedColor='#7E3FF0' label="Socializing" onPress={() => handleCheckboxChange('Socializing')} />
        <CustomCheckBox checked={checkedGames.Traveling} checkedColor='#7E3FF0' label="Traveling" onPress={() => handleCheckboxChange('Traveling')} />
        <CustomCheckBox checked={checkedGames.Exercising} checkedColor='#7E3FF0' label="Exercising" onPress={() => handleCheckboxChange('Exercising')} />
        <CustomCheckBox checked={checkedGames.Shopping} checkedColor='#7E3FF0' label="Shopping" onPress={() => handleCheckboxChange('Shopping')} />
        <CustomCheckBox checked={checkedGames.Hobbies} checkedColor='#7E3FF0' label="Hobbies" onPress={() => handleCheckboxChange('Hobbies')} />
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

export default ChooseVideoGames;
