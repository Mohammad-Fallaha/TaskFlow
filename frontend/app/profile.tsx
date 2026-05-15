import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { getAuth, signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { getUser } from '@/db/user';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUser();

        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (data) {
          setUser(data);
        } else if (currentUser) {
          setUser({
            name: currentUser.displayName,
            email: currentUser.email,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('SQLite error:', error);

        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          setUser({
            name: currentUser.displayName,
            email: currentUser.email,
          });
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Logout failed');
    }
  };

  const getUserName = () => {
    if (user?.name) return user.name;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6D5DF6" />
        <Text style={{ marginTop: 10, color: '#6B7280' }}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Pressable
        style={styles.localButton}
        onPress={() => router.push('/LocalTasks')}
      >
        <Text style={styles.localButtonText}> Local Tasks</Text>
      </Pressable>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>👤</Text>
      </View>

      <Text style={styles.name}>
        {getUserName()}
      </Text>

      <Text style={styles.email}>
        {user?.email || 'No Email'}
      </Text>

      <View style={styles.card}>
        <Text style={styles.title}>Account Info</Text>

        <View style={styles.row}>
          <Text style={styles.key}>Status</Text>
          <Text style={styles.value}>Active</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.key}>Storage</Text>
          <Text style={styles.value}>SQLite</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.key}>App</Text>
          <Text style={styles.value}>TaskFlow</Text>
        </View>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#6D5DF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 40,
  },

  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },

  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 25,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 30,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
    color: '#111827',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  key: {
    color: '#6B7280',
    fontSize: 14,
  },

  value: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  localButton: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },

  localButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});