import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { initDB } from '@/db/init';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initDB();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Home" options={{ headerShown: false }} />
          <Stack.Screen name="addTask" options={{ headerShown: false }} />
          <Stack.Screen name="EditTask" options={{ headerShown: false }} />
          <Stack.Screen name="TaskDetales" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}