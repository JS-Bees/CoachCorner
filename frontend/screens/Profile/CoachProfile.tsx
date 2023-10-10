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
import ProfileSvg from '../../components/ProfileSvg';
import BottomComponent from '../../components/BottomSvg';
import LogInButton from '../../components/CustomButton';
import { useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FindCoachByIdDocument } from '../../generated-gql/graphql';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UpdateCoachProfileDocument } from '../../generated-gql/graphql';
import { useMutation } from 'urql';

const { width, height } = Dimensions.get('window');

const CoachProfile = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token

    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                console.log('token', token)
                setUserToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchUserToken();
    }, []);

    const [{ data: coachData, fetching, error }]  = useQuery({
        query: FindCoachByIdDocument, // Use the Coachee query document
        variables: {
            userID: parseInt(userToken), // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network',// THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });
    

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

    const [mantra, setMantra] = React.useState(coachData?.findCoachByID.mantra);
    const [age, setAge] = React.useState('');
    const [bio, setBio] = React.useState(coachData?.findCoachByID.bio);
    const [affliation, setAffiliate] = React.useState(coachData?.findCoachByID.affiliations);
    const [address, setAddres] = React.useState(coachData?.findCoachByID.workplaceAddress);
    const [profilePicture, setProfilePicture ] = React.useState('fixed');

   // Function to format ISO date to a readable date string
    function formatISODateToReadableDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
    }
  
  // Use this function to convert the ISO date to a readable date string
  const formattedBirthday = coachData ? formatISODateToReadableDate(coachData.findCoachByID.birthday) : '';
  console.log(formattedBirthday)

  // Calculate age based on birthday
function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1; // Subtract 1 if the birthday hasn't occurred yet this year
    }
  
    return age;
  }
  
  // ...
  
  // Use this function to calculate the age
  const calculatedAge = coachData ? calculateAge(coachData.findCoachByID.birthday) : '';
  console.log(calculatedAge)

    useEffect(() => {
        if (coachData) {
            setMantra(coachData.findCoachByID.mantra);
            setBio(coachData.findCoachByID.bio);
            setAffiliate(coachData.findCoachByID.affiliations);
            setAddres(coachData.findCoachByID.workplaceAddress);
            // You can similarly update other state variables as needed
             // Calculate age and set it in the age state
            const calculatedAge = calculateAge(coachData.findCoachByID.birthday);
            setAge(calculatedAge.toString());
        }
    }, [coachData]);

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

const [, executeMutation] = useMutation(UpdateCoachProfileDocument)
const handleSaveButton = async () => {


    return await executeMutation(
        {id: parseInt(userToken), workplaceAddress: address, affiliations: affliation, mantra: mantra, bio: bio, profilePicture: profilePicture,
        }).then((res) => {
            if(res) {
                setIsEditing(false)
                console.log("affiliations", res.data?.updateCoachProfile.affiliations)
                console.log("bio", res.data?.updateCoachProfile.bio)
                console.log("mantra", res.data?.updateCoachProfile.mantra)
                console.log("address", res.data?.updateCoachProfile.workplaceAddress)
                console.log("profilepicture", res.data?.updateCoachProfile.profilePicture)
                return res.data
            }
        }).catch((e) => {
            console.log("sheeesh error" , e)
        })

}

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
    <View style={styles.profileInfo}>
        <Text style={styles.normalText}>{`${coachData?.findCoachByID?.firstName} ${coachData?.findCoachByID?.lastName}`}</Text>
    </View>
    <View style={styles.mantraContainer}>
        <TextInput
            style={styles.mantraTextInput}
            placeholder='Enter mantra'
            value={mantra}
            onChangeText={(mantra) => setMantra(mantra)}
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
                            placeholder='Enter bio'
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
                            value={age.toString()}
                            editable={false}
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
                                placeholder='Enter affiliation'
                                value={affliation}
                                onChangeText={(affiliation) =>
                                    setAffiliate(affiliation)
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
                            placeholder='Enter address'
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
                    {isEditing ? <Button onPress={handleSaveButton}> Save changes</Button> : ''}
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={require('./Icons/Man.png')}
                    style={styles.image}
                />
            </View>
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
    text: {
        color: 'white',
        fontSize: 30,
        left: '36%',
        top: '6%',
        fontFamily: 'Roboto',
        fontWeight: '700',
        position: 'absolute'
    },

    logOut: {
        top: '-5%',
        left: '25%',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    mantraContainer: {
        left: '50%',
        marginTop: '30%'
    },

    mantraTextInput: {
        paddingHorizontal: 50,
        paddingVertical: -5,
        right: '46%',
        width: 250,
        backgroundColor: 'transparent',
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#717171',
        fontSize: 15,
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
        fontSize: 16,
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
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#636363',
        textAlign: 'left',
        width: 320,
        height: 327,
    },

    affliate: {
        top: '-11%',
        fontSize: 16,
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
        top: '-26%',
        left: '3%',
        fontSize: 16,
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
        top: '490%',
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
    profileInfo: {
        position: 'absolute',
        top: 20, // Adjust the top value as needed
    },
});

export default CoachProfile;
