import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Text, TextInput } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import "../global.css"

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
