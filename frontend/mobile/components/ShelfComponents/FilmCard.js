// /components/ShelfComponents/FilmCard.jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.floor(width / 2.5);
const CARD_HEIGHT = Math.floor(CARD_WIDTH * 1.5);

export default function FilmCard({ posterUrl, genre, name, onPress, onMenuPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="mr-4 rounded-lg overflow-hidden"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT, backgroundColor: '#2A2E37' }}
    >
      <ImageBackground
        source={{ uri: posterUrl }}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        {/* 1. Alt Taraf Siyah Gradyan */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: CARD_HEIGHT * 0.4,
          }}
        />

        {/* 2. Alt Taraf Metin: Genre ve Name */}
        <View
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            right: 8,
          }}
        >
          <Text className="text-xs text-gray-300 mb-1">{genre}</Text>
          <Text className="text-sm text-white font-semibold">{name}</Text>
        </View>

      </ImageBackground>
    </TouchableOpacity>
);
}
