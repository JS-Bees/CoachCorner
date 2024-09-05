import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AddTaskPageForCoach from '../path-to-your-component/AddTaskPageForCoach';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useMutation } from 'urql';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));
jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('urql', () => ({
  useMutation: jest.fn(),
}));
jest.spyOn(Alert, 'alert');

describe('AddTaskPageForCoach', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', async () => {
    AsyncStorage.getItem.mockResolvedValue('123');

    const { getByPlaceholderText, getByText } = render(<AddTaskPageForCoach />);

    expect(getByPlaceholderText('Title...')).toBeTruthy();
    expect(getByText('Date:')).toBeTruthy();
    expect(getByText(new Date().toLocaleDateString())).toBeTruthy();
    expect(getByPlaceholderText('Description...')).toBeTruthy();
  });

  it('should fetch and set the user token', async () => {
    AsyncStorage.getItem.mockResolvedValue('123');

    const { getByText } = render(<AddTaskPageForCoach />);

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userToken');
      expect(getByText(new Date().toLocaleDateString())).toBeTruthy();
    });
  });

  it('should handle date selection and validation', async () => {
    AsyncStorage.getItem.mockResolvedValue('123');

    const { getByText } = render(<AddTaskPageForCoach />);
    const dateButton = getByText(new Date().toLocaleDateString());

    act(() => {
      fireEvent.press(dateButton);
    });

    await waitFor(() => {
      expect(getByText('Confirm')).toBeTruthy();
    });

    const invalidDate = new Date();
    invalidDate.setDate(invalidDate.getDate() - 1); // Yesterday

    act(() => {
      fireEvent(getByText('Confirm'), 'onPress', invalidDate);
    });

    expect(Alert.alert).toHaveBeenCalledWith("Invalid Date", "Please select a future date.");
  });

  it('should handle task saving', async () => {
    const executeMutation = jest.fn().mockResolvedValue({ data: {} });
    useMutation.mockReturnValue([, executeMutation]);

    AsyncStorage.getItem.mockResolvedValue('123');

    const { getByPlaceholderText, getByText } = render(<AddTaskPageForCoach />);

    const titleInput = getByPlaceholderText('Title...');
    const descriptionInput = getByPlaceholderText('Description...');
    const saveButton = getByText('Save');

    fireEvent.changeText(titleInput, 'Test Title');
    fireEvent.changeText(descriptionInput, 'Test Description');
    fireEvent.press(saveButton);

  });
});
