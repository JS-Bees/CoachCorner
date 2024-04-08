import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FindCoacheeContactsByIdDocument } from '../generated-gql/graphql';
import { useQuery } from 'urql';

interface ChatMessage {
    id: string;
    message: string;
    sender: string;
    imageUrl: ImageSourcePropType;
}

const ChatListPage: React.FC = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleChatPress = (item: ChatMessage) => {
        navigation.navigate('ChatPage', { chatMessage: item });
    };

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token

    const [coacheeData, setCoacheeData] = useState();

    // Replace '1' with the actual coachee ID based on token
    // const { data, error } = useQuery({
    //     query: FindCoacheeContactsByIdDocument,
    //     variables: { userId: 1 },
    // });

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

    const useFetchCoacheeByUserID = (userID: any) => {
        const [coacheeResult] = useQuery({
            query: FindCoacheeContactsByIdDocument, // Use the Coachee query document
            variables: {
                userId: parseInt(userID),
            },
        });

        return coacheeResult;
    };
    const {
        data: coacheeData,
        loading: coacheeLoading,
        error: coacheeError,
    } = useFetchCoacheeByUserID(userToken);

    useEffect(() => {
        console.log('coacheeData:', coacheeData);
    }, [coacheeData]);
    // if (error) {
    //     console.error('Query error:', error);
    // }

    // useEffect(() => {
    //     console.log(data);
    //     if (data) {
    //         // Save the coachee data in the state
    //         console.log('Chatlist did use effect run');
    //         console.log(data.findCoacheeContactsByID);
    //         setCoacheeData(data.findCoacheeContactsByID);
    //     }
    // }, [data]);

    // console.log('coachee data', data.findCoacheeByID);

    const [chatMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            message: 'Hello!',
            sender: 'Jane Smith',
            imageUrl: require('../assets/Jane_Smith.png'),
        },
        {
            id: '2',
            message: 'Practice Today',
            sender: 'Serena Williams',
            imageUrl: require('../assets/Serena_Williams_at_2013_US_Open.jpg'),
        },
        {
            id: '3',
            message: 'You should work on it',
            sender: 'Kobe Bryan',
            imageUrl: require('../assets/Kobe_Brian.jpg'),
        },
    ]);

    const renderChatMessage = ({ item }: { item: ChatMessage }) => (
        <TouchableOpacity
            style={styles.chatMessage}
            onPress={() => handleChatPress(item)}
        >
            <Image source={item.imageUrl} style={styles.avatar} />
            <View style={styles.messageContent}>
                <Text style={styles.sender}>{item.sender}</Text>
                <Text style={styles.message}>{item.message}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon
                        name="arrow-back-circle-outline"
                        size={30}
                        color="#7E3FF0"
                        style={{ top: '10%', right: '45.5%' }}
                    />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.header}> Messages </Text>
            </View>

            <FlatList
                data={chatMessages}
                keyExtractor={(item) => item.id}
                renderItem={renderChatMessage}
                style={styles.chatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        fontSize: 25,
        fontWeight: '400',
    },
    chatList: {
        top: '3%',
        width: '100%',
    },
    chatMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    messageContent: {
        flex: 1,
    },
    sender: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 16,
    },
    iconContainer: {
        marginTop: '10%',
        marginLeft: '-75%',
        flexDirection: 'row',
    },
});

export default ChatListPage;
