import React from 'react';
import { render } from '@testing-library/react-native';
import HelloWorld from './hello_world';

test('renders Hello, World! text', () => {
  const { getByText } = render(<HelloWorld />);
  expect(getByText('Hello, World!')).toBeTruthy();
});
