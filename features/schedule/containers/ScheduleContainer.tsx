import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { format, addDays } from 'date-fns'
import ScheduleCard from '../components/ScheduleCard'
import { AuthService } from '@/features/auth/services/auth.service'
import { useQuery } from '@tanstack/react-query'
import { AppointmentService } from '../services/appointment.service'

export default function ScheduleContainer() {
    const today = new Date()
    const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i))

    const [selectedDate, setSelectedDate] = useState(format(today, 'yyyy-MM-dd'))

    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const session = await AuthService.getSession()
            return session
        }
    })

    const { data: schedulePerDay, isLoading: isSchedulePerDayLoading } = useQuery({
        queryKey: ['scheduleToday',selectedDate],
        queryFn: async () => AppointmentService.getAppointments(profile?.id ?? '', selectedDate, selectedDate),
        enabled: !!profile?.id,
    })

    console.log(schedulePerDay)


    const selectedSchedule = (schedulePerDay ?? []).filter(d => d.appointment_date === selectedDate)

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
                                time: item.appointment_date,
                                patient: item.patient.full_name,
                                title: item.type,
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
