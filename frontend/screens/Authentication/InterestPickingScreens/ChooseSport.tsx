import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';

type Sports = 'Soccer' | 'Basketball' | 'Volleyball' | 'Swimming';

const ChooseSport = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [checkedSport, setCheckedSport] = useState<Sports | null>(null);

  const { firstName, lastName, email, password, workplaceAddress, birthday, coachOrCoachee } = route.params;

  const handleCheckboxChange = (sport: Sports) => {
    setCheckedSport(sport);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleButtonPress = () => {
    if (checkedSport) {
      const selectedSports = [{ sport: checkedSport }];
      console.log(selectedSports);
      console.log(firstName);
      navigation.navigate('InterestPickingHobby', {
        selectedSports,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthday: birthday,
        workplaceAddress: workplaceAddress,
        coachOrCoachee: coachOrCoachee,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.iconContainer}>
        <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
      </TouchableOpacity>
      <Text style={styles.headerTop}>
        Great! We just need your preferred choices in our list to match you with fellow users
      </Text>
      <Text style={styles.header}>
        {coachOrCoachee === 'Coach' ? 'Which sport do you teach?' : 'What sports are you interested in?'}
      </Text>
      <Text style={styles.subtitle}>Choose 1 sport</Text>


      <View style={styles.radioContainer}>
        <RadioButton.Item
          label="Soccer"
          value="Soccer"
          status={checkedSport === 'Soccer' ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Soccer')}
          labelStyle={styles.radioButtonLabel}
          style={styles.radioButtonItem}
        />
        <RadioButton.Item
          label="Basketball"
          value="Basketball"
          status={checkedSport === 'Basketball' ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Basketball')}
          labelStyle={styles.radioButtonLabel}
          style={styles.radioButtonItem}
        />
        <RadioButton.Item
          label="Volleyball"
          value="Volleyball"
          status={checkedSport === 'Volleyball' ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Volleyball')}
          labelStyle={styles.radioButtonLabel}
          style={styles.radioButtonItem}
        />
        <RadioButton.Item
          label="Swimming"
          value="Swimming"
          status={checkedSport === 'Swimming' ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Swimming')}
          labelStyle={styles.radioButtonLabel}
          style={styles.radioButtonItem}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !checkedSport && styles.disabledButton]}
        onPress={handleButtonPress}
        disabled={!checkedSport}
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
  headerTop: {
    marginTop: '10%',
    fontSize: 16,
    fontWeight: '200',
    fontFamily: 'Roboto',
    color: '#656466',
    textAlign: 'center',
    left: "10%",
    width: "80%"
  },
  subtitle: {
    marginTop: '5%',
    fontSize: 14,
    fontWeight: '200',
    fontFamily: 'Roboto',
    color: '#908D93',
    textAlign: 'center',
  },
  radioContainer: {
    marginTop: '5%',
    left: "10%"
  },
  radioButtonItem: {
    flexDirection: 'row-reverse', // Reverse the direction to swap positions
    alignItems: 'center',
    justifyContent: 'space-between', // Center align button and label
    width: '50%', // Fixed width for each RadioButton.Item
  },
  radioButtonLabel: {
    fontSize: 16, // Adjust the font size as needed
    marginRight: 10, // Adjust the margin to position the label closer to the radio button
    textAlign: 'left', // Ensure label text alignment
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
