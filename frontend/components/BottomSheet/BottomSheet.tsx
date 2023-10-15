import React, { useRef, useState, useEffect } from 'react';
import {
    Animated,
    PanResponder,
    Platform,
    StyleSheet,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import SVGComponent from '../UpperSVG';
import DragSheetButton from '../DragSheetButton';
import { ListItemProps } from '../ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateCoachingRelationshipDocument } from '../../generated-gql/graphql';
import { CreateReviewDocument } from '../../generated-gql/graphql';
import { FindCoachByIdReviewDocument } from '../../generated-gql/graphql';
import { useMutation, useQuery } from 'urql';
import Modal from 'react-native-modal';
import RatingWithStars from './RatingWithStars';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const { width, height } = Dimensions.get('window');

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 1;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 1;

const MAX_UPWARD_TRANSLATE_Y =
    BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = height * 0.05;

interface DraggableBottomSheetProps {
    onClose: () => void;
    coachData: ListItemProps['data'];
    requestPolicy: 'cache-and-network';
}

const DraggableBottomSheet: React.FC<DraggableBottomSheetProps> = ({
    onClose,
    coachData,
}) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSecondModalVisible, setSecondModalVisible] = useState(false);
    const [isDraggable, setIsDraggable] = useState(true);
    const [isAnimatedViewVisible, setAnimatedViewVisible] = useState(true); // New state

    const [, createCoachingRelationship] = useMutation(
        CreateCoachingRelationshipDocument,
    );
    const [, createReviewMutation] = useMutation(CreateReviewDocument);

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [refetch, setRefetch] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [ratingError, setRatingError] = useState<string | null>(null);
    const [isAddingCoach, setIsAddingCoach] = useState(false);

    const submitReview = async () => {
        try {
            const coacheeId = await AsyncStorage.getItem('userToken');

            if (coacheeId) {
                if (!rating) {
                    setRatingError('Please enter rating');
                    return; // Don't proceed with the submission
                }

                // Reset the rating error if it was previously set
                setRatingError(null);

                setIsLoading(true); // Start loading

                const variables = {
                    coachId: coachData.id,
                    coacheeId: parseInt(coacheeId),
                    starRating: rating,
                    comment: review,
                };

                const { data, error } = await createReviewMutation(variables);

                if (data) {
                    console.log('Review submitted successfully:', data);
                    closeSecondModal();
                    resetReviewAndRating();
                    setRefetch(true);
                } else if (error) {
                    console.error('Error submitting review:', error);
                }
            } else {
                console.error('coacheeId not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    // Function to set the selected rating
    const handleRatingSelection = (rating: number) => {
        setRating(rating);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleRatingSelection(i)}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            color: i <= rating ? 'gold' : 'gray',
                        }}
                    >
                        ★
                    </Text>
                </TouchableOpacity>,
            );
        }
        return stars;
    };

    useEffect(() => {
        if (refetch) {
            setRefetch(false);
        }
    }, [refetch]);

    const onAddPressed = async () => {
        try {
            const coacheeId = await AsyncStorage.getItem('userToken');

            if (coacheeId) {
                setIsAddingCoach(true); // Start adding coach

                const variables = {
                    coachId: coachData.id,
                    coacheeId: parseInt(coacheeId),
                };

                const { data, error } =
                    await createCoachingRelationship(variables);

                if (data) {
                    console.log('Added to Coach:', data);
                    setIsBottomSheetOpen(false);
                    onClose();
                } else if (error) {
                    console.error('Error adding coach:', error);
                }
            } else {
                console.error('coacheeId not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error adding coach:', error);
        } finally {
            setIsAddingCoach(false); // Stop adding coach

            onClose();
        }
        navigation.navigate('MyCoaches');
    };
    const [{ data: coachReviewsData }] = useQuery({
        requestPolicy: 'cache-and-network',
        query: FindCoachByIdReviewDocument,
        variables: { userID: coachData.id },
        pause: refetch,
    });

    const onSeeReviewPressed = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const onOpenSecondModalPressed = () => {
        setSecondModalVisible(true);
        setIsDraggable(false);
        setAnimatedViewVisible(false); // Hide the Animated.View
    };

    const closeSecondModal = () => {
        setSecondModalVisible(false);
        setIsDraggable(true);
        setAnimatedViewVisible(true); // Re-enable the Animated.View
    };

    const resetReviewAndRating = () => {
        setReview('');
        setRating(0);
    };

    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => isDraggable,
            onPanResponderGrant: () => {
                animatedValue.setOffset(lastGestureDy.current);
            },
            onPanResponderMove: (_, gesture) => {
                animatedValue.setValue(gesture.dy);
            },
            onPanResponderRelease: (_, gesture) => {
                animatedValue.flattenOffset();
                lastGestureDy.current += gesture.dy;

                if (gesture.dy > DRAG_THRESHOLD) {
                    setIsBottomSheetOpen(false);
                    onClose();
                }
            },
        }),
    ).current;

    const springAnimation = (direction: 'up' | 'down') => {
        lastGestureDy.current =
            direction === 'down'
                ? MAX_DOWNWARD_TRANSLATE_Y
                : MAX_UPWARD_TRANSLATE_Y;
        Animated.spring(animatedValue, {
            toValue: lastGestureDy.current,
            useNativeDriver: true,
        }).start(() => {
            setIsBottomSheetOpen(
                lastGestureDy.current === MAX_DOWNWARD_TRANSLATE_Y,
            );
            if (lastGestureDy.current === MAX_DOWNWARD_TRANSLATE_Y) {
                onClose();
            }
        });
    };

    const bottomSheetAnimation = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [
                        MAX_UPWARD_TRANSLATE_Y,
                        MAX_DOWNWARD_TRANSLATE_Y,
                    ],
                    outputRange: [
                        MAX_UPWARD_TRANSLATE_Y,
                        MAX_DOWNWARD_TRANSLATE_Y,
                    ],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            {isBottomSheetOpen && (
                <TouchableOpacity
                    style={[StyleSheet.absoluteFill]}
                    activeOpacity={1}
                    onPress={() => {
                        setIsBottomSheetOpen(false);
                        onClose();
                    }}
                />
            )}

            {isAnimatedViewVisible && (
                <Animated.View
                    style={[styles.bottomSheet, bottomSheetAnimation]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.draggableArea}>
                        <View style={styles.dragHandle} />
                    </View>
                    <SVGComponent />
                    <View style={styles.imageContainer}>
                        <Image
                            resizeMode="cover"
                            source={require('../BottomSheet/User.png')}
                            style={{ width: 100, height: 100 }}
                        />

                        <View style={styles.row}>
                            <Text style={styles.textCoach}>
                                {coachData.firstName + ' ' + coachData.lastName}
                            </Text>
                            <Text style={styles.textSport}>
                                {' '}
                                {coachData.sport}{' '}
                            </Text>
                        </View>
                        <View style={styles.button}>
                            {isAddingCoach ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#915bc7"
                                />
                            ) : (
                                <DragSheetButton
                                    text={'Add to My Coaches'}
                                    onPress={onAddPressed}
                                />
                            )}
                        </View>
                    </View>

                    <ScrollView style={styles.scrollViewContainer}>
                        <Text style={styles.textSport}> Bio </Text>
                        <TextInput
                            style={styles.textInput}
                            value={
                                coachData.bio === 'Enter Bio here' ||
                                coachData.bio === 'Enter bio here' ||
                                coachData.bio === 'Enter Bio' || 
                                coachData.bio === 'Enter bio'
                                    ? ''
                                    : coachData.bio
                            }
                            editable={false}
                            underlineColor="transparent"
                        />
                        <Text style={styles.textSport}> Affiliates </Text>
                        <TextInput
                            style={styles.textInput}
                            value={
                                coachData.affiliations === 'Enter Affiliations here' ||
                                coachData.affiliations === 'Enter affiliations here' ||
                                coachData.affiliations === 'Enter Affiliations' ||
                                coachData.affiliations === 'Enter affiliations' 
                                    ? ''
                                    : coachData.affiliations
                            }
                            editable={false}
                            underlineColor="transparent"
                        />
                        <Text style={styles.textSport}>
                            {' '}
                            Workplace Address{' '}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            value={
                                coachData.workplaceAddress === 'Enter Address here' ||
                                coachData.workplaceAddress === 'Enter address' ||
                                coachData.workplaceAddress === 'Enter Address' ||
                                coachData.workplaceAddress === 'Enter address' 
                                    ? ''
                                    : coachData.workplaceAddress
                            }
                            editable={false}
                            underlineColor="transparent"
                        />
                    </ScrollView>

                    <View style={styles.Reviews}>
                        <DragSheetButton
                            text={'Check Reviews'}
                            type="TERTIARY"
                            onPress={onSeeReviewPressed}
                        />
                        <DragSheetButton
                            text={'Add a Review'}
                            type="TERTIARY"
                            onPress={onOpenSecondModalPressed}
                        />
                    </View>
                </Animated.View>
            )}

            <Modal isVisible={isModalVisible}>
                <View style={styles.innerModalContainer}>
                    <Text style={styles.modalTexts}>Coach Reviews</Text>
                    {coachReviewsData &&
                    coachReviewsData.findCoachByID &&
                    coachReviewsData.findCoachByID.reviews.length > 0 ? (
                        <ScrollView>
                            {coachReviewsData.findCoachByID.reviews.map(
                                (review, index) => (
                                    <View
                                        key={index}
                                        style={styles.reviewContainer}
                                    >
                                        <RatingWithStars
                                            rating={review.starRating}
                                        />
                                        <Text style={{ fontSize: 12 }}>
                                            {review.coachee.firstName}{' '}
                                            {review.coachee.lastName}
                                        </Text>
                                        <View
                                            style={
                                                styles.reviewCommentContainer
                                            }
                                        >
                                            <Text style={styles.reviewComment}>
                                                {review.comment}
                                            </Text>
                                        </View>
                                        <Text>
                                            ____________________________________________
                                        </Text>
                                    </View>
                                ),
                            )}
                        </ScrollView>
                    ) : (
                        <Text>No reviews available</Text>
                    )}
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.modalTextsClose}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                isVisible={isSecondModalVisible}
                onBackdropPress={closeSecondModal}
            >
                <View style={styles.innerModalContainer}>
                    <Text style={styles.modalTexts}>Enter Comments</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your review"
                        multiline
                        value={review}
                        onChangeText={(text) => setReview(text)}  
                    />

                    <View style={styles.starRatingContainer}>
                        <Text style={styles.modalTexts}>Select a Rating:</Text>
                        <View style={styles.starRating}>{renderStars()}</View>
                    </View>
                    {ratingError && (
                        <Text style={styles.ratingError}>{ratingError}</Text>
                    )}
                    <TouchableOpacity onPress={submitReview}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#915bc7" />
                        ) : (
                            <Text style={styles.modalTextsCloseAdd}>
                                Submit Review
                            </Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            closeSecondModal();
                            resetReviewAndRating();
                        }}
                    >
                        <Text style={styles.modalTextCloseClose}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomSheet: {
        position: 'absolute',
        width: '100%',
        right: '-50%',
        height: BOTTOM_SHEET_MAX_HEIGHT,
        bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
        ...Platform.select({
            android: { elevation: 100 },
            ios: {
                shadowColor: '#a8bed2',
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
            },
        }),
        backgroundColor: '#F9FBFC',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
    draggableArea: {
        width: 500,
        height: 50,
        backgroundColor: '#DED2EA',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dragHandle: {
        width: 100,
        height: 6,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    imageContainer: {
        top: -215,
        paddingVertical: 20,
        left: 30,
    },
    row: {
        top: -70,
        left: 110,
        alignItems: 'flex-start',
    },
    textCoach: {
        fontSize: 25,
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#915bc7',
    },
    textSport: {
        left: -4,
        fontSize: 17,
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#636363',
    },
    button: {
        top: -65,
        left: 100,
    },
    scrollViewContainer: {
        top: -270,
        width: 325,
        left: 30,
        marginBottom: -200,
    },
    Reviews: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '5%',
        top: '-7%',
    },
    textInput: {
        left: -10,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'grey',
    },
    svgContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width,
        height: height,
        zIndex: 0,
    },
    modalContainer: {
        height: 150,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    innerModalContainer: {
        height: 350,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    reviewContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    modalTexts: {
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#915bc7',
        fontSize: 20,
        top: -2,
    },
    modalTextsClose: {
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#915bc7',
        fontSize: 16,
    },
    modalTextsCloseAdd: {
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#915bc7',
        fontSize: 16,
        top: 25
    },
    modalTextCloseClose: {
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#915bc7',
        fontSize: 20,
        top: 90
    },
    ratingError: {
        color: 'red',
        fontSize: 16,
        marginTop: 8,
    },
    reviewCommentContainer: {
        height: 60, // Set a fixed height
        overflow: 'hidden', // Hide overflow content
    },
    reviewComment: {
        fontSize: 16,
    },
    starRatingContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    starRating: {
        flexDirection: 'row',
    },
});

export default DraggableBottomSheet;
