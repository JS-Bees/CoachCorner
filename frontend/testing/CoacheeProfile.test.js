import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CoacheeProfile from '../path-to-your-component/CoacheeProfile'; 
import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';


jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));
jest.mock('urql', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

describe('CoacheeProfile', () => {
    let navigation;
    let executeMutation;

    beforeEach(() => {
        navigation = { navigate: jest.fn() };
        useNavigation.mockReturnValue(navigation);

        useQuery.mockReturnValue({
            data: {
                findCoacheeByID: {
                    firstName: 'John',
                    lastName: 'Doe',
                    bio: 'Sample bio',
                    affiliations: 'Sample affiliation',
                    address: 'Sample address',
                    birthday: '2000-01-01T00:00:00Z',
                },
            },
            fetching: false,
            error: null,
        });

        executeMutation = jest.fn();
        useMutation.mockReturnValue([executeMutation]);
        AsyncStorage.getItem.mockResolvedValue('123');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        const { getByText, getByPlaceholderText } = render(<CoacheeProfile />);

        await waitFor(() => {
            expect(getByText('John Doe')).toBeTruthy();
            expect(getByText('Bio')).toBeTruthy();
            expect(getByText('Age')).toBeTruthy();
            expect(getByText('Affiliation')).toBeTruthy();
            expect(getByText('Address')).toBeTruthy();
            expect(getByPlaceholderText('Enter bio').props.value).toBe('Sample bio');
            expect(getByPlaceholderText('Enter affiliation').props.value).toBe('Sample affiliation');
            expect(getByPlaceholderText('Enter address').props.value).toBe('Sample address');
        });
    });

    it('toggles edit mode correctly', async () => {
        const { getByPlaceholderText, getByRole } = render(<CoacheeProfile />);

        const editButton = getByRole('button', { name: /pencil/i });
        fireEvent.press(editButton);

        await waitFor(() => {
            expect(getByPlaceholderText('Enter bio').props.editable).toBe(true);
            expect(getByPlaceholderText('Enter affiliation').props.editable).toBe(true);
            expect(getByPlaceholderText('Enter address').props.editable).toBe(true);
        });
    });

    it('saves changes correctly', async () => {
        const { getByPlaceholderText, getByText, getByRole } = render(<CoacheeProfile />);

        const editButton = getByRole('button', { name: /pencil/i });
        fireEvent.press(editButton);

        const bioInput = getByPlaceholderText('Enter bio');
        const affiliationInput = getByPlaceholderText('Enter affiliation');
        const addressInput = getByPlaceholderText('Enter address');

        fireEvent.changeText(bioInput, 'Updated bio');
        fireEvent.changeText(affiliationInput, 'Updated affiliation');
        fireEvent.changeText(addressInput, 'Updated address');

        const saveButton = getByText('Save changes');
        fireEvent.press(saveButton);

        await waitFor(() => {
            expect(executeMutation).toHaveBeenCalledWith({
                id: 123,
                address: 'Updated address',
                affiliations: 'Updated affiliation',
                bio: 'Updated bio',
                profilePicture: 'fixed',
            });
        });
    });

    it('logs out correctly', async () => {
        const { getByRole, getByText } = render(<CoacheeProfile />);

        const logoutButton = getByRole('button', { name: /sign-out/i });
        fireEvent.press(logoutButton);

        const confirmButton = getByText('Confirm'); 
        fireEvent.press(confirmButton);

        await waitFor(() => {
            expect(AsyncStorage.removeItem).toHaveBeenCalledWith('userToken');
            expect(AsyncStorage.clear).toHaveBeenCalled();
            expect(navigation.navigate).toHaveBeenCalledWith('LogIn');
        });
    });
});
