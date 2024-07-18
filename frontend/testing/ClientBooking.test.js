import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ClientBookingDrawer from '../path/to/ClientBookingDrawer'; // Adjust the import path accordingly
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useQuery } from 'urql';

// Mock necessary modules and components
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('urql', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('expo-font', () => ({
  useFonts: jest.fn().mockReturnValue([true]),
}));

jest.mock('../../components/BottomSheet/ConfirmBookingDrawer', () => 'ConfirmBookingDrawer');
jest.mock('./ClientInformationModal', () => 'ClientInformationModal');

describe('ClientBookingDrawer', () => {
  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {
        coach: { firstName: 'John', lastName: 'Doe' },
        coachId: '1',
      },
    });

    beforeEach(() => {
      navigation = { navigate: jest.fn(), addListener: jest.fn(() => jest.fn()) };
      useNavigation.mockReturnValue(navigation);
      useRoute.mockReturnValue({
        params: {
          coacheeId: '1',
          coacheeFirstName: 'John',
          coacheeLastName: 'Doe',
        },
      });
      useQuery.mockReturnValue([{ data: null, fetching: false, error: null }, jest.fn()]);
      AsyncStorage.getItem.mockResolvedValue('123');
    });
  
    test('renders correctly', () => {
      const { getByText } = render(<CoachBookingDrawer />);
  
      expect(getByText('John Doe')).toBeTruthy();
    });

    useQuery.mockReturnValue([
      {
        data: {
          findCoacheeByID: {
            bookings: [
              { coachId: '1', status: 'Pending' },
            ],
          },
        },
        fetching: false,
        error: null,
      },
    ]);

    test('handles bottom sheet visibility', async () => {
      const { getByTestId } = render(<CoachBookingDrawer />);
  
      const bottomSheetButton = getByTestId('open-bottom-sheet-button');
      fireEvent.press(bottomSheetButton);
  
      await waitFor(() => {
        const modal = getByTestId('bottom-sheet-modal');
        expect(modal.props.visible).toBe(true);
      });
    });

    AsyncStorage.getItem.mockResolvedValue('1');
  });

  it('renders correctly', () => {
    const { getByText } = render(<ClientBookingDrawer />);
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('shows the confirm modal when the info button is pressed', () => {
    const { getByTestId, getByText } = render(<ClientBookingDrawer />);
    fireEvent.press(getByTestId('info-button'));
    expect(getByText('ClientInformationModal')).toBeTruthy();
  });

  it('opens the bottom sheet when the book button is pressed', async () => {
    const { getByTestId, getByText } = render(<ClientBookingDrawer />);
    fireEvent.press(getByTestId('book-button'));
    await waitFor(() => expect(getByText('ConfirmBookingDrawer')).toBeTruthy());
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

    const { getByTestId } = render(<ClientBookingDrawer />);
    const bookButton = getByTestId('book-button');
    expect(bookButton.props.accessibilityState.disabled).toBe(true);
  });
});
