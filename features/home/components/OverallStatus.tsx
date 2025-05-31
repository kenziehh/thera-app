import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const OverallStatus = ({ className, percentage, text }: { className?: string, percentage: number, text: string }) => {

  return (
    <View className={`${className} bg-white rounded-2xl shadow-md p-4 mx-4 my-6 flex-row items-center`}>
      <AnimatedCircularProgress
        size={80}
        width={8}
        fill={percentage}
        tintColor="#22c55e" // Tailwind green-500
        backgroundColor="#e5e7eb" // Tailwind gray-200
        rotation={90}
        lineCap="round"

      >
        {() => <Text className="text-green-500 font-bold text-base">{percentage}%</Text>}
      </AnimatedCircularProgress>

      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-black">Good!</Text>
        <Text className="text-sm text-gray-500">
          {text}
        </Text>
      </View>
    </View>
  );
};

export default OverallStatus;
