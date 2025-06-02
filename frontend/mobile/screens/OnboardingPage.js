// screens/OnboardingScreen.js
import React from 'react'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

// wrap ImageBackground for className support
const Background = styled(ImageBackground)
const Touchable = styled(TouchableOpacity)

export default function OnboardingScreen() {
  const navigation = useNavigation()

  return (
    <Background
      source={require('../assets/moviecollagebg.jpeg')}
      resizeMode="cover"
      className="flex-1"
    >
      {/* Full-screen translucent overlay */}
      <View className="absolute inset-0 bg-black/40" />

      {/* Bottom gradient fade */}
      <LinearGradient
        // from transparent at 40% height, to almost black at bottom
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        locations={[0.1, 1]}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '100%' }}
      />

      {/* Buttons container */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-12 items-center">
        {/* Eye‐catching entry message */}
        <Text className="text-white text-3xl font-extrabold mb-2 text-center font-serif['Times New Roman']">
          Welcome to MRS Movie
        </Text>
        <Text className="text-gray-300 text-center mb-6 text-lg font-serif['Times New Roman']">
          Discover and share your favorite films together!
        </Text>
        
        
        {/* Secondary: Log In */}
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginPage')}
          className="w-full max-w-md border border-white py-4 rounded-lg mb-4 items-center"
        >
          <Text className="text-white text-lg font-bold font-serif['Times New Roman']">Log In</Text>
        </TouchableOpacity>
        
        

        
        {/* Primary: Create Account */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterPage1')}
          className="w-full max-w-md border border-white py-4 rounded-lg  items-center"
        >
          <Text className="text-white text-lg font-bold">Create Account</Text>
        </TouchableOpacity>

        
      </View>
    </Background>
  )
}
