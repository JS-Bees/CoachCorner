import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView,} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import ReviewTile from '../components/Profile Tiles/ReviewProfileTiles';
import { useState } from 'react';
import AddReviewBottomSheet from '../components/BottomSheet/AddReview';
import { useQuery } from 'urql';
import { GetCoachReviewsDocument } from '../generated-gql/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';



type ReviewsPageRouteProp = RouteProp<RootStackParams, 'ReviewsPage'>;
type ReviewsPageNavigationProp = NativeStackNavigationProp<RootStackParams, 'ReviewsPage'>;

interface ReviewsPageProps {
  route: ReviewsPageRouteProp;
  navigation: ReviewsPageNavigationProp;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ route, navigation }) => {
 
  const { profile } = route.params || {};

  const handleNavigateToPreview = () => {
    navigation.goBack();
  };

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleAddReviewPress = () => {
    setBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };

    // Fetch reviews using urql useQuery hook
    const [result] = useQuery({
      query: GetCoachReviewsDocument,
      variables: { userId: profile.id }, // Provide your user ID here
    });
  
    const { data, fetching, error } = result;
  
    if (fetching) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
  
    const reviews = data?.findCoachByID?.reviews || [];
  
    // Calculate the number of reviews for each star rating
    const numReviewsByRating: { [key: number]: number } = {};
    reviews.forEach(review => {
      numReviewsByRating[review.starRating] = (numReviewsByRating[review.starRating] || 0) + 1;
    });
  
    // Calculate the total number of reviews and the average rating
    const totalReviews = reviews.length;
    const totalStars = reviews.reduce((sum, review) => sum + review.starRating, 0);
    const averageRating = totalReviews !== 0 ? totalStars / totalReviews : 0;
  
    const maxBarWidth = 150; // Adjust as needed

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleNavigateToPreview}>
          <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
        </TouchableOpacity>
        
        <View>
          <Text style={styles.coachHeader}>{profile.name}</Text>
        </View>
      </View>

      <View style={styles.reviewStatsContainer}>
        <View style={styles.statsContent}>
        <Text style={styles.averageText}> {averageRating.toFixed(1)}</Text>
        <Text style={styles.totalReviewsText}>{totalReviews} Reviews</Text>
        </View>
        {/* Render number of reviews for each star rating */}
        {[5, 4, 3, 2, 1].map(starRating => (
          <View key={starRating} style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{starRating}</Text>
            <View style={[styles.ratingBar, { width: Math.min((numReviewsByRating[starRating] || 0) * 20, maxBarWidth) }]} />
          </View>
        ))}
      </View>


      <ScrollView style={styles.reviewsContainer}>
  {totalReviews > 0 ? (
    reviews.map((review, index) => (
      <ReviewTile
        key={index}
        review={{
          imageSource: require('../assets/John_Doe.png'),
          name: `${review.coachee.firstName} ${review.coachee.lastName}`,
          stars: review.starRating,
          reviewText: review.comment,
        }}
      />
    ))
  ) : (
    <Text style={{ alignSelf: 'center', marginTop: 20 }}>No reviews yet</Text>
  )}
</ScrollView>

      <TouchableOpacity style={styles.addReview} onPress={handleAddReviewPress}>
        <Icon name="add-circle-outline" size={50} color='#7E3FF0' />
      </TouchableOpacity>

      <AddReviewBottomSheet isVisible={bottomSheetVisible} onClose={handleCloseBottomSheet} coachId={profile.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: "row",
    top: "7%",
    left: "6.5%",
    zIndex: 1,
  },
  coachHeader: {
    top: "5%",
    fontSize: 20,
    fontWeight: "400",
    left: "15%",
    color: "#7E3FF0"
  },
  reviewsContainer: {
    marginTop: "-10%",
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    marginTop: '1%',
    borderRadius: 20
  },
  addReview: {
    position: "absolute",
    bottom: "5%",
    left: "80%",
    zIndex: 2,
  },
  reviewStatsContainer: {
    marginTop: "40%",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    left: "1.5%"

  },
  statsContent: {
    left: "10%"

  },
  ratingContainer: {
    bottom: "18%",
    left: "70%",
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ratingText: {
    bottom: "3%",
    marginRight: 10,
    fontSize: 20,
  },
  ratingBar: {
    height: 10,
    backgroundColor: '#7E3FF0',
    borderRadius: 5,
  
  },
  averageText: {
    fontSize: 55
  },
  totalReviewsText: {
    fontSize: 15,
    color: "#908D93",
    left: "5%"
  },


});

export default ReviewsPage;
