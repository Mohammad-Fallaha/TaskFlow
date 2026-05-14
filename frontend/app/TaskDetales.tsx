import axiosInstance from '@/api/ApiBase';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
};

const PRIORITY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: '#FEE2E2', text: '#DC2626', label: 'High' },
  medium: { bg: '#FEF3C7', text: '#B45309', label: 'Medium' },
  low: { bg: '#DCFCE7', text: '#15803D', label: 'Low' },
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  completed: { bg: '#DCFCE7', text: '#15803D' },
  pending: { bg: '#EDE9FE', text: '#6D28D9' },
};

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`); // ← التغيير هون
      setTask(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load task details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchTask();
    }, [fetchTask])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6D5DF6" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  const priority = PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.medium;
  const status = STATUS_COLORS[task.status] ?? STATUS_COLORS.pending;

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No due date';

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Task Details</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Title */}
      <View style={styles.titleCard}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <View style={[styles.badge, { backgroundColor: status.bg }]}>
          <Text style={[styles.badgeText, { color: status.text }]}>
            {task.status}
          </Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.section}>

        {/* Due Date */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📅 Due Date</Text>
          <Text style={styles.infoValue}>{formattedDate}</Text>
        </View>

        <View style={styles.divider} />

        {/* Priority */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🚦 Priority</Text>
          <View style={[styles.priorityBadge, { backgroundColor: priority.bg }]}>
            <Text style={[styles.priorityText, { color: priority.text }]}>
              {priority.label}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Description */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📝 Description</Text>
          <Text style={styles.descriptionText}>
            {task.description || 'No description provided.'}
          </Text>
        </View>

      </View>

      {/* Edit Button */}
      <Pressable
        style={styles.editButton}
        onPress={() => router.push(`/EditTask?id=${task.id}`)}
      >
        <Text style={styles.editButtonText}>✏️ Edit Task</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  backArrow: {
    fontSize: 20,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  titleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#6D5DF6',
  },
  titleRow: {
    gap: 10,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 30,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 6,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    gap: 14,
  },
  infoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 18,
  },
  infoContent: {
    flex: 1,
    gap: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  priorityText: {
    fontSize: 13,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 14,
  },
  editButton: {
    backgroundColor: '#6D5DF6',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
