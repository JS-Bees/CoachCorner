module.exports = {
    preset: 'jest-expo',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  };