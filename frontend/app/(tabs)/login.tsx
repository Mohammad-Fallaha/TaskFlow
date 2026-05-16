import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import * as SecureStore from 'expo-secure-store';

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { control, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();
      const uid = user.uid;

      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('uid', uid);

      Alert.alert('Success', 'Logged in successfully');
      router.replace('/Home');

    } catch (error: any) {
      console.log(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Login</Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Pressable
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/(tabs)/SignUp')}
      >
        <Text style={styles.buttonText}>
          Don&apos;t have an account? Sign Up
        </Text>
      </Pressable>

      <Pressable
        style={styles.offlineButton}
        onPress={() => router.push('/LocalTasks')}
      >
        <Text style={styles.offlineText}>📦 View Offline Tasks</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#111827',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 15,
    color: '#111827',
  },

  button: {
    backgroundColor: '#6D5DF6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  offlineButton: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#6D5DF6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  offlineText: {
    color: '#6D5DF6',
    fontSize: 15,
    fontWeight: '700',
  },

  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
});