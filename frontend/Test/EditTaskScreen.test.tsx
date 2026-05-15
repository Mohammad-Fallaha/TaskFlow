import React from 'react';
import { render } from '@testing-library/react-native';
import EditTaskScreen from '@/app/EditTask';


jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({
    id: '123',
  }),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: {
      title: 'Test Task',
      description: 'Test Desc',
      priority: 'medium',
      status: 'pending',
    },
    isLoading: false,
  }),

  useMutation: () => ({
    mutateAsync: jest.fn(),
  }),

  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

jest.mock('@/services/taskApi', () => ({
  getTaskById: jest.fn(() =>
    Promise.resolve({
      id: '123',
      title: 'Test Task',
      description: 'Test Desc',
      priority: 'medium',
      status: 'pending',
    })
  ),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);


jest.mock('@/components/FormInput', () => {
  const React = require('react');
  const { TextInput } = require('react-native');

  return {
    FormInput: (props: any) => <TextInput {...props} />,
  };
});

jest.mock('@/components/ui/CustomButton', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');

  return {
    __esModule: true,
    default: ({ title, onPress }: any) => (
      <Pressable onPress={onPress}>
        <Text>{title}</Text>
      </Pressable>
    ),
  };
});

describe('EditTaskScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<EditTaskScreen />);

    expect(getByText('Edit Task')).toBeTruthy();
  });

  it('shows save button', () => {
    const { getByText } = render(<EditTaskScreen />);

    expect(getByText('Save Changes')).toBeTruthy();
  });
});