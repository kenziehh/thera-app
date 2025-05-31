import React from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Appointment } from '@/types';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.85;

const ScheduleCarousel = ({ schedule }: { schedule: Appointment[] }) => {
    

    const renderCard = ({ item }: { item: Appointment }) => (
        <View
            className={`${item.type === "surgery" ? "bg-[#E1288B]" : "bg-blue-300"} rounded-2xl py-6 px-4 shadow-lg mx-3 text-white-300`}
            style={{ width: CARD_WIDTH }}
        >
            {/* Card Header */}
            <View className="mb-5">
                <Text className="text-2xl font-bold text-white-300 mb-2">
                    {item.patient.full_name}
                </Text>
                <View className="flex-row gap-2 justify-between items-center">
                    <Text className="text-xs text-white-300 mb-2">
                        {item.type}
                    </Text>
                    <View className="flex-row justify-between max-w-[200px] gap-5">
                        <Text className="text-xs text-white-300">{item.patient.full_name}</Text>
                        <Text className="text-xs text-white-300">{item.patient.height}</Text>
                        <Text className="text-xs text-white-300">{item.patient.weight}</Text>
                    </View>
                </View>
            </View>

            {/* Symptom Card */}
            <View className={`${item.type === "surgery" ? "bg-pink-300" : "bg-[#85A8FF]"} rounded-2xl p-4`}>
                <View className="flex-row items-center">
                    {/* Icon Container */}
                    <View className="w-10 h-10 bg-white-100 rounded-full justify-center items-center mr-3">
                        <Ionicons name="medical" size={24} color={`${item.type === "surgery" ? "#E1298B" : "#4A90E2"}`} />
                    </View>

                    {/* Symptom Info */}
                    <View className="flex-1">
                        <Text className="text-base font-semibold text-white-100 mb-1">
                            {"Dizzy Head. Flu"}
                        </Text>
                        <Text className="text-sm text-white-100">
                            Feeling sick for 2 days
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View className="pt-12">
            <Text className="text-2xl font-bold text-gray-800 ml-5 mb-5">
                Shift Today
            </Text>

            {schedule.length > 0 ? (<FlatList
                data={schedule}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 8 }}
                snapToAlignment="start"
            />) : (<Text className='text-center'>
                No appointments scheduled for today.
            </Text>)}
        </View>
    );
};

export default ScheduleCarousel;