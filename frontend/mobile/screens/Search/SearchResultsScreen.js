// /frontend/mobile/src/screens/Search/SearchResultsScreen.js

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

// Örnek “dummy” search sonuçları
const sampleSearchResults = [
  { id: '1', title: 'Search Movie 1',  poster: 'https://via.placeholder.com/100x150?text=S1' },
  { id: '2', title: 'Search Movie 2',  poster: 'https://via.placeholder.com/100x150?text=S2' },
  { id: '3', title: 'Search Movie 3',  poster: 'https://via.placeholder.com/100x150?text=S3' },
  { id: '4', title: 'Search Movie 4',  poster: 'https://via.placeholder.com/100x150?text=S4' },
  { id: '5', title: 'Search Movie 5',  poster: 'https://via.placeholder.com/100x150?text=S5' },
  { id: '6', title: 'Search Movie 6',  poster: 'https://via.placeholder.com/100x150?text=S6' },
  { id: '7', title: 'Search Movie 7',  poster: 'https://via.placeholder.com/100x150?text=S7' },
  { id: '8', title: 'Search Movie 8',  poster: 'https://via.placeholder.com/100x150?text=S8' },
  { id: '9', title: 'Search Movie 9',  poster: 'https://via.placeholder.com/100x150?text=S9' },
  { id: '10',title: 'Search Movie 10', poster: 'https://via.placeholder.com/100x150?text=S10' },
  { id: '11',title: 'Search Movie 11', poster: 'https://via.placeholder.com/100x150?text=S11' },
  { id: '12',title: 'Search Movie 12', poster: 'https://via.placeholder.com/100x150?text=S12' },
];

export default function SearchResultsScreen({ route, navigation }) {
  const { query } = route.params;
  const movies = sampleSearchResults;

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
      <Header title={`Results for "${query}"`} />

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
