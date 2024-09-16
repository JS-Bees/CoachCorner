import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import StarRating from '../StarRating';
import { useState } from 'react';

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
    const [isExpanded, setIsExpanded] = useState(false);
    const handlePress = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.reviewTile}>
            <View style={styles.userInfo}>
                <Image source={review.imageSource} style={styles.profileImage} />
                 <Text style={styles.name}>{review.name}</Text>
            </View>
             <View style={styles.content}>
                 <StarRating gainedStars={review.stars} starColor="#FECB2E" />
            <Text
                style={styles.reviewText}
                numberOfLines={isExpanded ? undefined : 3} 
                ellipsizeMode="tail" 
            >
                {review.reviewText}
            </Text>
             </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    reviewTile: {
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',  
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10, 
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        flex: 1, 
        flexDirection: 'column', 
    },
    reviewText: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,
    },
});

export default ReviewTile;
