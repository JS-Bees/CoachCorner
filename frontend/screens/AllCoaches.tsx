import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CoachProfiles from '../components/Profile Tiles/CoachProfileTile';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView, KeyboardAvoidingView, TouchableOpacity,} from 'react-native';
import { FindCoachesBySportDocument, FindCoacheeByIdDocument } from '../generated-gql/graphql';
import { useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from './Authentication/LoadingSplash';


const { width, height } = Dimensions.get('window');


const AllCoaches = ({route}) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams, keyof RootStackParams>>();
    const [searchText, setSearchText] = useState(''); 
    const [userToken, setUserToken] = useState<string | null>(null); 
    const [activeButton, setActiveButton] = useState('All'); 
    const [displayCount, setDisplayCount] = useState(4);
    
    const { selectedSport } = route.params;




    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };
    
    const [result] = useQuery({
        query: FindCoachesBySportDocument, 
        variables: { sportType: selectedSport }, 
    });

    const { fetching, data, error } = result;

            
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

        const useFetchCoacheeByUserID = (userID: any) => {
            const [coacheeResult] = useQuery({
                query: FindCoacheeByIdDocument, 
                variables: {
                    userId: parseInt(userID),
                },
            });
    
            return coacheeResult;
        };
        const {
            data: coacheeData,
            loading: coacheeLoading,
            error: coacheeError,
        } = useFetchCoacheeByUserID(userToken);

        console.log(coacheeData?.findCoacheeByID.firstName)

    if (fetching) return <SplashScreen navigation={navigation} />;
    if (error) return <Text>Error: {error.message}</Text>;


    
    const coaches = data.findCoachesBySport;
    const DEFAULT_PROFILE_PICTURE = require('../assets/default_User.png');

    


        const AllCoaches: Profile[] = coaches.map(coach => {
            const totalStars = coach.reviews.reduce((acc, review) => acc + review.starRating, 0);
            const averageStars = coach.reviews.length > 0 ? totalStars / coach.reviews.length : 0;
    
            return {
                id: coach.id,
                name: `${coach.firstName} ${coach.lastName}`,
                imageSource: coach.profilePicture?.startsWith("https://res.cloudinary.com")
                    ? { uri: coach.profilePicture }
                    : DEFAULT_PROFILE_PICTURE,
                gainedStars: averageStars, 
                mainSport: selectedSport, 
                about: coach.bio,
                workplaceAddress: coach.address,
            };
        });

    const displayedCoaches = AllCoaches.slice(0, displayCount);

    return (
        <View style={MyCoaches.container}>
            <View style={MyCoaches.nameAndGreetingsContainer}>
        
            </View>
            <View style={MyCoaches.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("CoacheeDashboard")}>
            <Icon name="arrow-back-circle-outline" size={30} color='#7E3FF0' />
            </TouchableOpacity>
            </View>
            
            <TouchableOpacity
                onPress={() => navigation.navigate('NewCoacheeProfile')}>
                <Image
   source={{uri: coacheeData?.findCoacheeByID.profilePicture}}
   style={{width: 40, height: 40, marginLeft:'83%', marginTop: '-10%',  borderRadius: 20,}}/>
            
            </TouchableOpacity>
            

            <KeyboardAvoidingView
            style={MyCoaches.container}
            behavior={Platform.OS === "android" ? 'height' : 'padding'}>
        

            <ScrollView  contentInsetAdjustmentBehavior="scrollableAxes" style={{marginTop: "3%", height: 250, marginLeft: '4%'}}>
            <CoachProfiles profiles={activeButton === 'All' ? displayedCoaches : FavoriteCoaches} />
                    {displayCount < AllCoaches.length && (
                        <TouchableOpacity
                            style={MyCoaches.seeMoreButton}
                            onPress={() => setDisplayCount(displayCount + 4)} 
                        >
                            <Text style={MyCoaches.seeMoreText}>See More</Text>
                        </TouchableOpacity>
                    )}

            </ScrollView>

            </KeyboardAvoidingView>


        </View>
    );
};

const MyCoaches = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backgroundContainer: {
        paddingTop: 130,
        borderRadius: 35, 
        position: 'absolute',
        backgroundColor: '#DED2EA', 
        height: height * 0.16, 
        width: '100%',
        zIndex: 0, 
    },


    nameAndGreetingsContainer: {
        paddingTop:"25%",
        marginLeft: '25%',
        flexDirection: 'row', 
    },

    

    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    miniContainer: {
        borderRadius: 25, 
        width: width * 0.35, 
        height: height * 0.19, 
        margin: 8,
    },
    nestedMiniContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 25, 
        margin: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginTop: "-10%",
        marginLeft: '9%',
        flexDirection: 'row', 
    },
    imageLabel: {
        fontFamily: 'Roboto',
        fontWeight: '800',
        fontSize: 16,
        color: '#483B5F',
        top: -2
    },
    imageStyle: {
        width: 65,
        height: 65,
    },
    searchContainer: {
        borderWidth: 3, 
        width: '90%',
        borderColor: '#7E3FF0', 
        borderRadius: 15, 
        marginTop: '10%',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        paddingHorizontal: '2.6%',
    },
    searchBarContainer: {
  
        width: 300, 
        height: 40, 
    },

    searchBarInputContainer: {

        height: '100%', 
    },

    frameContainer: {
        backgroundColor: "#7E3FF0",
        marginTop: "5%",
        marginLeft: "7%",
        width: '85%',
        height: "15%",
        overflow: "hidden",
        borderRadius: 16  
    },
  
    AllCoachesButton: {
        width: 110, 
        height: 50, 
        marginTop: '5%',
        marginLeft: '8%',
        backgroundColor: '#e1d1fa',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        lineHeight: 24,
    },
    activeButton: {
        backgroundColor: '#7E3FF0'
    },
    seeMoreButton: {
        backgroundColor: 'transparent', 
        borderRadius: 15,            
        paddingVertical: 5,        
        paddingHorizontal: 20,      
        marginVertical: 1,         
        alignSelf: 'center',      
        borderColor: "#7E3FF0" ,
        borderWidth: 1

    },
    seeMoreText: {
        color: '#7E3FF0',           
        fontSize: 16,                   
        textAlign: 'center',        
    },
   
});

export default AllCoaches;
