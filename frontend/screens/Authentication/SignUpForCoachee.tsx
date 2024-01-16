import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Platform,
    ActivityIndicator
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputSignUpPages from '../../components/InputSignUpPages';
import LogInButton from '../../components/Custom components/CustomButton';
import { useMutation } from 'urql';
import {
    CreateCoacheeDocument,
    Games,
    Hobbies,
    MovieGenres,
} from '../../generated-gql/graphql';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Checkbox } from 'react-native-paper'; // Import Checkbox from react-native-paper

const SignUpForCoachee = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [First_Name, setFirst_Name] = useState('');
    const [Last_Name, setLast_Name] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Repeat_Password, setRepeat_Password] = useState('');
    const [StreetAdd, setStreetAddress] = useState('');
    const [City, setCity] = useState('Iloilo');
    const [Postal, setPostal] = useState('5000');
    const [dateOfBirth, setDateofBirth] = useState('');
    const [profilePic] = useState('Fixed');
    const [mantra] = useState('Write mantra here');
    const [bio] = useState('Enter Bio');   
    const [affiliations] = useState('Enter Affilitations');
    const [selectedGames, setSelectedGames] = useState<Games[]>([]);
    const [selectedHobbies, setSelectedHobbies] = useState<Hobbies[]>([]);
    const [selectedMovieGenres, setSelectedMovieGenres] = useState<MovieGenres[]>([]);
    const [, SignUpForCoachee] = useMutation(CreateCoacheeDocument);

    const [date, setdate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleErrorModal = () => {
        setErrorModalVisible(!errorModalVisible);
    };

    const onChange = ({ type }: any, selectedDate: any) => {
        if (type === 'set') {
          const currentDate = selectedDate;
          const minDate = new Date();
          minDate.setFullYear(minDate.getFullYear() - 70); // Minimum allowed date (70 years ago)
          const maxDate = new Date();
          maxDate.setFullYear(maxDate.getFullYear() - 10); // Maximum allowed date (10 years ago)
      
          // Check if the selected date is within the allowed range
          if (currentDate >= minDate && currentDate <= maxDate) {
            setdate(currentDate);
            if (Platform.OS === 'android') {
              toggleDatePicker();
              setDateofBirth(currentDate.toDateString());
            }
          } else {
            // Close the date picker
            toggleDatePicker();
      
            // Show an error message if the selected date is outside the allowed range
            setErrorMessage(`Please select a valid date between ${minDate.getFullYear()} and ${maxDate.getFullYear()}`);
            setErrorModalVisible(true);
          }
        } else {
          toggleDatePicker();
        }
      };
      

    // Function to toggle checkboxes for games, hobbies, and movie genres
    const toggleCheckbox = (item: any, state: any, setState: any) => {
        if (state.includes(item)) {
            setState(state.filter((selectedItem: any) => selectedItem !== item));
        } else {
            setState([...state, item]);
        }
    };

    function containsInteger(First_Name, Last_Name) {
        const regex = /\d/;
        return regex.test(First_Name) || regex.test(Last_Name);
    }

    const onSignUpPressed = async () => {
        try {
            // Validate the input fields
            if (
                First_Name.trim() === '' ||
                Last_Name.trim() === '' ||
                Email.trim() === '' ||
                Password.trim() === '' ||
                Repeat_Password.trim() === '' ||
                StreetAdd.trim() === '' ||
                City.trim() === '' ||
                Postal.trim() === '' ||
                Password.trim() !== Repeat_Password.trim() 
                
            ) {
                // Display an error message for incomplete fields
                setErrorMessage('Please fill in all the required fields.');
                setErrorModalVisible(true);
                setIsLoading(false);
                return; // Return early to prevent further execution
            }

            
            // Check for integers in First_Name and Last_Name
         if (containsInteger(First_Name, Last_Name)) {
            setErrorMessage('First Name and Last Name cannot contain integers.');
            setErrorModalVisible(true);
            setIsLoading(false);
            return; // Return early if validation fails
        }
        setIsLoading(true); // Set isLoading to true when the signup process starts

      

            // Log the data before making the API call
            console.log("Signing up with data:", {
                firstName: First_Name,
                lastName: Last_Name,
                birthday: date,
                email: Email,
                password: Password,
                workplaceAddress: StreetAdd,
                games: selectedGames,
                hobbies: selectedHobbies,
                moviesGenres: selectedMovieGenres,
            });

            const { data, error, fetching } = await SignUpForCoachee({
                firstName: First_Name,
                lastName: Last_Name,
                birthday: date,
                email: Email,
                password: Password,
                address: StreetAdd,
                profilePicture: profilePic,
                mantra: mantra,
                bio: bio,
                affiliations: affiliations,
                games: selectedGames,
                hobbies: selectedHobbies,
                moviesGenres: selectedMovieGenres,
            });

            if (error) {
                console.error(error);
            } else {
                setSuccessMessage('Signed up successfully!');
                toggleModal();
                setFirst_Name('');
                setLast_Name('');
                setEmail('');
                setPassword('');
                setRepeat_Password('');
                setStreetAddress('');
                setCity('');
                setPostal('');
                setDateofBirth('');
            }
        } catch (err) {
            console.error(err);
            // Reset loading state to false in case of an error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Text style={styles.textStyle}>Create Account</Text>
                </View>

                <View style={styles.customContainer}>
                    <InputSignUpPages
                        placeholder="Full Name"
                        value={First_Name}
                        checkForInteger
                        setValue={value => setFirst_Name(value.substring(0, 10))} // Limit to 9 characters
                    />
                    <InputSignUpPages
                        placeholder="Last Name"
                        value={Last_Name}
                        checkForInteger
                        setValue={value => setLast_Name(value.substring(0, 10))} // Limit to 9 characters
                    />
                    <InputSignUpPages
                        placeholder="Email"
                        value={Email}
                        checkEmailEnding
                        setValue={setEmail}
                    />
                </View>

                <View style={styles.customContainer}>
                    <InputSignUpPages
                        placeholder="Password"
                        value={Password}
                        setValue={setPassword}
                        secureTextEntry
                    />
                    <InputSignUpPages
                        placeholder="Repeat Password"
                        value={Repeat_Password}
                        setValue={setRepeat_Password}
                        secureTextEntry
                        passwordToMatch={Password}
                    />
                </View>

                <View style={styles.customContainer}>
                    <Text style={styles.birthdayText}>Date of Birth</Text>

                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}
                        />
                    )}

                    {!showPicker && (
                        <Pressable onPress={toggleDatePicker}>
                            <TextInput
                                style={styles.birthdayBorder}
                                placeholder="Sat Aug 24 2000"
                                value={dateOfBirth}
                                onChangeText={setDateofBirth}
                                editable={false}
                            />
                        </Pressable>
                    )}
                </View>

                <View style={styles.customContainer}>
                    <Text style={styles.addressText}>Address Information</Text>

                    <InputSignUpPages
                        placeholder="Street Address"
                        value={StreetAdd}
                        setValue={setStreetAddress}
                    />
                    <InputSignUpPages
                        placeholder="City"
                        value={City}
                        setValue={setCity}
                        editable={false}
                    />
                    <InputSignUpPages
                        placeholder="Postal Code"
                        value={Postal}
                        setValue={setPostal}
                        editable={false}
                    />
                    <Text style={styles.choiceContainer}>Select Video Games:</Text>
                    <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                            <Text style={{ color: '#a19e9e', marginLeft: 15 }}>PUBG</Text>
                            <Checkbox
                                status={selectedGames.includes(Games.Pubg) ? 'checked' : 'unchecked'}
                                onPress={() => toggleCheckbox(Games.Pubg, selectedGames, setSelectedGames)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <Text style={{ color: '#a19e9e', marginLeft: 15 }}>Dota</Text>
                            <Checkbox
                                status={selectedGames.includes(Games.Dota) ? 'checked' : 'unchecked'}
                                onPress={() => toggleCheckbox(Games.Dota, selectedGames, setSelectedGames)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <Text style={{ color: '#a19e9e', marginLeft: 27 }}>LOL</Text>
                            <Checkbox
                                status={selectedGames.includes(Games.Lol) ? 'checked' : 'unchecked'}
                                onPress={() => toggleCheckbox(Games.Lol, selectedGames, setSelectedGames)}
                            />
                        </View>
                    </View>

                    <Text style={styles.selectdHobbiesContainer}>Select Hobbies:</Text>
                    <View style={styles.checkboxContainer}>
                        <View style={styles.checkbox}>
                            <Text style={{ color: '#a19e9e' }}>Reading</Text>
                            <Checkbox
                                status={selectedHobbies.includes(Hobbies.Reading) ? 'checked' : 'unchecked'}
                                onPress={() => toggleCheckbox(Hobbies.Reading, selectedHobbies, setSelectedHobbies)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <Text style={{ color: '#a19e9e', marginLeft: -1}}>Singing</Text>
                            <Checkbox
                                status={selectedHobbies.includes(Hobbies.Singing) ? 'checked' : 'unchecked'}
                                onPress={() => toggleCheckbox(Hobbies.Singing, selectedHobbies, setSelectedHobbies)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <Text style={{ color: '#a19e9e', marginLeft: 7}}>Writing</Text>
                            <Checkbox
                                status={selectedHobbies.includes(Hobbies.Writing) ? 'checked' : 'unchecked'}
                                onPress={() => toggleCheckbox(Hobbies.Writing, selectedHobbies, setSelectedHobbies)}
                            />
                        </View>
                    </View>

                    <Text style={styles.choiceContainer}>Select Movie Genres:</Text>
                    <View style={styles.checkboxContainer}>
                        <View style={styles.checkbox}>
                            <Text style={{ color: '#a19e9e', marginLeft: 9 }}>Action</Text>
                            <Checkbox
                                status={selectedMovieGenres.includes(MovieGenres.Action) ? 'checked' : 'unchecked'}
                                onPress={() => toggleCheckbox(MovieGenres.Action, selectedMovieGenres, setSelectedMovieGenres)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <Text style={{ color: '#a19e9e', marginLeft: -6}}>Comedy</Text>
                            <Checkbox
                                status={selectedMovieGenres.includes(MovieGenres.Comedy) ? 'checked' : 'unchecked'}
                                onPress={() => toggleCheckbox(MovieGenres.Comedy, selectedMovieGenres, setSelectedMovieGenres)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <Text style={{ color: '#a19e9e', marginLeft: 10}}>Horror</Text>
                            <Checkbox
                                status={selectedMovieGenres.includes(MovieGenres.Horror) ? 'checked' : 'unchecked'}
                                onPress={() => toggleCheckbox(MovieGenres.Horror, selectedMovieGenres, setSelectedMovieGenres)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.button}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#915bc7" />
                    ) : (
                        <LogInButton text="Sign Up" onPress={onSignUpPressed} />
                    )}
                </View>
            </View>

            {showModal && (
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.successText}>{successMessage}</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => {
                                toggleModal();
                                navigation.navigate('LogIn');
                            }}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {errorModalVisible && (
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.errorText}>{errorMessage}</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => {
                                toggleErrorModal();
                            }}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        zIndex: 0,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    customContainer: {
        alignItems: 'center',
        padding: 10,
    },
    button: {
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: '10%',
        padding: 10,
    },
    AdressContainer: {
        marginTop: 30,
        marginLeft: 25,
        justifyContent: 'flex-start',
    },
    birthdayContainer: {
        marginTop: 10,
        marginLeft: 25,
        justifyContent: 'flex-start',
    },
    choiceContainer: {
        color: '#a19e9e',
        marginTop: '7%',
        left: '-26%',
        justifyContent: 'flex-start',
    },
    birthdayBorder: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 154,
        width: 300,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        shadowRadius: 6,
        elevation: 6,
        shadowOpacity: 5,
        borderColor: '#e8e8e8',
    },
    birthdayText: {
        color: '#a19e9e',
        left: '-35%'
    },
    addressText: {
        color: '#a19e9e',
        left: '-26%'
    },
    textStyle: {
        fontSize: 24,
        fontWeight: '900',
        fontFamily: 'Roboto',
        color: '#915bc7',
        textAlign: 'left',
    },
    // Modal styles
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    successText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#915bc7', // Change the font color to light green
    },
    errorText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center',
        color: 'red', // Change the font color to red
    },
    modalButton: {
        backgroundColor: '#A378F2', // Change the background color to purple
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 1,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
    },
    selectdHobbiesContainer: {
        color: '#a19e9e',
        marginTop: '7%',
        left: '-31%',
        justifyContent: 'flex-start',
    }
  
});

export default SignUpForCoachee;
