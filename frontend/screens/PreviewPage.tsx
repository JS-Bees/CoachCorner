import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons'

type PreviewPageRouteProp = RouteProp<RootStackParams, 'PreviewPage'>;
type PreviewPageNavigationProp = NativeStackNavigationProp<RootStackParams, 'PreviewPage'>;


interface PreviewPageProps {
  route: PreviewPageRouteProp;
  navigation: PreviewPageNavigationProp;
}


const PreviewPage: React.FC<PreviewPageProps> = ({route}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    // const { profile } = route.params;
    
    
    return (
        <View>
            
            <TouchableOpacity onPress={() => navigation.navigate("CoacheeDashboard")} style={styles.iconContainer}>
            <Icon name="arrow-back-circle" size={30} color='#7E3FF0' />
            </TouchableOpacity>
            <View/>

            {/* <View> 
                <Image source={profile.imageSource}/>
            </View> */}

        </View>
        
      

        

    )

}

const styles = StyleSheet.create({
    iconContainer: {
        marginTop: "15%",
        marginLeft: "9%"
    },
})

export default PreviewPage;

