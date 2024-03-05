import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

// Define the type for the props
interface ChatInputProps {
 message: string;
 setMessage: (text: string) => void;
 sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, sendMessage }) => {
 return (
    <View style={styles.inputContainer}>
      <Input
        placeholder=""
        value={message}
        onChangeText={setMessage}
        rightIcon={
          <Icon
            name="send-outline"
            size={24}
            color="#000"
            onPress={sendMessage}
          />
        }
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
    </View>
 );
};

const styles = StyleSheet.create({
 inputContainer: {
    top: "75%",
    borderWidth: 1,
    width: '80%',
    height: "8.5%",
    borderColor: '#000',
    borderRadius: 20,
    padding: 10,
    marginLeft: '10%',
 },
});

export default ChatInput;