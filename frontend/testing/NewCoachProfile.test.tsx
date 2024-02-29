import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewCoachProfile from './screens/Profile/NewCoachProfile';

describe('NewCoachProfile', () => {
    const mockNavigation = { goBack: jest.fn() };

    it('should render the profile information correctly', () => {
        const { getByText, getByTestId } = render(<NewCoachProfile />);
        
        expect(getByText('Jane Smith')).toBeTruthy(); 
        expect(getByText('Basketball')).toBeTruthy(); 
        expect(getByText('Bio')).toBeTruthy(); 
        expect(getByText('Romance, Comedy')).toBeTruthy(); 
    });

    it('should toggle the drawer when settings icon is pressed', () => {
        const { getByTestId } = render(<NewCoachProfile />);
        const drawerToggle = getByTestId('settings-icon'); 

        fireEvent.press(drawerToggle); 
    });

    it('should switch between pages in PagerView', () => {
        const { getByText, getByTestId } = render(<NewCoachProfile />);
        
        const achievementsTab = getByText('Achievements');
        fireEvent.press(achievementsTab);

        expect(getByTestId('pager-view')).toBeTruthy();
    });
});
