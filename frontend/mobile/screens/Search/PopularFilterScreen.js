// /frontend/mobile/src/screens/Search/PopularFilterScreen.js

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PopularFilterScreen({ navigation }) {
  const popularCategories = [
    'Trending Now',
    'Top Rated',
    'Most Watched',
    'Upcoming Releases',
    'Newly Added',
    'Box Office Hits',
    'Critics’ Choice',
    'Fan Favorites',
  ];

  const renderPopularItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center px-4 py-3"
      onPress={() =>
        navigation.navigate('PopularResults', { popularCategory: item })
      }
    >
      <Text className="text-base text-black">{item}</Text>
      <Feather name="chevron-right" size={20} color="#555" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. Header */}
      <Header title="Search By Popular" />

      {/* 2. Liste */}
      <FlatList
        data={popularCategories}
        keyExtractor={(item) => item}
        renderItem={renderPopularItem}
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
