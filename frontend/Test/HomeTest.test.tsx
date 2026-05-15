/* eslint-disable import/first */

import React from 'react';

// ✅ mock AsyncStorage
jest.mock(
  '@react-native-async-storage/async-storage',
  () =>
    require(
      '@react-native-async-storage/async-storage/jest/async-storage-mock'
    )
);

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),

  useFocusEffect: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),

  useMutation: () => ({
    mutate: jest.fn(),
  }),
}));

jest.mock('@/hooks/useTasks', () => ({
  useTasks: () => ({
    data: [],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('@/components/TaskCard', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const TaskCard = () => <Text>Task Card</Text>;
  TaskCard.displayName = 'TaskCard';

  return TaskCard;
});

import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/Home';

describe('HomeScreen', () => {
  it('shows title', () => {
    const { getByText } = render(<HomeScreen />);

    expect(
      getByText('Task Dashboard')
    ).toBeTruthy();
  });

  it('shows add task button', () => {
    const { getByText } = render(<HomeScreen />);

    expect(
      getByText('+ Add Task')
    ).toBeTruthy();
  });
});