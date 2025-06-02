// components/ShelfComponents/ShelfItem.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ShelfItem({ item }) {
  return (
    <View className="flex-row items-center bg-gray-800 rounded-lg p-4 mb-3">
      {/* Kapak Görseli */}
      <Image
        source={{ uri: item.coverUrl }}
        className="w-16 h-24 rounded"
        resizeMode="cover"
      />

      {/* Başlık ve film sayısı */}
      <View className="flex-1 ml-4">
        <Text className="text-white font-semibold">{item.title}</Text>
        <Text className="text-gray-400 text-xs mt-1">
          {item.movieCount} movie{item.movieCount > 1 ? 's' : ''}
        </Text>
      </View>

      {/* Üç Nokta Menü */}
      <TouchableOpacity
        onPress={() => {
          console.log('ListItem menu tıklandı:', item.id);
        }}
        className="p-2"
      >
        <Ionicons name="ellipsis-vertical" size={20} color="white" />
      </TouchableOpacity>
  </View>
  );
}
