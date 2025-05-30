import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GreetingCard from '../components/GreetingCard'
// import OverallStatus from '../components/OverallStatus'
import ScheduleCarousel from '../components/ScheduleCarousel'
import NewsWidget from './NewsWidget'
import OverallStatus from '../components/OverallStatus'
import { ScrollView } from 'react-native'

export default function HomeWidget() {
    return (
        <SafeAreaView className='flex-1 w-full h-full bg-white-300'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex flex-col gap-8">
                <GreetingCard name={"Dr. Hardi"} />
                <ScheduleCarousel />
                <OverallStatus />
                <NewsWidget />
            </ScrollView>
        </SafeAreaView>
    )
}
