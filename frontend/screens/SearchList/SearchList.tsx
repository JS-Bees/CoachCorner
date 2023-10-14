import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  TextInput,
  Dimensions,
  View,
  Platform,
} from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomComponent from '../../components/BottomSvg';
import ListItemComponent from '../../components/ListItem';
import DraggableBottomSheet from '../../components/BottomSheet/BottomSheet';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'urql';
import { FindUnaddedCoachesBySportDocument} from '../../generated-gql/graphql';

const { width, height } = Dimensions.get('window');

const SearchList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCoachData, setSelectedCoachData] = useState(null);

  const toggleBottomSheet = (coachData: React.SetStateAction<null>) => {
    setSelectedCoachData(coachData);
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token

  useEffect(() => {
      const fetchUserToken = async () => {
          try {
              const token = await AsyncStorage.getItem('userToken');
              setUserToken(token);
          } catch (error) {
              console.error('Error fetching token:', error);
          }
      };

      fetchUserToken();
  }, []);

  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);

  // Replace with your GraphQL query execution
  const [result] = useQuery({
    query: FindUnaddedCoachesBySportDocument,
    variables: { sport: searchQuery , coacheeID: parseInt(userToken)},
    requestPolicy: 'cache-and-network'
    // query: FindCoachesBySportDocument,
    // variables: { sport: searchQuery },
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    if (!fetching && !error && data) {
      // Ensure that the response structure matches your data shape
      setFilteredCoaches(data.findUnaddedCoachesBySport);
    }
  }, [fetching, error, data, searchQuery]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleSearch = (text) => {
    const trimmedText = text.trim(); // Remove leading and trailing white spaces
    const uppercaseText = trimmedText.toUpperCase();
    setSearchQuery(uppercaseText);
    setShowClearButton(uppercaseText !== '');

  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Backspace') {
      setSearchQuery(''); // Clear the search query
      setFilteredCoaches([]);
      setShowClearButton(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCoaches([]);
    setShowClearButton(false);
    
  };
  

  return (
    <View style={style.container}>
      <BottomComponent
        style={style.bottomSVG}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      />
      <View style={style.headerContainer}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} style={style.icon} onPress={goBack} />
        </TouchableOpacity>
        <Text style={style.text}>Results</Text>
      </View>

      <View style={style.searchContainer}>
        <TextInput
          placeholder="Search Sport"
          clearButtonMode="always"
          style={style.inputText}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={handleSearch}
          value={searchQuery}
          onKeyPress={handleKeyPress} // Handle backspace key
        />
        {showClearButton && (
          <TouchableOpacity style={style.clearButton} onPress={clearSearch}>
            <Ionicons name="close" size={20} color="grey" />
          </TouchableOpacity>
        )}
      </View>

      <View style={style.resultsContainer}>
        <ScrollView style={style.scrollContainer}>
          {filteredCoaches.slice(0, 10).map((coach) => (
            <TouchableOpacity key={coach.id} onPress={() => toggleBottomSheet(coach)}>
              <ListItemComponent data={coach} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isBottomSheetVisible && (
        <DraggableBottomSheet
        onClose={() => {
          setIsBottomSheetVisible(false);
          clearSearch(); // Call clearSearch when the bottom sheet is closed
        }}
          coachData={selectedCoachData}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15%',
    },
    icon: {
        left: '-250%',
        color: '#915bc7',
    },
    inputText: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#F6F6F6',
        borderWidth: 1,
        borderRadius: 45,
        shadowColor: '#E8E8E8',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 200,
        color: 'grey',
        width: 310,
    },
    searchContainer: {
        flexDirection: 'row', // Add this line to align the clear button horizontally
        alignItems: 'center',
        marginTop: '10%',
    },
    text: {
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#915bc7',
        fontSize: 30,
        zIndex: -1,
        top: '5%',
        right: '20%',
    },
    scrollContainer: {
        flex: 1,
        marginTop: 15,
        width: '100%',
        paddingHorizontal: 20,
    },
    resultsContainer: {
        flex: 1,
        marginTop: 15,
        width: '100%',
        paddingHorizontal: 20,
    },
    bottomSVG: {
        justifyContent: 'flex-end',
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 0,
    },
    clearButton: {
        position: 'absolute',
        right: 10,
        top: '30%',
    },
});

export default SearchList;
