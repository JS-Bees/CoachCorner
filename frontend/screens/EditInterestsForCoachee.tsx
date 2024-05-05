import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FindCoacheeByIdDocument, UpdateCoacheeProfileDocument, UpdateCoacheeInterestsDocument } from '../generated-gql/graphql';
import { useMutation, useQuery } from 'urql';
import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, FlatList, Image, TextInput, Alert, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker
import { ActivityIndicator } from 'react-native-paper';



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
  const [, executeMutationUpdateInterest] = useMutation(UpdateCoacheeInterestsDocument);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [editedBio, setEditedBio] = useState<string>('');
  const [editedAddress, setEditedAddress] = useState<string>('');
  const [editedProfilePicture, setEditedProfilePicture] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Loading state for image upload

  
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
    index: 0,
    routes: [{ name: 'NewCoacheeProfile' }],
  });
};



const uploadImageToCloudinary = async (imageObject: any) => {
  try {
    setLoading(true); // Start loading
    const uploadPreset = 'coachcorner';
    const formData = new FormData();
    formData.append('file', imageObject);
    formData.append('upload_preset', uploadPreset);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/dkwht3l4g/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const cloudinaryData = await cloudinaryResponse.json();
    setLoading(false); // Stop loading after upload
    return cloudinaryData.secure_url;
  } catch (error) {
    setLoading(false); // Stop loading if error
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
    // Check if profile information has changed
    const noProfileChanges =
      (!editedBio.trim() && !editedAddress.trim() && !editedProfilePicture.trim()) ||
      (editedBio.trim() === coacheeData?.findCoacheeByID.bio &&
        editedAddress.trim() === coacheeData?.findCoacheeByID.address &&
        editedProfilePicture.trim() === coacheeData?.findCoacheeByID.profilePicture);
  
    if (noProfileChanges) {
      Alert.alert('No changes made.');
      return;
    }
  
    try {
      const profileResult = await executeMutation({
        updateCoacheeProfileId: parseInt(userToken),
        input: {
          bio: editedBio.trim() ? editedBio : coacheeData?.findCoacheeByID.bio || '',
          address: editedAddress.trim() ? editedAddress : coacheeData?.findCoacheeByID.address || '',
          profilePicture: editedProfilePicture,
        },
      });
  
      if (profileResult.error) {
        throw new Error(profileResult.error.message);
      }
  
      // Update profile information locally
      if (editedBio.trim()) {
        setEditedBio(editedBio);
      }
      if (editedAddress.trim()) {
        setEditedAddress(editedAddress);
      }
  
    } catch (error) {
      console.error('Error saving profile changes:', error);
      Alert.alert('Error saving profile changes. Please try again.');
    }
  
    // Step 1: Retrieve the current interests and selected genres
    const existingInterests = coacheeData?.findCoacheeByID?.interests || [];
  
    // Step 2: Flatten the selected genres
    const selectedGenres = lists.flatMap((list) => {
      return list.items
        .filter((item) => item.checked)
        .map((item) => ({
          name: item.text,
          type: list.title,
        }));
    });
  
    const interestsInput = [];
  
    // Step 3: Create a function to add or replace interests
    const ensureInterests = (existing, selected, type) => {
      const requiredGenres = 3 - selected.length;
      const existingOfType = existing.filter((e) => e.type === type);
  
      if (requiredGenres > 0) {
        // Fill with existing interests if needed
        const toAdd = existingOfType.slice(0, requiredGenres);
        interestsInput.push(
          ...selected,
          ...toAdd.map((e) => ({
            id: e.id,
            name: e.name,
            type: e.type,
          }))
        );
      } else {
        // Use existing IDs for the selected genres
        interestsInput.push(
          ...selected.map((s, i) => ({
            id: existingOfType[i].id,
            name: s.name,
            type: s.type,
          }))
        );
      }
    };
  
    // Step 4: Add or replace genres with existing interests if needed
    ensureInterests(existingInterests, selectedGenres.filter((g) => g.type === 'MovieGenre'), 'MovieGenre');
    ensureInterests(existingInterests, selectedGenres.filter((g) => g.type === 'BookGenre'), 'BookGenre');
    ensureInterests(existingInterests, selectedGenres.filter((g) => g.type === 'MusicGenre'), 'MusicGenre');
  
    try {
      const result = await executeMutationUpdateInterest({
        input: interestsInput,
      });
  
      if (result.error) {
        throw new Error(result.error.message);
      }
  
      Alert.alert('Changes saved successfully.');
    } catch (error) {
      Alert.alert('Choose 3 interest when changing a genre');
    }
  };

  
  

    const [{ data: coacheeData, fetching, error }] = useQuery({
        query: FindCoacheeByIdDocument, // Use the Coachee query document
        variables: {
            userId: parseInt(userToken), // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network', // THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });
    
    useEffect(() => {
      if (coacheeData && coacheeData.findCoacheeByID) {
        // Set editedProfilePicture to the existing profile picture if it exists
        if (!editedProfilePicture && coacheeData.findCoacheeByID.profilePicture) {
          setEditedProfilePicture(coacheeData.findCoacheeByID.profilePicture);
        }
      }
    }, [coacheeData]);


  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const [lists, setLists] = useState([
    {
      title: 'MusicGenre',
      items: [
        {text: 'Jazz', checked: false },
        {text: 'Classical', checked: false },
        {text: 'Pop', checked: false },
        {text: 'K-Pop', checked: false },
        {text: 'OPM', checked: false },
      ],
      isExpanded: false,
    },
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
      let movieGenreCount = 0;
      let bookGenreCount = 0;
      let musicGenreCount = 0;
  
      // Count the number of checked items in each category
      updatedLists.forEach(list => {
        list.items.forEach(item => {
          if (item.checked) {
            switch (list.title) {
              case 'MovieGenre':
                movieGenreCount++;
                break;
              case 'BookGenre':
                bookGenreCount++;
                break;
              case 'MusicGenre':
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
        case 'MovieGenre':
          if (movieGenreCount >= 3 && !updatedLists[listIndex].items[itemIndex].checked) {
            return updatedLists; // If the limit is reached and the current checkbox is unchecked, do nothing
          }
          break;
        case 'BookGenre':
          if (bookGenreCount >= 3 && !updatedLists[listIndex].items[itemIndex].checked) {
            return updatedLists; // If the limit is reached and the current checkbox is unchecked, do nothing
          }
          break;
        case 'MusicGenre':
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

  

  return (<View style={styles.container}>
    <TouchableOpacity onPress={handleNavigateBack} style={styles.arrowBack}>
      <Icon name="arrow-back-circle-outline" size={30} color="#7E3FF0" />
    </TouchableOpacity>
  
    <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
      <Text style={styles.saveText}>Save</Text>
    </TouchableOpacity>
  
    <Text style={styles.headerText}>Edit Profile</Text>
    
    <Text style={styles.subHeaderText}>Profile Picture</Text>
    <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.activityIndicator} /> // Loading inside circle
        ) : (
          <Image
            source={editedProfilePicture ? { uri: editedProfilePicture } : require('../assets/add-image.png')}
            style={styles.circleImage}
          />
        )}
      </TouchableOpacity>
  
    <Text style={styles.subHeaderText}>Profile</Text>
    <View style={styles.inputContainer}>
    <TextInput
  style={styles.input}
  value={editedBio}
  onChangeText={(text) => {
    if (text.length <= 50) {
      setEditedBio(text);
    }
  }}
  placeholder="Edit Bio"
  multiline={true}
  maxLength={50} // Limiting to 50 characters
/>
<TextInput
  style={styles.input}
  value={editedAddress}
  onChangeText={(text) => {
    if (text.length <= 50) {
      setEditedAddress(text);
    }
  }}
  placeholder="Edit Address"
  maxLength={50} // Limiting to 50 characters
/>
    </View>
    
    <Text style={styles.subHeaderInterests}>Interests</Text>
    <Text style={styles.subTitle}>Please choose 3 of each interest</Text>
  
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
      top: '4%',
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 10,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    arrowBack: {
      position: 'absolute',
      top: 10,
      left: 10,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
      color: '#333',
    },
    subHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: '#333',
    },
    subHeaderInterests: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: '#333',
    },
    saveButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 10,
      backgroundColor: '#7E3FF0',
      borderRadius: 5,
    },
    saveText: {
      color: 'white',
      fontSize: 16,
    },
    subTitle: {
      fontSize: 16,
      color: '#666',
      marginBottom: 10,
    },
    // circleImage: {
    //   width: 120,
    //   height: 120,
    //   borderRadius: 60,
    //   alignSelf: 'center',
    //   marginTop: 10,
    // },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    imageContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center', // Center the loading indicator
      height: 120,
      width: 120,
      borderRadius: 60,
      overflow: 'hidden',
      backgroundColor: '#ccc', // Default background color for the circle
    },
    circleImage: {
      alignSelf: 'center',
      height: '100%',
      width: '100%',
      borderRadius: 60,
    },
    activityIndicator: {
      position: 'absolute', // Position in the center
      alignSelf: 'center',
    },
  });

export default EditInterests;