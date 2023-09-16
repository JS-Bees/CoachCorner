import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import the CoachSample
import CoachSample from './sample/CoachSample';

// for urql
import {
    Client,
    Provider as UrqlProvider,
    cacheExchange,
    fetchExchange,
} from 'urql';

const client = new Client({
    // url: 'http://localhost:5050/graphql',
    url: 'http://192.168.1.3:5050/graphql', // replace with actual IP address, change to .env file, why does this work
    exchanges: [cacheExchange, fetchExchange],
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function App() {
    return (
        <UrqlProvider value={client}>
            <View style={styles.container}>
                <Text>Open up App.tsx to start working on your appzzz!</Text>
                <CoachSample />
                <StatusBar style="auto" />
            </View>
        </UrqlProvider>
    );
}
