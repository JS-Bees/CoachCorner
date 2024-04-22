import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Modal,
    Button,
    ActivityIndicator,
    ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';
import { CreateContactDocument } from '../generated-gql/graphql';
import { useMutation } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

type PreviewPageRouteProp = RouteProp<RootStackParams, 'PreviewPage'>;
type PreviewPageNavigationProp = NativeStackNavigationProp<
    RootStackParams,
    'PreviewPage'
>;

interface PreviewPageProps {
    route: PreviewPageRouteProp;
    navigation: PreviewPageNavigationProp;
}

interface ChatMessage {
    id: number;
    message: string;
    sender: string;
    imageUrl: ImageSourcePropType;
    contactedStatus: boolean;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ route }) => {
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token
    const [isFavorite, setIsFavorite] = useState(false);
    const [, createContact] = useMutation(CreateContactDocument);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                console.log('token', token);
                setUserToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchUserToken();
    }, []);

    const handleAddToFavorites = async () => {
        try {
            // If already marked as favorite, return without adding again
            if (isFavorite || isLoading) {
                return;
            }

            // Set loading state to true
            setIsLoading(true);

            // Execute the mutation
            const result = await createContact({
                input: {
                    coachId: profile.id,
                    coacheeId: parseInt(userToken),
                    contactedStatus: false,
                },
            });

            // Check if the mutation was successful
            if (result) {
                // Update the state to indicate that the coach is added to favorites
                setIsFavorite(true);
                setIsModalVisible(true); // Show the modal
            }
        } catch (error) {
            console.error('Error adding coach to favorites:', error);
        } finally {
            // Set loading state back to false
            setIsLoading(false);
        }
    };

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const handleButtonPress = (item: ChatMessage) => {
        navigation.navigate('ChatPage', { chatMessage: item });
    };

    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleSeeReviewsPress = () => {
        navigation.navigate('ReviewsPage', {
            profile: profile,
        });
    };

    const { profile, gainedStars } = route.params || {};

    const totalStars = 5;

    // Render star icons based on the total number of stars
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < totalStars; i++) {
            stars.push(
                <View key={i} style={styles.starsContainer}>
                    <Icon
                        name={i < gainedStars ? 'star' : 'star-outline'}
                        size={20}
                        color="#FECB2E"
                    />
                </View>,
            );
        }
        return stars;
    };

    console.log('ID is ' + profile.id + '' + isFavorite);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={profile?.imageSource}
                    style={styles.profileImage}
                />
                <TouchableOpacity
                    onPress={handleNavigateBack}
                    style={styles.iconContainer}
                >
                    <Icon name="arrow-back-circle" size={30} color="#FECB2E" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.heartIconContainer}
                    onPress={handleAddToFavorites}
                >
                    <Icon name="bookmark" size={30} color="#FECB2E" />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.name}>{profile?.name}</Text>
            </View>

            <View style={styles.starsContainer}>
                {renderStars()}
                <View style={styles.reviewsContainer}>
                    <TouchableOpacity onPress={handleSeeReviewsPress}>
                        <Text style={styles.reviewText}>See Reviews</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.aboutText}>About</Text>
            </View>
            <View style={styles.aboutContainer}>
                <Text style={styles.about}>{profile?.about}</Text>
            </View>

            <View style={styles.addressContainer}>
                <Text style={styles.aboutText}>Workplace Address</Text>
            </View>
            <View style={styles.worplaceAddressContainer}>
                <Text style={styles.workplaceAddressText}>
                    {profile?.workplaceAddress}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleButtonPress}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            height: 55,
                            paddingHorizontal: 15,
                            paddingVertical: 15,
                        }}
                    >
                        Message this Coach
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Coach is already added!
                        </Text>
                        <Button
                            title="Close"
                            color="#7E3FF0" // Set the color to purple
                            onPress={() => setIsModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
            {isLoading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#7E3FF0" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    profileImage: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
        marginTop: '-110%',
    },
    iconContainer: {
        position: 'absolute',
        top: '7%',
        left: '6%',
        zIndex: 1,
    },
    heartIconContainer: {
        position: 'absolute',
        top: '6%',
        left: '5%',
        zIndex: 1,
        flexDirection: 'row',
        marginLeft: '85%',
    },
    header: {
        position: 'absolute',
        bottom: '45%',
        alignItems: 'center',
        left: '5%',
    },
    name: {
        fontFamily: 'Roboto',
        fontWeight: '200',
        fontSize: 25,
    },
    starsContainer: {
        flexDirection: 'row',
        bottom: '84%',
        left: '1.5%',
    },
    reviewsContainer: {
        position: 'absolute',
        bottom: '90%',
        left: '30%',
    },
    reviewText: {
        fontWeight: '500',
        fontSize: 15,
        color: '#7E3FF0',
    },
    content: {
        position: 'absolute',
        bottom: '36%', // Adjust this value to move the name up or down
        alignItems: 'center',
        left: '5%',
    },
    aboutText: {
        fontFamily: 'Roboto',
        fontWeight: '200',
        fontSize: 20,
    },
    aboutContainer: {
        position: 'absolute',
        bottom: '25%',
        alignItems: 'center',
        left: '6%',
        width: '85%',
    },
    about: {
        textAlign: 'justify',
        lineHeight: 20, // Adjust line height as needed
        fontFamily: 'Roboto',
        fontWeight: '200',
        color: '#908D93',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '2%',
        alignItems: 'center',
        left: '3%',
        width: '85%',
    },
    button: {
        marginTop: '5%',
        marginLeft: '11%',
        backgroundColor: '#7E3FF0',
        width: 350,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
    },
    addressContainer: {
        position: 'absolute',
        bottom: '20%', // Adjust this value to move the title up or down
        alignItems: 'center',
        left: '5%',
    },
    worplaceAddressContainer: {
        position: 'absolute',
        bottom: '19%', // Adjust this value to move the address text up or down
        left: '6%',
        width: '85%',
    },
    workplaceAddressText: {
        position: 'absolute',
        textAlign: 'justify',
        lineHeight: 20, // Adjust line height as needed
        fontFamily: 'Roboto',
        fontWeight: '200',
        color: '#908D93',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 15,
        marginBottom: 15,
        textAlign: 'center',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 9999,
    },
});

export default PreviewPage;
