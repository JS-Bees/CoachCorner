import React, { useState } from 'react';
import CustomCheckBox from '../../../components/Custom components/CustomCheckBox';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons'

type Book = 'Science Fiction' | 'Young Adult' | 'Fantasy' | 'Romance' | 'Mystery' | 'Horror';

const ChooseVideoGames = ({route}) => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [checkedGames, setCheckedGames] = useState<Record<Book, boolean>>({
        "Science Fiction": false,
        "Young Adult": false,
        Fantasy: false,
        Romance: false,
        Mystery: false,
        Horror: false,
    });
 
    const { firstName, lastName, email, password, workplaceAddress, birthday, coachOrCoachee /* Add other data */ } = route.params;
    const { selectedHobbies } = route.params;
    const { selectedSports } = route.params;


    const handleCheckboxChange = (BookGenre: Book) => {
      setCheckedGames((prevCheckedGames) => {
        const newCheckedGames = { ...prevCheckedGames };
        const checkedCount = Object.values(newCheckedGames).filter((value) => value).length;
  
        if (checkedCount === 4 && !newCheckedGames[BookGenre]) {
          // If trying to check more than 4, uncheck the current checkbox
          newCheckedGames[BookGenre] = false;
        } else {
          // Toggle the state of the clicked checkbox
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
      // Filter out the selected hobbies
      const selectedGames = Object.keys(checkedGames)
          .filter(BookGenre => checkedGames[BookGenre])
          .map(BookGenre => ({
            BookGenre
          }));
      
      // Log the selected hobbies data
      console.log(selectedGames);
      console.log(firstName)
      // Navigate to the next screen
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
    };
    

  return (
    <View style={styles.container}>

  
      <TouchableOpacity onPress={handleGoBack} style={styles.iconContainer}>
      <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
     </TouchableOpacity>
     <Text style={styles.header}> Which genre of books do you prefer to read during your downtime?</Text>
     <Text style={styles.subtitle}>Choose 3 Genres</Text>

      <View style={styles.checkboxContainer}>
        <CustomCheckBox checked={checkedGames['Science Fiction']} checkedColor='#7E3FF0' label="Science Fiction" onPress={() => handleCheckboxChange('Science Fiction')} />
        <CustomCheckBox checked={checkedGames['Young Adult']} checkedColor='#7E3FF0' label="Young Adult" onPress={() => handleCheckboxChange('Young Adult')} />
        <CustomCheckBox checked={checkedGames.Fantasy} checkedColor='#7E3FF0' label="Fantasy" onPress={() => handleCheckboxChange('Fantasy')} />
        <CustomCheckBox checked={checkedGames.Romance} checkedColor='#7E3FF0' label="Romance" onPress={() => handleCheckboxChange('Romance')} />
        <CustomCheckBox checked={checkedGames.Mystery} checkedColor='#7E3FF0' label="Mystery" onPress={() => handleCheckboxChange('Mystery')} />
        <CustomCheckBox checked={checkedGames.Horror} checkedColor='#7E3FF0' label="Horror" onPress={() => handleCheckboxChange('Horror')} />
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
