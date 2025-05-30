import React from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.85;

const ScheduleCarousel = () => {
    const shiftData = [
        {
            id: '1',
            name: 'Gardika Gigih',
            goal: 'General Consultation',
            age: '21 y.o',
            height: '170cm',
            weight: '80kg',
            symptom: 'Dizzy Head, Flu',
            duration: 'Feeling sick for 2 days',
            type: 'disease',

        },
        {
            id: '2',
            name: 'Sarah Johnson',
            goal: 'Cardiology Check',
            age: '35 y.o',
            height: '165cm',
            weight: '65kg',
            symptom: 'Chest Pain',
            duration: 'Started yesterday',
            type: 'disease',
        },
        {
            id: '3',
            name: 'Ahmad Rahman',
            goal: 'Dermatology',
            age: '28 y.o',
            height: '175cm',
            weight: '70kg',
            symptom: 'Skin Rash',
            duration: 'Appeared 3 days ago',
            type: "surgery",
        },
    ];

    const renderCard = ({ item }: { item: any }) => (
        <View
            className={`${item.type === "surgery" ? "bg-[#E1288B]" : "bg-blue-300"} rounded-2xl py-6 px-4 shadow-lg mx-3 text-white-300`}
            style={{ width: CARD_WIDTH }}
        >
            {/* Card Header */}
            <View className="mb-5">
                <Text className="text-2xl font-bold text-white-300 mb-2">
                    {item.name}
                </Text>
                <View className="flex-row gap-2 justify-between items-center">
                    <Text className="text-xs text-white-300 mb-2">
                        {item.goal}
                    </Text>
                    <View className="flex-row justify-between max-w-[200px] gap-5">
                        <Text className="text-xs text-white-300">{item.age}</Text>
                        <Text className="text-xs text-white-300">{item.height}</Text>
                        <Text className="text-xs text-white-300">{item.weight}</Text>
                    </View>
                </View>
            </View>

            {/* Symptom Card */}
            <View className={`${item.type === "surgery" ? "bg-pink-300" : "bg-[#85A8FF]"} rounded-2xl p-4`}>
                <View className="flex-row items-center">
                    {/* Icon Container */}
                    <View className="w-10 h-10 bg-white-100 rounded-full justify-center items-center mr-3">
                        <Ionicons name="medical" size={24} color={`${item.type==="surgery"?"#E1298B":"#4A90E2"}`} />
                    </View>

                    {/* Symptom Info */}
                    <View className="flex-1">
                        <Text className="text-base font-semibold text-white-100 mb-1">
                            {item.symptom}
                        </Text>
                        <Text className="text-sm text-white-100">
                            {item.duration}
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

            <FlatList
                data={shiftData}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 8 }}
                snapToAlignment="start"
            />
        </View>
    );
};

export default ScheduleCarousel;