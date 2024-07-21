import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CoachDashboard from './CoachDashboard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as expoFont from 'expo-font';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

jest.mock('expo-font', () => ({
    useFonts: jest.fn(),
}));

jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
    const actualDimensions = jest.requireActual('react-native/Libraries/Utilities/Dimensions');
    return {
        ...actualDimensions,
        get: jest.fn().mockReturnValue({ width: 100, height: 100 }),
    };
});

describe('CoachDashboard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useNavigation.mockReturnValue({ navigate: jest.fn() });
        AsyncStorage.getItem.mockResolvedValue('mockToken');
        expoFont.useFonts.mockReturnValue([true]);
    });

    it('renders correctly', async () => {
        const { getByText, getByTestId } = render(<CoachDashboard />);

        await waitFor(() => {
            expect(getByText('Welcome Back!')).toBeTruthy();
        });
    });

    it('navigates to My Clients on button press', async () => {
        const { getByText } = render(<CoachDashboard />);
        const navigate = useNavigation().navigate;

        await waitFor(() => {
            fireEvent.press(getByText('My Clients'));
        });

        expect(navigate).toHaveBeenCalledWith('MyClients');
    });

    it('navigates to Appointments on button press', async () => {
        const { getByText } = render(<CoachDashboard />);
        const navigate = useNavigation().navigate;

        await waitFor(() => {
            fireEvent.press(getByText('Appointments'));
        });

        expect(navigate).toHaveBeenCalledWith('CoachAppointments');
    });

    it('fetches user token on mount', async () => {
        render(<CoachDashboard />);

        await waitFor(() => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith('userToken');
        });
    });
});
