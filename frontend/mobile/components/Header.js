// /frontend/mobile/src/components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

/**
 * Header bileşeni:
 *   - Sol tarafta geri (chevron-left) ikonu, tıklanınca navigation.goBack() yapar.
 *   - Ortada title prop’u ile ekrana özel başlık gösterir.
 *   - Sağda boş bir View bırakır; böylece başlık tam ortada kalır.
 */
export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <View
      className={`flex-row items-center px-4 ${
        Platform.OS === 'ios' ? 'py-3' : 'py-2'
      } border-b border-gray-300 bg-white`}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-8 justify-center items-start"
      >
        <Feather name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>

      <Text className="flex-1 text-center text-lg font-semibold text-black">
        {title}
      </Text>

      <View className="w-8" />
    </View>
  );
}
