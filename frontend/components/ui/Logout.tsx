import React from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');

      router.replace('/login');

    } catch (error) {
      console.log('Logout error:', error);
      Alert.alert(
        'Error',
        'Unable to log out. Please try again.'
      );
    }
  };

  return (
    <Pressable
      style={styles.button}
      onPress={handleLogout}
    >
      <Text style={styles.buttonText}>
        Logout
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});