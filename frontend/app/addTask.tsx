import React, { useState } from 'react';
import * as Location from 'expo-location';
import {
  Text,
  Pressable,
  StyleSheet,
  Alert,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useForm } from 'react-hook-form';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Picker } from '@react-native-picker/picker';

import { useRouter } from 'expo-router';

import { FormInput } from '@/components/ui/FormInput';

import { useTaskMutations } from '@/hooks/useTaskMutations';

import ScreenContainer from '@/components/ui/ScreenContainer';

import PageHeader from '@/components/ui/PageHeader';

import CustomButton from '@/components/ui/CustomButton';

import SectionCard from '@/components/ui/SectionCard';
import { auth } from "@/config/firebase";

type FormData = {
  taskTitle: string;
  taskDescription: string;
};

export default function AddTaskScreen() {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const router = useRouter();

  const { create } =
    useTaskMutations();

  const [date, setDate] =
    useState(new Date());

  const [showDate, setShowDate] =
    useState(false);

  const [priority, setPriority] =
    useState('medium');
const getLocation = async () => {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    return null; // بدل crash
  }

  const location =
    await Location.getCurrentPositionAsync({});

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};
const onSubmit = async (data: FormData) => {
  try {
    const location = await getLocation();

    await create.mutateAsync({
      title: data.taskTitle,
      description: data.taskDescription,
      dueDate: date,
      priority,
      status: 'pending',
      userId: auth.currentUser?.uid,

      ...(location && {
        latitude: location.latitude,
        longitude: location.longitude,
      }),
    });

    Alert.alert('Success', 'Task created successfully');

    reset();
    router.back();

  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Failed to create task');
  }
};
  return (
    <ScreenContainer>

      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#111827"
        />
      </Pressable>

      <PageHeader
        title="Create Task"
        subtitle="Organize your work and stay productive"
      />

      <SectionCard>

        <FormInput
          name="taskTitle"
          control={control}
          label="Task Title"
          placeholder="Enter task title"
          rules={{
            required:
              'Task title is required',
          }}
        />

        <FormInput
          name="taskDescription"
          control={control}
          label="Description"
          placeholder="Enter task description"
          multiline
        />

        <Text style={styles.label}>
          Due Date
        </Text>

        <Pressable
          style={styles.dateButton}
          onPress={() =>
            setShowDate(true)
          }
        >
          <Text style={styles.dateText}>
            📅 {date.toDateString()}
          </Text>
        </Pressable>

        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(
              event,
              selectedDate
            ) => {

              setShowDate(false);

              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        <Text style={styles.label}>
          Priority
        </Text>

        <View style={styles.pickerWrapper}>

          <Picker
            selectedValue={priority}
            onValueChange={setPriority}
            style={styles.picker}
          >

            <Picker.Item
              label=" High"
              value="high"
            />

            <Picker.Item
              label=" Medium"
              value="medium"
            />

            <Picker.Item
              label=" Low"
              value="low"
            />

          </Picker>

        </View>

        <CustomButton
          title="Create Task"
          onPress={handleSubmit(
            onSubmit
          )}
        />

      </SectionCard>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 12,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 6,

    elevation: 2,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },

  dateButton: {
    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E5E7EB',

    borderRadius: 16,

    paddingVertical: 16,
    paddingHorizontal: 16,

    marginBottom: 20,
  },

  dateText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '500',
  },

  pickerWrapper: {
    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E5E7EB',

    borderRadius: 16,

    overflow: 'hidden',

    marginBottom: 24,
  },

  picker: {
    height: 55,
    width: '100%',
  },
});