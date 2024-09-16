import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SearchList from './SearchList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useQuery } from 'urql';

jest.mock('@react-navigation/core', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('urql', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('SearchList', () => {
  const mockNavigation = { goBack: jest.fn() };
  const mockData = {
    findUnaddedCoachesBySport: [
      { id: '1', name: 'Coach A' },
      { id: '2', name: 'Coach B' },
    ],
  };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    useQuery.mockReturnValue([{ data: mockData, fetching: false, error: null }]);
    AsyncStorage.getItem.mockResolvedValue('123');
  });

  it('fetches user token on mount', async () => {
    render(<SearchList />);
    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith('userToken'));
  });

  it('renders correctly and displays search results', async () => {
    const { getByPlaceholderText, getByText } = render(<SearchList />);
    
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Search Sport'), 'Soccer');
      expect(getByText('Coach A')).toBeTruthy();
      expect(getByText('Coach B')).toBeTruthy();
    });
  });

  it('handles search input and shows clear button', async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<SearchList />);

    const searchInput = getByPlaceholderText('Search Sport');
    fireEvent.changeText(searchInput, 'Soccer');
    await waitFor(() => expect(getByText('Coach A')).toBeTruthy());

    const clearButton = getByRole('button', { name: /close/i });
    expect(clearButton).toBeTruthy();

    fireEvent.press(clearButton);
    expect(searchInput.props.value).toBe('');
  });

  it('handles navigation goBack', () => {
    const { getByRole } = render(<SearchList />);
    const backButton = getByRole('button', { name: /arrow-back/i });

    fireEvent.press(backButton);
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('handles bottom sheet visibility and data', async () => {
    const { getByText } = render(<SearchList />);

    await waitFor(() => fireEvent.press(getByText('Coach A')));
    expect(getByText('Coach A')).toBeTruthy(); 


  });
});
