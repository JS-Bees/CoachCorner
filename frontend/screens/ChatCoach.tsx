import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    FlatList,
    Dimensions,
    Pressable,
} from 'react-native';

import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
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
} from '../generated-gql/graphql';
import { RouteProp } from '@react-navigation/native';


type ChatScreenNavigationProp = NativeStackNavigationProp<
    RootStackParams,
    'CoachChatPage'
>;

type Props = {
    route: RouteProp<RootStackParams, 'CoachChatPage'>;
    navigation: ChatScreenNavigationProp;
};

const ChatPage: React.FC<Props> = ({ route }) => {
    const { chatMessage } = route.params;

    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);
  
    const showMenu = () => setVisible(true);



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

    const [, setCreateMessage] = useMutation(CreateMessageDocument);

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
            console.log('New message content', newMessageContent);
            setMessages((prevMessages) => [...prevMessages, newMessageContent]);
            console.log('Message added to messages:', newMessageContent);
        }


        console.log('chat page messages', messages);
    }, [result.data]);

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleNavigateToBooking = () => {
        console.log(chatMessage.coacheeId, "the id")
        navigation.navigate('NewBookingPage', {coacheeId: chatMessage.coacheeId, coacheeName: chatMessage.sender,});

    };

   



    console.log("coacheeId = ", chatMessage.coacheeId)


    const handleSendMessage = async (content: string) => {

        if (content.trim() === '') {
            console.log(chatMessage.coacheeId)
            console.log('Cannot send an empty message.');
            return;
        }
    
        try {
            console.log('Coach ID:', chatMessage.id);
            setCurrentMessage('');
            const messageContent = content + ',;,'
            const response = await setCreateMessage({
                input: {
                    contactId: chatMessage.id,
                    content: messageContent,
                },
            });
            console.log('Message created:', response.data);
        } catch (error) {
            console.log(error);
        }
    };

 
    const renderMessageItem = ({ item }: { item: string }) => {

        const isRightAligned = item.endsWith(',;,');

        const messageContent = isRightAligned ? item.slice(0, -3) : item;

        return (
            <View
                style={[
                    isRightAligned
                        ? styles.chatBubbleRight
                        : styles.chatBubbleLeft,
                ]}
            >
                <Text
                    style={[
                        isRightAligned
                            ? styles.messageTextRight
                            : styles.messageTextLeft,
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
                <Menu
                    visible={visible}
                     anchor={ <Pressable style={styles.iconContainer}>
                     <MaterialIcons
                         name="more-vert"
                         size={24}
                         color="#7E3FF0"
                         onPress={showMenu}
                     />
                 </Pressable>}
                    onRequestClose={hideMenu}>
                <MenuItem onPress={handleNavigateToBooking}>Add Appointment</MenuItem>
                <MenuDivider />
                <MenuItem onPress={hideMenu}>Cancel</MenuItem>
                </Menu>
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
    buttonText: {
        fontStyle: "italic",
        color: "#7E3FF0"
    },
    iconContainer: {
        width: 30, 
        height: 30, 
        borderRadius: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2, 
        borderColor: '#7E3FF0', 
    },
});

export default ChatPage;
