import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

const NotificationPage: React.FC = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleNavigateBack = () => {
    navigation.goBack();
  };
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', message: 'Your session with Alexander Smith has been confirmed', read: false },
    { id: '2',  message: 'Your session with Sam Connor has been denied, please reschedule', read: false },
    { id: '3', message: 'Your session with Alexander Smith has been confirmed', read: false },

  ]);

  const markAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notification, { backgroundColor: item.read ? '#F9F4FF' : 'white' }]}
      onPress={() => markAsRead(item.id)}
    >
      <View>
        <Icon name="time-outline" size={30} color='#7E3FF0' style={styles.iconPlacement} />
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style = {styles.iconContainer}>
        <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
            </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        style={styles.notificationList}
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
  notificationList: {
    top: "3%",
    width: '100%',
  },
  notification: {
    padding: 4,
    marginTop: "2%",
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10
  },
  notificationMessage: {
    fontSize: 15,
    marginLeft: "15%",
    textAlign: "justify",
  },
  iconContainer: {
    marginTop: "10%",
    marginLeft: '-75%',
    flexDirection: 'row', 
  },
  iconPlacement: {
    left: "3%",
    top: "45%"
  }
});

export default NotificationPage;
