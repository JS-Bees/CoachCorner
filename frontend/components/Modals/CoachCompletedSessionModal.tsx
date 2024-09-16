import React, { useEffect, useState } from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay, Icon } from '@rneui/themed';
import CoacheeSessions from '../Profile Tiles/CoacheeSessionsTiles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import {format} from 'date-fns';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface SessionModalProps {
  visible: boolean;
  session: CoacheeSessions | null;
  toggleOverlay: (session: Session | null) => void;
}


const CompletedModal: React.FC<SessionModalProps> = ({ visible, session, toggleOverlay }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const navigateToChat = () => {
    navigation.navigate('CoachChatListsPage');
  };



  return (
    <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay(null)} 
    overlayStyle={styles.overlay} animationType="none"  >
      <View style={styles.container}>
        {session && (
          <>
          <View style={styles.imageContainer}>
          <Image source={session.imageSource} style={styles.sessionImage} />
          <TouchableOpacity onPress={navigateToChat}>
              <View style={styles.chatIconContainer}>
                <Icon name="chat" type="material" color="#7E3FF0" />
              </View>
            </TouchableOpacity>
          </View>
            <Text style={styles.sessionName}>{session.coacheeName}</Text>
            <Text style={styles.subtitleText}>  Completed sessions with this trainee</Text>
          </>
        )}

        <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Service Type</Text>
            <Text style={styles.subtitleText}>{session?.serviceType}</Text>
            <Text style={styles.titleText }>Additional Notes</Text>
            <View style={styles.notesPadding} numberOfLines={5} ellipsizeMode="tail">
              <Text style={styles.subtitleText}>{session?.additionalNotes}</Text>
            </View>


            <View style={styles.contentText}>
            <Text style={styles.titleText}>Time</Text>
            <Text style={styles.titleText}>Date</Text>   
            
          </View>
        </View>
        <View style={styles.subContent}>
        <FlatList
            data={session?.time}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            <View style={styles.timeRow}>
            <Text style={styles.subcontentText}>
              {format(new Date(item.startTime), 'h:mm a')} - {format(new Date(item.endTime), 'h:mm a')}
            </Text>
      </View>
    )}
  />
         <FlatList
    data={session?.date.map(item => format(new Date(item), 'MMMM d, EEEE'))}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={styles.dateRow}>
        <Text style={styles.subcontentText}>
          {item}
        </Text>
      </View>
    )}
  />
</View>



  
  
  </View>





      
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 15,
    height: "75%",
    width: "85%",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: '#7E3FF0', 
    padding: 1, 
  },
  contentContainer:{
    paddingTop: "10%",
    left: "10%"
  },
  contentText: {
    top: "5%",
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    paddingTop: "10%",
    flexDirection: 'row',
  },
  subContent: {
    top: "5%",
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: "space-between",
    left: "-2%",
  },
  sessionImage: {
    width: (screenWidth * 0.17),
    height: (screenWidth * 0.17),
    marginBottom: 10,
    borderRadius: 50,
  },
  sessionName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#7E3FF0"
  },
  subtitleText: {
    paddingTop: "3%",
    color:"#908D93"
  },
  titleText: {
    color: "#7E3FF0",
    fontSize: 15,
    fontWeight: '500',
    marginRight: "45%"
  },
  contentTitleText:{
    color: "#7E3FF0",
    fontSize: 15,
    fontWeight: '500',
    marginRight: "40%"
  },
  subcontentText: {
    paddingTop: "3%",
    color:"#908D93",
    marginLeft: "12%",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7E3FF0"
  },
  Text: {
    fontSize: 15,
    fontWeight: "600",
    color: "white"
  },
  buttons: {
    backgroundColor: 'red',
    bottom: "-50%",
    marginLeft: "-110%"

  },
  buttonContainer:{
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    bottom:  '-30%', 
    left:  0,
    right:  0,
    paddingHorizontal:  10, 
  },
  button: {
    backgroundColor: '#7E3FF0',
      width: (screenWidth * 0.36), 
      height: (screenHeight * 0.07), 
    borderRadius:  15,
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom:  10
  },
  cancelButton: {
    backgroundColor: 'transparent',
      width: (screenWidth * 0.38), 
      height: (screenHeight * 0.08),
    borderRadius:  15,
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom:  10
  },

  completeButton: {
    backgroundColor: 'transparent', 
      width: (screenWidth * 0.38),
      height: (screenHeight * 0.08),
    borderRadius:  15,
    alignItems: 'center',
    justifyContent: 'center', 
    top: "15%",
    left: "5%"
  },
  dateText: {
    marginLeft: "15%",
    paddingTop: "3%",
    color:"#908D93",
 },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30
  },
  notesPadding: {
    paddingHorizontal: 2,
    marginRight: "15%",
    maxHeight: 150,
    overflow: 'hidden', 
  }
});

export default CompletedModal;
