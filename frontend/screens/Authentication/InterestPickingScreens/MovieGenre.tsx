import React, { useEffect, useState } from 'react';
import CustomCheckBox from '../../../components/Custom components/CustomCheckBox';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation } from 'urql';
import { CreateCoachDocument } from '../../../generated-gql/graphql';
import { CreateCoacheeDocument } from '../../../generated-gql/graphql';
import SignupSuccessModal from '../../../components/PopUpModal';

type Movie =
    | 'Writing'
    | 'Watching Movies'
    | 'Music'
    | 'Clubbing'
    | 'Cooking'
    | 'Napping';

const ChooseMovies = ({ route }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [checkedMovies, setCheckedGames] = useState<Record<Movie, boolean>>({
        Reading: false,
        'Watching Movies': false,
        Music: false,
        Exercising: false,
        Cooking: false,
        Napping: false,
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    const [, createCoach] = useMutation(CreateCoachDocument);
    const [coacheeRes, createCoachee] = useMutation(CreateCoacheeDocument);
    const {
        firstName,
        lastName,
        email,
        password,
        birthday,
        coachOrCoachee,
        workplaceAddress,
    } = route.params;
    const { selectedHobbies } = route.params;
    const { selectedGames } = route.params;
    const { selectedSports } = route.params;

    const handleCheckboxChange = (MovieGenre: Movie) => {
        setCheckedGames((prevCheckedMovies) => {
            const newCheckedHobby = { ...prevCheckedMovies };
            const checkedCount = Object.values(newCheckedHobby).filter(
                (value) => value,
            ).length;

            if (checkedCount === 4 && !newCheckedHobby[MovieGenre]) {
            
                newCheckedHobby[MovieGenre] = false;
            } else {
                newCheckedHobby[MovieGenre] = !newCheckedHobby[MovieGenre];
            }

            return newCheckedHobby;
        });
    };

    const checkedCount = Object.values(checkedMovies).filter(
        (value) => value,
    ).length;
    const isMaxChecksReached = checkedCount === 3;

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleButtonPress = async () => {
        setLoading(true);
        if (coachOrCoachee == 'coachee') {
            console.log(coachOrCoachee);
            const selectedMovie = Object.keys(checkedMovies)
                .filter((MovieGenre) => checkedMovies[MovieGenre])
                .map((MovieGenre) => ({ MovieGenre }));

            const selectedGamesInterests = selectedGames.map((BookGenre) => ({
                type: 'BookGenre',
                name: BookGenre.BookGenre,
            }));

            const selectedHobbiesInterests = selectedHobbies.map(
                (MusicGenre) => ({
                    type: 'MusicGenre',
                    name: MusicGenre.MusicGenre,
                }),
            );

            try {
                const sports = selectedSports.map((sportObj) => sportObj.sport);
                const chosenSport = sports.join(', ');

                const { data, error, fetching } = await createCoachee({
                    input: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        sport: chosenSport,
                        password: password,
                        address: workplaceAddress,
                        bio: 'Enter Bio',
                        birthday: birthday, 
                        profilePicture:
                            'https://res.cloudinary.com/dkwht3l4g/image/upload/v1714580142/ozgrqvlagkbusmlhjgca.png',
                    },
                    interestsInput: [
                        ...selectedMovie.map((MovieGenre) => ({
                            type: 'MovieGenre',
                            name: MovieGenre.MovieGenre,
                        })),
                        ...selectedGamesInterests,
                        ...selectedHobbiesInterests,
                    ],
                });

                console.log(createCoachee);

                if (!data || !error) {
                    console.log('coachee is being fetched');
                }

                if (error) {
                    console.log('Did this coachee error run');
                    if (
                        error.toString().trim() ===
                        '[GraphQL] Email rate limit exceeded'
                    ) {
                        setSuccessMessage(
                            `Signup Failed. \nEmail rate limit exceeded.`,
                        );
                        setModalVisible(true);
                    } else if (
                        error.toString().trim() ===
                        '[GraphQL] Email already exists'
                    ) {
                        setSuccessMessage(
                            `Signup Failed. \nEmail address already in use.`,
                        );
                        setModalVisible(true);
                    } else {
                        setSuccessMessage(`Signup Failed.`);
                        setModalVisible(true);
                    }
                    setLoading(false);
                    return;
                } else if (data && data.createCoachee) {
                    console.log('Coachee created:', data.createCoachee);
       
                }
 
                if (data) {
                    setSuccessMessage(
                        'Signup Successful!\nPlease verify your email.',
                    );
                    setModalVisible(true);
                    setLoading(false);
                }
            } catch (error) {
                console.log(selectedGames, selectedHobbies, selectedMovie);

                console.error('Error creating coachee:', error);

            }
        }
        if (coachOrCoachee == 'coach') {
            console.log(coachOrCoachee);
            const selectedMovie = Object.keys(checkedMovies)
                .filter((MovieGenre) => checkedMovies[MovieGenre])
                .map((MovieGenre) => ({ MovieGenre }));

            const selectedSport = selectedSports.map((sport) => ({
                type: sport.sport,
            }));

 

            const selectedGamesInterests = selectedGames.map((BookGenre) => ({
                type: 'BookGenre',
                name: BookGenre.BookGenre,
            }));

            const selectedHobbiesInterests = selectedHobbies.map(
                (MusicGenre) => ({
                    type: 'MusicGenre',
                    name: MusicGenre.MusicGenre,
                }),
            );

            try {
                const { data, error } = await createCoach({
                    input: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        address: workplaceAddress,
                        bio: 'Enter Bio',
                        birthday: birthday,
                        profilePicture:
                            'https://res.cloudinary.com/dkwht3l4g/image/upload/v1714580142/ozgrqvlagkbusmlhjgca.png',
                    },
                    sportsInput: [selectedSport[0]],
                    interestsInput: [
                        ...selectedMovie.map((MovieGenre) => ({
                            type: 'MovieGenre',
                            name: MovieGenre.MovieGenre,
                        })),
                        ...selectedGamesInterests,
                        ...selectedHobbiesInterests,
                    ],
                });

                if (error) {
                    if (
                        error.toString().trim() ===
                        '[GraphQL] Email rate limit exceeded'
                    ) {
                        setSuccessMessage(
                            `Signup Failed. \nEmail rate limit exceeded.`,
                        );
                        setModalVisible(true);
                    } else if (
                        error.toString().trim() ===
                        '[GraphQL] Email already exists'
                    ) {
                        setSuccessMessage(
                            `Signup Failed. \nEmail address already in use.`,
                        );
                        setModalVisible(true);
                    } else {
                        setSuccessMessage(`Signup Failed.`);
                        setModalVisible(true);
                    }
                    setLoading(false);
                    return;
                } else if (data && data.createCoach) {
                    console.log('Coach created:', data.createCoach);
                  
                }

                if (data) {
                    setSuccessMessage(
                        'Signup Successful!\nPlease verify your email.',
                    );
                    setModalVisible(true);
                    setLoading(false);
                }
            } catch (error) {
                console.log(
                    selectedGames,
                    selectedHobbies,
                    selectedMovie,
                    selectedSport,
                );
                console.error('Error creating coachee:', error);

            }
        }

    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handleGoBack}
                style={styles.iconContainer}
            >
                <Icon
                    name="arrow-back-circle-outline"
                    size={30}
                    color="#7E3FF0"
                />
            </TouchableOpacity>
            <Text style={styles.header}>
                {' '}
                What activities do you like to do in your spare time?
            </Text>
            <Text style={styles.subtitle}>Choose 3 Activities</Text>

            <View style={styles.checkboxContainer}>
                <CustomCheckBox
                    checked={checkedMovies.Writing}
                    checkedColor="#7E3FF0"
                    label="Writing"
                    onPress={() => handleCheckboxChange('Writing')}
                />
                <CustomCheckBox
                    checked={checkedMovies['Watching Movies']}
                    checkedColor="#7E3FF0"
                    label="Watching Movies"
                    onPress={() => handleCheckboxChange('Watching Movies')}
                />
                <CustomCheckBox
                    checked={checkedMovies.Music}
                    checkedColor="#7E3FF0"
                    label="Music"
                    onPress={() => handleCheckboxChange('Music')}
                />
                <CustomCheckBox
                    checked={checkedMovies.Clubbing}
                    checkedColor="#7E3FF0"
                    label="Clubbing"
                    onPress={() => handleCheckboxChange('Clubbing')}
                />
                <CustomCheckBox
                    checked={checkedMovies.Cooking}
                    checkedColor="#7E3FF0"
                    label="Cooking"
                    onPress={() => handleCheckboxChange('Cooking')}
                />
                <CustomCheckBox
                    checked={checkedMovies.Napping}
                    checkedColor="#7E3FF0"
                    label="Napping"
                    onPress={() => handleCheckboxChange('Napping')}
                />
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#7E3FF0" />
            ) : (
                <TouchableOpacity
                    style={[
                        styles.button,
                        !isMaxChecksReached && styles.disabledButton,
                    ]}
                    onPress={handleButtonPress}
                    disabled={!isMaxChecksReached}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            height: 40,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                        }}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
            )}
        
            <SignupSuccessModal
                visible={modalVisible}
                message={successMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        marginTop: '10%',
        fontSize: 16,
        fontWeight: '200',
        fontFamily: 'Roboto',
        color: '#656466',
        textAlign: 'center',
    },
    subtitle: {
        marginTop: '5%',
        fontSize: 14,
        fontWeight: '200',
        fontFamily: 'Roboto',
        color: '#908D93',
        textAlign: 'center',
    },
    checkboxContainer: {
        marginTop: '5%',
    },
    button: {
        marginTop: '5%',
        marginLeft: '11%',
        backgroundColor: '#7E3FF0',
        width: 300,
        borderRadius: 15,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#D4C5ED',
    },
    iconContainer: {
        marginTop: '15%',
        marginLeft: '9%',
    },
});

export default ChooseMovies;
