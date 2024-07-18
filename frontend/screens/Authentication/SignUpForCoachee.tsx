import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputSignUpPages from '../../components/Custom components/InputSignUpPages';
import LogInButton from '../../components/Custom components/CustomButton';
import { useMutation } from 'urql';
import { CreateCoacheeDocument } from '../../generated-gql/graphql';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { Checkbox } from 'react-native-paper'; // Import Checkbox from react-native-paper


const SignUpForCoachee = ({route}) => {
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
    const [bio] = useState('Mt bio');   
    const [, SignUpForCoachee] = useMutation(CreateCoacheeDocument);
    const [CoachorCoachee, setCoachOrCoachee] = useState('coachee');
    

    const [Exact_Date, setdate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
   
    };

    
    // const navigateToHobbies = () => {
    //     navigation.navigate('InterestPickingHobby', 
    //     {  firstName: First_Name,
    //         lastName: Last_Name,
    //         birthday: date,
    //         email: Email,
    //         password: Password,
    //         workplaceAddress: StreetAdd,
    //         profilePic: profilePic,
    //         mantra: mantra,
    //         bio: bio,
    //         coachingRole: coachingRole,
            

    //     }); 
    // };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleErrorModal = () => {
        setErrorModalVisible(!errorModalVisible);
    };

    const onChange = ({ type }, selectedDate) => {
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
    
                // Show an alert if the selected date is outside the allowed range
                Alert.alert(
                    'Invalid Date',
                    `Please select a valid date between ${minDate.getFullYear()} and ${maxDate.getFullYear()}`,
                    [{ text: 'OK' }]
                );
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

    const onNext = async () => {
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
    
    
            // Check if email has at least 5 characters before "@"
            const emailParts = Email.split('@');
            if (emailParts.length !== 2 || emailParts[0].length < 5) {
                setErrorMessage('Email must have at least 5 characters before the "@" symbol.');
                setErrorModalVisible(true);
                setIsLoading(false);
                return; // Return early if email validation fails
            }

            // Log the data before making the API call
            console.log("Signing up with data:", {
                firstName: First_Name,
                lastName: Last_Name,
                birthday: Exact_Date,
                email: Email,
                password: Password,
                workplaceAddress: StreetAdd,
                
            });
        console.log(Exact_Date)
        navigation.navigate('InterestPickingHobby', 
        {  firstName: First_Name,
            lastName: Last_Name,
            email: Email,
            birthday: Exact_Date.toISOString(),
            password: Password,
            workplaceAddress: StreetAdd,
            profilePic: profilePic,
            bio: bio,
            coachOrCoachee: CoachorCoachee,

        }); 
        
            
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Text style={styles.textStyle}>Create Account</Text>
                    <Text style={styles.subtitle}>Enter the required details to create an account</Text>
                </View>



                <View style={styles.customContainer}>
                    <InputSignUpPages
                        placeholder="Full Name"
                        value={First_Name}
                        checkForInteger
                        setValue={value => setFirst_Name(value.substring(0, 15))} // Limit to 9 characters
                    />
                    <InputSignUpPages
                        placeholder="Last Name"
                        value={Last_Name}
                        checkForInteger
                        setValue={value => setLast_Name(value.substring(0, 15))} // Limit to 9 characters
                    />
                    <InputSignUpPages
                        placeholder="johnsmith@gmail.com"
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
                            value={Exact_Date}
                            onChange={onChange}
                        />
                    )}

                    {!showPicker && (
                        <Pressable onPress={toggleDatePicker} style={styles.datePicker}>
                            {dateOfBirth ? (
                                <TextInput
                                    style={styles.birthdayBorder}
                                    placeholder="Sat Aug 24 2000"
                                    value={dateOfBirth}
                                    onChangeText={setDateofBirth}
                                    editable={false}
                                />
                            ) : (
                                <Icon name="calendar" size={30} color="#7E3FF0" />
                            )}
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
                </View>
                <View style={styles.button}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#915bc7" />
                    ) : (
                        <LogInButton text="Next" onPress={onNext} />
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
        backgroundColor: 'white',
        zIndex: 0,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    customContainer: {
        alignItems: 'center',
        padding: 10,
        marginRight: "7%"
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
        marginRight: '-550%'
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
        fontSize: 25,
        paddingTop: 30,        
        fontWeight: '200',
        fontFamily: 'Roboto',
        color: '#7E3FF0',
        textAlign: 'center',
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
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '200',
        fontFamily: 'Roboto',
        color: '#656466',
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%',
        marginRight: '85%'
    },
  
});

export default SignUpForCoachee;