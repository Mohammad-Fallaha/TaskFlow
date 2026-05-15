import React, { useEffect, useState } from 'react';

import {
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useForm } from 'react-hook-form';

import { Picker } from '@react-native-picker/picker';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import { FormInput } from '@/components/ui/FormInput';
import ScreenContainer from '@/components/ui/ScreenContainer';
import PageHeader from '@/components/ui/PageHeader';
import SectionCard from '@/components/ui/SectionCard';
import CustomButton from '@/components/ui/CustomButton';

import { useTaskMutations } from '@/hooks/useTaskMutations';

import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '@/services/taskApi';

type FormData = {
  taskTitle: string;
  taskDescription: string;
};

export default function EditTaskScreen() {

  const params = useLocalSearchParams();
  const router = useRouter();

  const id =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : '';

  const { update } = useTaskMutations();

  const { control, handleSubmit, setValue } =
    useForm<FormData>();

  const [priority, setPriority] =
    useState('medium');

  const [status, setStatus] =
    useState('pending');

  const {
    data: task,
    isLoading,
  } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!task) return;

    setValue('taskTitle', task.title ?? '');
    setValue('taskDescription', task.description ?? '');

    setPriority(task.priority ?? 'medium');
    setStatus(task.status ?? 'pending');

  }, [task, setValue]);

  const onSubmit = async (data: FormData) => {
    try {

      if (!id) return;

      await update.mutateAsync({
        id,
        data: {
          title: data.taskTitle,
          description: data.taskDescription,
          priority,
          status,
        },
      });

      Alert.alert(
        'Success',
        'Task updated successfully'
      );

      router.back();

    } catch (error) {
      console.log(error);

      Alert.alert(
        'Error',
        'Failed to update task'
      );
    }
  };

  if (isLoading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#6D5DF6" />
      </ScreenContainer>
    );
  }

  if (!task) {
    return (
      <ScreenContainer>
        <Text>Task not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >

        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#111827"
          />
        </Pressable>

        <PageHeader title="Edit Task" />

        <SectionCard>

          <FormInput
            name="taskTitle"
            control={control}
            label="Task Title"
          />

          <FormInput
            name="taskDescription"
            control={control}
            label="Description"
            multiline
          />

          <Text style={styles.label}>Priority</Text>

          <Picker
            selectedValue={priority}
            onValueChange={setPriority}
          >
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Low" value="low" />
          </Picker>

          <Text style={styles.label}>Status</Text>

          <Picker
            selectedValue={status}
            onValueChange={setStatus}
          >
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Completed" value="completed" />
          </Picker>

          <CustomButton
            title="Save Changes"
            onPress={handleSubmit(onSubmit)}
          />

        </SectionCard>

      </ScrollView>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,

    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#374151',
  },
});