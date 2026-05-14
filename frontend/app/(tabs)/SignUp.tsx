import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '@/config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type FormData = {
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });

  const handelonSignUp = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log('User signed up successfully:', userCredential.user);
      router.replace('/(tabs)/login');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Unable to sign up.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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
        rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Pressable style={styles.button} onPress={handleSubmit(handelonSignUp)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8, paddingHorizontal: 10, borderRadius: 5 },
  button: { backgroundColor: '#007bff', padding: 12, borderRadius: 4, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 8, fontSize: 12 },
});