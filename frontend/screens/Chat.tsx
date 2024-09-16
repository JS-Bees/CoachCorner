import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ViewStyle,
    SafeAreaView,
    FlatList,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { useMutation, useSubscription, useQuery } from 'urql';
import {
    NewMessageDocument,
    CreateMessageDocument,
    NewMessageSubscriptionVariables,
    CreateMessageMutationVariables,
    FindfilteredMessagesByContactIdDocument,
    UpdateContactedStatusDocument,
} from '../generated-gql/graphql';
import { RouteProp } from '@react-navigation/native';


type ChatScreenNavigationProp = NativeStackNavigationProp<
    RootStackParams,
    'ChatPage'
>;

type Props = {
    route: RouteProp<RootStackParams, 'ChatPage'>;
    navigation: ChatScreenNavigationProp;
};

const ChatPage: React.FC<Props> = ({ route }) => {
    const { chatMessage } = route.params;


    const imageSource = chatMessage.imageUrl;

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [isFocused, setIsFocused] = useState(false);

    const [messages, setMessages] = useState<string[]>([]);



    const [currentMessage, setCurrentMessage] = useState('');


    const [initialMessagesResult] = useQuery({
        query: FindfilteredMessagesByContactIdDocument,
        variables: { contactId: chatMessage.id, numberOfMessages: 50 },
        requestPolicy: 'cache-and-network',
    });

    const [result] = useSubscription<NewMessageSubscriptionVariables>({
        query: NewMessageDocument,
        variables: { channelName: `ChannelofContact${chatMessage.id}` },
    });

    const [createMessage, setCreateMessage] = useMutation(
        CreateMessageDocument,
    );

    const [, setUpdateContactedStatus] = useMutation(
        UpdateContactedStatusDocument,
    );

    useEffect(() => {
        if (initialMessagesResult.data) {

            const fetchedMessages =
                initialMessagesResult.data.findfilteredMessagesByContactId.map(
                    (message) => message.content,
                );
            setMessages(fetchedMessages.slice().reverse()); 
        }
    }, [initialMessagesResult.data]);

    useEffect(() => {

        if (result.data) {

            const newMessageContent = result.data.newMessage.content;

            setMessages((prevMessages) => [...prevMessages, newMessageContent]);

        }


    }, [result.data]);

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleNavigateToBooking = () => {
        navigation.navigate('Appointments');
    };
    const handleSendMessage = async (content: string) => {

        if (content.trim() === '') {

            return; 
        }
    
        try {
            console.log('Coach ID:', chatMessage.id);
            setCurrentMessage('');
            const response = await setCreateMessage({
                input: {
                    contactId: chatMessage.id,
                    content,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    




    const renderMessageItem = ({ item }: { item: string }) => {
        const isLeftAligned = item.endsWith(',;,');  
        const messageContent = isLeftAligned ? item.slice(0, -3) : item;
    
        return (
            <View
                style={[
                    isLeftAligned ? styles.chatBubbleLeft : styles.chatBubbleRight,
                ]}
            >
                <Text
                    style={[
                        isLeftAligned ? styles.messageTextLeft : styles.messageTextRight,
                    ]}
                >
                    {messageContent}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    ...styles.header,
              
                }}
            >
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon
                        name="arrow-back-circle-outline"
                        size={30}
                        color="#7E3FF0"
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>
                <Image source={imageSource} style={styles.profileImage} />
                <Text style={styles.headerText}>{chatMessage.sender}</Text>
                <TouchableOpacity
                    style={styles.bookmark}
                    onPress={handleNavigateToBooking}
                >
                    <MaterialIcons
                        name="pending-actions"
                        size={30}
                        color="#7E3FF0"
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    ...styles.messageContainer,
   
                }}
            >
                <FlatList
                    style={{ flex: 1, padding: 10, paddingBottom: 20,  }}
                    data={messages.slice().reverse()}
                    renderItem={renderMessageItem}
                    keyExtractor={(item, index) => index.toString()}
                    inverted 
                />
            </View>
            <View
                style={{
                    ...styles.inputArea,

                }}
            >
                <View style={styles.safeArea}>
                    <TextInput
                        style={[
                            styles.input,
                            isFocused ? styles.focusedInput : null,
                        ]}
                        placeholder="Type a message..."
                        onChangeText={setCurrentMessage} 
                        value={currentMessage} 
                        multiline={true}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    <TouchableOpacity
                        onPress={() => handleSendMessage(currentMessage)}
                    >
                        <Icon
                            name="send-outline"
                            size={30}
                            color="#7E3FF0"
                            style={styles.sendIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
   
        flex: 1,
 
        flexDirection: 'row',
        alignItems: 'center',
        top: '15%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    
    },
    arrowIcon: {
        marginLeft: '25%',
    },
    sendIcon: {
        marginLeft: '25%',
        bottom: '45%',
    },
    profileImage: {
        borderRadius: 25,
        width: 40,
        height: 40,
        marginLeft: '-10%',
    },
    headerText: {
        fontSize: 18,
        marginLeft: 10,
        width: "50%"
    
    },
    bookmark: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    messageContainer: {
  
        top: '10%',
        bottom: '50%',
        flex: 4,

    },
    safeArea: {
     
        flexDirection: 'row',
    },
    inputArea: {
        flex: 2,
        justifyContent: 'flex-end',

    },
    input: {
        height: 55,
        width: '75%',
        marginLeft: '5%',
        bottom: '10%',
        borderColor: '#D4C5ED',
        borderWidth: 1.5,
        borderRadius: 15,
    
        paddingLeft: 10,
        paddingRight: 10,
    },
    focusedInput: {
        borderColor: '#7E3FF0', 
    },
chatBubbleRight: {
    backgroundColor: '#7E3FF0',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%', 
    overflow: 'visible', 
},
chatBubbleLeft: {
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%', 
    overflow: 'visible', 
},
    messageTextRight: {
        color: 'white',
    },
    messageTextLeft: {
        color: 'black',
    },
});

export default ChatPage;
