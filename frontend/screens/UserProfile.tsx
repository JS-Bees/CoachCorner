import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SvgComponent from '../components/BackgroundSvg';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const UserProfile = () => {
  const [mainProfession, setMainProfession] = useState('Main Profession'); // Initialize with default text

  return (
      <View style={ProfilePageStyle.container}>
          <View style={ProfilePageStyle.backgroundContainer}></View>
          <TouchableOpacity>
            <View style={ProfilePageStyle.topContainer}>
              <View style={ProfilePageStyle.topMiddleContainer}>
                <View style={ProfilePageStyle.topMiniContainer1}>
                  <Button mode="contained" style={{ backgroundColor: 'transparent' }} onPress={() => console.log('Pressed')}>
                    Logout
                  </Button>
                </View>
                <View style={ProfilePageStyle.topMiniContainer2}>
                  <View style={ProfilePageStyle.profileImageContainer}>
                    <Image
                      source={require('../assets/User.png')}
                      style={ProfilePageStyle.profileImage}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={ProfilePageStyle.middleContainer}>
            <Text style={ProfilePageStyle.name}>Noel Dela Cruz</Text>
            <Text>Main Profession</Text>
            <TextInput
              style={ProfilePageStyle.editableText}
              value={mainProfession}
              onChangeText={(text) => setMainProfession(text)}
            />
          </View>
          <View style={ProfilePageStyle.svgContainer}>
            <SvgComponent> </SvgComponent>
          </View>
      </View>
  )
};

const ProfilePageStyle = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  backgroundContainer: {
    borderRadius: 25,
    position: 'absolute',
    backgroundColor: '#DED2EA',
    height: height * 0.27,
    width: '100%',
    zIndex: 0,
  },
  topContainer: {
    borderRadius: 5,
    backgroundColor: '#9787B8',
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    flexDirection: 'row',
  },
  topMiddleContainer: {
    alignItems: 'center',
  },
  topMiniContainer1: {
    borderRadius: width * 0.15,
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -10,
    right: -120,
  },
  topMiniContainer2: {
    borderRadius: width * 0.20,
    width: width * 0.36,
    height: width * 0.36,
    backgroundColor: 'white',
    top: 100,
  },
  profileImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.15,
    overflow: 'hidden',
    alignItems: 'center',
  },
  greetings: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginTop: 10,
    marginLeft: 10,
  },
  name: {
    color: '#9787B8',
    fontWeight: '900',
    top: -50,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    
  },
  row: {
    flexDirection: 'row',
  },
  miniContainer: {
    borderRadius: 25,
    width: width * 0.35,
    height: height * 0.19,
    margin: 8,
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  editableText: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    width: '80%',
    marginTop: 10,
  },
});

export default UserProfile;
