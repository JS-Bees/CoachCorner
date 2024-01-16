// StarRating.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface StarRatingProps {
  gainedStars: number;
  starColor: string;
}

const StarRating: React.FC<StarRatingProps> = ({ gainedStars, starColor }) => {
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, index) => (
    <MaterialIcons
      key={index}
      name={index < gainedStars ? 'star' : 'star-outline'}
      size={20}
      color={starColor}
    />
  ));

  return <View style={styles.starRating}>{stars}</View>;
};

const styles = StyleSheet.create({
  starRating: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default StarRating;