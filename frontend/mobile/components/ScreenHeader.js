import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

export default function ScreenHeader({ 
  title, 
  onBack, 
  rightElement,
  transparent = false,
  showGradient = false 
}) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (transparent && showGradient) {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <View className="absolute top-0 left-0 right-0 z-10">
          <View className="w-full bg-gradient-to-b from-black/90 via-black/70 to-transparent pb-4">
            <View className="h-10" />
            <View className="flex-row items-center px-4 py-3">
              <TouchableOpacity 
                onPress={handleBack} 
                className="w-10 h-10 items-center justify-center"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="chevron-back" size={28} color="#ffffff" />
              </TouchableOpacity>
              <Text className="text-white text-lg font-semibold ml-2">{title}</Text>
              {rightElement && <View className="ml-auto">{rightElement}</View>}
            </View>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar 
        barStyle={colors.background === '#ffffff' ? 'dark-content' : 'light-content'} 
        backgroundColor={colors.background} 
      />
      <View 
        className="flex-row items-center px-4 pt-8 pb-4"
        style={{ backgroundColor: colors.background }}
      >
        <TouchableOpacity 
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back-outline" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text 
          className="flex-1 text-center text-xl font-bold"
          style={{ color: colors.text }}
        >
          {title}
        </Text>
        {rightElement || <View style={{ width: 28 }} />}
      </View>
    </>
  );
} 