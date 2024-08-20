// __tests__/SignUpForCoachee.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpForCoachee from '../path/to/SignUpForCoachee'; // Adjust the import path
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'urql';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('urql', () => ({
  useMutation: jest.fn(),
}));

describe('SignUpForCoachee', () => {
  let mockNavigation;
  let mockSignUpForCoachee;

  beforeEach(() => {
    mockNavigation = {
      navigate: jest.fn(),
    };
    useNavigation.mockReturnValue(mockNavigation);

    mockSignUpForCoachee = jest.fn().mockReturnValue([{}, jest.fn()]);
    useMutation.mockReturnValue(mockSignUpForCoachee);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignUpForCoachee />);

    expect(getByText('Create Account')).toBeTruthy();
    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('johnsmith@gmail.com')).toBeTruthy();
  });

  test('handles input changes', () => {
    const { getByPlaceholderText } = render(<SignUpForCoachee />);

    const firstNameInput = getByPlaceholderText('Full Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('johnsmith@gmail.com');

    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');

    expect(firstNameInput.props.value).toBe('John');
    expect(lastNameInput.props.value).toBe('Doe');
    expect(emailInput.props.value).toBe('john.doe@example.com');
  });

  test('handles date picker change', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUpForCoachee />);

    const datePickerInput = getByPlaceholderText('Sat Aug 24 2000');
    fireEvent.press(datePickerInput);

    await waitFor(() => {
      const picker = getByText('Please select a valid date between 1954 and 2014');
      fireEvent(picker, 'onChange', { nativeEvent: { timestamp: new Date('2000-08-24').getTime() } });
    });

    expect(datePickerInput.props.value).toBe('Thu Aug 24 2000');
  });

  test('shows error message when required fields are empty', () => {
    const { getByText } = render(<SignUpForCoachee />);

    const nextButton = getByText('Next');
    fireEvent.press(nextButton);

    expect(getByText('Please fill in all the required fields.')).toBeTruthy();
  });

  test('navigates to the next screen on successful validation', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUpForCoachee />);

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('johnsmith@gmail.com'), 'john.doe@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Repeat Password'), 'password123');

    const nextButton = getByText('Next');
    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('InterestPickingHobby', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        birthday: expect.any(String),
        password: 'password123',
        workplaceAddress: '123 Main St',
        profilePic: 'Fixed',
        bio: 'Mt bio',
        coachOrCoachee: 'coachee',
      });
    });
  });
});
