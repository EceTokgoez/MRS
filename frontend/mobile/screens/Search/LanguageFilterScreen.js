// /frontend/mobile/src/screens/Search/LanguageFilterScreen.js

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function LanguageFilterScreen({ navigation }) {
  const languages = [
    'English',
    'Turkish',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Japanese',
    'Korean',
    'Mandarin',
    'Hindi',
    'Portuguese',
    'Russian',
  ];

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center px-4 py-3"
      onPress={() =>
        navigation.navigate('LanguageResult', { languageName: item })
      }
    >
      <Text className="text-base text-black">{item}</Text>
      <Feather name="chevron-right" size={20} color="#555" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. Header */}
      <Header title="Search By Language" />

      {/* 2. Dil Listesi */}
      <FlatList
        data={languages}
        keyExtractor={(item) => item}
        renderItem={renderLanguageItem}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-200 mx-4" />}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 80,
        }}
      />

      {/* 3. Footer */}
      <Footer />
    </SafeAreaView>
);
}
