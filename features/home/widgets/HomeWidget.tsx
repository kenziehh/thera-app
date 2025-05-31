import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GreetingCard from '../components/GreetingCard'
// import OverallStatus from '../components/OverallStatus'
import ScheduleCarousel from '../components/ScheduleCarousel'
import NewsWidget from './NewsWidget'
import OverallStatus from '../components/OverallStatus'
import { ScrollView } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { AuthService } from '@/features/auth/services/auth.service'

export default function HomeWidget() {
    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const session = await AuthService.getSession()
            return session
        }
    })

    return (
        <SafeAreaView className='flex-1 w-full h-full bg-white-300'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex flex-col gap-8">
                {!isProfileLoading && (
                    <GreetingCard name={profile?.full_name ?? "User"} />
                )}
                <ScheduleCarousel />
                <OverallStatus />
                <NewsWidget />
            </ScrollView>
        </SafeAreaView>
    )
}
