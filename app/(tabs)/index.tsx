import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function HomeScreen() {
  
  return (
    <View className='flex-1 flex justify-center items-center w-full h-full bg-red-100'>
      <Text className='text-black'>homepage</Text>
      <Link href="/login" asChild>
        <Pressable className='bg-blue-500 px-4 py-2 rounded'>
          <Text className='text-white'>Go to Explore</Text>
        </Pressable>
      </Link>
    </View>
  );
}

