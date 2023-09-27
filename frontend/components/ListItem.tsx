import React from 'react'
import { StyleSheet, View} from 'react-native'
import { List } from 'react-native-paper'

interface ListItemProps {
  data: {
    title: string;
    subtitle: string;
  };
  onPress?: () => void; // Add onPress prop
}


const ListItemComponent: React.FC<ListItemProps> = ( {data, onPress}) => (

  
  <View>
     <List.Item
      style = {style.listcontainer}
      title = {data.title}
      description ={data.subtitle}
      left={props => <List.Icon{...props} icon={'account-circle'}/>}
      onPress={onPress}/> 
  </View> 
 
      
)


const style = StyleSheet.create ({

  listcontainer: {
    top: 20,
    width: 300,
    backgroundColor: "transparent",
    alignItems: 'center'
  }

})


  
export default ListItemComponent;