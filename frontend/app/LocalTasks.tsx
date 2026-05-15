import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getTasks } from '@/db/tasks';

type AnyTask = {
  id?: number | string;
  title?: string;
  name?: string;
  description?: string;
};

export default function LocalTasks() {
  const [data, setData] = useState<AnyTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tasks = await getTasks();

        setData(Array.isArray(tasks) ? tasks : []);
      } catch (error) {
        console.log('SQLite error:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6D5DF6" />
        <Text style={{ marginTop: 10 }}>Loading local data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Offline Data</Text>

      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>

            {/* يدعم title أو name */}
            <Text style={styles.taskTitle}>
              {item.title || item.name || 'No Title'}
            </Text>

            {/* optional description */}
            {item.description ? (
              <Text style={styles.desc}>{item.description}</Text>
            ) : null}

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 15,
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  desc: {
    marginTop: 5,
    color: '#6B7280',
  },
});