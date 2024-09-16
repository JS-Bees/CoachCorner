import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import AddTaskPage from '../path/to/AddTaskPage'; 

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('123')), 
}));

jest.mock('urql', () => ({
  useMutation: jest.fn(() => [jest.fn(() => Promise.resolve({ error: null })), {}]),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
  })),
}));

jest.spyOn(Alert, 'alert');

describe('AddTaskPage', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddTaskPage />);

    expect(getByPlaceholderText('Title...')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
    expect(getByText('Save')).toBeTruthy();
  });

  it('shows date picker when date button is pressed', () => {
    const { getByText } = render(<AddTaskPage />);
    fireEvent.press(getByText(/\d{1,2}\/\d{1,2}\/\d{4}/)); 

    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('handles date confirmation', () => {
    const { getByText } = render(<AddTaskPage />);
    const today = new Date();
    fireEvent.press(getByText(/\d{1,2}\/\d{1,2}\/\d{4}/)); 
    fireEvent(getByText('Confirm'), 'press', today);

    expect(Alert.alert).toHaveBeenCalledWith('Invalid Date', 'Please select a future date.');
  });

  it('handles save with missing inputs', async () => {
    const { getByText, getByPlaceholderText } = render(<AddTaskPage />);
    fireEvent.changeText(getByPlaceholderText('Title...'), '');
    fireEvent.changeText(getByPlaceholderText('Description...'), '');
    fireEvent.press(getByText('Save'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Missing Data',
        'Please fill in all required inputs: Title, Date, and Description.'
      );
    });
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

  
  it('handles save with valid inputs', async () => {
    const { getByText, getByPlaceholderText } = render(<AddTaskPage />);
    fireEvent.changeText(getByPlaceholderText('Title...'), 'Test Title');
    fireEvent.changeText(getByPlaceholderText('Description...'), 'Test Description');
    fireEvent.press(getByText('Save'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Success',
        'Task created successfully!',
        expect.any(Array)
      );
    });
  });
});
