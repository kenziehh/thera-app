import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Pressable, SafeAreaView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function GreetingCard({ name, photo}: {name:string,photo?: string}) {
    return (
        <View className='flex flex-row w-full justify-between px-6 items-center'>
            <View className='flex flex-col gap-3'>
                <Text className='text-[#97979C] text-xs'>
                    {(() => {
                        const hour = new Date().getHours();
                        if (hour < 12) return 'Good Morning,';
                        if (hour < 18) return 'Good Afternoon,';
                        return 'Good Evening,';
                    })()}
                </Text>
                <Text className='text-2xl font-bold text-black-50'>
                    {name ??" User"}
                </Text>
            </View>
            <View className='flex flex-row gap-2 items-center'>
                <Link href='/notification' asChild>
                    <Pressable className='w-10 h-10 bg-white-100 flex justify-center items-center'>
                        <Image
                            source={require('@/assets/images/notification-icon.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </Pressable>
                </Link>
                <Image
                    source={
                        photo
                            ? { uri: photo }
                            : require('@/assets/images/profile-placeholder.png')
                    }
                    style={{ width: 48, height: 48, borderRadius: 999 }}
                />
            </View>
        </View>
    )
}
