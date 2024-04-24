import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    ScrollView,
} from 'react-native';
import { TextInput, IconButton, Button } from 'react-native-paper';
import ProfileSvg from '../../components/SVGs/ProfileSvg';
import BottomComponent from '../../components/SVGs/BottomSvg';
import { useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FindCoacheeByIdDocument } from '../../generated-gql/graphql';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UpdateCoacheeProfileDocument } from '../../generated-gql/graphql';
import { useMutation } from 'urql';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoutConfirmationModal from '../Authentication/LogoutModal';

const { width, height } = Dimensions.get('window');

const CoacheeProfile = () => {
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    const showLogoutModal = () => {
        setLogoutModalVisible(true);
    };

    const hideLogoutModal = () => {
        setLogoutModalVisible(false);
    };

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token

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

    const [{ data: coacheeData, fetching, error }] = useQuery({
        query: FindCoacheeByIdDocument, // Use the Coachee query document
        variables: {
            userID: parseInt(userToken), // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network', // THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });

    const onLogOutPressed = async () => {
        try {
            // Clear the user token from AsyncStorage
            await AsyncStorage.removeItem('userToken');
            // Clear all cache data from AsyncStorage
            await AsyncStorage.clear();
            // Navigate to the login page
            console.log("Bye Token:"+userToken)
            navigation.navigate('LogIn');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    

    
    const [age, setAge] = React.useState('18');
    const [bio, setBio] = React.useState(coacheeData?.findCoacheeByID.bio);
    const [affliation, setAffiliate] = React.useState(
        coacheeData?.findCoacheeByID.affiliations,
    );
    const [address, setAddres] = React.useState(
        coacheeData?.findCoacheeByID.address,
    );
    const [profilePicture, setProfilePicture] = React.useState('fixed');

    // Function to format ISO date to a readable date string
    function formatISODateToReadableDate(isoDate) {
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    // Use this function to convert the ISO date to a readable date string
    const formattedBirthday = coacheeData
        ? formatISODateToReadableDate(coacheeData.findCoacheeByID.birthday)
        : '';
    console.log(formattedBirthday);

    // Calculate age based on birthday
    function calculateAge(birthday) {
        const birthDate = new Date(birthday);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            return age - 1; // Subtract 1 if the birthday hasn't occurred yet this year
        }

        return age;
    }

    // ...

    // Use this function to calculate the age
    const calculatedAge = coacheeData
        ? calculateAge(coacheeData.findCoacheeByID.birthday)
        : '';
    console.log(calculatedAge);

    useEffect(() => {
        if (coacheeData) {
          
            setBio(coacheeData.findCoacheeByID.bio);
            setAffiliate(coacheeData.findCoacheeByID.affiliations);
            setAddres(coacheeData.findCoacheeByID.address);
            // You can similarly update other state variables as needed
            const calculatedAge = calculateAge(
                coacheeData.findCoacheeByID.birthday,
            );
            setAge(calculatedAge.toString());
        }
    }, [coacheeData]);

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

    const [, executeMutation] = useMutation(UpdateCoacheeProfileDocument);

    const handleSaveButton = async () => {
        return await executeMutation({
            id: parseInt(userToken),
            address: address,
            affiliations: affliation,
            mantra: mantra,
            bio: bio,
            profilePicture: profilePicture,
        })
            .then((res) => {
                if (res) {
                    
                    console.log(
                        'affiliations',
                        res.data?.updateCoacheeProfile.affiliations,
                    );
                    console.log('bio', res.data?.updateCoacheeProfile.bio);
                    console.log(
                        'mantra',
                        res.data?.updateCoacheeProfile.mantra,
                    );
                    console.log(
                        'address',
                        res.data?.updateCoacheeProfile.address,
                    );
                    setIsEditing(false);

                }
            })
            .catch((e) => {
                console.log('sheeesh error', e);
            });
    };

    return (
        <View style={styles.container}>
            <ProfileSvg style={styles.svg} />
            <BottomComponent style={styles.bottomSVG}></BottomComponent>
            <View style={styles.logOut}>
                <IconButton
                    icon={({ size }) => (
                        <Icon
                            name="sign-out"
                            size={size}
                            style={{ color: 'white' }}
                        />
                    )}
                    onPress={showLogoutModal}
                />
            </View>

             <View style={styles.profileInfo}>
                <Text
                    style={styles.normalText}
                >{`${coacheeData?.findCoacheeByID?.firstName} ${coacheeData?.findCoacheeByID?.lastName}`}</Text>
            </View>
            <View style={styles.mantraContainer}>
                <TextInput
                    style={styles.mantraTextInput}
                    placeholder="Enter mantra"
                    editable={isEditing}
                    underlineColor="transparent"
                />
            </View>

            <ScrollView
                style={styles.scrollView}
                scrollEnabled={scrollEnabled}
                ref={scrollViewRef}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.bio}> Bio </Text>
                <View>
                    <ScrollView style={styles.bioScrollInput}>
                        <TextInput
                            scrollEnabled={scrollEnabled}
                            style={styles.bioInput}
                            multiline
                            placeholder="Enter bio"
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
                            placeholder="Enter age"
                            editable={false}
                            underlineColor="white"
                        />
                    </View>

                    <Text style={styles.affliate}> Affiliation </Text>
                    <View>
                        <ScrollView style={styles.affiliateScrollInput}>
                            <TextInput
                                style={styles.affliateTextInput}
                                scrollEnabled={scrollEnabled}
                                // multiline
                                placeholder="Enter affiliation"
                                value={affliation}
                                onChangeText={(affiliation) =>
                                    setAffiliate(affiliation)
                                }
                                editable={isEditing}
                                underlineColor="white"
                                maxLength={20}
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
                            placeholder="Enter address"
                            value={address}
                            onChangeText={(address) => setAddres(address)}
                            editable={isEditing}
                            underlineColor="white"
                        />
                    </ScrollView>
                </View>
            </ScrollView>

            <View style={styles.iconContainer}>
                <IconButton
                    icon={isEditing ? '' : 'pencil'}
                    onPress={toggleEditing}
                    iconColor="#60488A"
                />
                {isEditing ? (
                    <Button onPress={handleSaveButton}> Save changes</Button>
                ) : (
                    ''
                )}
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={require('./Icons/Woman.png')}
                    style={styles.image}
                />
            </View>

            {/* The Logout Confirmation Modal */}
            <LogoutConfirmationModal
                visible={isLogoutModalVisible}
                onConfirm={onLogOutPressed} // This function logs out the user
                onCancel={hideLogoutModal} // This function hides the modal
            />
        </View>
    );
};

const imageSize = 100;

const styles = StyleSheet.create({
    scrollView: {
        top: 20,
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

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },

    text: {
        // top: '20%', // Remove top
        flex: 1, // Set the flex property to make it take up a proportion of available space
        color: 'white',
        fontSize: 30,
        fontFamily: 'Roboto',
        fontWeight: '700',
        textAlign: 'center',
        textAlignVertical: 'center',
    },


    logOut: {
        alignItems: 'center',
        left: '44%',
        paddingTop: '4%',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    mantraContainer: {
        marginTop: '40%',
        alignItems: 'center', // Center the text
        width: '70%',
    },

    mantraTextInput: {
        width: '100%', // Set a fixed width
        backgroundColor: 'transparent',
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#717171',
        fontSize: 15,
        textAlign: 'center', // Center the text
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
        top: '18%',
        left: '3%',
        fontSize: 17,
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#636363',
        textAlign: 'left',
        width: 323,
        height: 327,
    },

    age: {
        top: '-11%',
        left: '3%',
        fontSize: 17,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#636363',
        textAlign: 'left',
        width: 320,
        height: 327,
    },

    affliate: {
        top: '-11%',
        fontSize: 17,
        fontFamily: 'Roboto',
        fontWeight: '700',
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
        height: 70,
    },

    affiliateScrollInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 220,
        right: 300,
        top: -170,
        fontSize: 16,
        position: 'absolute',
    },

    address: {
        top: '-26%',
        left: '3%',
        fontSize: 17,
        fontFamily: 'Roboto',
        fontWeight: '700',
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
        flex: 1, // Set the flex property to make it take up a proportion of available space
        marginTop: 170,
        fontSize: 25,
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#915bc7',
        textAlign: 'center', // Center the text
        width: '100%', // Set a fixed width to prevent movement
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

    profileInfo: {
        position: 'absolute',
        top: 20, // Adjust the top value as needed
        width: '100%', // Ensure it spans the full width
        flexDirection: 'column', // Arrange the elements in a column
        alignItems: 'center', // Center the elements horizontally
    },
});

export default CoacheeProfile;
