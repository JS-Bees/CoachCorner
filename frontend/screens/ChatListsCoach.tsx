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
    FindCoachContactsByIdDocument,
    FindMessagesForCoacheeListDocument,
} from '../generated-gql/graphql';
import { useQuery } from 'urql';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingBar from '../components/LoadingBar';

interface ChatMessage {
    id: number;
    message: string;
    sender: string;
    imageUrl: ImageSourcePropType;
    contactedStatus: boolean;    
}

const ChatListPage: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams, keyof RootStackParams>>();

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleChatPress = (item: ChatMessage) => {
        console.log('Contact ID:', item.id);
        navigation.navigate('CoachChatPage', { chatMessage: item });
    };


    
   

    const [userToken, setUserToken] = useState<string | null>(null); 
    const pollingInterval = 1000;

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
        const [chatListMessageResult,  refetch] = useQuery({
            query: FindMessagesForCoacheeListDocument,
            variables: {
                coachId: parseInt(userID),
            },
            requestPolicy: 'network-only',
        });
        return { chatListMessageResult, refetch };
    };

    const { chatListMessageResult, refetch } = useFetchMessagesForCoachlist(userToken);

    const {
        data: coachChatListMessageData,
        loading: coachChatListMessageLoading,
        error: coachChatListMessageError,
    } = chatListMessageResult;

    useEffect(() => {
        const intervalId = setInterval(() => {
          refetch(); 
        }, pollingInterval);
    
        return () => clearInterval(intervalId);
    }, []);






    const useFetchCoachByUserID = (userID: any) => {
        const [coachResult] = useQuery({
            query: FindCoachContactsByIdDocument,
            variables: {
                userId: parseInt(userID),
            },
            requestPolicy: 'cache-and-network',
        });

        return coachResult;
    };

    const {
        data: coachData,
        loading: coachLoading,
        error: coachError,
    } = useFetchCoachByUserID(userToken);



    useEffect(() => {
 
        const contacts = coachData?.findCoachByID.contacts;


        const messages = coachChatListMessageData?.findMessagesForCoacheeList;


        if (contacts) {
            const chatMessages = contacts.map((contact) => {
                const sender = `${contact.coachee.firstName} ${contact.coachee.lastName.split(' ')[0]}`;
                let imageUrl;


                if (contact.coachee.profilePicture.startsWith('https:')) {
                    imageUrl = { uri: contact.coachee.profilePicture };
                } else {
         
                    imageUrl = require('../assets/User.png');
                }

                const messageForContact = messages?.find(
                    (message) => message.contactId === contact.id,
                );
                const messageContent = messageForContact
                    ? messageForContact.content.endsWith(',;,')
                        ? messageForContact.content.slice(0, -3)
                        : messageForContact.content
                    : 'No messages yet';

                return {
                    id: contact.id,
                    message: messageContent,
                    sender: sender,
                    imageUrl: imageUrl,
                    contactedStatus: contact.contactedStatus,
                    coacheeId: contact.coachee.id
                };
            });

            setChatMessages(chatMessages);
        }
    }, [coachData, coachChatListMessageData]);

    const filteredChatMessages = chatMessages.filter(
        (item) => item.contactedStatus === true,
    );

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

            {coachLoading || coachChatListMessageLoading ? (
                <LoadingBar navigation={navigation} />
            ) : (
                <FlatList
                    data={filteredChatMessages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderChatMessage}
                    style={styles.chatList}
                    ListEmptyComponent={<Text style={styles.noContactsText}>No contacts yet</Text>}
                />
            )}
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
    noContactsText: {
        marginTop: '10%',
        fontSize: 24,
        textAlign: 'center'
    }
});

export default ChatListPage;
