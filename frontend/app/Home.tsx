import { useTasks } from '@/hooks/useTasks';
import { deleteTask } from '@/services/taskApi';
import TaskCard from '@/components/TaskCard';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';

import React, { useMemo, useCallback, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

type FilterType = 'all' | 'completed' | 'pending';

type Task = {
  id: string;
  title: string;
  status: string;
};

export default function HomeScreen() {
  const router = useRouter();

  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const queryClient = useQueryClient();

  const filterOptions: FilterType[] = ['all', 'completed', 'pending'];

  const { data, isLoading, isError, refetch } = useTasks();

  const tasks: Task[] = useMemo(() => data ?? [], [data]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      Alert.alert('Success', 'Task deleted successfully');
    },

    onError: () => {
      Alert.alert('Error', 'Failed to delete task');
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace('/login');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Logout failed');
    }
  };

  const handleDelete = useCallback(
    (id: string) => {
      deleteMutation.mutate(id);
    },
    [deleteMutation]
  );

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    t => t.status === 'completed'
  ).length;

  const pendingTasks = tasks.filter(
    t => t.status !== 'completed'
  ).length;

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter === 'completed') {
      result = result.filter(t => t.status === 'completed');
    } else if (filter === 'pending') {
      result = result.filter(t => t.status !== 'completed');
    }

    if (search.trim()) {
      result = result.filter(t =>
        (t.title || '')
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      );
    }

    return result;
  }, [filter, search, tasks]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort(
      (a, b) =>
        Number(a.status === 'completed') -
        Number(b.status === 'completed')
    );
  }, [filteredTasks]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.message}>Loading tasks...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.message}>Error loading tasks</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Pressable
        onPress={() => router.push('/profile')}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Profile</Text>
      </Pressable>

      <Text style={styles.title}>Task Dashboard</Text>
      <Text style={styles.subtitle}>
        Manage your tasks in a simple and smart way
      </Text>

      <View style={styles.statsCard}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalTasks}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{pendingTasks}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        {filterOptions.map(f => (
          <Pressable
            key={f}
            style={[
              styles.filterButton,
              filter === f ? styles.activeFilterButton : undefined,
            ]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f ? styles.activeFilterText : undefined,
              ]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.listWrapper}>
        {sortedTasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>No tasks found</Text>
            <Text style={styles.emptyText}>
              Try another keyword or change filter
            </Text>
          </View>
        ) : (
          <FlatList
            data={sortedTasks}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <TaskCard
                task={item.title}
                status={item.status}
                onPress={() =>
                  router.push(`/TaskDetales?id=${item.id}`)
                }
                onDelete={() => handleDelete(item.id)}
              />
            )}
          />
        )}
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push('/addTask')}
      >
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },

  message: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#6D5DF6', 
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },

  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 22,
  },

  statsCard: {
    backgroundColor: '#6D5DF6',
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,

    shadowColor: '#6D5DF6',
    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 6,
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
  },

  statNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  statLabel: {
    color: '#E9E7FF',
    fontSize: 13,
    marginTop: 5,
    fontWeight: '600',
  },

  statDivider: {
    width: 1,
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 15,
    color: '#111827',
  },

  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },

  filterButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  activeFilterButton: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },

  filterText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 13,
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  listWrapper: {
    flex: 1,
    marginTop: 4,
  },

  listContent: {
    paddingBottom: 10,
  },

  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },

  emptyIcon: {
    fontSize: 28,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },

  emptyText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  addButton: {
    backgroundColor: '#6D5DF6',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#6D5DF6',
    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 6,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});