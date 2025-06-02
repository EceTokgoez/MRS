// /frontend/mobile/src/screens/Search/PopularResultsScreen.js

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

const sampleMoviesByPopular = {
  'Trending Now': [
    { id: '1', title: 'Trend Movie 1',  poster: 'https://via.placeholder.com/100x150?text=T1' },
    { id: '2', title: 'Trend Movie 2',  poster: 'https://via.placeholder.com/100x150?text=T2' },
    { id: '3', title: 'Trend Movie 3',  poster: 'https://via.placeholder.com/100x150?text=T3' },
    { id: '4', title: 'Trend Movie 4',  poster: 'https://via.placeholder.com/100x150?text=T4' },
    { id: '5', title: 'Trend Movie 5',  poster: 'https://via.placeholder.com/100x150?text=T5' },
    { id: '6', title: 'Trend Movie 6',  poster: 'https://via.placeholder.com/100x150?text=T6' },
    { id: '7', title: 'Trend Movie 7',  poster: 'https://via.placeholder.com/100x150?text=T7' },
    { id: '8', title: 'Trend Movie 8',  poster: 'https://via.placeholder.com/100x150?text=T8' },
    { id: '9', title: 'Trend Movie 9',  poster: 'https://via.placeholder.com/100x150?text=T9' },
    { id: '10',title: 'Trend Movie 10', poster: 'https://via.placeholder.com/100x150?text=T10' },
    { id: '11',title: 'Trend Movie 11', poster: 'https://via.placeholder.com/100x150?text=T11' },
    { id: '12',title: 'Trend Movie 12', poster: 'https://via.placeholder.com/100x150?text=T12' },
  ],
  'Top Rated': [
    { id: '13', title: 'Top Movie 1',  poster: 'https://via.placeholder.com/100x150?text=TR1' },
    { id: '14', title: 'Top Movie 2',  poster: 'https://via.placeholder.com/100x150?text=TR2' },
    { id: '15', title: 'Top Movie 3',  poster: 'https://via.placeholder.com/100x150?text=TR3' },
    { id: '16', title: 'Top Movie 4',  poster: 'https://via.placeholder.com/100x150?text=TR4' },
    { id: '17', title: 'Top Movie 5',  poster: 'https://via.placeholder.com/100x150?text=TR5' },
    { id: '18', title: 'Top Movie 6',  poster: 'https://via.placeholder.com/100x150?text=TR6' },
    { id: '19', title: 'Top Movie 7',  poster: 'https://via.placeholder.com/100x150?text=TR7' },
    { id: '20', title: 'Top Movie 8',  poster: 'https://via.placeholder.com/100x150?text=TR8' },
    { id: '21', title: 'Top Movie 9',  poster: 'https://via.placeholder.com/100x150?text=TR9' },
    { id: '22', title: 'Top Movie 10', poster: 'https://via.placeholder.com/100x150?text=TR10' },
    { id: '23', title: 'Top Movie 11', poster: 'https://via.placeholder.com/100x150?text=TR11' },
    { id: '24', title: 'Top Movie 12', poster: 'https://via.placeholder.com/100x150?text=TR12' },
  ],
  'Most Watched': [
    { id: '25', title: 'Watch Movie 1',  poster: 'https://via.placeholder.com/100x150?text=W1' },
    { id: '26', title: 'Watch Movie 2',  poster: 'https://via.placeholder.com/100x150?text=W2' },
    { id: '27', title: 'Watch Movie 3',  poster: 'https://via.placeholder.com/100x150?text=W3' },
    { id: '28', title: 'Watch Movie 4',  poster: 'https://via.placeholder.com/100x150?text=W4' },
    { id: '29', title: 'Watch Movie 5',  poster: 'https://via.placeholder.com/100x150?text=W5' },
    { id: '30', title: 'Watch Movie 6',  poster: 'https://via.placeholder.com/100x150?text=W6' },
    { id: '31', title: 'Watch Movie 7',  poster: 'https://via.placeholder.com/100x150?text=W7' },
    { id: '32', title: 'Watch Movie 8',  poster: 'https://via.placeholder.com/100x150?text=W8' },
    { id: '33', title: 'Watch Movie 9',  poster: 'https://via.placeholder.com/100x150?text=W9' },
    { id: '34', title: 'Watch Movie 10', poster: 'https://via.placeholder.com/100x150?text=W10' },
    { id: '35', title: 'Watch Movie 11', poster: 'https://via.placeholder.com/100x150?text=W11' },
    { id: '36', title: 'Watch Movie 12', poster: 'https://via.placeholder.com/100x150?text=W12' },
  ],
  'Upcoming Releases': [
    { id: '37', title: 'Upcoming 1',  poster: 'https://via.placeholder.com/100x150?text=U1' },
    { id: '38', title: 'Upcoming 2',  poster: 'https://via.placeholder.com/100x150?text=U2' },
    { id: '39', title: 'Upcoming 3',  poster: 'https://via.placeholder.com/100x150?text=U3' },
    { id: '40', title: 'Upcoming 4',  poster: 'https://via.placeholder.com/100x150?text=U4' },
    { id: '41', title: 'Upcoming 5',  poster: 'https://via.placeholder.com/100x150?text=U5' },
    { id: '42', title: 'Upcoming 6',  poster: 'https://via.placeholder.com/100x150?text=U6' },
    { id: '43', title: 'Upcoming 7',  poster: 'https://via.placeholder.com/100x150?text=U7' },
    { id: '44', title: 'Upcoming 8',  poster: 'https://via.placeholder.com/100x150?text=U8' },
    { id: '45', title: 'Upcoming 9',  poster: 'https://via.placeholder.com/100x150?text=U9' },
    { id: '46', title: 'Upcoming 10',poster: 'https://via.placeholder.com/100x150?text=U10' },
    { id: '47', title: 'Upcoming 11',poster: 'https://via.placeholder.com/100x150?text=U11' },
    { id: '48', title: 'Upcoming 12',poster: 'https://via.placeholder.com/100x150?text=U12' },
  ],
};

export default function PopularResultsScreen({ route, navigation }) {
  const { popularCategory } = route.params;
  const movies = sampleMoviesByPopular[popularCategory] || [];

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
      <Header title={popularCategory} />

      {/* 2. Filmler Grid */}
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
