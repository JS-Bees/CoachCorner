import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, DrawerLayoutAndroid, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { useRef } from 'react';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FindCoachByIdDocument } from '../../generated-gql/graphql';
import {useQuery} from 'urql';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/Ionicons';




interface CoachProfile {
    coachName: string;
    mainSport: string[];
    imageSource: string;
    about: string;
    achievements: string;
    workplaceAddress: string;
    interests: {
        MovieGenre: string[];
        BookGenre: string[];
        MusicGenre: string[];
    };
}



const NewCoachProfile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const pagerRef = useRef<PagerView>(null);
    const drawer = useRef<DrawerLayoutAndroid>(null);
    const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>('right');
    const [activeTab, setActiveTab] = useState(0);
    const [userToken, setUserToken] = useState<string | null>(null); // State to store the user token

    
    const [{ data: coachData, fetching, error }] = useQuery({
        query: FindCoachByIdDocument, // Use the Coachee query document
        variables: {
            userId: parseInt(userToken), // Parse the userID (token) to an integer with base 10
        },
        requestPolicy: 'cache-and-network', // THIS IS THE LINE I ADDED TO REFETCH DATA WHENEVER A NEW ACCOUNT IS MADE
    });

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
    
    

    const toggleDrawer = () => {
        drawer.current?.openDrawer()
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

    const handleNavigatetoEditInterests= () => {
        navigation.navigate("EditProfileForCoach")
    };

    
    const handleNavigateLogOut = () => {
        navigation.navigate("LogIn")
    }
 
    console.log(coachData?.findCoachByID.address)
    const CoachProfiles: CoachProfile[] = [
        {
            coachName: (coachData?.findCoachByID.firstName + " " + coachData?.findCoachByID.lastName),
            mainSport: coachData?.findCoachByID.sports?.map(sport => sport.type).join(', ') , // Map over sports array and join them"V 
            imageSource: coachData?.findCoachByID.profilePicture,
            about: coachData?.findCoachByID.bio || '',
            achievements: "None at the moment",
            workplaceAddress: coachData?.findCoachByID.address || '',
            interests: {
                MovieGenre: coachData?.findCoachByID.interests.filter(interest => interest.type === 'MovieGenre').map(interest => interest.name) || [],
                BookGenre: coachData?.findCoachByID.interests.filter(interest => interest.type === 'BookGenre').map(interest => interest.name) || [],
                MusicGenre: coachData?.findCoachByID.interests.filter(interest => interest.type === 'MusicGenre').map(interest => interest.name) || [],
            },
        },

    ]

    const navigationView = () => (
        <View style={styles.drawerContainer}>
            <TouchableOpacity style={styles.drawerButton} onPress={handleNavigatetoEditInterests}> 
                <Icon name="person-outline" size={30} color="#7E3FF0"/>
                <Text style={styles.buttonText3}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton} > 
                <Icon name="settings-outline" size={30} color="grey" />
                <Text style={styles.buttonText}>Account Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton} > 
                <Icon name="pulse-outline" size={30} color="grey" />
                <Text style={styles.buttonText}>My Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton} > 
                <Icon name="notifications-outline" size={30} color="grey" />
                <Text style={styles.buttonText}>Manage notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton} > 
                <Icon name="information-circle-outline" size={30} color="grey" />
                <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logOutButton} onPress={handleNavigateLogOut}> 
                <Icon name="log-out-outline" size={30} color="#7E3FF0" />
                <Text style={styles.buttonText}>Log Out</Text>
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
                    <Image source={{uri: CoachProfiles[0].imageSource}} style={styles.profileImage}/>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handleNavigateBack}>
                            <Icon name="arrow-back-circle" size={30} color="#FDDE6E" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleDrawer}>
                            <Icon name="settings-outline" size={30} color="#FDDE6E" style={styles.settingsIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerText}>{CoachProfiles[0].coachName}</Text>
                    <Text style={styles.subText}>{CoachProfiles[0].mainSport}</Text>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={() => goToPage(0)} style={[styles.tabButton, activeTab === 0 && styles.activeTabButton]}>
                            <Text style={styles.buttonHeader}>About</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => goToPage(1)} style={[styles.tabButton, activeTab === 1 && styles.activeTabButton]}>
                            <Text style={styles.buttonHeader}>Achievements</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => goToPage(2)} style={[styles.tabButton, activeTab === 2 && styles.activeTabButton]}>
                            <Text style={styles.buttonHeader}>Affliates</Text>
                        </TouchableOpacity>
                    </View>
                    <PagerView style={styles.pagerView} initialPage={0} ref={pagerRef} onPageSelected={handlePageChange}>
                        <View key="1">
                           <ScrollView>
                           <Text style={styles.titleHeader}>  Bio</Text>
                            <Text style={styles.contentText}>{CoachProfiles[0].about}</Text>
                            <Text style={styles.titleHeader}> Workplace Address</Text>
                            <Text style={styles.contentText}>{CoachProfiles[0].workplaceAddress}</Text>
                            
                            <Text style={styles.titleHeader}> Interests</Text>

                            <View style={styles.subcontentContainer}>
                            <Text style={styles.subHeader}>   Movies Genre:</Text>
                            <Text style={styles.subontentText}>{CoachProfiles[0].interests?.MovieGenre?.join(', ')}{"\n"}</Text>
                            </View>

                            <View style={styles.subcontentContainer}>
                            <Text style={styles.subHeader}>  Book Genre:</Text>
                            <Text style={styles.subontentText}> {CoachProfiles[0].interests?.BookGenre?.join(', ')}{"\n"}</Text>
                            </View>

                            <View style={styles.subcontentContainer}>
                            <Text style={styles.subHeader}>  Music Genre:</Text>
                            <Text style={styles.subontentText}>{CoachProfiles[0].interests?.MusicGenre?.join(', ')}{"\n"}</Text>
                            </View>
             
                           </ScrollView>
                        </View>
                        <View key="2">
                            <Text style={styles.achievementsText}>{CoachProfiles[0].achievements}</Text>
                        </View>
                        <View key="3">
                            <Text style={styles.achievementsText}>{CoachProfiles[0].achievements}</Text>
                        </View>
                    </PagerView>
                </View>
            </View>
        </DrawerLayoutAndroid>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        alignItems: "center",
    },
    iconContainer: {
        flexDirection: "row",
        position: 'absolute',
        top: "7%",
        left: "6%",
        zIndex: 1,
    },
    settingsIcon: {
        marginLeft: "82%",

    },
    profileContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderRadius: 10,
        overflow: 'hidden', // Clip the shadow to the borderRadius
    },
    profileImage: {
        width: "140%",
        height: "35%",
        resizeMode: 'cover',
    },
    headerText: {
        paddingTop: "5%",
        right: "18%",
        fontSize: 25,
        fontWeight: "400",
        color: "#7E3FF0"
    },
    subText: {
        paddingTop: "1%",
        right: "30%",
        fontSize: 18,
        fontWeight: "300",
        color: "#838086"
    },
    buttonHeader: {
        color: "#7E3FF0",
        fontSize: 18,
        fontWeight: "400",
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
        alignItems: "center"
    },
    pagerView: {
        flex: 1,
        width: '100%',
    },
    drawerContainer: {
        flex: 1,
        top: "10%",
        left: "10%",
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: "flex-start"
    },
    achievementsText: { //for no achievements or affliates at the moment
        color: "#838086",
        justifyContent: "center",
        left: "30%",
        fontSize: 18,
        marginTop: "25%"
    },
    titleHeader: {
        paddingTop: "5%",
        fontWeight: '400',
        fontSize: 20,
        left: "5%",
    },
    subcontentContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        left: "15%"
    },
    subHeader: {
        paddingTop: "1%",
        fontWeight: '400',
        fontSize: 15,
        left: "-35%",
        justifyContent: "flex-start"
    },
    contentText: {
        paddingTop: "1%",
        textAlign: "justify",
        lineHeight: 20, // Adjust line height as needed
        fontFamily: "Roboto",
        fontWeight: '200',
        color: '#908D93',
        width: "85%",
        left: "8%"
    },
    subontentText: {
        paddingTop: "1%",
        textAlign: "justify",
        lineHeight: 20, // Adjust line height as needed
        fontFamily: "Roboto",
        fontWeight: '200',
        color: '#908D93',
        width: "85%",
        marginLeft: "10%"
    },
    circleImage: {
        width: 80, // Adjust width as needed
        height: 80, // Adjust height as needed
        position: 'absolute',
        bottom: '100%', // Adjusted to center vertically
        left: '50%', // Adjusted to center horizontally
        marginLeft: -50, // Half of the width
        marginBottom: -80, // Half of the height
        borderRadius: 10,
    },
    drawerButton: {
        paddingTop: "10%",
        flexDirection: "row",
    },
    logOutButton: {
        top: "105%", 
        flexDirection: "row",
    },
    buttonText: {
        top: "2%",
        marginLeft: "5%",
        fontWeight: "600",
        color: "grey",
        zIndex: 3.
    },
    buttonText2: {
        top: "2%",
        marginLeft: "5%",
        fontWeight: "600",
        color: "white",
        zIndex: 3.
    },
    buttonText3: {
        top: "2%",
        marginLeft: "5%",
        fontWeight: "600",
        color: "#7E3FF0",
        zIndex: 3.
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
        marginTop: 90, // Adjust as needed to create space between the image and text inputs
    },
  
  
})
export default NewCoachProfile;
