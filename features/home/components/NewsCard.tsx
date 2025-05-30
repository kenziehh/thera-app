import { Image } from 'expo-image'
import React from 'react'
import { Text, View } from 'react-native'

export default function NewsCard({ photo, title, content, duration }: { photo?: string, title: string, content: string, duration: string }) {
    return (
        <View className='flex-row gap-4 items-center px-4 py-3.5 bg-white-50'>
            <Image
                source={
                    photo
                        ? { uri: photo }
                        : require('@/assets/images/news-placeholder.png')
                }
                style={{ width: 70, height: 70, borderRadius: 8 }}
            />
            <View className='flex-1 flex flex-col gap-2 px-1'>
                <Text className='text-base text-black-500 font-bold' numberOfLines={1}>
                    {title}
                </Text>
                <View className='flex flex-col gap-1'>
                    <Text className='text-black-500 font-semibold' numberOfLines={2}>
                        {content}
                    </Text>
                    <Text className='text-xs text-gray-500'>
                        {duration}
                    </Text>
                </View>
            </View>

        </View>
    )
}
