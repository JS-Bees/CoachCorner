import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
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

  return (
    <>
      <Text style={styles.titleText}>Credential Pictures</Text>
      <ScrollView contentContainerStyle={[styles.scrollViewContainer, {top: "-50%" }]}>
        {sportsCredentials && sportsCredentials.length > 0? (
          sportsCredentials.map((credential, index) => (
            <Image
              key={index}
              source={{ uri: credential.credentialPicture }}
              style={styles.credentialImage}
            />
          ))
        ) : (
          <Text style={styles.noCredentialsText}>No credentials uploaded yet.</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  credentialImage: {
    width: width * 0.8, // 80% of the screen width
    height: height * 0.5, // 50% of the screen height
    borderRadius: 10,
    marginVertical: 10, // Reduced vertical margin between images
  },
  noCredentialsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    top: '15%'
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
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CredentialsPage;
