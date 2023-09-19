import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, Pressable, Platform } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import InputSignUpPages from "../../components/InputSignUpPages";
import LogInButton from "../../components/CustomButton";
import { RootStackParams } from "../../App";
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SignUp = () => {
  const [First_Name, setFirst_Name] = useState('');
  const [Last_Name, setLast_Name] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Repeat_Password, setRepeat_Password] = useState('');
  const [StreetAdd, setStreetAddress] = useState('');
  const [City, setCity] = useState('');
  const [Postal, setPostal] = useState('');
  const [dateOfBirth, setDateofBirth] = useState('');

  const [date, setdate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onSignUpPressed = () => {
    console.warn("Account Created");
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setdate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatePicker();
        setDateofBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.textStyle}>
            Create Account
          </Text>
        </View>

        <View style={styles.customContainer}>
          <InputSignUpPages placeholder="Full Name"
            value={First_Name}
            setValue={setFirst_Name} />
          <InputSignUpPages placeholder="Last Name"
            value={Last_Name}
            setValue={setLast_Name} />
          <InputSignUpPages placeholder="Email"
            value={Email}
            setValue={setEmail} />
        </View>

        <View style={styles.customContainer}>
          <InputSignUpPages placeholder="Password"
            value={Password}
            setValue={setPassword}
            secureTextEntry
          />
          <InputSignUpPages placeholder="Repeat Password"
            value={Repeat_Password}
            setValue={setRepeat_Password}
            secureTextEntry
            passwordToMatch={Password} // Compare with Password
          />
        </View>

        <View style={styles.birthdayContainer}>
          <Text style={styles.birthdayText}>
            Date of Birth
          </Text>

          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange} />
          )}

          {!showPicker && (
            <Pressable
              onPress={toggleDatePicker}>
              <TextInput
                style={styles.birthdayBorder}
                placeholder="Sat Aug 24 2001"
                value={dateOfBirth}
                onChangeText={setDateofBirth}
                editable={false} />
            </Pressable>
          )}
        </View>

        <View style={styles.AdressContainer}>
          <Text style={styles.birthdayText}>
            Address Information
          </Text>

          <InputSignUpPages placeholder="Street Address"
            value={StreetAdd}
            setValue={setStreetAddress} />
          <InputSignUpPages placeholder="City"
            value={City}
            setValue={setCity} />
          <InputSignUpPages placeholder="Postal Code"
            value={Postal}
            setValue={setPostal} />
        </View>

        <View style={styles.button}>
          <LogInButton text="Sign Up" onPress={onSignUpPressed} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
    zIndex: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  customContainer: {
    alignItems: "center",
    padding: 10,
  },
  button: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 3,
    padding: 10,
  },
  AdressContainer: {
    marginTop: 30,
    marginLeft: 25,
    justifyContent: 'flex-start',
  },
  birthdayContainer: {
    marginTop: 10,
    marginLeft: 25,
    justifyContent: 'flex-start',
  },
  birthdayBorder: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 154,
    width: 300,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    shadowRadius: 6,
    elevation: 6,
    shadowOpacity: 5,
    borderColor: '#e8e8e8',
  },
  birthdayText: {
    color: '#a19e9e',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "900",
    fontFamily: "Roboto",
    color: "#915bc7",
    textAlign: "left"
  },
});

export default SignUp;
