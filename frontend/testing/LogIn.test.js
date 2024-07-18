import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LogIn from '../path/to/LogIn'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'urql';

// Mocking useNavigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mocking urql useQuery hook
jest.mock('urql', () => ({
  useQuery: jest.fn(),
}));

jest.mock('react-native-elements', () => ({
  Input: ({ leftIcon, rightIcon, ...props }) => (
    <input {...props} />
  ),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

// Mocking AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('LogIn Component', () => {
  let navigation;

  beforeEach(() => {
    navigation = { navigate: jest.fn(), addListener: jest.fn(() => jest.fn()) };
    useNavigation.mockReturnValue(navigation);
    useQuery.mockReturnValue([{ data: null, error: null, fetching: false }, jest.fn()]);
  });

  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LogIn />);

    expect(getByText('Login')).toBeTruthy();
    expect(getByText('You are logging as?')).toBeTruthy();
    expect(getByText('Coach')).toBeTruthy();
    expect(getByText('Trainee')).toBeTruthy();
    expect(getByPlaceholderText('johnsmith@gmail.com')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  test('handles email and password input', () => {
    const { getByPlaceholderText } = render(<LogIn />);

    const emailInput = getByPlaceholderText('johnsmith@gmail.com');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  test('handles login button press', async () => {
    const executeQuery = jest.fn();
    useQuery.mockReturnValue([{ data: { findCoachByEmailAndPassword: { id: 1 } }, error: null, fetching: false }, executeQuery]);

    const { getByText, getByPlaceholderText } = render(<LogIn />);

    const emailInput = getByPlaceholderText('johnsmith@gmail.com');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(executeQuery).toHaveBeenCalled();
    });
  });

  test('navigates to SignUp screen on sign up button press', () => {
    const { getByText } = render(<LogIn />);

    const signUpButton = getByText('Sign up here!');
    fireEvent.press(signUpButton);

    expect(navigation.navigate).toHaveBeenCalledWith('SignUpCoachee');
  });

  test('stores token in AsyncStorage on successful login', async () => {
    const executeQuery = jest.fn();
    useQuery.mockReturnValue([{ data: { findCoachByEmailAndPassword: { id: 1 } }, error: null, fetching: false }, executeQuery]);

    const { getByText, getByPlaceholderText } = render(<LogIn />);

    const emailInput = getByPlaceholderText('johnsmith@gmail.com');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userToken', '1');
      expect(navigation.navigate).toHaveBeenCalledWith('NewCoachDashboard');
    });
  });
});
