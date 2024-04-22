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
import {
    FindCoacheeContactsByIdDocument,
    FindMessagesForCoachListDocument,
} from '../generated-gql/graphql';
import { useQuery } from 'urql';
import { useIsFocused } from '@react-navigation/native';

interface ChatMessage {
    id: number;
    message: string;
    sender: string;
    imageUrl: ImageSourcePropType;
    contactedStatus: boolean;
}

const ChatListPage: React.FC = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleChatPress = (item: ChatMessage) => {
        console.log('Contact ID:', item.id);
        navigation.navigate('ChatPage', { chatMessage: item });
    };

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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

    const useFetchMessagesForCoachlist = (userID: any) => {
        const [chatListMessageResult] = useQuery({
            query: FindMessagesForCoachListDocument, // Use the Coachee query document
            variables: {
                coacheeId: parseInt(userID),
            },
            requestPolicy: 'cache-and-network',
        });

        return chatListMessageResult;
    };

    const {
        data: coacheeChatListMessageData,
        loading: coacheeChatListMessageLoading,
        error: coacheeChatListMessageError,
    } = useFetchMessagesForCoachlist(userToken);

    // console.log(
    //     'chat list messages',
    //     coacheeChatListMessageData?.findMessagesForCoachList,
    // );

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
        // console.log('coacheeData:', coacheeData);
        const contacts = coacheeData?.findCoacheeByID.contacts;

        // Log all contacts
        // console.log(JSON.stringify(contacts, null, 2));
        // console.log('contacts');

        const messages = coacheeChatListMessageData?.findMessagesForCoachList;

        // Map over contacts and set chatMessages
        if (contacts) {
            const chatMessages = contacts.map((contact) => {
                const sender = `${contact.coach.firstName} ${contact.coach.lastName}`;
                let imageUrl;

                // Check if the profilePicture URL starts with 'https:'
                if (contact.coach.profilePicture.startsWith('https:')) {
                    imageUrl = { uri: contact.coach.profilePicture };
                } else {
                    // Use the fallback image if the URL does not start with 'https:'
                    imageUrl = require('../assets/User.png');
                }

                const messageForContact = messages?.find(
                    (message) => message.contactId === contact.id,
                );
                const messageContent = messageForContact
                    ? messageForContact.content
                    : 'No messages yet';

                return {
                    // make it pass coachId here
                    id: contact.id,
                    message: messageContent,
                    sender: sender,
                    imageUrl: imageUrl,
                    contactedStatus: contact.contactedStatus,
                };
            });

            setChatMessages(chatMessages);
        }
    }, [coacheeData, coacheeChatListMessageData]);

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
