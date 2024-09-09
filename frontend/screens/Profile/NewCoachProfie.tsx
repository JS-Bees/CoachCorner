import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, ImageSourcePropType, DrawerLayoutAndroid, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { useRef } from 'react';
import { useState } from 'react';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/Ionicons';

interface CoacheeProfile {
    coachName: string;
    mainSport: string;
    imageSource: ImageSourcePropType;
    about: string;
    achievements: string;
    workplaceAddress: string;
    interests: {
        movieGenres: string[];
        hobbies: string[];
        videoGames: string[];
    };
}

const NewCoachProfile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const pagerRef = useRef<PagerView>(null);
    const drawer = useRef<DrawerLayoutAndroid>(null);
    const [drawerPosition] = useState<'left' | 'right'>('right');
    const [activeTab, setActiveTab] = useState(0);

    const toggleDrawer = () => {
        if (drawerPosition === 'right') {
            drawer.current?.openDrawer();
        } else {
            drawer.current?.closeDrawer();
        }
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
        navigation.goBack();
    };

    const CoacheeProfiles: CoacheeProfile[] = [{
        coachName: "Jane Smith",
        mainSport: "Basketball",
        imageSource: require('../../assets/Jane_Smith.png'),
        about: "Jane Smith, a dynamic basketball coach, inspires athletes with her passion for the game, fostering a culture of teamwork and excellence.",
        achievements: "None at the moment",
        workplaceAddress: "Apt. 5B, Oakwood Apartments, Park Avenue, Springfield, IL 62702, United States",
        interests: {
            movieGenres:["Romance, Comedy"],
            hobbies: ["writing, reading"],
            videoGames: ["valorant, pubg"]      
        }
    },
    ]

    const navigationView = () => (
        <View style={styles.drawerContainer}>
            <Image source={CoacheeProfiles[0].imageSource} style={styles.circleImage}/>
            <TouchableOpacity style={styles.drawerButton}> 
                <Icon name="person-outline" size={30} color="#7E3FF0"/>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton} > 
                <Icon name="settings-outline" size={30} color="#7E3FF0" />
                <Text style={styles.buttonText}>Account Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton} > 
                <Icon name="notifications-outline" size={30} color="#7E3FF0" />
                <Text style={styles.buttonText}>Manage notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButton} > 
                <Icon name="information-circle-outline" size={30} color="#7E3FF0" />
                <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logOutButton} > 
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
                    <Image source={CoacheeProfiles[0].imageSource} style={styles.profileImage}/>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handleNavigateBack}>
                            <Icon name="arrow-back-circle" size={30} color="#FDDE6E" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleDrawer}>
                            <Icon name="settings-outline" size={30} color="#FDDE6E" style={styles.settingsIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerText}>{CoacheeProfiles[0].coachName}</Text>
                    <Text style={styles.subText}>{CoacheeProfiles[0].mainSport}</Text>
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
                           <Text style={styles.titleHeader}>Bio</Text>
                            <Text style={styles.contentText}>{CoacheeProfiles[0].about}</Text>
                            <Text style={styles.titleHeader}> Workplace Address</Text>
                            <Text style={styles.contentText}>{CoacheeProfiles[0].workplaceAddress}</Text>
                            <Text style={styles.titleHeader}>Interests</Text>
                            <View style={styles.subcontentContainer}>
                            <Text style={styles.subHeader}>Movies</Text>
                            <Text style={styles.subontentText}>{CoacheeProfiles[0].interests.movieGenres.join(', ')}{"\n"}</Text>
                            </View>
                            <View style={styles.subcontentContainer}>
                            <Text style={styles.subHeader}>Hobbies:</Text>
                            <Text style={styles.subontentText}> {CoacheeProfiles[0].interests.hobbies.join(', ')}{"\n"}</Text>
                            </View>
                            <View style={styles.subcontentContainer}>
                            <Text style={styles.subHeader}>Video Games</Text>
                            <Text style={styles.subontentText}>{CoacheeProfiles[0].interests.videoGames.join(', ')}{"\n"}</Text>
                            </View>
                           </ScrollView>
                        </View>
                            <View key="2">
                                <Text style={styles.achievementsText}>{CoacheeProfiles[0].achievements}</Text>
                            </View>
                            <View key="3">
                                <Text style={styles.achievementsText}>{CoacheeProfiles[0].achievements}</Text>
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
        position: "absolute",
        paddingTop: "5%",
        top: "34%",
        right: "59%",
        fontSize: 25,
        fontWeight: "400",
        color: "#7E3FF0"
    },
    subText: {
        paddingTop: "1%",
        top: "5%",
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
        top: "10%",
        width: '100%',
    },
    tabButton: {
        padding: 10,
        alignItems: "center"
    },
    pagerView: {
        flex: 1,
        width: '100%',
        top: "2%"
    },
    drawerContainer: {
        flex: 1,
        top: "15%",
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
        width: 60,
        height: 60,
        bottom: "8%",
        left: "60%",
        borderRadius: 30
    },
    drawerButton: {
        paddingTop: "10%",
        flexDirection: "row",
    },
    logOutButton: {
        top: "80%", 
        flexDirection: "row",
    },
    buttonText: {
        top: "2%",
        marginLeft: "5%",
        fontWeight: "600",
        color: "#7E3FF0",
        zIndex: 3.
    },

})

export default NewCoachProfile;