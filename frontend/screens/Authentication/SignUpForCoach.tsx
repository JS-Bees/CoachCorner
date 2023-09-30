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
    CreateCoachDocument,
    Sport,
    Games,
    Hobbies,
    MovieGenres,
} from '../../generated-gql/graphql';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SignUpForCoach = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [First_Name, setFirst_Name] = useState('');
    const [Last_Name, setLast_Name] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Repeat_Password, setRepeat_Password] = useState('');
    const [StreetAdd, setStreetAddress] = useState('');
    const [City, setCity] = useState('');
    const [Postal, setPostal] = useState('');
    const [dateOfBirth, setDateofBirth] = useState('');
    const [selectedSport, setSelectedSport] = useState<Sport[]>([]);
    const [selectedGames, setSelectedGames] = useState<Games[]>([]);
    const [selectedHobbies, setSelectedHobbies] = useState<Hobbies[]>([]);
    const [selectedMovieGenres, setSelectedMovieGenres] = useState<MovieGenres[]>([]);
    const [, SignUpForCoach] = useMutation(CreateCoachDocument);

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

    const setInitialSelectedValues = () => {
        setSelectedSport([Sport.Soccer]);
        setSelectedGames([Games.Dota]);
        setSelectedHobbies([Hobbies.Baking]);
        setSelectedMovieGenres([MovieGenres.Action]);
    };

    const onSignUpPressed = async () => {
        try {
            setInitialSelectedValues();

            const { data, error } = await SignUpForCoach({
                firstName: First_Name,
                lastName: Last_Name,
                birthday: date,
                email: Email.toLowerCase(),
                password: Password,
                workplaceAddress: StreetAdd,
                sport: selectedSport[0],
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
});

export default SignUpForCoach;
