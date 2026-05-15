import { useRouter } from 'expo-router';

import React from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '@/config/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {

  const {
    control,
    handleSubmit,
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = async (
    data: FormData
  ) => {
    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

      const user =
        userCredential.user;

      const token =
        await user.getIdToken();

      const uid = user.uid;

      await AsyncStorage.setItem(
        'token',
        token
      );

      await AsyncStorage.setItem(
        'uid',
        uid
      );

      Alert.alert(
        'Success',
        'Logged in successfully'
      );

      router.replace('/Home');

    } catch (error: any) {

      console.log(error);

      Alert.alert(
        'Error',
        error.message
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Login
      </Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required:
            'Email is required',
        }}
        render={({
          field: {
            onChange,
            value,
          },

          fieldState: {
            error,
          },
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {error && (
              <Text style={styles.error}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required:
            'Password is required',
        }}
        render={({
          field: {
            onChange,
            value,
          },

          fieldState: {
            error,
          },
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />

            {error && (
              <Text style={styles.error}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />

      <Pressable
        style={styles.button}
        onPress={handleSubmit(
          onSubmit
        )}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.push('/(tabs)/SignUp')
        }
      >
        <Text style={styles.buttonText}>
          Don&apos;t have an account?
          {' '}Sign Up
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  error: {
    color: 'red',
    marginBottom: 8,
  },
});