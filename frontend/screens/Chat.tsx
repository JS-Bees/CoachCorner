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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

// Assuming your navigation stack is named 'Root'
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

    // Console logs
    // console.log('Sender Name:', chatMessage.sender);
    // console.log('image url', chatMessage.imageUrl.uri);
    // console.log('Contact ID', chatMessage.id);
    // console.log('Type of Contact ID', typeof chatMessage.id);
    console.log('Contacted Status', chatMessage.contactedStatus);

    const imageSource = chatMessage.imageUrl;

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    // const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const [messages, setMessages] = useState<string[]>([]);

    // const [messages, setMessages] = useState<string[]>(
    //     Array.from({ length: 20 }, (_, i) => `Message ${i + 1}`),
    // );

    const [currentMessage, setCurrentMessage] = useState('');

    // Use the FindFilteredMessagesByContactId query to fetch the initial 50 messages
    const [initialMessagesResult] = useQuery({
        query: FindfilteredMessagesByContactIdDocument,
        variables: { contactId: chatMessage.id, numberOfMessages: 50 },
        requestPolicy: 'cache-and-network',
    });

    const [result] = useSubscription<NewMessageSubscriptionVariables>({
        query: NewMessageDocument,
        variables: { channelName: `ChannelofContact${chatMessage.id}` },
        // variables: { channelName: `ChannelofContact1` },
    });

    const [createMessage, setCreateMessage] = useMutation(
        CreateMessageDocument,
    );

    const [, setUpdateContactedStatus] = useMutation(
        UpdateContactedStatusDocument,
    );

    useEffect(() => {
        if (initialMessagesResult.data) {
            // Assuming the data structure matches your expectations
            const fetchedMessages =
                initialMessagesResult.data.findfilteredMessagesByContactId.map(
                    (message) => message.content,
                );
            setMessages(fetchedMessages.slice().reverse()); // Directly update the messages state with the initial messages
        }
    }, [initialMessagesResult.data]);

    useEffect(() => {
        console.log('use effect ran');
        console.log('result data', result);
        console.log('result error', result.error?.networkError);
        // The data received from the useEffect should also be added to the messages array here
        if (result.data) {
            // Assuming createMessage.data has the structure { createMessage: { content: 'message content' } }
            const newMessageContent = result.data.newMessage.content;
            console.log('New message content', newMessageContent);
            setMessages((prevMessages) => [...prevMessages, newMessageContent]);
            console.log('Message added to messages:', newMessageContent);
        }

        // // Log each message to the console
        console.log('chat page messages', messages);
        // messages.forEach((message) => {
        //     console.log(message);
        // });
    }, [result.data]);

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleNavigateToBooking = () => {
        navigation.navigate('NewBookingPage');
    };

    const handleSendMessage = async (content: string) => {
        try {
            setCurrentMessage('');
            const response = await setCreateMessage({
                input: {
                    // contactId: 1,
                    contactId: chatMessage.id,
                    content,
                },
            });
            console.log('Message created:', response.data);

            // Check if contactedStatus is already true
            if (!chatMessage.contactedStatus) {
                // Proceed to update contactedStatus to true
                const updateResponse = await setUpdateContactedStatus({
                    updateContactedStatusId: chatMessage.id,
                    input: { contactedStatus: true },
                });
                console.log('Contacted status updated:', updateResponse.data);
            } else {
                console.log(
                    'Contacted status is already true. No update needed.',
                );
            }
        } catch (error) {
            // Handle error, e.g., show an error message
            console.log(error);
        }
    };

    // if (result.fetching) return <Text>Loading... Why</Text>;
    // if (result.error) return <Text>Error</Text>;
    // if (!result.data) return <Text>No data received yet.</Text>;

    // Render each message item
    const renderMessageItem = ({ item }: { item: string }) => (
        <View style={styles.chatBubble}>
            <Text style={styles.messageText}>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View
                style={{
                    ...styles.header,
                    // backgroundColor: 'yellow'
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
                        name="bookmark-outline"
                        size={30}
                        color="#7E3FF0"
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    ...styles.messageContainer,
                    // backgroundColor: 'brown',
                }}
            >
                <FlatList
                    style={{ flex: 1 }}
                    data={messages.slice().reverse()}
                    renderItem={renderMessageItem}
                    keyExtractor={(item, index) => index.toString()}
                    inverted // This will render the list in reverse, starting from the bottom
                    // contentContainerStyle={styles.chatItems}
                    // contentContainerStyle={styles.messageContainer}
                    // ListFooterComponent={<View style={{ height: 20 }} />}
                />
            </View>
            <View
                style={{
                    ...styles.inputArea,
                    // backgroundColor: 'violet',
                }}
            >
                <View style={styles.safeArea}>
                    <TextInput
                        style={[
                            styles.input,
                            isFocused ? styles.focusedInput : null,
                        ]}
                        placeholder="Type a message..."
                        onChangeText={setCurrentMessage} // Update currentMessage instead of messages
                        value={currentMessage} // Use currentMessage for the value
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

// Get the screen height
// const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        // added the flex and height
        flex: 1,
        // height: screenHeight * 0.1, // 10% of the screen height
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
    },
    bookmark: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    messageContainer: {
        // height: screenHeight * 0.4,
        top: '10%',
        bottom: '50%',
        flex: 4,
        // justifyContent: 'flex-end',
        // backgroundColor: 'red',
    },
    safeArea: {
        // backgroundColor: 'green', // change this back to white
        flexDirection: 'row',
    },
    inputArea: {
        flex: 2,
        justifyContent: 'flex-end',
        // height: screenHeight * 0.5,
        // backgroundColor: 'violet',
    },
    input: {
        height: 55,
        width: '75%',
        marginLeft: '5%',
        bottom: '10%',
        borderColor: '#D4C5ED',
        borderWidth: 1.5,
        borderRadius: 15,
        // marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    focusedInput: {
        borderColor: '#7E3FF0', // Change the border color to your desired color
    },
    chatBubble: {
        backgroundColor: '#7E3FF0',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        alignSelf: 'flex-end', // Align the chat bubble to the right
        flexWrap: 'wrap', // Allow the bubble to grow according to the content
    },
    messageText: {
        color: 'white',
    },
});

export default ChatPage;
