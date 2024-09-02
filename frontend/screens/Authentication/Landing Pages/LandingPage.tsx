import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageRequireSource, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from "../../../App";

interface SlideItem {
    key: string;
    title: string;
    text: string;
    image: ImageRequireSource;
    backgroundColor: string;
}

interface LandingPageProps {
    route: RouteProp<RootStackParams, keyof RootStackParams>;
    navigation: StackNavigationProp<RootStackParams, keyof RootStackParams>;
}

const slides = [
    {
        key: 'somethun',
        title: 'Welcome to Coach Corner!',
        text: 'Discover your perfect match and elevate your sport skills or coaching practice.',
        image: require('../../../assets/connect-.png'),
        backgroundColor: '#7E3FF0',
    },
    {
        key: 'somethun-dos',
        title: 'Connect Seamlessly',
        text: "Effortlessly connect and organize training schedules.",
        image: require('../../../assets/Sport-family.jpg'),
        backgroundColor: 'white',
    },
    {
        key: 'somethun1',
        title: 'Achieve Your Goals',
        text: 'Create your account and start your journey towards your goals!',
        image: require('../../../assets/discipline.png'),
        backgroundColor: '#7E3FF0',
    }
];

const LandingPage: React.FC<LandingPageProps> = ({ navigation, route }) => {
    const [showRealApp, setShowRealApp] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Track the current slide index
    const userType = route.params?.userType;

    const _renderItem = ({ item, index }: { item: SlideItem; index: number }) => {
        const textColor = index === 1 ? '#7E3FF0' : 'white';
        return (
            <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
                <Image source={item.image} style={styles.image} />
                <Text style={[styles.text, { color: textColor }]}>{item.text}</Text>
            </View>
        );
    };

    const _onDone = () => {
        setShowRealApp(true);
    };

    useEffect(() => {
        if (showRealApp) {
            if (userType === 'coach') {
                navigation.replace('SignUpCoach');
            } else {
                navigation.replace('SignUpCoachee');
            }
        }
    }, [showRealApp, navigation, userType]);

    const _renderDoneButton = () => (
        <TouchableOpacity onPress={_onDone}>
            <Text style={styles.bottomButtonText}>Get Started</Text>
        </TouchableOpacity>
    );

    const _renderNextButton = () => {
        // Set color based on the current slide index
        const buttonColor = currentSlideIndex === 0 ? 'white' : '#7E3FF0'; // White for the first slide, purple for others
        return (
            <Text style={[styles.nextButtonText, { color: buttonColor }]}>NEXT</Text>
        );
    };

    const onSlideChange = (index: number) => {
        setCurrentSlideIndex(index); // Update the slide index on slide change
    };

    return (
        <AppIntroSlider
            renderItem={_renderItem}
            data={slides}
            renderDoneButton={_renderDoneButton}
            renderNextButton={_renderNextButton}
            onSlideChange={onSlideChange} // Track slide changes
            bottomButton={false}
        />
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 29,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        width: 320,
        height: 320,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    bottomButtonText: {
        marginTop: "10%",
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    nextButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LandingPage;
