import React, { useState } from 'react';
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

type Movie = 'Romance' | 'Horror' | 'Action' | 'Comedy' | 'Thriller' | 'Drama';

const ChooseMovies = ({ route }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [checkedMovies, setCheckedGames] = useState<Record<Movie, boolean>>({
        Romance: false,
        Horror: false,
        Action: false,
        Comedy: false,
        Thriller: false,
        Drama: false,
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    const [, createCoach] = useMutation(CreateCoachDocument);
    const [, createCoachee] = useMutation(CreateCoacheeDocument);
    const {
        firstName,
        lastName,
        email,
        password,
        birthday,
        coachOrCoachee,
        workplaceAddress /* Add other data */,
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
                // If trying to check more than 4, uncheck the current checkbox
                newCheckedHobby[MovieGenre] = false;
            } else {
                // Toggle the state of the clicked checkbox
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

    if(coachOrCoachee == 'coachee') {
      console.log(coachOrCoachee)
      const selectedMovie = Object.keys(checkedMovies)
        .filter(MovieGenre => checkedMovies[MovieGenre])
        .map(MovieGenre => ({ MovieGenre }));
  
        const selectedGamesInterests = selectedGames.map(BookGenre => ({
          type: 'BookGenre',
          name: BookGenre.BookGenre,
        }));
      
        const selectedHobbiesInterests = selectedHobbies.map(MusicGenre => ({
          type: 'MusicGenre',
          name: MusicGenre.MusicGenre,
        }));
      
    
      try {
        const { data, errors, fetching } = await createCoachee({
          input: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            address: workplaceAddress,
            bio: "Enter Bio",
            birthday:  birthday,
            profilePicture: "https://res.cloudinary.com/dkwht3l4g/image/upload/v1714580142/ozgrqvlagkbusmlhjgca.png",
            // Add other fields as needed
          },
          interestsInput: [
            ...selectedMovie.map(MovieGenre => ({
              type: 'MovieGenre',
              name: MovieGenre.MovieGenre,
            })),
            ...selectedGamesInterests,
            ...selectedHobbiesInterests,
          ],
    
        });
    
        if (errors) {
          console.error('GraphQL errors:', errors);
        } else if (data && data.createCoachee) {
          console.log('Coachee created:', data.createCoachee);
          // Navigate to the next screen or perform other actions upon successful signup
        } else {
          console.log("This is a coachee")
          console.log(selectedGames, selectedHobbies, selectedMovie)
          console.log(firstName, lastName, email, password , workplaceAddress,birthday)
          console.error('No  data returned from mutation');
        }
      } catch (error) {
        console.log(selectedGames, selectedHobbies, selectedMovie)
        console.error('Error creating coachee:', error);
        // Handle errors appropriately
      }

    } if(coachOrCoachee == 'coach'){ 
      console.log(coachOrCoachee)
      const selectedMovie = Object.keys(checkedMovies)
        .filter(MovieGenre => checkedMovies[MovieGenre])
        .map(MovieGenre => ({ MovieGenre }));

            const selectedSport = selectedSports.map((sport) => ({
                type: sport.sport,
            }));

        // const selectedSport = sport.sport
  
        const selectedGamesInterests = selectedGames.map(BookGenre => ({
          type: 'BookGenre',
          name: BookGenre.BookGenre,
        }));
      
        const selectedHobbiesInterests = selectedHobbies.map(MusicGenre => ({
          type: 'MusicGenre',
          name: MusicGenre.MusicGenre,
        }));
      
    
      try {
        const { data, errors } = await createCoach({
          input: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            address: workplaceAddress,
            bio: "Enter Bio",
            birthday:  birthday,
            profilePicture: "https://res.cloudinary.com/dkwht3l4g/image/upload/v1714580142/ozgrqvlagkbusmlhjgca.png",
            // Add other fields as needed
          },                                                                           
          sportsInput: [
            selectedSport[0]
          ],
          interestsInput: [
            ...selectedMovie.map(MovieGenre => ({
              type: 'MovieGenre',
              name: MovieGenre.MovieGenre,
            })),
            ...selectedGamesInterests,
            ...selectedHobbiesInterests,
          ],  

        });
    
        if (errors) {
          console.error('GraphQL errors:', errors);
        } else if (data && data.createCoach) {
          console.log('Coach created:', data.createCoach);
          // Navigate to the next screen or perform other actions upon successful signup
        } else {
          console.log("This is a coach")
          console.log(selectedSports, selectedGames, selectedHobbies, selectedMovie)
          console.log(firstName, lastName, email, password , workplaceAddress,birthday)
          console.error('No data returned from mutation');
        }
      } catch (error) {
        console.log(selectedGames, selectedHobbies, selectedMovie, selectedSports)
        console.error('Error creating coachee:', error);
        // Handle errors appropriately
      }

    }
    setSuccessMessage('Signup Successful!');
    setModalVisible(true)
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
                Which genre of movies do you prefer to enjoy during your
                downtime?
            </Text>
            <Text style={styles.subtitle}>Choose 3 Genres</Text>

            <View style={styles.checkboxContainer}>
                <CustomCheckBox
                    checked={checkedMovies.Romance}
                    checkedColor="#7E3FF0"
                    label="Romance"
                    onPress={() => handleCheckboxChange('Romance')}
                />
                <CustomCheckBox
                    checked={checkedMovies.Horror}
                    checkedColor="#7E3FF0"
                    label="Horror"
                    onPress={() => handleCheckboxChange('Horror')}
                />
                <CustomCheckBox
                    checked={checkedMovies.Action}
                    checkedColor="#7E3FF0"
                    label="Action"
                    onPress={() => handleCheckboxChange('Action')}
                />
                <CustomCheckBox
                    checked={checkedMovies.Comedy}
                    checkedColor="#7E3FF0"
                    label="Comedy"
                    onPress={() => handleCheckboxChange('Comedy')}
                />
                <CustomCheckBox
                    checked={checkedMovies.Thriller}
                    checkedColor="#7E3FF0"
                    label="Thriller"
                    onPress={() => handleCheckboxChange('Thriller')}
                />
                <CustomCheckBox
                    checked={checkedMovies.Drama}
                    checkedColor="#7E3FF0"
                    label="Drama"
                    onPress={() => handleCheckboxChange('Drama')}
                />
            </View>

            <View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#915bc7" />
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
            </View>
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
