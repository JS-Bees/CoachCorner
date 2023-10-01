import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputSignUpPages from '../../components/InputSignUpPages';
import LogInButton from '../../components/CustomButton';
import { useMutation } from 'urql';
import {
    CreateCoacheeDocument,
    Sport,
    Games,
    Hobbies,
    MovieGenres,
} from '../../generated-gql/graphql';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RadioButton } from 'react-native-paper';

const SignUpForCoachee = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [First_Name, setFirst_Name] = useState('');
    const [Last_Name, setLast_Name] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Repeat_Password, setRepeat_Password] = useState('');
    const [StreetAdd, setStreetAddress] = useState('');
    const [City, setCity] = useState('');
    const [Postal, setPostal] = useState('5800');
    const [dateOfBirth, setDateofBirth] = useState('');
    const [selectedGames, setSelectedGames] = useState<Games[]>([Games.Dota]);
    const [selectedHobbies, setSelectedHobbies] = useState<Hobbies[]>([Hobbies.Baking]);
    const [selectedMovieGenres, setSelectedMovieGenres] = useState<MovieGenres[]>([MovieGenres.Action]);
    const [, SignUpForCoach] = useMutation(CreateCoacheeDocument);

    const [date, setdate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const onChange = ({ type }: any, selectedDate: any) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setdate(currentDate);
            if (Platform.OS === 'android') {
                toggleDatePicker();
                setDateofBirth(currentDate.toDateString());
            }
        } else {
            toggleDatePicker();
        }
    };

    // const setInitialSelectedValues = () => {
    //     setSelectedSport([Sport.Soccer]);
    //     setSelectedGames([Games.Dota]);
    //     setSelectedHobbies([Hobbies.Baking]);
    //     setSelectedMovieGenres([MovieGenres.Action]);
    // };

    const onSignUpPressed = async () => {
        try {
            // Log the data before making the API call
            console.log("Signing up with data:", {
            firstName: First_Name,
            lastName: Last_Name,
            birthday: date,
            email: Email.toLowerCase(),
            password: Password,
            address: StreetAdd,
            games: selectedGames,
            hobbies: selectedHobbies,
            moviesGenres: selectedMovieGenres,
        });

            const { data, error } = await SignUpForCoach({
                firstName: First_Name,
                lastName: Last_Name,
                birthday: date,
                email: Email.toLowerCase(),
                password: Password,
                address: StreetAdd,
                games: selectedGames,
                hobbies: selectedHobbies,
                moviesGenres: selectedMovieGenres,
            });

            if (error) {
                console.error(error);
            } else {
                setSuccessMessage('Signed up successfully!');
                toggleModal();
                // Clear form fields
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
        }
        console.log()
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
                        setValue={setFirst_Name}
                    />
                    <InputSignUpPages
                        placeholder="Last Name"
                        value={Last_Name}
                        setValue={setLast_Name}
                    />
                    <InputSignUpPages
                        placeholder="Email"
                        value={Email}
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

                <View style={styles.birthdayContainer}>
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
                                placeholder="Sat Aug 24 2001"
                                value={dateOfBirth}
                                onChangeText={setDateofBirth}
                                editable={false}
                            />
                        </Pressable>
                    )}
                </View>

                <View style={styles.AdressContainer}>
                    <Text style={styles.birthdayText}>Address Information</Text>

                    <InputSignUpPages
                        placeholder="Street Address"
                        value={StreetAdd}
                        setValue={setStreetAddress}
                    />
                    <InputSignUpPages
                        placeholder="City"
                        value={City}
                        setValue={setCity}
                    />
                    <InputSignUpPages
                        placeholder="Postal Code"
                        value={Postal}
                        setValue={setPostal}
                    />
                    <Text style={styles.choiceContainer}>Select Game:</Text>
                        <View style={styles.radioContainer}>
                            <View style={styles.radioButton}>
                                <Text style={{ color: '#a19e9e' }}>Dota</Text>
                                <RadioButton
                                value={Sport.Soccer}
                                status={selectedGames[0] === Games.Dota ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedGames([Games.Dota])}
                                />
                        </View>
                        <View style={styles.radioButton}>
                        <Text style={{ color: '#a19e9e' }}>LOL</Text>
                            <RadioButton
                                value={Games.Lol}
                                status={selectedGames[0] === Games.Lol ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedGames([Games.Lol])}
                                />
                        </View>
                        <View style={styles.radioButton}>
                        <Text style={{ color: '#a19e9e' }}>PUBG</Text>
                            <RadioButton
                                value={Games.Pubg}
                                status={selectedGames[0] === Games.Pubg ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedGames([Games.Pubg])}
                                />
                        </View>
                    </View>
                    <Text style={styles.choiceContainer}>Select Hobbie:</Text>
                        <View style={styles.radioContainer}>
                            <View style={styles.radioButton}>
                                <Text style={{ color: '#a19e9e' }}>Reading</Text>
                                <RadioButton
                                value={Hobbies.Reading}
                                status={selectedHobbies[0] === Hobbies.Reading ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedHobbies([Hobbies.Reading])}
                                />
                        </View>
                        <View style={styles.radioButton}>
                        <Text style={{ color: '#a19e9e' }}>Singing</Text>
                            <RadioButton
                                 value={Hobbies.Singing}
                                 status={selectedHobbies[0] === Hobbies.Singing ? 'checked' : 'unchecked'}
                                 onPress={() => setSelectedHobbies([Hobbies.Singing])}
                                 />
                        </View>
                        <View style={styles.radioButton}>
                        <Text style={{ color: '#a19e9e' }}>Writing</Text>
                            <RadioButton
                                value={Hobbies.Writing}
                                status={selectedHobbies[0] === Hobbies.Writing ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedHobbies([Hobbies.Writing])}
                                />
                        </View>
                    </View>
                    <Text style={styles.choiceContainer}>Select Movie Genre:</Text>
                        <View style={styles.radioContainer}>
                            <View style={styles.radioButton}>
                                <Text style={{ color: '#a19e9e' }}>Action</Text>
                                <RadioButton
                                value={MovieGenres.Action}
                                status={selectedMovieGenres[0] === MovieGenres.Action ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedMovieGenres([MovieGenres.Action])}
                                />
                        </View>
                        <View style={styles.radioButton}>
                        <Text style={{ color: '#a19e9e' }}>Comedy</Text>
                            <RadioButton
                                value={MovieGenres.Comedy}
                                status={selectedMovieGenres[0] === MovieGenres.Comedy ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedMovieGenres([MovieGenres.Comedy])}
                                />
                        </View>
                        <View style={styles.radioButton}>
                        <Text style={{ color: '#a19e9e' }}>Horror</Text>
                            <RadioButton
                                value={MovieGenres.Horror}
                                status={selectedMovieGenres[0] === MovieGenres.Horror ? 'checked' : 'unchecked'}
                                onPress={() => setSelectedMovieGenres([MovieGenres.Horror])}
                                />
                        </View>
                    </View>
                </View>
                    <View style={styles.button}>
                    <LogInButton text="Sign Up" onPress={onSignUpPressed} />
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
        marginTop: '10%',
        marginLeft: '1%',
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
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default SignUpForCoachee;
