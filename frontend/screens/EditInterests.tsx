import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';


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
  //reminder to add a separate modal asking the if they wish to continue after making changes

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const [lists, setLists] = useState([
    {
      title: 'Hobbies',
      items: [
        {text: 'Baking', checked: false },
        {text: 'Dancing', checked: false },
        {text: 'Cooking', checked: false },
        {text: 'Hiking', checked: false },
        {text: 'Painting', checked: false },
        {text: 'Photography', checked: false },
        {text: 'Reading', checked: false },
        {text: 'Singing', checked: false },
        {text: 'Travelling', checked: false },
        {text: 'Writing', checked: false },
      ],
      isExpanded: false,
    },
    {
      title: 'Movie Genre',
      items: [
        {text: 'Action', checked: false },
        {text: 'Anime', checked: false },
        {text: 'Adventure', checked: false },
        {text: 'Comedy', checked: false },
        {text: 'Drama', checked: false },
        {text: 'Fantasy', checked: false },
        {text: 'KDrama', checked: false },
        {text: 'SciFi', checked: false },
        {text: 'Horror', checked: false },
        {text: 'Mystery', checked: false },
        {text: 'Thriller', checked: false },
        {text: 'Romance', checked: false },
        {text: 'Documentary', checked: false },
        {text: 'Musical', checked: false },
      ],
      isExpanded: false,
    },
    {
      title: 'Video Games',
      items: [
        { text: 'Arknights', checked: false },
        { text: 'Azurlane', checked: false },
        { text: 'Callofduty', checked: false },
        { text: 'Candycrush', checked: false },
        { text: 'Clashofclans', checked: false },
        { text: 'Counterstrike', checked: false },
        { text: 'Dota', checked: false },
        { text: 'Genshinimpact', checked: false },
        { text: 'Lol', checked: false },
        { text: 'Minecraft', checked: false },
        { text: 'Mobilelegends', checked: false },
        { text: 'Overwatch', checked: false },
        { text: 'Pubg', checked: false },
        { text: 'Streetfighter', checked: false },
        { text: 'Tekken', checked: false },
        { text: 'Valorant', checked: false },
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

      <Text style={styles.headerText}>Edit Profile</Text>
      <Text style={styles.subHeaderText}>Interests</Text>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
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
    top: "6.5%",
    marginLeft: "25%",
    fontSize: 20,
    fontWeight: "500",
  },
  subHeaderText: {
    marginTop: "20%",
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
    bottom: "3%",
    marginLeft: "70%"
  },
  saveText: {
    color: "#7E3FF0",
    fontSize: 15,
  },
  subTitle: {
    marginLeft: "12%",
    bottom: "2%",
    color: "#908D93"
  }
});

export default EditInterests;
