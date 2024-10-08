import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    DrawerLayoutAndroid,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    CreateSportsCredentialsDocument,
    FindCoachByIdDocument,
} from '../../generated-gql/graphql';
import { useQuery, useMutation } from 'urql';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import SplashScreen from '../Authentication/LoadingSplash';
import { StackNavigationProp } from '@react-navigation/stack';

interface CoachProfile {
    coachName: string;
    mainSport: string[];
    imageSource: string;
    about: string;
    workplaceAddress: string;
    sportsCredentials: string[]; 
    interests: {
        MovieGenre: string[];
        BookGenre: string[];
        MusicGenre: string[];
    };
}

const NewCoachProfile = () => {
    const navigation =
        useNavigation<
            StackNavigationProp<RootStackParams, keyof RootStackParams>
        >();
    const pagerRef = useRef<PagerView>(null);
    const drawer = useRef<DrawerLayoutAndroid>(null);
    const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
        'right',
    );
    const [activeTab, setActiveTab] = useState(0);
    const [userToken, setUserToken] = useState<string | null>(null); 
    const [selectedImage, setSelectedImage] = useState<string | null>(null); 
    const [uploading, setUploading] = useState<boolean>(false); 
    const [, executeMutation] = useMutation(CreateSportsCredentialsDocument); 

    const [{ data: coachData, fetching, error }] = useQuery({
        query: FindCoachByIdDocument, 
        variables: {
            userId: parseInt(userToken),
        },
        requestPolicy: 'cache-and-network', 
    });

    const handleNavigatetoReviewsPageCoach = () => {
        navigation.navigate('ReviewsPageCoach');
    };

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

    if (fetching) return <SplashScreen navigation={navigation} />;

    const uploadImageToCloudinary = async (imageObject: any) => {
        setUploading(true); 
        try {
            const formData = new FormData();
            formData.append('file', imageObject);
            formData.append('upload_preset', 'coachcorner');

            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dkwht3l4g/image/upload',
                {
                    method: 'POST',
                    body: formData,
                },
            );

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        } finally {
            setUploading(false); 
        }
    };


    const selectImage = async () => {

        if (CoachProfiles[0].sportsCredentials.length >= 5) {
            alert(
                'You can only upload a maximum of 5 images for sports credentials.',
            );
            return;
        }

        try {
 
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                alert('Permission to access the media library is required.');
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync();

            if (pickerResult.canceled) {
                return;
            }

            const imageUri = pickerResult.assets[0].uri;

            const imageObject = {
                uri: imageUri,
                type: `image/${imageUri.split('.').pop()}`,
                name: `image.${imageUri.split('.').pop()}`,
            };

  
            Alert.alert(
                'Confirmation',
                'Are you sure you want to upload this image? Credential pictures cannot be changed once uploaded for security reasons.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            const uploadedImageUrl =
                                await uploadImageToCloudinary(imageObject);
                            setSelectedImage(uploadedImageUrl); 
                            createSportsCredentials(uploadedImageUrl);
                        },
                    },
                ],
                { cancelable: true },
            );
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    };


    const createSportsCredentials = async (imageUrl: string) => {
        try {
            const result = await executeMutation({
                input: {
                    credentialPicture: imageUrl,
                    sportId: coachData?.findCoachByID.sports[0]?.id ?? 0,
                },
            });

            if (result.error) {
                console.error(
                    'Error creating sports credentials:',
                    result.error.message,
                );
            } else {
                // 
            }
        } catch (error) {
            console.error('Error creating sports credentials:', error);
        }
    };

    const toggleDrawer = () => {
        drawer.current?.openDrawer();
        console.log(coachData?.findCoachByID.sports[0].id);
    };

    const goToPage = (page: number) => {
        pagerRef.current?.setPage(page);
        setActiveTab(page);
    };

    const handlePageChange = (event: { nativeEvent: { position: number } }) => {
        const { position } = event.nativeEvent;
        setActiveTab(position);
    };

    const handleNavigateBack = () => {
        navigation.reset({
            routes: [{ name: 'NewCoachDashboard' }],
        });
    };

    const handleNavigatetoEditInterests = () => {
        navigation.navigate('EditProfileForCoach');
    };

    const handleNavigateLogOut = async () => {
        await AsyncStorage.clear();
        navigation.navigate('LogIn');
    };

    const sportsCredentials =
        coachData?.findCoachByID?.sports?.[0]?.sportsCredentials;


    const latestCredentialPicture = sportsCredentials
        ? sportsCredentials[sportsCredentials.length - 1]?.credentialPicture
        : null;

    const CoachProfiles: CoachProfile[] = [
        {
            coachName:
                coachData?.findCoachByID.firstName +
                ' ' +
                coachData?.findCoachByID.lastName,
            mainSport:
                coachData?.findCoachByID.sports &&
                coachData.findCoachByID.sports.length > 0
                    ? [coachData.findCoachByID.sports[0].type] 
                    : ['No sports listed'], 
            imageSource:
                coachData?.findCoachByID.profilePicture || 'default_image_url',
            about: coachData?.findCoachByID.bio || '',
            workplaceAddress: coachData?.findCoachByID.address || '',
            sportsCredentials:
                coachData?.findCoachByID.sports[0]?.sportsCredentials.map(
                    (credential) => credential.credentialPicture,
                ) || [],
            interests: {
                MovieGenre:
                    coachData?.findCoachByID.interests
                        .filter((interest) => interest.type === 'MovieGenre')
                        .map((interest) => interest.name) || [],
                BookGenre:
                    coachData?.findCoachByID.interests
                        .filter((interest) => interest.type === 'BookGenre')
                        .map((interest) => interest.name) || [],
                MusicGenre:
                    coachData?.findCoachByID.interests
                        .filter((interest) => interest.type === 'MusicGenre')
                        .map((interest) => interest.name) || [],
            },
        },
    ];
    console.log(sportsCredentials);

    const navigationView = () => (
        <View style={styles.drawerContainer}>
            <TouchableOpacity
                style={styles.drawerButton}
                onPress={handleNavigatetoEditInterests}
            >
                <Icon name="person-outline" size={30} color="#7E3FF0" />
                <Text style={styles.buttonText3}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton}>
                <Icon name="settings-outline" size={30} color="grey" />
                <Text style={styles.buttonText}>Account Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton}>
                <Icon name="pulse-outline" size={30} color="#7E3FF0" />
                <Text
                    style={styles.buttonText3}
                    onPress={handleNavigatetoReviewsPageCoach}
                >
                    My Reviews
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton}>
                <Icon name="notifications-outline" size={30} color="grey" />
                <Text style={styles.buttonText}>Manage notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton}>
                <Icon
                    name="information-circle-outline"
                    size={30}
                    color="grey"
                />
                <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.logOutButton}
                onPress={handleNavigateLogOut}
            >
                <Icon name="log-out-outline" size={30} color="#7E3FF0" />
                <Text style={styles.buttonText3}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={drawerPosition}
            renderNavigationView={navigationView}
        >
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Image
                        source={{ uri: CoachProfiles[0].imageSource }}
                        style={styles.profileImage}
                    />
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handleNavigateBack}>
                            <Icon
                                name="arrow-back-circle"
                                size={30}
                                color="#FDDE6E"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleDrawer}>
                            <Icon
                                name="settings-outline"
                                size={30}
                                color="#FDDE6E"
                                style={styles.settingsIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.headerText}>
                            {CoachProfiles[0].coachName}
                        </Text>
                        <Text style={styles.subText}>
                            {CoachProfiles[0].mainSport}
                        </Text>
                    </View>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            onPress={() => goToPage(0)}
                            style={[
                                styles.tabButton,
                                activeTab === 0 && styles.activeTabButton,
                            ]}
                        >
                            <Text style={styles.buttonHeader}>About</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => goToPage(1)}
                            style={[
                                styles.tabButton,
                                activeTab === 1 && styles.activeTabButton,
                            ]}
                        >
                            <Text style={styles.buttonHeader}>
                                Sports Credential
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <PagerView
                        style={styles.pagerView}
                        initialPage={0}
                        ref={pagerRef}
                        onPageSelected={handlePageChange}
                    >
                        <View key="1">
                            <ScrollView>
                                <Text style={styles.titleHeader}>Bio</Text>
                                <Text style={styles.contentText}>
                                    {CoachProfiles[0].about}
                                </Text>

                                <Text style={styles.titleHeader}>
                                    Workplace Address
                                </Text>
                                <Text style={styles.contentText}>
                                    {CoachProfiles[0].workplaceAddress}
                                </Text>

                                <Text style={styles.titleHeader}>
                                    Interests
                                </Text>

                                <View style={styles.subcontentContainer}>
                                    <Text style={styles.subHeader}>
                                        What are some of your favorite ways to
                                        relax?
                                    </Text>
                                    <Text style={styles.subContentTextIndented}>
                                        {CoachProfiles[0].interests?.MovieGenre?.join(
                                            ', ',
                                        )}
                                    </Text>
                                </View>

                                <View style={styles.subcontentContainer}>
                                    <Text style={styles.subHeader}>
                                        What do you prefer to do on weekends?
                                    </Text>
                                    <Text style={styles.subContentTextIndented}>
                                        {CoachProfiles[0].interests?.BookGenre?.join(
                                            ', ',
                                        )}
                                    </Text>
                                </View>

                                <View style={styles.subcontentContainer}>
                                    <Text style={styles.subHeader}>
                                        What hobbies do you prefer on your
                                        downtime?
                                    </Text>
                                    <Text style={styles.subContentTextIndented}>
                                        {CoachProfiles[0].interests?.MusicGenre?.join(
                                            ', ',
                                        )}
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>
                        <View key="2">
                            {/* Sports Credentials Tab */}
                            <ScrollView style={styles.scrollView}>
                                {CoachProfiles[0].sportsCredentials.map(
                                    (imageUrl, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: imageUrl }}
                                            style={styles.uploadedImage}
                                        />
                                    ),
                                )}
                                {CoachProfiles[0].sportsCredentials.length <
                                    5 && (
                                    <View style={styles.imageUploadContainer}>
                                        {uploading && (
                                            <ActivityIndicator
                                                size="small"
                                                color="#7E3FF0"
                                                style={styles.activityIndicator}
                                            />
                                        )}
                                        <TouchableOpacity onPress={selectImage}>
                                            <Text style={styles.uploadText}>
                                                Click to Upload Sports
                                                Credentials
                                            </Text>
                                            <Icon
                                                name="cloud-upload-outline"
                                                size={30}
                                                color="#7E3FF0"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    </PagerView>
                </View>
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: '7%',
        left: '6%',
        zIndex: 1,
    },
    settingsIcon: {
        marginLeft: '82%',
    },
    profileContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderRadius: 10,
        overflow: 'hidden',
    },
    profileImage: {
        width: '140%',
        height: '35%',
        resizeMode: 'cover',
    },
    headerText: {
        paddingTop: '5%',
        paddingRight: '40%',
        fontSize: 25,
        fontWeight: '400',
        color: '#7E3FF0',
    },
    subText: {
        paddingTop: '1%',
        fontSize: 18,
        fontWeight: '300',
        color: '#838086',
    },
    buttonHeader: {
        color: '#7E3FF0',
        fontSize: 18,
        fontWeight: '400',
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#7E3FF0',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        width: '100%',
    },
    tabButton: {
        padding: 10,
        alignItems: 'center',
    },
    pagerView: {
        flex: 1,
        width: '100%',
    },
    drawerContainer: {
        flex: 1,
        top: '10%',
        left: '10%',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    achievementsText: {
        color: '#838086',
        justifyContent: 'center',
        left: '30%',
        fontSize: 18,
        marginTop: '25%',
    },
    titleHeader: {
        paddingTop: '5%',
        fontWeight: '400',
        fontSize: 20,
        left: '5%',
    },
    subcontentContainer: {
        flexDirection: 'column', 
        paddingHorizontal: 20, 
        marginBottom: 10, 
    },
    subHeader: {
        fontWeight: '400',
        fontSize: 16,
        color: '#7E3FF0',
    },
    contentText: {
        paddingTop: '1%',
        textAlign: 'justify',
        lineHeight: 20, 
        fontFamily: 'Roboto',
        fontWeight: '200',
        color: '#908D93',
        width: '85%',
        left: '8%',
    },
    subontentText: {
        paddingTop: '1%',
        textAlign: 'justify',
        lineHeight: 20, 
        fontFamily: 'Roboto',
        fontWeight: '200',
        color: '#908D93',
        width: '85%',
        marginLeft: '10%',
    },
    circleImage: {
        width: 80, 
        height: 80, 
        position: 'absolute',
        bottom: '100%', 
        left: '50%', 
        marginLeft: -50, 
        marginBottom: -80, 
        borderRadius: 10,
    },
    drawerButton: {
        paddingTop: '10%',
        flexDirection: 'row',
    },
    logOutButton: {
        top: '105%',
        flexDirection: 'row',
    },
    buttonText: {
        top: '2%',
        marginLeft: '5%',
        fontWeight: '600',
        color: 'grey',
        zIndex: 3,
    },
    buttonText2: {
        top: '2%',
        marginLeft: '5%',
        fontWeight: '600',
        color: 'white',
        zIndex: 3,
    },
    buttonText3: {
        top: '2%',
        marginLeft: '5%',
        fontWeight: '600',
        color: '#7E3FF0',
        zIndex: 3,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: 250,
    },
    saveButton: {
        backgroundColor: '#7E3FF0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 250,
    },
    inputContainer: {
        marginTop: 90, 
    },
    imageUploadContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f0f0f0', 
        position: 'relative', 
    },
    uploadText: {
        fontSize: 16,
        color: '#7E3FF0',
        marginRight: 10,
    },
    activityIndicator: {
        position: 'absolute', 
        top: '100%', 
        left: '50%', 
        transform: [{ translateX: -15 }, { translateY: -15 }], 
    },

    uploadedImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
        margin: 10,
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    subContentTextIndented: {
        paddingLeft: 20, 
        fontSize: 15,
        color: '#908D93',
        fontFamily: 'Roboto',
        fontWeight: '200',
    },
});
export default NewCoachProfile;
