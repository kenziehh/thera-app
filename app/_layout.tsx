import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Text, TextInput } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import "../global.css"
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoading, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [loaded] = useFonts({
    Figtree: require('../assets/fonts/Figtree-Regular.ttf'),
  });

  if (loaded) {
    (Text as any).defaultProps = {
      ...(Text as any).defaultProps,
      allowFontScaling: false,
      style: [{ fontFamily: 'Figtree' }],
    };

    (TextInput as any).defaultProps = {
      ...(TextInput as any).defaultProps,
      allowFontScaling: false,
      style: [{ fontFamily: 'Figtree' }],
    };
  }

  useEffect(() => {
    if (!isLoading) {
      const inAuthGroup = segments[0] === 'login';

      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/login');
      }

      if (isAuthenticated && inAuthGroup) {
        router.replace('/'); // arahkan ke home jika sudah login
      }
    }
  }, [isLoading, isAuthenticated, segments]);

  if (!loaded) {
    return null; // atau tambahkan splash/loading screen
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
