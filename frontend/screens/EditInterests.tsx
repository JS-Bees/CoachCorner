import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FindCoacheeByIdDocument, UpdateCoacheeProfileDocument } from '../generated-gql/graphql';
import { useMutation, useQuery } from 'urql';
import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, FlatList, Image, TextInput, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker'; 



interface ListItem {
  text: string;
  checked: boolean;
}
 
interface List {
  title: string;
  items: ListItem[];
  isExpanded: boolean;
}

const EditInterests = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [, executeMutation] = useMutation(UpdateCoacheeProfileDocument);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [editedBio, setEditedBio] = useState<string>('');
  const [editedAddress, setEditedAddress] = useState<string>('');
  const [editedProfilePicture, setEditedProfilePicture] = useState<string>('');

 
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const uploadImageToCloudinary = async (imageObject: any) => {
    try {
      const uploadPreset = 'coachcorner';
      const formData = new FormData();
      formData.append('file', imageObject); 
      formData.append('upload_preset', uploadPreset);


      const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/dkwht3l4g/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const cloudinaryData = await cloudinaryResponse.json();
      
      return cloudinaryData.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
 };

 const selectImage = async () => {
    try {
       const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
       if (!permissionResult.granted) {
         alert('Permission to access camera roll is required!');
         return;
       }
   
       const pickerResult = await ImagePicker.launchImageLibraryAsync();
       if (pickerResult.canceled) {
         return;
       }

       const imageUri = pickerResult.assets[0].uri;
       
       const imageObject = {
        uri: imageUri,
        type: `test/${imageUri.split('.')[1]}`,
        name: `test.${imageUri.split('.')[1]}`
       }


       const uploadedImageUrl = await uploadImageToCloudinary(imageObject);
       setEditedProfilePicture(uploadedImageUrl)
       console.log('Uploaded image URL:', uploadedImageUrl);
   

   
    } catch (error) {
       console.error('Error picking an image:', error);
    }
   };

   const handleSaveChanges = async () => {

    if ((!editedBio.trim() && !editedAddress.trim() && !editedProfilePicture.trim()) || 
        (editedBio.trim() === coacheeData?.findCoacheeByID.bio && 
         editedAddress.trim() === coacheeData?.findCoacheeByID.address &&
         editedProfilePicture.trim() === coacheeData?.findCoacheeByID.profilePicture)) 
        {
        Alert.alert('No changes made.');
        return;
    } 

    try {
        await executeMutation({
            updateCoacheeProfileId: parseInt(userToken),
            input: {
                bio: editedBio.trim() ? editedBio : coacheeData?.findCoacheeByID.bio || '',
                address: editedAddress.trim() ? editedAddress : coacheeData?.findCoacheeByID.address || '',
                profilePicture: editedProfilePicture
            }
        });


        if (editedBio.trim()) {
            setEditedBio(editedBio);
        }
        if (editedAddress.trim()) {
            setEditedAddress(editedAddress);
        }

       
    } catch (error) {
        console.error('Error saving changes:', error);
        Alert.alert('Error saving changes. Please try again.');
    }
};

    const [{ data: coacheeData, fetching, error }] = useQuery({
        query: FindCoacheeByIdDocument, 
        variables: {
            userId: parseInt(userToken), 
        },
        requestPolicy: 'cache-and-network', 
    });

    useEffect(() => {
      const fetchUserToken = async () => {
          try {
              const token = await AsyncStorage.getItem('userToken');
              console.log('token', token);
              setUserToken(token);
          } catch (error) {
              console.error('Error fetching token:', error);
          }
      };
  
      fetchUserToken();
  }, []);

  

  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const [lists, setLists] = useState([
    {
      title: 'Music',
      items: [
        {text: 'Jazz', checked: false },
        {text: 'Classical', checked: false },
        {text: 'Pop', checked: false },
        {text: 'KPop', checked: false },
        {text: 'OPM', checked: false },
      ],
      isExpanded: false,
    },
    {
      title: 'Movie Genre',
      items: [
        {text: 'Action', checked: false },
        {text: 'Thriller', checked: false },
        {text: 'Comedy', checked: false },
        {text: 'Drama', checked: false },
        {text: 'Horror', checked: false },
        {text: 'Romance', checked: false },
        
      ],
      isExpanded: false,
    },
    {
      title: 'Book',
      items: [
        { text: 'Science Fiction', checked: false },
        { text: 'Young Adult', checked: false },
        { text: 'Fantasy', checked: false },
        { text: 'Romance', checked: false },
        { text: 'Mystery', checked: false },
        { text: 'Horror', checked: false }
      ],
      isExpanded: false,
    },
  ]);

  const toggleCheckbox = (listIndex: number, itemIndex: number) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const checkedCount = updatedLists[listIndex].items.filter((item) => item.checked).length;
      if (updatedLists[listIndex].items[itemIndex].checked || checkedCount < 3) {
        updatedLists[listIndex].items[itemIndex].checked = !updatedLists[listIndex].items[itemIndex].checked;
      }
      return updatedLists;
    });
  };

  const toggleList = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLists(prevLists => {
      const updatedLists = [...prevLists];
      updatedLists[index] = { ...updatedLists[index], isExpanded: !updatedLists[index].isExpanded };
      return updatedLists;
    });
  };

  

  const renderList = (list: List, index: number) => (
    <View key={index}>
      <TouchableOpacity onPress={() => toggleList(index)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: "2%",}}>
          <Text style={{ fontSize: 20, color: "#7E3FF0", fontWeight: "400"}}>{list.title}</Text>
          <Animated.View style={{ transform: [{ rotate: spin }], marginRight: "25%" }}>
            <Ionicons name={list.isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="#7E3FF0" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {list.isExpanded && (
        <FlatList
          data={list.items}
          keyExtractor={(item) => item.text}
          numColumns={2}
          renderItem={({ item, index: itemIndex }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingBottom: "5%" }}>
              <TouchableOpacity onPress={() => toggleCheckbox(index, itemIndex)}>
                <Ionicons name={item.checked ? 'checkbox' : 'checkbox-outline'} size={24} color="#7E3FF0" />
              </TouchableOpacity>
              <Text style={{ marginLeft: 10 }}>{item.text}</Text>
            </View>
          )}
        />
      )}
    </View>
  );

  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack} style={styles.arrowBack}>
        <Icon name="arrow-back-circle-outline" size={30} color="#7E3FF0" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>Edit Profile</Text>
      
      <Text style={styles.subHeaderText}>Profile Picture</Text>
      <TouchableOpacity onPress={selectImage}>
      <Image source={editedProfilePicture ? { uri: editedProfilePicture } : require('../assets/add-image.png')} style={styles.circleImage}/>
      </TouchableOpacity>

      <Text style={styles.subHeaderText}>Profile</Text>
      <TouchableOpacity>
        <View>
        <TextInput
                style={styles.input}
                value={editedBio}
                onChangeText={setEditedBio}
                placeholder="Edit Bio"
                multiline={true}
            />
          <TextInput
                style={styles.input}
                value={editedAddress}
                onChangeText={setEditedAddress}
                placeholder="Edit Address"
            />
        </View>
      </TouchableOpacity>
      

      <Text style={styles.subHeaderInterests}>Interests</Text>
      <Text style={styles.subTitle}> Please choose at most 3 </Text>

      <View style={styles.listContainer}>
        {lists.map((list, index) => renderList(list, index))}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: "5%"
  },
  arrowBack: {
    top: "10%",
    marginLeft: "10%"
  },
  headerText: {
    top: "6%",
    marginLeft: "25%",
    fontSize: 20,
    fontWeight: "500",
  },
  subHeaderText: {
    marginTop: "23%",
    marginLeft: "13%",
    fontSize: 25,
    fontWeight: "400",
  },
  subHeaderInterests: {
    marginTop: "5%",
    marginLeft: "13%",
    fontSize: 25,
    fontWeight: "400",
  },
  listContainer: {
    flex: 1,
    paddingTop: "5%",
    marginLeft: "15%"
  },
  saveButton: {
    top: "8%",
    marginLeft: "75%"
  },
  saveText: {
    color: "#7E3FF0",
    fontSize: 15,
  },
  subTitle: {
    marginLeft: "12%",
    top: "1%",
    color: "#908D93"
  },
  circleImage: {
    width: 80, 
    height: 80, 
    position: 'absolute',
    bottom: '100%', 
    left: '30%', 
    marginLeft: -50, 
    marginBottom: -80, 
    borderRadius: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    width: 260,
    left: "15%"
  },
});

export default EditInterests;