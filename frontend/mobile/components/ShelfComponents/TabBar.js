// /components/ShelfComponents/TabBar.jsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function TabBar({ tabs, activeKey, onTabPress }) {
  return (
    <View className="flex-row border-b border-gray-800 bg-black">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          className={`flex-1 p-4 items-center ${
            activeKey === tab.key ? 'border-b-2 border-blue-500' : ''
          }`}
          onPress={() => onTabPress(tab.key)}
        >
          <Text
            className={`text-sm font-medium ${
              activeKey === tab.key ? 'text-white' : 'text-gray-400'
            }`}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
  </View>
);
}
