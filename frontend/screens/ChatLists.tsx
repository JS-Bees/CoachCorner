import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ChatMessage {
  id: string;
  message: string;
  sender: string;
  imageUrl: ImageSourcePropType
}

const ChatListPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleChatPress = (item: ChatMessage) => {
    navigation.navigate('ChatPage', { chatMessage: item });
  };

  const [chatMessages, ] = useState<ChatMessage[]>([
    { id: '1', message: 'Hello!', sender: 'Jane Smith', imageUrl: require("../assets/Jane_Smith.png") },
    { id: '2', message: 'Practice Today', sender: 'Serena Williams', imageUrl: require("../assets/Serena_Williams_at_2013_US_Open.jpg")  },
    { id: '3', message: 'You should work on it', sender: 'Kobe Bryan', imageUrl: require("../assets/Kobe_Brian.jpg")  },
  ]);

  const renderChatMessage = ({ item }: { item: ChatMessage }) => (
    <TouchableOpacity style={styles.chatMessage} onPress={() => handleChatPress(item)}>
      <Image source={item.imageUrl} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' style={{top: "10%", right: "45.5%"}} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.header}> Messages </Text>
      </View>

      <FlatList
        
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderChatMessage}
        style={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: "400",
  },
  chatList: {
    top: '3%',
    width: '100%',
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
  },
  iconContainer: {
    marginTop: '10%',
    marginLeft: '-75%',
    flexDirection: 'row',
  },
});

export default ChatListPage;
