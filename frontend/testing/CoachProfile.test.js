import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CoachProfile from '../path-to-component/CoachProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'urql';
import { useNavigation } from '@react-navigation/native';
import '@testing-library/jest-native/extend-expect';


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));


jest.mock('urql', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
}));


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

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        (useQuery as jest.Mock).mockReturnValue([{ data: mockData, fetching: false, error: null }]);
        (useMutation as jest.Mock).mockReturnValue([jest.fn()]);
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue('123');
    });

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

