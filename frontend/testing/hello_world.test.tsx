import React from 'react';
import HelloWorld from './hello_world';
import { render } from '@testing-library/react-native';

test('renders Hello, World! text', () => {
  const { getByText } = render(<HelloWorld />);
  expect(getByText('Hello, World!')).toBeTruthy();
  
});
