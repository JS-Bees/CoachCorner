import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpForCoach from './SignUpForCoach';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('SignUpForCoach', () => {
  const mockNavigate = jest.fn();
  useNavigation.mockReturnValue({ navigate: mockNavigate });

  it('renders correctly', () => {
    const { getByText } = render(<SignUpForCoach route={{}} />);
    expect(getByText('Create Account')).toBeTruthy();
    expect(getByText('Enter the required details to create an account')).toBeTruthy();
  });

  it('handles state changes and form submission', async () => {
    const { getByPlaceholderText, getByText, getByDisplayValue } = render(<SignUpForCoach route={{}} />);

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('johnsmith@gmail.com'), 'johnsmith@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Repeat Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Street Address'), '123 Main St');

    fireEvent.press(getByText('Next'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('SportPicking', expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johnsmith@gmail.com',
        birthday: expect.any(String),
        password: 'password123',
        workplaceAddress: '123 Main St',
        profilePic: 'Fixed',
        bio: 'Mt bio',
        coachOrCoachee: 'coach'
      }));
    });
  });

  it('shows error message for incomplete fields', async () => {
    const { getByText, queryByText } = render(<SignUpForCoach route={{}} />);

    fireEvent.press(getByText('Next'));

    await waitFor(() => {
      expect(queryByText('Please fill in all the required fields.')).toBeTruthy();
    });
  });

  it('shows error message for integers in name fields', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<SignUpForCoach route={{}} />);

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John1');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');

    fireEvent.press(getByText('Next'));

    await waitFor(() => {
      expect(queryByText('First Name and Last Name cannot contain integers.')).toBeTruthy();
    });
  });
});
