import React from 'react'
import { Text, View } from 'react-native'

export default function ScheduleCard({ schedule }: { schedule: { time: string, patient: string, title: string, type: string } }) {
    return (
        <View className='flex gap-6 px-6 flex-row items-start mb-4'>
            <View className='flex flex-col gap-2 items-center'>
                <Text className='text-base text-[#454545] font-semibold'>
                    {schedule.time}
                </Text>
                <View className='h-32 w-2 bg-[#2D69FF]/40 rounded-lg' />
            </View>
            <View className={`border-l-4 ${schedule.type==="surgery"?"border-[#E1298B] bg-[#E1298B]/25":"border-[#2D69FF] bg-[#2D69FF]/40 "} pt-4 pb-6 px-6 rounded-md flex-1`}>
                <View className='flex flex-col gap-4'>
                    <Text className='text-base font-semibold text-black-500'>
                        {schedule.patient}
                    </Text>
                    <Text className='text-xs text-black-500'>
                        {schedule.title}
                    </Text>
                </View>
            </View>
        </View>
    )
}
