import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import StarRating from '../StarRating';

interface Review {
    name: string;
    imageSource: ImageSourcePropType; 
    stars: number;
    reviewText: string;
  }

interface ReviewTileProps {
  review: Review;
}

const ReviewTile: React.FC<ReviewTileProps> = ({ review }) => {
  return (
    <View style={styles.reviewTile}>
      <View style={styles.userInfo}>
        <Image source={review.imageSource} style={styles.profileImage} />
        <Text style={styles.name}>{review.name}</Text>
      </View>
      <View style={styles.content}>
        <StarRating gainedStars={review.stars} starColor="#FECB2E" />
        <Text style={styles.reviewText}>{review.reviewText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewTile: {
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    bottom: "-5%",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content :{
    left: "20%",
    bottom: "15%"

  },
  name: {
    fontWeight: 'bold',
    left: "15%"
    
  },
  reviewText: {
    color: '#666',
    fontWeight: "400"
  },
});

export default ReviewTile;
