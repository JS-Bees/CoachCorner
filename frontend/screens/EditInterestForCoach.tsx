import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FindCoachByIdDocument, UpdateCoachProfileDocument, UpdateCoachInterestsDocument } from '../generated-gql/graphql';
import { useMutation, useQuery } from 'urql';
import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, FlatList, Image, TextInput, Alert, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker



interface ListItem {
  text: string;
  checked: boolean;
}
 
interface List {
  title: string;
  items: ListItem[];
  isExpanded: boolean;
}

const EditInterestsForCoach = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [, executeMutation] = useMutation(UpdateCoachProfileDocument);
  const [, executeMutationUpdateInterest] = useMutation(UpdateCoachInterestsDocument);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [editedBio, setEditedBio] = useState<string>('');
  const [editedAddress, setEditedAddress] = useState<string>('');
  const [editedProfilePicture, setEditedProfilePicture] = useState<string>('');

  //reminder to add a separate modal asking the if they wish to continue after making changes
  //-------------------------------------------------------------------------------------------------------------------------------
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


const handleNavigateBack = () => {
  navigation.reset({
    routes: [{ name: 'NewCoachProfile' }],
  });
};


  const uploadImageToCloudinary = async (imageObject: any) => {
    try {
      const uploadPreset = 'coachcorner';
      const formData = new FormData();
      formData.append('file', imageObject); // Append the Blob directly
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
       // Ensure you're accessing the first asset's uri
       const imageUri = pickerResult.assets[0].uri;
       
       const imageObject = {
        uri: imageUri,
        type: `test/${imageUri.split('.')[1]}`,
        name: `test.${imageUri.split('.')[1]}`
       }

       // Upload the selected image to Cloudinary
       const uploadedImageUrl = await uploadImageToCloudinary(imageObject);
       setEditedProfilePicture(uploadedImageUrl)
       console.log('Uploaded image URL:', uploadedImageUrl);
   
       // Here you can use the uploadedImageUrl as needed, e.g., updating your state or database
   
    } catch (error) {
       console.error('Error picking an image:', error);
    }
   };


   const handleSaveChanges = async () => {
    // Check if either bio or address or profile picture is empty
    if (
      (!editedBio.trim() && !editedAddress.trim() && !editedProfilePicture.trim()) ||
      (editedBio.trim() === coachData?.findCoachByID.bio &&
        editedAddress.trim() === coachData?.findCoachByID.address &&
        editedProfilePicture.trim() === coachData?.findCoachByID.profilePicture)
    ) {
      Alert.alert('No changes made.');
      return;
    }
  
    try {
      const result = await executeMutation({
        updateCoachProfileId: parseInt(userToken),
        input: {
          bio: editedBio.trim() ? editedBio : coachData?.findCoachByID.bio || '',
          address: editedAddress.trim() ? editedAddress : coachData?.findCoachByID.address || '',
          profilePicture: editedProfilePicture
        }
      });
  
      // Check if mutation was successful
      if (result.error) {
        throw new Error(result.error.message);
      }
  
      // Update the original bio and address if they were changed
      if (editedBio.trim()) {
        setEditedBio(editedBio);
      }
      if (editedAddress.trim()) {
        setEditedAddress(editedAddress);
      }
  
      Alert.alert('Changes saved successfully.');
  
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('Error saving changes. Please try again.');
    }
    
    // Step 1: Retrieve all selected genres
    const selectedGenres = lists.flatMap(list => list.items.filter(item => item.checked));
    
    // Step 2: Count the total number of checked items
    const totalChecked = selectedGenres.length;
    
    // Step 3: Check if the user has selected exactly 9 items
    if (totalChecked !== 9) {
      Alert.alert('Please select exactly 9 genres in total.');
      return;
    } else {
      Alert.alert('Passed');
    }
  
    // Step 4: Retrieve stored interest IDs
    const interestIds = coachData?.findCoachByID.interests.map(interest => interest.id) || [];
    
    // Step 5: Extract names and types of selected genres
    const interestsInput = selectedGenres.map((genre, index) => ({
      id: interestIds[index], // Assign the corresponding interest ID from the stored IDs
      name: genre.text,
      type: lists.find(list => list.items.some(item => item.text === genre.text))?.title || '', // Find the title of the item
    }));


    console.log(interestsInput)
  
    try {
      // Step 6: Perform the mutation to update interests
      const result = await executeMutationUpdateInterest({
        input: interestsInput,
      });
  
      if (result.error) {
        throw new Error(result.error.message);
      }
  
      Alert.alert('Interests updated successfully.');
  
    } catch (error) {
      console.error('Error updating interests:', error);
      Alert.alert('Error updating interests. Please try again.');
    }
  };
  
    const [{ data: coachData, fetching, error }] = useQuery({
        query: FindCoachByIdDocument, // Use the Coachee query document
        variables: {
            userId: parseInt(userToken), // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network', // THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });

      useEffect(() => {
    if (coachData && coachData.findCoachByID) {
      // Set editedProfilePicture to the existing profile picture if it exists
      if (!editedProfilePicture && coachData.findCoachByID.profilePicture) {
        setEditedProfilePicture(coachData.findCoachByID.profilePicture);
      }
    }
  }, [coachData]);

    
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const [lists, setLists] = useState([
    {
      title: 'MovieGenre',
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
      title: 'BookGenre',
      items: [
        {text: 'Science Fiction', checked: false },
        {text: 'Young Adult', checked: false },
        {text: 'Fantasy', checked: false },
        {text: 'Romance', checked: false },
        {text: 'Mystery', checked: false },
        {text: 'Horror', checked: false },
      ],
      isExpanded: false,
    },
    {
      title: 'MusicGenre',
      items: [
        {text: 'Jazz', checked: false },
        {text: 'Classical', checked: false },
        {text: 'Pop', checked: false },
        {text: 'KPop', checked: false },
        {text: 'OPM', checked: false },
      ],
      isExpanded: false,
    },
  ]);

const toggleCheckbox = (listIndex: number, itemIndex: number) => {
  setLists((prevLists) => {
    const updatedLists = [...prevLists];
    let movieGenreCount = 0;
    let bookGenreCount = 0;
    let musicGenreCount = 0;

    // Count the number of checked items in each category
    updatedLists.forEach(list => {
      list.items.forEach(item => {
        if (item.checked) {
          switch (list.title) {
            case 'Movie Genre':
              movieGenreCount++;
              break;
            case 'Book Genre':
              bookGenreCount++;
              break;
            case 'Music Genre':
              musicGenreCount++;
              break;
            default:
              break;
          }
        }
      });
    });

    // Check if the maximum limit (3) is reached for the respective category
    switch (updatedLists[listIndex].title) {
      case 'Movie Genre':
        if (movieGenreCount >= 3 && !updatedLists[listIndex].items[itemIndex].checked) {
          return updatedLists; // If the limit is reached and the current checkbox is unchecked, do nothing
        }
        break;
      case 'Book Genre':
        if (bookGenreCount >= 3 && !updatedLists[listIndex].items[itemIndex].checked) {
          return updatedLists; // If the limit is reached and the current checkbox is unchecked, do nothing
        }
        break;
      case 'Music Genre':
        if (musicGenreCount >= 3 && !updatedLists[listIndex].items[itemIndex].checked) {
          return updatedLists; // If the limit is reached and the current checkbox is unchecked, do nothing
        }
        break;
      default:
        break;
    }

    // Toggle the checkbox
    updatedLists[listIndex].items[itemIndex].checked = !updatedLists[listIndex].items[itemIndex].checked;
    
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
    <View key={index} style={styles.listContainer}>
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

      <FlatList
        data={lists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderList(item, index)}
      />
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
    marginTop: "10%",
    marginLeft: "10%"
  },
  headerText: {
    marginTop: "10%",
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
    position: 'absolute',
    top: 20, // Adjust as needed
    right: 20, // Adjust as needed
    padding: 10,
    backgroundColor: '#7E3FF0',
    borderRadius: 5,
  },
  saveText: {
    color: 'white',
    fontSize: 15,
  },
  subTitle: {
    marginLeft: "12%",
    top: "1%",
    color: "#908D93"
  },
  circleImage: {
    width: 80, // Adjust width as needed
    height: 80, // Adjust height as needed
    position: 'absolute',
    bottom: '100%', // Adjusted to center vertically
    left: '30%', // Adjusted to center horizontally
    marginLeft: -50, // Half of the width
    marginBottom: -80, // Half of the height
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

export default EditInterestsForCoach;