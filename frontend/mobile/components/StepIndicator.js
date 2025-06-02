import React from 'react';
import { View, Text } from 'react-native';

export default function StepIndicator({ 
  currentStep, 
  totalSteps = 3,
  labels = ['Account', 'Profile', 'Preferences'] 
}) {
  return (
    <View className="mt-6 w-full">
      {/* Progress bar */}
      <View className="h-1 flex-row">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            className={`flex-1 ${
              index < currentStep ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
      
      {/* Labels */}
      <View className="flex-row justify-around mt-2">
        {labels.map((label, index) => (
          <Text
            key={label}
            className={`${
              index + 1 === currentStep
                ? 'text-red-600 font-semibold'
                : 'text-gray-400'
            }`}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
} 