import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import { RootStackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Button } from 'react-native-paper';

const Menu = () => {
    const navigation 
    = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  return (
    <View style={styles.container}>
      <Card>
    <Card.Actions>
      <Button onPress={()=> {navigation.push('MainScreen')}}>MainScreen</Button>
    </Card.Actions>
  </Card>
  <Card>
    <Card.Actions>
      <Button onPress={()=> {navigation.push('Profile')}}>Profile</Button>
    </Card.Actions>
  </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 8,
  },
  link: {
    fontSize: 16,
    marginTop: 4,
    color: '#097ade',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
  },
});

export default Menu;