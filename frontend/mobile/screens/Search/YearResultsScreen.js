// /frontend/mobile/src/screens/Search/YearResultsScreen.js

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const windowWidth = Dimensions.get('window').width;
const numColumns = 4;
const cardMargin = 8;
const cardWidth = (windowWidth - 16 - cardMargin * 2 * numColumns) / numColumns;

const sampleMoviesByYear = {
  '2025': [
    { id: '1',  title: 'Movie 2025-1',  poster: 'https://via.placeholder.com/100x150?text=25-1' },
    { id: '2',  title: 'Movie 2025-2',  poster: 'https://via.placeholder.com/100x150?text=25-2' },
    { id: '3',  title: 'Movie 2025-3',  poster: 'https://via.placeholder.com/100x150?text=25-3' },
    { id: '4',  title: 'Movie 2025-4',  poster: 'https://via.placeholder.com/100x150?text=25-4' },
    { id: '5',  title: 'Movie 2025-5',  poster: 'https://via.placeholder.com/100x150?text=25-5' },
    { id: '6',  title: 'Movie 2025-6',  poster: 'https://via.placeholder.com/100x150?text=25-6' },
    { id: '7',  title: 'Movie 2025-7',  poster: 'https://via.placeholder.com/100x150?text=25-7' },
    { id: '8',  title: 'Movie 2025-8',  poster: 'https://via.placeholder.com/100x150?text=25-8' },
    { id: '9',  title: 'Movie 2025-9',  poster: 'https://via.placeholder.com/100x150?text=25-9' },
    { id: '10', title: 'Movie 2025-10', poster: 'https://via.placeholder.com/100x150?text=25-10' },
    { id: '11', title: 'Movie 2025-11', poster: 'https://via.placeholder.com/100x150?text=25-11' },
    { id: '12', title: 'Movie 2025-12', poster: 'https://via.placeholder.com/100x150?text=25-12' },
  ],
  '2024': [
    { id: '13', title: 'Movie 2024-1',  poster: 'https://via.placeholder.com/100x150?text=24-1' },
    { id: '14', title: 'Movie 2024-2',  poster: 'https://via.placeholder.com/100x150?text=24-2' },
    { id: '15', title: 'Movie 2024-3',  poster: 'https://via.placeholder.com/100x150?text=24-3' },
    { id: '16', title: 'Movie 2024-4',  poster: 'https://via.placeholder.com/100x150?text=24-4' },
    { id: '17', title: 'Movie 2024-5',  poster: 'https://via.placeholder.com/100x150?text=24-5' },
    { id: '18', title: 'Movie 2024-6',  poster: 'https://via.placeholder.com/100x150?text=24-6' },
    { id: '19', title: 'Movie 2024-7',  poster: 'https://via.placeholder.com/100x150?text=24-7' },
    { id: '20', title: 'Movie 2024-8',  poster: 'https://via.placeholder.com/100x150?text=24-8' },
    { id: '21', title: 'Movie 2024-9',  poster: 'https://via.placeholder.com/100x150?text=24-9' },
    { id: '22', title: 'Movie 2024-10', poster: 'https://via.placeholder.com/100x150?text=24-10' },
    { id: '23', title: 'Movie 2024-11', poster: 'https://via.placeholder.com/100x150?text=24-11' },
    { id: '24', title: 'Movie 2024-12', poster: 'https://via.placeholder.com/100x150?text=24-12' },
  ],
  // Diğer yıllar eklerseniz benzer yapı kullanabilirsiniz…
};

export default function YearResultsScreen({ route, navigation }) {
  const { yearFilter } = route.params;
  const movies = sampleMoviesByYear[yearFilter] || [];

  const renderMovieCard = ({ item }) => (
    <TouchableOpacity
      style={{ width: cardWidth, margin: cardMargin }}
      onPress={() => navigation.navigate('MovieInfo', { movie: item })}
    >
      <Image
        source={{ uri: item.poster }}
        className="w-full aspect-[2/3] rounded-md bg-gray-200"
        resizeMode="cover"
      />
      <Text className="mt-1 text-xs text-center text-black" numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. Header */}
      <Header title={yearFilter} />

      {/* 2. Grid */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieCard}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingTop: 12,
          paddingBottom: 80,
        }}
      />

      {/* 3. Footer */}
      <Footer />
    </SafeAreaView>
);
}
