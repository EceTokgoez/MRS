import React from 'react';
import { ImageBackground, View } from 'react-native';
import { styled } from 'nativewind';

const Background = styled(ImageBackground);

export default function ScreenBackground({ children }) {
  return (
    <Background
      source={require('../assets/moviecollagebg.jpeg')}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="absolute inset-0 bg-black/60" />
      {children}
    </Background>
  );
} 