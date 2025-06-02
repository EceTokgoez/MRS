// /frontend/mobile/src/screens/Search/LanguageResultScreen.js

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

const sampleMoviesByLanguage = {
  English: [
    { id: '1',  title: 'English Movie 1',  poster: 'https://via.placeholder.com/100x150?text=Eng+1' },
    { id: '2',  title: 'English Movie 2',  poster: 'https://via.placeholder.com/100x150?text=Eng+2' },
    { id: '3',  title: 'English Movie 3',  poster: 'https://via.placeholder.com/100x150?text=Eng+3' },
    { id: '4',  title: 'English Movie 4',  poster: 'https://via.placeholder.com/100x150?text=Eng+4' },
    { id: '5',  title: 'English Movie 5',  poster: 'https://via.placeholder.com/100x150?text=Eng+5' },
    { id: '6',  title: 'English Movie 6',  poster: 'https://via.placeholder.com/100x150?text=Eng+6' },
    { id: '7',  title: 'English Movie 7',  poster: 'https://via.placeholder.com/100x150?text=Eng+7' },
    { id: '8',  title: 'English Movie 8',  poster: 'https://via.placeholder.com/100x150?text=Eng+8' },
    { id: '9',  title: 'English Movie 9',  poster: 'https://via.placeholder.com/100x150?text=Eng+9' },
    { id: '10', title: 'English Movie 10', poster: 'https://via.placeholder.com/100x150?text=Eng+10' },
    { id: '11', title: 'English Movie 11', poster: 'https://via.placeholder.com/100x150?text=Eng+11' },
    { id: '12', title: 'English Movie 12', poster: 'https://via.placeholder.com/100x150?text=Eng+12' },
  ],
  Turkish: [
    { id: '13', title: 'Türk Filmi 1',  poster: 'https://via.placeholder.com/100x150?text=TR+1' },
    { id: '14', title: 'Türk Filmi 2',  poster: 'https://via.placeholder.com/100x150?text=TR+2' },
    { id: '15', title: 'Türk Filmi 3',  poster: 'https://via.placeholder.com/100x150?text=TR+3' },
    { id: '16', title: 'Türk Filmi 4',  poster: 'https://via.placeholder.com/100x150?text=TR+4' },
    { id: '17', title: 'Türk Filmi 5',  poster: 'https://via.placeholder.com/100x150?text=TR+5' },
    { id: '18', title: 'Türk Filmi 6',  poster: 'https://via.placeholder.com/100x150?text=TR+6' },
    { id: '19', title: 'Türk Filmi 7',  poster: 'https://via.placeholder.com/100x150?text=TR+7' },
    { id: '20', title: 'Türk Filmi 8',  poster: 'https://via.placeholder.com/100x150?text=TR+8' },
    { id: '21', title: 'Türk Filmi 9',  poster: 'https://via.placeholder.com/100x150?text=TR+9' },
    { id: '22', title: 'Türk Filmi 10', poster: 'https://via.placeholder.com/100x150?text=TR+10' },
    { id: '23', title: 'Türk Filmi 11', poster: 'https://via.placeholder.com/100x150?text=TR+11' },
    { id: '24', title: 'Türk Filmi 12', poster: 'https://via.placeholder.com/100x150?text=TR+12' },
  ],
};

export default function LanguageResultScreen({ route, navigation }) {
  const { languageName } = route.params;
  const movies = sampleMoviesByLanguage[languageName] || [];

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
      <Header title={languageName} />

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
