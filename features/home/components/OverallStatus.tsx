import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const OverallStatus = ({ className }: { className?: string }) => {
  const percentage = 70;

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
          You're on the right track! Stay positive and remember to take care of yourself.
        </Text>
      </View>
    </View>
  );
};

export default OverallStatus;
