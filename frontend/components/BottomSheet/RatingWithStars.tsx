import React from 'react';
import { View, Text } from 'react-native';

const filledStar = '⭐';

const emptyStar = '☆';

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(filledStar);
    } else {
      stars.push(emptyStar);
    }
  }
  return stars.join(' '); 
}

const RatingWithStars = ({ rating }) => {
  return (
    <View>
      <Text>{renderStars(rating)}</Text>
    </View>
  );
};

export default RatingWithStars;
