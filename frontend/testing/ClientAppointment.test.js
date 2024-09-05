import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ClientAppointments from '../path-to-your-component/ClientAppointments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'urql';

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
jest.mock('urql');

const mockNavigation = {
  goBack: jest.fn(),
};

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => mockNavigation,
}));

const mockData = {
  findCoacheeByID: {
    bookings: [
      {
        id: 1,
        status: 'Confirmed',
        coach: { firstName: 'John' },
        bookingSlots: [{ date: '2023-06-14T00:00:00.000Z', startTime: '2023-06-14T10:00:00.000Z', endTime: '2023-06-14T11:00:00.000Z' }],
      },
    ],
  },
};

describe('ClientAppointments', () => {
  beforeEach(() => {
    useQuery.mockImplementation(() => [{ data: mockData, fetching: false, error: null }]);
    useMutation.mockImplementation(() => [jest.fn(), {}]);
    AsyncStorage.getItem.mockResolvedValue('123');
  });

  it('renders without crashing', () => {
    const { getByText } = render(<ClientAppointments />);
    expect(getByText('Upcoming Appointments')).toBeTruthy();
  });

  it('fetches user token on mount', async () => {
    render(<ClientAppointments />);
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userToken');
    });
  });

  it('displays appointments based on selected category', async () => {
    const { getByText, getByTestId } = render(<ClientAppointments />);
    await waitFor(() => {
      fireEvent.changeText(getByTestId('picker'), 'finished');
      expect(getByText('Finished Appointments')).toBeTruthy();
    });
  });

  it('disables the book button if no pending bookings', async () => {
    useQuery.mockReturnValueOnce([
      {
        data: {
          findCoacheeByID: {
            bookings: [
              { coachId: '2', status: 'Pending' }, // Different coachId to simulate no pending bookings for the current coach
            ],
          },
        },
        fetching: false,
        error: null,
      },
    ]);


  it('navigates back when back button is pressed', () => {
    const { getByTestId } = render(<ClientAppointments />);
    fireEvent.press(getByTestId('backButton'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  // Add more tests for other interactions and states
});
