import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { useTasks } from '@/hooks/useTasks';

import ScreenContainer from '@/components/ui/ScreenContainer';
import PageHeader from '@/components/ui/PageHeader';
import SectionCard from '@/components/ui/SectionCard';
import CustomButton from '@/components/ui/CustomButton';

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;

  latitude?: number;
  longitude?: number;
};

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const { data: tasks, isLoading } = useTasks();

  const task = tasks?.find(
    (task: Task) => task.id === Number(id)
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6D5DF6" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <ScreenContainer>

      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </Pressable>

      <PageHeader title="Task Details" />

      <SectionCard>
        <Text style={styles.taskTitle}>{task.title}</Text>

        <View style={styles.badgeRow}>
          <View style={styles.statusBadge}>
            <Text style={styles.badgeText}>{task.status}</Text>
          </View>

          <View style={styles.priorityBadge}>
            <Text style={styles.badgeText}>{task.priority}</Text>
          </View>
        </View>
      </SectionCard>

      {/* Description */}
      <SectionCard>
        <Text style={styles.infoLabel}>Description</Text>
        <Text style={styles.infoText}>
          {task.description || 'No description'}
        </Text>
      </SectionCard>

      <SectionCard>
        <Text style={styles.infoLabel}>Due Date</Text>
        <Text style={styles.infoText}>
          {task.dueDate
            ? new Date(task.dueDate).toDateString()
            : 'No due date'}
        </Text>
      </SectionCard>

      <SectionCard>
        <Text style={styles.infoLabel}>Location</Text>

        {task.latitude != null && task.longitude != null ? (
          <Text style={styles.infoText}>
            📍 {task.latitude.toFixed(4)}, {task.longitude.toFixed(4)}
          </Text>
        ) : (
          <Text style={styles.infoText}>
            No location available
          </Text>
        )}
      </SectionCard>

      <CustomButton
        title="Edit Task"
        onPress={() =>
          router.push(`/EditTask?id=${task.id}`)
        }
      />

    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  taskTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },

  badgeRow: {
    flexDirection: 'row',
    gap: 10,
  },

  statusBadge: {
    backgroundColor: '#DDD6FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  priorityBadge: {
    backgroundColor: '#FDE68A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    fontWeight: '700',
    color: '#111827',
  },

  infoLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 6,
  },

  infoText: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 22,
  },
});