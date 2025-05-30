import React from 'react';
import { View, Text } from 'react-native';

const moodData = [
    { month: 'Jan', value: 80 },
    { month: 'Feb', value: 60 },
    { month: 'Mar', value: 20 },
    { month: 'Apr', value: 100 },
    { month: 'May', value: 50 },
];

const getMoodColor = (value: number) => {
    if (value >= 75) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-300';
    if (value >= 25) return 'bg-orange-400';
    return 'bg-red-500';
};

export default function MoodJourney() {
    return (
        <View className='flex flex-col mt-10 bg-white-50 rounded-2xl mx-6 px-4 py-6 gap-3 mb-20'>
            <Text className='font-bold text-lg'>Mood Journey</Text>
            <View className="flex-row justify-between px-4">
                {moodData.map((item, index) => (
                    <View key={index} className="items-center">
                        <View className="w-10 h-32 bg-gray-200 rounded-full justify-end overflow-hidden">
                            <View
                                className={`w-full rounded-t-full ${getMoodColor(item.value)}`}
                                style={{ height: `${item.value}%` }}
                            />
                        </View>
                        <Text className="mt-2 text-sm">{item.month}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
