import React, { useState } from 'react';
import CustomCheckBox from '../../../components/Custom components/CustomCheckBox';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons'

type Sports = 'Soccer' | 'Basketball' | 'Volleyball' | 'Badminton';

const ChooseSport = ({route}) => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [checkedSport, setCheckedSport] = useState<Record<Sports, boolean>>({
        Soccer: false,
        Basketball: false,
        Volleyball: false,
        Badminton: false,  
    });
    const { firstName, lastName, email, password, workplaceAddress, birthday, coachOrCoachee /* Add other data */ } = route.params;
    
    const handleCheckboxChange = (sport: Sports) => {
      setCheckedSport((prevCheckedHobby) => {
        const newCheckedSport = { ...prevCheckedHobby };
        const checkedCount = Object.values(newCheckedSport).filter((value) => value).length;
  
        if (checkedCount === 2 && !newCheckedSport[sport]) {
          // If trying to check more than 4, uncheck the current checkbox
          newCheckedSport[sport] = false;
        } else {
          // Toggle the state of the clicked checkbox
          newCheckedSport[sport] = !newCheckedSport[sport];
        }
  
        return newCheckedSport;
      });
    };

    const areAnyChecked = Object.values(checkedSport).some((value) => value);
    const isMaxChecksReached = Object.values(checkedSport).filter((value) => value).length >= 2;
 
    const handleGoBack = () => {
      navigation.goBack();
    };


const handleButtonPress = () => {
  // Filter out the selected hobbies
  const selectedSports = Object.keys(checkedSport)
      .filter(sport => checkedSport[sport])
      .map(sport => ({
          sport
      }));

  console.log(selectedSports);
  console.log(firstName)
  navigation.navigate("InterestPickingHobby", 
  { selectedSports,
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
      <Text style={styles.header}> Which of these do you like to do during downtime?</Text>
      <Text style={styles.subtitle}>Choose a sport</Text>

      <View style={styles.checkboxContainer}>
        <CustomCheckBox checked={checkedSport.Soccer} checkedColor='#7E3FF0' label="Soccer" onPress={() => handleCheckboxChange('Soccer')} />
        <CustomCheckBox checked={checkedSport.Basketball} checkedColor='#7E3FF0' label="Basketball" onPress={() => handleCheckboxChange('Basketball')} />
        <CustomCheckBox checked={checkedSport.Volleyball} checkedColor='#7E3FF0' label="Volleyball" onPress={() => handleCheckboxChange('Volleyball')} />
        <CustomCheckBox checked={checkedSport.Badminton} checkedColor='#7E3FF0' label="Badminton" onPress={() => handleCheckboxChange('Badminton')} />
    
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

export default ChooseSport;
