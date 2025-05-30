import OverallStatus from '@/features/home/components/OverallStatus'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MoodJourney from './MoodJourney'

export default function MoodContainer() {
    const [selectedMood, setSelectedMood] = React.useState<number | null>(null)

    return (
        <SafeAreaView className="flex-1">
            <ScrollView
                className="flex-col"
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >

                <View className='bg-blue-300 py-28'>
                    <View className='flex flex-col gap-2 items-center'>
                        <Text className='text-white-300 text-base'>Hello,</Text>
                        <Text className='text-white-300 font-semibold text-lg'>How are you feeling today?</Text>
                    </View>
                    <View className="flex flex-row gap-2 mt-6 justify-center items-center">
                        {['😩', '🙁', '😐', '🙂', '😄'].map((emot, idx) => {
                            return (
                                <Text
                                    key={emot}
                                    onPress={() => setSelectedMood(idx)}
                                    style={{
                                        opacity: selectedMood === idx ? 1 : 0.4,
                                        fontSize: 52,
                                    }}
                                >
                                    {emot}
                                </Text>
                            )
                        })}
                    </View>
                </View>
                <View className='flex flex-col items-center -mt-20 bg-white-50 rounded-2xl mx-6'>
                    <OverallStatus />
                </View>
                <View className='flex flex-col mt-10 bg-white-50 rounded-2xl mx-6 px-4 py-6 gap-3'>
                    <Text className='font-bold text-lg'>This Week's Mood</Text>
                    <View className='flex flex-row justify-between px-5'>
                        <View className='flex flex-col gap-1'>
                            <Text>Mon</Text>
                            <Text className='text-2xl'>😐</Text>
                        </View>
                        <View className='flex flex-col gap-1'>
                            <Text>Tue</Text>
                            <Text className='text-2xl'>🙂</Text>
                        </View>
                        <View className='flex flex-col gap-1'>
                            <Text>Wed</Text>
                            <Text className='text-2xl'>😄</Text>
                        </View>
                        <View className='flex flex-col gap-1'>
                            <Text>Thu</Text>
                            <Text className='text-2xl'>🙁</Text>
                        </View>
                        <View className='flex flex-col gap-1'>
                            <Text>Fri</Text>
                            <Text className='text-2xl'>😩</Text>
                        </View>
                        <View className='flex flex-col gap-1'>
                            <Text>Sat</Text>
                            <Text className='text-2xl'>😐</Text>
                        </View>
                        <View className='flex flex-col gap-1'>
                            <Text>Sun</Text>
                            <Text className='text-2xl'>🙂</Text>
                        </View>
                    </View>
                </View>
                <MoodJourney />
            </ScrollView>
        </SafeAreaView>
    )
}
