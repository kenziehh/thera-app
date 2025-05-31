import OverallStatus from '@/features/home/components/OverallStatus'
import React, { useEffect } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MoodJourney from './MoodJourney'
import { MoodService } from '../service/mood.service'
import { useQuery } from '@tanstack/react-query'

export default function MoodContainer() {
    const [selectedMood, setSelectedMood] = React.useState<number | null>(null)

    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const scaleToEmoji = ['😩', '🙁', '😐', '🙂', '😄']

    useEffect(() => {
        const postDailyMood = async () => {
            try {
                if (selectedMood !== null) {
                    await MoodService.postMoodThisDay(selectedMood)
                    Alert.alert("Success", "Your mood has been recorded for today.")
                }
            } catch (error) {
                Alert.alert("Error", "Failed to post daily mood. Please try again later.")
                console.error('Error posting daily mood:', error)
            }
        }
        postDailyMood()
    }, [selectedMood])

    const { data: weeklyMoodHistory, isLoading: isWeeklyMoodHistoryLoading } = useQuery({
        queryKey: ['moodWeeklyHistory'],
        queryFn: async () => MoodService.getMoodWeeklyHistory(),
    })

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
                    {weeklyMoodHistory && weeklyMoodHistory.length > 0 && (() => {
                        const totalScale = weeklyMoodHistory.reduce((sum, entry) => sum + entry.scale, 0)
                        const percentage = (totalScale / 5 / weeklyMoodHistory.length) * 100

                        let quote = ''
                        if (percentage % 20 === 0) {
                            if (percentage < 40) {
                                quote = 'Please consider visiting your hospital psychologist.'
                            } else {
                                quote = 'Keep up the good work and take care of your mental health!'
                            }
                        }

                        return (
                            <View className="w-full items-center">
                                <OverallStatus
                                    percentage={percentage}
                                    text={quote}
                                />
                            </View>
                        )
                    })()}
                </View>

                <View className='flex flex-col mt-10 bg-white-50 rounded-2xl mx-6 px-4 py-6 gap-3'>
                    <Text className='font-bold text-lg'>This Week's Mood</Text>
                    <View className='flex flex-row justify-between px-5'>
                        {dayLabels.map((day, idx) => {
                            const mood = weeklyMoodHistory?.find((m: any) => {
                                const date = new Date(m.created_at)
                                return date.getUTCDay() === idx
                            })
                            const emoji = mood ? (scaleToEmoji[mood.scale - 1] || '❓') : '❓'
                            return (
                                <View key={day} className='flex flex-col gap-1 items-center'>
                                    <Text>{day}</Text>
                                    <Text className='text-2xl'>{emoji}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <MoodJourney />
            </ScrollView>
        </SafeAreaView>
    )
}
