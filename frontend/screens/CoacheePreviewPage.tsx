import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';

type PreviewPageRouteProp = RouteProp<RootStackParams, 'PreviewPage'>;
type PreviewPageNavigationProp = NativeStackNavigationProp<
    RootStackParams,
    'PreviewPage'
>;

interface PreviewPageProps {
    route: PreviewPageRouteProp;
    navigation: PreviewPageNavigationProp;
}

interface ChatMessage {
    id: number;
    message: string;
    sender: string;
    imageUrl: ImageSourcePropType;
    contactedStatus: boolean;
    coacheeId: number; 
    coacheeName: string;

}

const CoacheePreviewPage: React.FC<PreviewPageProps> = ({ route }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const handleButtonPress = (item: ChatMessage) => {
        const chatMessage = {
            id: profile.contactId,
            coacheeId: profile.id,
            message: 'placeholder message',
            sender: profile.name,
            imageUrl: profile.imageSource,
            contactedStatus: profile.contactedStatus,
        };

        console.log('CoacheePreview chatMessage', chatMessage);
        navigation.navigate('CoachChatPage', { chatMessage: chatMessage });
    };

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const { profile } = route.params || {};



    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={profile?.imageSource}
                    style={styles.profileImage}
                />
                <TouchableOpacity
                    onPress={handleNavigateBack}
                    style={styles.iconContainer}
                >
                    <Icon name="arrow-back-circle" size={30} color="#FECB2E" />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.name}>{profile?.name}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.aboutText}>About</Text>
            </View>
            <View style={styles.aboutContainer}>
                <Text style={styles.about}>{profile?.about}</Text>
            </View>

            <View style={styles.affliationsContainer}>
                <Text style={styles.aboutText}></Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleButtonPress}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            height: 55,
                            paddingHorizontal: 15,
                            paddingVertical: 15,
                        }}
                    >
                        Message this Trainee
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    profileImage: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
        marginTop: '-110%',
    },
    iconContainer: {
        position: 'absolute',
        top: '7%',
        left: '6%',
        zIndex: 1,
    },
    heartIconContainer: {
        position: 'absolute',
        top: '6%',
        left: '5%',
        zIndex: 1,
        flexDirection: 'row',
        marginLeft: '85%',
    },
    header: {
        position: 'absolute',
        bottom: '45%',
        alignItems: 'center',
        left: '5%',
    },
    name: {
        fontFamily: 'Roboto',
        fontWeight: '200',
        fontSize: 25,
    },
    starsContainer: {
        flexDirection: 'row',
        bottom: '84%',
        left: '1.5%',
    },
    reviewsContainer: {
        position: 'absolute',
        bottom: '90%',
        left: '30%',
    },
    reviewText: {
        fontWeight: '500',
        fontSize: 15,
        color: '#7E3FF0',
    },
    content: {
        position: 'absolute',
        bottom: '36%', 
        alignItems: 'center',
        left: '5%',
    },
    aboutText: {
        fontFamily: 'Roboto',
        fontWeight: '200',
        fontSize: 20,
        bottom: '80%',
    },
    aboutContainer:{
        position: 'absolute',
        bottom: "38%", 
        left: "6%",
        width: "85%"
      },
      about: {
        position: "absolute",
        textAlign: "justify",
        lineHeight: 20, 
        fontFamily: "Roboto",
        fontWeight: '200',
        color: '#908D93',
      },
    buttonContainer: {
        position: 'absolute',
        bottom: '2%',
        alignItems: 'center',
        left: '3%',
        width: '85%',
    },
    button: {
        marginTop: '5%',
        marginLeft: '11%',
        backgroundColor: '#7E3FF0',
        width: 350,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
    },
    affliationsContainer: {
        position: 'absolute',
        bottom: '20%', 
        alignItems: 'center',
        left: '5%',
    },
    affliationsText: {
        position: 'absolute',
        textAlign: 'justify',
        lineHeight: 20, 
        fontFamily: 'Roboto',
        fontWeight: '200',
        left: '15%',
        color: '#908D93',
    },
});

export default CoacheePreviewPage;
