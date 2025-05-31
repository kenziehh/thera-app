import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GreetingCard from '../components/GreetingCard'
// import OverallStatus from '../components/OverallStatus'
import ScheduleCarousel from '../components/ScheduleCarousel'
import NewsWidget from './NewsWidget'
import OverallStatus from '../components/OverallStatus'
import { ScrollView, Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { AuthService } from '@/features/auth/services/auth.service'
import { MoodService } from '@/features/mood/service/mood.service'

export default function HomeContainer() {
    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const session = await AuthService.getSession()
            return session
        }
    })
    const { data: weeklyMoodHistory, isLoading: isWeeklyMoodHistoryLoading } = useQuery({
        queryKey: ['moodWeeklyHistory'],
        queryFn: async () => MoodService.getMoodWeeklyHistory(),
    })
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const scaleToEmoji = ['😩', '🙁', '😐', '🙂', '😄']

    return (
        <SafeAreaView className='flex-1 w-full h-full bg-white-300'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex flex-col gap-8">
                {!isProfileLoading && (
                    <GreetingCard name={profile?.full_name ?? "User"} />
                )}
                <ScheduleCarousel />
                <View className='flex flex-col items-center bg-white-50 rounded-2xl mx-6 my-10'>
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
                <NewsWidget />
            </ScrollView>
        </SafeAreaView>
    )
}
