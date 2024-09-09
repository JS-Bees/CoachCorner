import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CoacheeProfile from './screens/Profile/CoacheeProfile';
  
  describe('CoacheeProfile Component', () => {
    const mockNavigate = jest.fn();
  
    // Sample coachee profiles for testing
    const mockCoacheeProfiles = [
      {
        name: 'John Doe',
        imageSource: require('../../assets/John_Doe.png'),
        mainSport: 'Football',
        about: 'Football enthusiast',
        affliations: 'Football Club',
        achievements: 'None yet',
      },
      {
        name: 'Jane Doe',
        imageSource: require('../../assets/Jane_Doe.png'),
        mainSport: 'Basketball',
        about: 'Basketball player',
        affliations: 'Basketball Club',
        achievements: 'Champion',
      }
    ];
  
    it('renders the list of coachee profiles', () => {
      const { getByText } = render(<CoacheeProfile coacheeProfiles={mockCoacheeProfiles} />);
      
      // Check if both profiles are rendered correctly
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Football')).toBeTruthy();
      
      expect(getByText('Jane Doe')).toBeTruthy();
      expect(getByText('Basketball')).toBeTruthy();
    });
  
    it('navigates to the CoacheePreviewPage on profile click', () => {
      const { getByText } = render(<CoacheeProfile coacheeProfiles={mockCoacheeProfiles} />);
  
      // Navigation check
      expect(mockNavigate).toHaveBeenCalledWith('CoacheePreviewPage', {
        profile: mockCoacheeProfiles[0],
      });
    });
  
    it('should handle the display of multiple profiles correctly', () => {
      const { getByText, getAllByText } = render(<CoacheeProfile coacheeProfiles={mockCoacheeProfiles} />);
  
      // Check the number of rendered profiles
      expect(getAllByText(/Doe/).length).toBe(2); // Both "John Doe" and "Jane Doe" should be rendered
    });
  });