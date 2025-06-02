// /frontend/mobile/src/screens/Search/GenreResultScreen.js

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

// Örnek "dummy" film verisi
const sampleMovies = [
  { id: '1', title: 'Movie 1', poster: 'https://via.placeholder.com/100x150?text=1' },
  { id: '2', title: 'Movie 2', poster: 'https://via.placeholder.com/100x150?text=2' },
  { id: '3', title: 'Movie 3', poster: 'https://via.placeholder.com/100x150?text=3' },
  { id: '4', title: 'Movie 4', poster: 'https://via.placeholder.com/100x150?text=4' },
  { id: '5', title: 'Movie 5', poster: 'https://via.placeholder.com/100x150?text=5' },
  { id: '6', title: 'Movie 6', poster: 'https://via.placeholder.com/100x150?text=6' },
  { id: '7', title: 'Movie 7', poster: 'https://via.placeholder.com/100x150?text=7' },
  { id: '8', title: 'Movie 8', poster: 'https://via.placeholder.com/100x150?text=8' },
  { id: '9', title: 'Movie 9', poster: 'https://via.placeholder.com/100x150?text=9' },
  { id: '10', title: 'Movie 10', poster: 'https://via.placeholder.com/100x150?text=10' },
  { id: '11', title: 'Movie 11', poster: 'https://via.placeholder.com/100x150?text=11' },
  { id: '12', title: 'Movie 12', poster: 'https://via.placeholder.com/100x150?text=12' },
];

export default function GenreResultScreen({ route, navigation }) {
  const { genreName } = route.params;

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
      <Header title={genreName} />

      {/* 2. Filmler Grid */}
      <FlatList
        data={sampleMovies}
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
