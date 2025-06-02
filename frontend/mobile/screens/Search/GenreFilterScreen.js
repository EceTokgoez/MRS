// /frontend/mobile/src/screens/Search/GenreFilterScreen.js

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
import Footer from '../../components/Footer'; // ← Footer import
import Header from '../../components/Header';

export default function GenreFilterScreen({ navigation }) {
  const genres = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Documentary',
    'Drama',
    'Fantasy',
    'History',
    'Horror',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
  ];

  const renderGenreItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center px-4 py-3"
      onPress={() =>
        navigation.navigate('GenreResult', { genreName: item })
      }
    >
      <Text className="text-base text-black">{item}</Text>
      <Feather name="chevron-right" size={20} color="#555" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. Custom Header */}
      <View
        className={`flex-row items-center px-4 ${
          Platform.OS === 'ios' ? 'py-3' : 'py-2'
        } border-b border-gray-300`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-8 justify-center items-start"
        >
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold text-black">
          Search By Genre
        </Text>
        <View className="w-8" />
      </View>

      {/* 2. Genre Listesi */}
      <FlatList
        data={genres}
        keyExtractor={(item) => item}
        renderItem={renderGenreItem}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-200 mx-4" />}
        contentContainerStyle={{ paddingBottom: 64, paddingTop: 8 }}
        // paddingBottom:64, çünkü Footer 48-56px civarında; içeriğin altıyla çakışmaması için
      />

      {/* 3. Footer */}
      <Footer />
      <Header />
    </SafeAreaView>
);
}
