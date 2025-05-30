import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { format, addDays } from 'date-fns'
import ScheduleCard from '../components/ScheduleCard'

export default function ScheduleContainer() {
    const today = new Date()
    const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i))

    const [selectedDate, setSelectedDate] = useState(format(today, 'yyyy-MM-dd'))

    const scheduleData = [
        {
            date: '2025-06-01',
            schedule: [
                { time: '08:00', title: 'Check-up', patient: 'Dr. Hardi', type: "surgery" },
                { time: '10:00', title: 'Consultation', patient: 'Dr. Siti', type: "consultation" },
            ]
        },
        {
            date: '2025-06-02',
            schedule: [
                { time: '09:00', title: 'Follow-up', patient: 'Dr. Budi', type: "follow-up" },
                { time: '11:00', title: 'Therapy', patient: 'Dr. Ani', type: "therapy" },
            ]
        }
    ]

    const selectedSchedule = scheduleData.find(d => d.date === selectedDate)?.schedule || []

    return (
        <SafeAreaView>
            <View className='flex flex-col gap-6'>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row gap-3 items-center px-6">
                        {dates.map(date => {
                            const dateStr = format(date, 'yyyy-MM-dd')
                            const isSelected = selectedDate === dateStr
                            return (
                                <Pressable
                                    key={dateStr}
                                    onPress={() => setSelectedDate(dateStr)}
                                    className={`p-2 rounded-2xl items-center ${isSelected ? 'bg-blue-300' : 'bg-blue-100'}`}
                                >
                                    <View className="flex-col items-center gap-1 py-5 px-2">
                                        <Text className={`${isSelected ? 'font-bold' : ''} text-white-100 text-xs`}>
                                            {format(date, 'EEE')}
                                        </Text>
                                        <Text className='text-white-100 text-xs'>
                                            {format(date, 'dd')}
                                        </Text>
                                    </View>
                                </Pressable>
                            )
                        })}
                    </View>
                </ScrollView>

                {selectedSchedule.length > 0 ? (
                    selectedSchedule.map((item, idx) => (
                        <ScheduleCard
                            key={idx}
                            schedule={{
                                time: item.time,
                                patient: item.patient,
                                title: item.title,
                                type: item.type
                            }}
                        />
                    ))
                ) : (
                    <View className='px-6'>
                        <Text className='text-center text-gray-400 mt-10'>
                            No schedule for this date.
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}
