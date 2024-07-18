import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LogoutConfirmationModal from './LogoutConfirmationModal';

describe('LogoutConfirmationModal', () => {
  it('renders correctly when visible', () => {
    const { getByText } = render(<LogoutConfirmationModal visible={true} onConfirm={jest.fn()} onCancel={jest.fn()} />);
    expect(getByText('Are you sure you want to logout?')).toBeTruthy();
    expect(getByText('Yes')).toBeTruthy();
    expect(getByText('No')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(<LogoutConfirmationModal visible={false} onConfirm={jest.fn()} onCancel={jest.fn()} />);
    expect(queryByText('Are you sure you want to logout?')).toBeNull();
  });

  it('calls onConfirm when Yes button is pressed', () => {
    const mockOnConfirm = jest.fn();
    const { getByText } = render(<LogoutConfirmationModal visible={true} onConfirm={mockOnConfirm} onCancel={jest.fn()} />);
    
    fireEvent.press(getByText('Yes'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });


});
