import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { useMutation, useSubscription } from 'urql';
import {
    NewMessageDocument,
    CreateMessageDocument,
    NewMessageSubscriptionVariables,
    CreateMessageMutationVariables,
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

    // Log the sender's name
    console.log('Sender Name:', chatMessage.sender);
    console.log('image url', chatMessage.imageUrl.uri);

    const imageSource = chatMessage.imageUrl;

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    // const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const [messages, setMessages] = useState<string[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [result] = useSubscription<NewMessageSubscriptionVariables>({
        query: NewMessageDocument,
        variables: { channelName: 'ChannelofContact1' },
    });

    // const [, createMessage] = useMutation<CreateMessageMutationVariables>(
    //     CreateMessageDocument,
    // );
    const [, createMessage] = useMutation(CreateMessageDocument);

    useEffect(() => {
        console.log('use effect ran');
        if (result.data) {
            // Handle the new message, e.g., add it to the chat
            setMessages((prevMessages) => [
                ...prevMessages,
                result.data.newMessage.content,
            ]);
            console.log('result.data true');
            console.log(result.data);
        }

        // // Log each message to the console
        messages.forEach((message) => {
            console.log(message);
        });
    }, [result.data]);

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleNavigateToBooking = () => {
        navigation.navigate('NewBookingPage');
    };

    // const handleSendMessage = () => {
    //     if (message.trim() !== '') {
    //         // Log the message
    //         console.log('Message sent:', message);

    //         // Add the message to the messages array
    //         setMessages([...messages, message]);

    //         // Clear the message input
    //         setMessage('');
    //     }
    // };

    const handleSendMessage = async (content: string) => {
        try {
            // const response = await createMessage({
            //     variables: {
            //         input: {
            //             contactId: 1, // Replace with the actual contact ID
            //             content,
            //         },
            //     },
            // });
            const response = await createMessage({
                input: {
                    contactId: 1, // Replace with the actual contact ID
                    content,
                },
            });
            console.log('Mutation response:', response.data);
            // const message = response.data?.content; // Adjust 'createMessage' based on your mutation's return type
            // console.log('Created message:', message);

            console.log('sent message');
            console.log('content', content);
            // Clear the input field after a successful message send
            setCurrentMessage('');
        } catch (error) {
            // Handle error, e.g., show an error message
            console.log(error);
        }
    };

    // if (result.fetching) return <Text>Loading... Why</Text>;
    // if (result.error) return <Text>Error</Text>;
    // if (!result.data) return <Text>No data received yet.</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
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
            <View style={styles.messageContainer}>
                <SafeAreaView style={styles.safeArea}>
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
                </SafeAreaView>
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
        flex: 1,
        justifyContent: 'flex-end',
    },
    safeArea: {
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    input: {
        height: 55,
        width: '75%',
        marginLeft: '5%',
        bottom: '10%',
        borderColor: '#D4C5ED',
        borderWidth: 1.5,
        borderRadius: 15,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    focusedInput: {
        borderColor: '#7E3FF0', // Change the border color to your desired color
    },
});

export default ChatPage;
