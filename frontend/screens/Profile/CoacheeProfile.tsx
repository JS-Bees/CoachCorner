import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    ScrollView,
} from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import ProfileSvg from '../../components/ProfileSvg';
import BottomComponent from '../../components/BottomSvg';
import LogInButton from '../../components/CustomButton';
import { useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FindCoacheeByIdDocument } from '../../generated-gql/graphql';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

const CoacheeProfile = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token

    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setUserToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchUserToken();
    }, []);

    // Define a function to fetch coachee data by userID (token)
    const useFetchCoacheeByUserID = (userID: any) => {
        const [coachResult] = useQuery({
            query: FindCoacheeByIdDocument, // Use the Coachee query document
            variables: {
                userID: parseInt(userID), // Parse the userID (token) to an integer with base 10
            },
        });

        return coachResult;
    };

    // Example usage of the query function
    // Replace 'yourToken' with the actual token or userID you want to fetch
    const {
        data: coachData,
        loading: coachLoading,
        error: coachError,
    } = useFetchCoacheeByUserID(userToken);

    const onLogOutPressed = async () => {
        try {
            // Clear the user token from AsyncStorage
            await AsyncStorage.removeItem('userToken');
            // Navigate to the login page
            navigation.navigate('LogIn');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const [mantra, setMantra] = React.useState(' A mantra goes here ');
    const [bio, setBio] = React.useState('Add your bio here...');
    const [affliation, setAffiliate] = React.useState('Add your affiliates');
    const [address, setAddres] = React.useState('Your address goes here...');
    const [age, setAge] = React.useState('Age');

    const [isEditing, setIsEditing] = useState(false);
    const [scrollEnabled, setScrollable] = useState(false);

    const scrollViewRef = useRef(null); // Create a ref for ScrollView

    const toggleEditing = () => {
        setIsEditing(!isEditing);
        if (scrollViewRef.current) {
            if (!isEditing) {
                scrollViewRef.current as ScrollView;
            } else {
                scrollViewRef.current as ScrollView;
            }
        }
    };

    useEffect(() => {
        if (scrollViewRef.current) {
            if (isEditing) {
                scrollViewRef.current as ScrollView;
            } else {
                (scrollViewRef.current as ScrollView).scrollTo({
                    y: 180,
                    animated: true,
                });
            }
        }
    }, [isEditing]);

    useEffect(() => {
        setScrollable(isEditing);
    }, [isEditing]);

    return (
        <View style={styles.container}>
            <ProfileSvg style={styles.svg} />
            <BottomComponent style={styles.bottomSVG}></BottomComponent>
            <View style={styles.logOut}>
                <LogInButton
                    text="Logout"
                    type="QUARTERNARY"
                    onPress={onLogOutPressed}
                />
            </View>
            <Text style={styles.text}> Profile </Text>

            <Text
                style={styles.normalText}
            >{`${coachData?.findCoacheeByID?.firstName} ${coachData?.findCoacheeByID?.lastName}`}</Text>

            <TextInput
                style={styles.mantraTextInput}
                value={mantra}
                onChangeText={(mantra) => setMantra(mantra)}
                editable={isEditing}
                underlineColor="transparent"
            />

            <ScrollView
                style={styles.scrollView}
                scrollEnabled={scrollEnabled}
                ref={scrollViewRef}
            >
                <Text style={styles.bio}> Bio </Text>
                <View>
                    <ScrollView style={styles.bioScrollInput}>
                        <TextInput
                            scrollEnabled={scrollEnabled}
                            style={styles.bioInput}
                            multiline
                            value={bio}
                            onChangeText={(bio) => setBio(bio)}
                            editable={isEditing}
                            underlineColor="white"
                        />
                    </ScrollView>
                </View>

                <View style={styles.row}>
                    <Text style={styles.age}> Age </Text>
                    <View>
                        <TextInput
                            style={styles.ageInput}
                            value={age}
                            onChangeText={(age) => setAge(age)}
                            editable={isEditing}
                            underlineColor="white"
                        />
                    </View>

                    <Text style={styles.affliate}> Affiliations </Text>
                    <View>
                        <ScrollView style={styles.affiliateScrollInput}>
                            <TextInput
                                style={styles.affliateTextInput}
                                scrollEnabled={scrollEnabled}
                                multiline
                                value={affliation}
                                onChangeText={(affliation) =>
                                    setAffiliate(affliation)
                                }
                                editable={isEditing}
                                underlineColor="white"
                            />
                        </ScrollView>
                    </View>
                </View>
                <Text style={styles.address}> Address </Text>
                <View>
                    <ScrollView
                        style={styles.addressScrollInput}
                        scrollEnabled={true}
                    >
                        <TextInput
                            scrollEnabled={scrollEnabled}
                            style={styles.bioInput}
                            multiline
                            value={coachData?.findCoacheeByID.address}
                            onChangeText={(address) => setAddres(address)}
                            editable={isEditing}
                            underlineColor="white"
                        />
                    </ScrollView>
                </View>
            </ScrollView>

            <View style={styles.iconContainer}>
                <IconButton
                    icon={isEditing ? 'pencil' : 'pencil-off'}
                    onPress={toggleEditing}
                    iconColor="#60488A"
                />
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={require('./Icons/User.png')}
                    style={styles.image}
                />
            </View>
        </View>
    );
};

const imageSize = 100;

const styles = StyleSheet.create({
    scrollView: {
        top: 100,
        width: '95%',
    },
    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        alignItems: 'center',
    },
    scrollContainer: {
        width: '100%',
        backgroundColor: 'transparent',
    },

    text: {
        color: 'white',
        fontSize: 20,
        top: -5,
        fontFamily: 'Roboto',
    },

    logOut: {
        paddingTop: '5%',
        left: width * 0.4,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    mantraTextInput: {
        paddingHorizontal: 50,
        paddingVertical: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        width: 300,
        top: 100,
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#717171',
    },

    bioScrollInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        height: 70,
        top: -120,
        right: 20,
        position: 'absolute',
        fontSize: 16,
    },

    ageInput: {
        paddingHorizontal: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 90,
        top: -170,
        right: 215,
        position: 'absolute',
        fontSize: 16,
    },

    addressScrollInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        height: 70,
        top: -550,
        right: 20,
        position: 'absolute',
        fontSize: 16,
    },

    bio: {
        top: 180,
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#636363',
        textAlign: 'left',
        width: 323,
        height: 327,
    },

    age: {
        top: -30,
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#636363',
        textAlign: 'left',
        width: 320,
        height: 327,
    },

    affliate: {
        top: -30,
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#636363',
        textAlign: 'left',
        width: 320,
        left: -190,
        height: 327,
    },

    bioInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
    },

    affliateTextInput: {
        backgroundColor: 'white',
        height: 60,
    },

    affiliateScrollInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 220,
        right: 285,
        top: -170,
        position: 'absolute',
        fontSize: 16,
    },

    address: {
        top: -245,
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#636363',
        textAlign: 'left',
        width: 320,
        height: 327,
    },

    addressTextInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '85%',
        top: 510,
        position: 'absolute',
        fontSize: 16,
    },

    normalText: {
        top: 120,
        fontSize: 25,
        alignItems: 'center',
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#915bc7',
    },

    svg: {
        position: 'absolute',
        top: -90,
        alignSelf: 'center',
        zIndex: 0,
    },

    imageContainer: {
        position: 'absolute',
        top: 90,
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
        borderWidth: 5,
        borderColor: 'white',
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    iconContainer: {
        position: 'absolute',
        top: 90, // Adjust the top value as needed
        right: -3, // Adjust the right value as needed
        backgroundColor: 'transparent',
    },

    bottomSVG: {
        justifyContent: 'flex-end',
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 0,
    },
});

export default CoacheeProfile;
