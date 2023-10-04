import React from 'react';
import { View, Text } from 'react-native';

// Unicode star symbol (★) to represent a filled star
const filledStar = '⭐';

// Unicode star symbol (☆) to represent an empty star
const emptyStar = '☆';

// Function to convert a numerical rating to star icons
function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(filledStar);
    } else {
      stars.push(emptyStar);
    }
  }
  return stars.join(' '); // Join the star icons into a single string
}

const RatingWithStars = ({ rating }) => {
  return (
    <View>
      <Text>{renderStars(rating)}</Text>
    </View>
  );
};

export default RatingWithStars;
