import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CoachProfile from '../path-to-component/CoachProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'urql';
import { useNavigation } from '@react-navigation/native';
import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

// Mock urql hooks
jest.mock('urql', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

describe('CoachProfile', () => {
    const navigation = { navigate: jest.fn() };
    const mockData = {
        findCoachByID: {
            firstName: 'John',
            lastName: 'Doe',
            mantra: 'Keep going!',
            bio: 'This is a bio',
            affiliations: 'Some affiliation',
            workplaceAddress: 'Some address',
            birthday: '1990-01-01T00:00:00Z',
        },
    };


    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with fetched data', async () => {
        const { getByText, getByPlaceholderText } = render(<CoachProfile />);

        await waitFor(() => {
            expect(getByText('John Doe')).toBeTruthy();
            expect(getByPlaceholderText('Enter mantra').props.value).toBe('Keep going!');
            expect(getByPlaceholderText('Enter bio').props.value).toBe('This is a bio');
            expect(getByPlaceholderText('Enter affiliation').props.value).toBe('Some affiliation');
            expect(getByPlaceholderText('Enter address').props.value).toBe('Some address');
        });
    });

    it('toggles edit mode and updates state correctly', async () => {
        const { getByText, getByPlaceholderText, getByRole } = render(<CoachProfile />);

        await waitFor(() => {
            expect(getByText('John Doe')).toBeTruthy();
        });

        fireEvent.press(getByRole('button', { name: 'pencil' }));
        
        const mantraInput = getByPlaceholderText('Enter mantra');
        fireEvent.changeText(mantraInput, 'New mantra');
        expect(mantraInput.props.value).toBe('New mantra');

        fireEvent.press(getByRole('button', { name: 'Save changes' }));
        
        // Check if the mutation is called
        await waitFor(() => {
            expect(useMutation).toHaveBeenCalled();
        });
    });

    it('shows logout modal and logs out correctly', async () => {
        const { getByRole, getByText } = render(<CoachProfile />);

        fireEvent.press(getByRole('button', { name: 'sign-out' }));

        await waitFor(() => {
            expect(getByText('Are you sure you want to log out?')).toBeTruthy();
        });

        fireEvent.press(getByText('Yes'));

        await waitFor(() => {
            expect(AsyncStorage.removeItem).toHaveBeenCalledWith('userToken');
            expect(AsyncStorage.clear).toHaveBeenCalled();
            expect(navigation.navigate).toHaveBeenCalledWith('LogIn');
        });
    });
});

