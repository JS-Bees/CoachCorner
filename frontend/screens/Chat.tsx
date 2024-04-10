import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { ImageSourcePropType } from 'react-native';

interface RouteParams {
  route: {
    params: {
      name: string;
      profileImage: ImageSourcePropType;
      coacheeId: string; 
    };
  };
}


const ChatPage = ({route}: {route: RouteParams['route']}) => {
  const { name, profileImage} = route.params || {}
  console.log('Name:', name);
  console.log('Profile Image:', profileImage);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  


  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleNavigateToBooking = () => {
    navigation.navigate("NewBookingPage", {
      coacheeId: route.params?.coacheeId,
      coacheeName: route.params?.name
    });
  };

  console.log("Coachee ID from Preview Page:", route.params?.coacheeId); // to check if its the right id 


  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // Log the message
      console.log('Message sent:', message);
      
      // Add the message to the messages array
      setMessages([...messages, message]);
      
      // Clear the message input
      setMessage('');
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-back-circle-outline" size={30} color="#7E3FF0"  style={styles.arrowIcon} />
        </TouchableOpacity>
        <Image
            source={profileImage}
            style={styles.profileImage}/>
        <Text style={styles.headerText}>{name}</Text>
        <TouchableOpacity style={styles.bookmark} onPress={handleNavigateToBooking}>
          <Icon name="bookmark-outline" size={27} color="#7E3FF0"  style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.messageContainer}>
        <SafeAreaView style={styles.safeArea}>
          <TextInput
            style={[styles.input, isFocused ? styles.focusedInput : null]}
            placeholder="Type a message..."
            onChangeText={setMessage}
            value={message}
            multiline={true}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity onPress={handleSendMessage}>
             <Icon name="send-outline" size={30} color="#7E3FF0"  style={styles.sendIcon} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    top: "15%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  arrowIcon: {
    marginLeft: "25%"
  },
  sendIcon: {
    marginLeft: "25%",
    bottom: "45%"
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginLeft: '-10%',
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
  },
  bookmark: {
    marginLeft: 'auto',
    marginRight: -50,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  safeArea: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  input: {
    height: 55,
    width: "75%",
    marginLeft: "5%",
    bottom: "10%",
    borderColor: '#D4C5ED',
    borderWidth: 1.5,
    borderRadius: 15,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  focusedInput: {
    borderColor: '#7E3FF0', // Change the border color to your desired color
  },
});

export default ChatPage;
