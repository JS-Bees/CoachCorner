import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import CustomInput from '../../components/Custom components/CustomBookingInput';
import Slot from '../../components/SlotsProps';
import AddSlotModal from '../../components/Modals/AddSlots';
import Icon from 'react-native-vector-icons/Ionicons';

const slots = [
    { startTime: '9:00 am', endTime: '10:00 am', date: 'Monday, 20th June' },
    { startTime: '11:00 am', endTime: '12:00 pm', date: 'Wednesday, 22nd June' },
    // Add more slots as needed
];

const NewBookingPage = () => {
    const [isAddSlotModalVisible, setAddSlotModalVisible] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const handleNavigateBack = () => {
        navigation.goBack();
    };

    const handleToggleAddSlotModal = () => {
        setAddSlotModalVisible(!isAddSlotModalVisible);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack} style={styles.arrowBack}>
                 <Icon name="arrow-back-circle-outline" size={30} color="#7E3FF0"  />
            </TouchableOpacity>

            <KeyboardAvoidingView style={styles.contentContainter}>
                <Text style={styles.headerText}> Schedule Appointment </Text>


                <ScrollView style={styles.scrollView} contentContainerStyle={styles.subContentContainer}>
                    
                    <Text style={styles.subheaderText}> Coach Name </Text>
                    <CustomInput multiline={false}/>
                    <Text style={styles.subheaderText}> Trainee Name </Text>
                    <CustomInput multiline={false}/>

                    <View>
                        <View style={styles.slotsHeader}>
                         <Text style={styles.subheaderText}> Add a slot </Text>
                         <TouchableOpacity style={styles.addCircle} onPress={handleToggleAddSlotModal}>
                                <Icon name="add-circle-outline" size={30} color="#7E3FF0"  />
                         </TouchableOpacity>
                         <AddSlotModal visible={isAddSlotModalVisible} onClose={handleToggleAddSlotModal} />
                        </View>
                        {slots.map((slot, index) => (
                            <Slot key={index} startTime={slot.startTime} endTime={slot.endTime} date={slot.date} />))}
                    </View>

                    <Text style={styles.subheaderText}> Service Type </Text>
                    <CustomInput multiline={false} />
                    <Text style={styles.subheaderText}> Additional Notes </Text>
                    <CustomInput style={styles.additionalInput} textAlignVertical="top" multiline={true}/>

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: 'white', fontSize: 16, height: 55, paddingHorizontal: 15, paddingVertical: 15 }}>Book an Appointment</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>

                
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    arrowBack: {
        top: "10%",
        marginLeft: "10%"
    },
    addCircle: {
        bottom: "-4%",
        marginLeft: "2%"
    },
    headerIcons: {
        paddingBottom: "5%",
        marginLeft: "13%",
        flexDirection: "row"
    },
    slotsHeader: {
        flexDirection: "row"
    },
    contentContainter: {
        flex: 1,
        alignItems: "flex-start",
        top: "13%",
        marginLeft: "10%",
        paddingBottom: "5%",
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    subContentContainer: {
        padding: "2%",
        paddingBottom: 50, // Ensure there is enough padding at the bottom for the button
    },
    slotHeader: {
        flexDirection: "row"
    },
    headerText: {
        bottom: "1%",
        marginLeft: "-3%",
        fontSize: 25,
        fontWeight: "400",
    },
    subheaderText: {
        marginTop: "5%",
        marginBottom: "2%",
        fontSize: 18,
        fontWeight: "400"
    },
    additionalInput: {
        height: 100
    },
    buttonContainer: {
       marginTop: "5%",
       marginLeft: "-1%",
       paddingBottom: "15%"
    },
    button: {
        backgroundColor: '#7E3FF0',
        width: 310,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
    },
})

export default NewBookingPage;
