import { createTask } from '@/services/taskApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import { auth } from '@/services/authService';
type FormData = {
  taskTitle: string;
  taskDescription: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
};

export default function AddTaskScreen() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      taskTitle: '',
      taskDescription: '',
      dueDate: new Date(),
      priority: 'medium',
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const [showPicker, setShowPicker] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const user = auth.currentUser;
      const formattedData = {
        title: data.taskTitle,
        description: data.taskDescription,
        status: 'pending',
        priority: data.priority,
        dueDate: data.dueDate,
      userId: auth.currentUser?.uid || '',
      };

      const newTask = await createTask(formattedData);

      console.log("CREATED TASK:", newTask);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      Alert.alert('Success', 'Task added successfully');

      router.push({ pathname: '/TaskDetales', params: { id: `${newTask.id}` } });

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to add task');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Task</Text>

      {/* Task Title */}
      <Controller
        control={control}
        name="taskTitle"
        rules={{ required: 'Task title is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={value}
              onChangeText={onChange}
            />

            {error && (
              <Text style={styles.error}>{error.message}</Text>
            )}
          </>
        )}
      />

      {/* Task Description */}
      <Controller
        control={control}
        name="taskDescription"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />

      {/* Due Date */}
      <Controller
        control={control}
        name="dueDate"
        render={({ field: { onChange, value } }) => (
          <>
            <Pressable
              onPress={() => setShowPicker(true)}
              style={styles.input}
            >
              <Text>{value.toDateString()}</Text>
            </Pressable>

            {showPicker && (
              <DateTimePicker
                value={value}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowPicker(Platform.OS === 'ios');

                  if (selectedDate) {
                    onChange(selectedDate);
                  }
                }}
              />
            )}
          </>
        )}
      />

      {/* Priority */}
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={styles.label}>Select Priority:</Text>

            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="High" value="high" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Low" value="low" />
            </Picker>
          </>
        )}
      />

      <Pressable
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#111827',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
  },

  button: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
    color: '#374151',
  },

  picker: {
    height: 50,
    marginBottom: 20,
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },
});