import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { useQuery } from 'urql';
import { FindCoachByIdDocument } from '../generated-gql/graphql';
import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const CredentialsPage = () => {
  const route = useRoute(); // Get the route parameters
  const navigation = useNavigation<StackNavigationProp<RootStackParams, keyof RootStackParams>>();
  const { coachId } = route.params; // Retrieve the coachId from the parameters
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  // Fetch the coach data using the coachId
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: FindCoachByIdDocument,
    variables: {
      userId: coachId, // The ID passed from PreviewPage
    },
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    reexecuteQuery({ requestPolicy: 'network-only' });
    setRefreshing(false);
  }, [reexecuteQuery]);


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
    <View style={styles.container}>
      <Text style={styles.titleText}>Credential Pictures</Text>
      <TouchableOpacity onPress={handleNavigateBack} style={styles.icon}>
        <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {sportsCredentials && sportsCredentials.length > 0 ? (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
  },
  scrollViewContainer: {
    paddingTop: '2%',
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
    paddingTop: '14%',
    color: "#7E3FF0",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Add some space between the title and the images
  },
  icon: {
    bottom: "5%",
    right: "37%",
    zIndex: 1,
  },
});

export default CredentialsPage;
