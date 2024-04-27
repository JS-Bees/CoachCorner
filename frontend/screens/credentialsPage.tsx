import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from 'urql';
import { FindCoachByIdDocument } from '../generated-gql/graphql';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const CredentialsPage = () => {
  const route = useRoute(); // Get the route parameters
  const { coachId } = route.params; // Retrieve the coachId from the parameters

  // Fetch the coach data using the coachId
  const [{ data, fetching, error }] = useQuery({
    query: FindCoachByIdDocument,
    variables: {
      userId: coachId, // The ID passed from PreviewPage
    },
  });

  if (fetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7E3FF0" />
        <Text>Loading credentials...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading credentials: {error.message}</Text>
      </View>
    );
  }

  // Get the sportsCredentials array from the data
  const sportsCredentials = data?.findCoachByID?.sports?.[0]?.sportsCredentials;

  // Retrieve the latest credential picture
  const latestCredentialPicture =
    sportsCredentials && sportsCredentials.length > 0
      ? sportsCredentials[sportsCredentials.length - 1]?.credentialPicture
      : null;

  // Check if the latest credential picture does not start with "https://res"
  const isValidPicture =
    latestCredentialPicture?.startsWith("https://res");

  return (
    <View style={styles.container}>
      {isValidPicture ? (
        <Image
          source={{ uri: latestCredentialPicture }}
          style={styles.credentialImage}
        />
      ) : (
        <Text style={styles.noCredentialsText}>No credentials uploaded yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  credentialImage: {
    width: width * 0.8, // 80% of the screen width
    height: height * 0.5, // 50% of the screen height
    borderRadius: 10,
    margin: 20, // Adjusted margin for more spacing
  },
  noCredentialsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CredentialsPage;
