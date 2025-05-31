import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { AuthService } from '@/features/auth/services/auth.service';
import { Link } from 'expo-router';

export default function GreetingCard({ name, photo }: { name: string, photo?: string }) {

    
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
                    {name ?? " User"}
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
                <Pressable onPress={() => AuthService.logout()}>
                    <Image
                        source={
                            photo
                                ? { uri: photo }
                                : require('@/assets/images/profile-placeholder.png')
                        }
                        style={{ width: 48, height: 48, borderRadius: 999 }}
                    />
                </Pressable>
            </View>
        </View>
    )
}
