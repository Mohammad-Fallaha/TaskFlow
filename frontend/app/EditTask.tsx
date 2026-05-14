import axiosInstance from '@/api/ApiBase';
import { updateTask } from '@/services/taskApi';
import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormData = {
  taskTitle: string;
  taskDescription: string;
  dueDate: string;
  priority: string;
  status: string;
};

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      taskTitle: '',
      taskDescription: '',
      dueDate: '',
      priority: 'low',
      status: 'pending',
    },
  });

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`);
      const task = response.data;
      setValue('taskTitle', task.title);
      setValue('taskDescription', task.description);
      setValue('dueDate', task.dueDate);
      setValue('priority', task.priority);
      setValue('status', task.status);

      if (task.dueDate) {
        setSelectedDate(new Date(task.dueDate));
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      Alert.alert('Error', 'Failed to load task details');
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // ← map الأسماء الصح قبل الإرسال
      const payload = {
        title: data.taskTitle,
        description: data.taskDescription,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status,
      };

      await updateTask(id, payload);
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      Alert.alert('Success', 'Task updated successfully');
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update task');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>

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
            {error && <Text style={styles.error}>{error.message}</Text>}
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
          />
        )}
      />

      {/* Due Date */}
      <Controller
        control={control}
        name="dueDate"
        render={({ field: { value } }) => (
          <View>
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                📅 {value ? formatDate(new Date(value)) : 'Select Due Date'}
              </Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) {
                    setSelectedDate(date);
                    setValue('dueDate', date.toISOString());
                  }
                }}
              />
            )}
          </View>
        )}
      />

      {/* Priority */}
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <Picker
            style={styles.input}
            selectedValue={value}
            onValueChange={onChange}
          >
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
        )}
      />

      {/* Status */}
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <Picker
            style={styles.input}
            selectedValue={value}
            onValueChange={onChange}
          >
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Completed" value="completed" />
          </Picker>
        )}
      />

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#6D5DF6',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#F5F3FF',
  },
  dateButtonText: {
    color: '#6D5DF6',
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6D5DF6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});