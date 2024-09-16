import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CoachBookingDrawer from '../path/to/CoachBookingDrawer'; 
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';


jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
}));

jest.mock('urql', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('../../components/BottomSheet/BookingDrawer', () => 'BookingDrawer');
jest.mock('./CoachInformationModal', () => 'CoachInformationModal');

describe('CoachBookingDrawer Component', () => {
  let navigation;

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

  test('fetches user token on mount', async () => {
    render(<CoachBookingDrawer />);

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userToken');
    });
  });

  test('handles bottom sheet visibility', async () => {
    const { getByTestId } = render(<CoachBookingDrawer />);

    const bottomSheetButton = getByTestId('open-bottom-sheet-button');
    fireEvent.press(bottomSheetButton);

    await waitFor(() => {
      const modal = getByTestId('bottom-sheet-modal');
      expect(modal.props.visible).toBe(true);
    });
  });

  test('handles information modal visibility', async () => {
    const { getByTestId } = render(<CoachBookingDrawer />);

    const infoButton = getByTestId('open-info-modal-button');
    fireEvent.press(infoButton);

    await waitFor(() => {
      const infoModal = getByTestId('info-modal');
      expect(infoModal.props.visible).toBe(true);
    });
  });

  test('closes information modal on confirm', async () => {
    const { getByTestId } = render(<CoachBookingDrawer />);

    const infoButton = getByTestId('open-info-modal-button');
    fireEvent.press(infoButton);

    await waitFor(() => {
      const infoModal = getByTestId('info-modal');
      expect(infoModal.props.visible).toBe(true);
    });

    const confirmButton = getByTestId('confirm-info-modal-button');
    fireEvent.press(confirmButton);

    await waitFor(() => {
      const infoModal = getByTestId('info-modal');
      expect(infoModal.props.visible).toBe(false);
    });
  });
});
