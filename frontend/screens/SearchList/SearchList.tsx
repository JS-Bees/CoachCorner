import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView, TextInput, Dimensions } from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import BottomComponent from '../../components/BottomSvg';
import ListItemComponent from '../../components/ListItem';
import DraggableBottomSheet from '../../components/BottomSheet/BottomSheet';

const { width, height } = Dimensions.get('window');

const SearchList  = () => {

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const toggleBottomSheet = () => {
        setIsBottomSheetVisible(!isBottomSheetVisible)
    }



    const list = [
        {
            title: "Noelle de Cruz",
            subtitle: "Subtitle for Item 1",
        },
        {
            title: "Example",
            subtitle: "Subtitle for Item 2",
        },
        {
            title: "Example",
            subtitle: "Subtitle for Item 3",
        },
        {
            title: "Example",
            subtitle: "Subtitle for Item 3",
        },
        {
            title: "Example",
            subtitle: "Subtitle for Item 3",
        },
        {
            title: "Example",
            subtitle: "Subtitle for Item 3",
        },
        {
            title: "Example",
            subtitle: "Subtitle for Item 3",
        },
        {
            title: "Example",
            subtitle: "Subtitle for Item 3",
        },
        {
            title: "Example",
            subtitle: "Subtitle for Item 3",
        },
        {
            title: "Example",
            subtitle: "Subtitle for Item 3",
        },
    ]




    return (
        <View style = {style.container}>
          <BottomComponent style= {style.bottomSVG}/>
          <Ionicons name="arrow-back" size={30} style = {style.icon}/>

          <Text style={style.text}>Results</Text>

        
    
            <TextInput placeholder='Search' 
                        clearButtonMode='always' 
                        style = {style.inputText}
                        autoCapitalize='none'
                        autoCorrect={false}/>
    

        
            <ScrollView style={style.scrollContainer}>
            {list.map((item, i) => (
                <TouchableOpacity key={i} onPress={toggleBottomSheet}>
                    <ListItemComponent data={item}/>
                </TouchableOpacity>
            ) )}
            </ScrollView>

            {isBottomSheetVisible && (
                <DraggableBottomSheet onClose = {() => setIsBottomSheetVisible(false)}/>
            )}
        
        </View>
    )
    

}

const style = StyleSheet.create ({

    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        alignItems: 'center',
    },
    icon: {
        right: 165,
        color: "#915bc7"
    },

    inputText: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#F6F6F6',
        borderWidth: 1,
        borderRadius: 45,
        shadowColor: "#E8E8E8",
        shadowOffset: {
        width: 0,
        height: 4
        },
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 200,
        color: 'grey',
        width: 310
    },

    SearchContainer: {
        top: 15,
        flex: 1,
        alignContent: 'center'
    },

    text: {
        top: 5,
        alignItems: 'center',
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#915bc7',
        fontSize: 30
    },
    
    scrollContainer: {
        flex: 1,
        marginBottom: 145,
    },


    bottomSVG: {
        justifyContent: 'flex-end', 
        position: 'absolute',
        width: (width),
        height: (height),
        zIndex: 0,
    },

})

export default SearchList;