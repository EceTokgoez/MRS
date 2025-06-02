// /frontend/mobile/src/screens/Search/MovieInfoScreen.js

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function MovieInfoScreen({ route, navigation }) {
  const { movie } = route.params;
  const movieDetails = {
    title: movie.title,
    year: '20XX',
    duration: '128 mins',
    director: 'Director Name',
    cast: ['Actor A', 'Actor B', 'Actor C'],
    imdbRating: '7.8',
    restrictions: ['PG-13'],
    genre: 'Action',
    poster: movie.poster,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis ex, nec ullamcorper velit aliquet ut. Sed at lorem nec augue ultrices commodo at nec odio.',
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. Header */}
      <Header title={movieDetails.title} />

      <ScrollView className="pb-16">
        {/* 2. Büyük Poster */}
        <Image
          source={{ uri: movieDetails.poster }}
          className="w-full aspect-[9/5] bg-gray-200"
          resizeMode="cover"
        />

        {/* 3. Başlık ve Subtitle */}
        <View className="px-4 pt-3">
          <Text className="text-xl font-bold text-black">
            {movieDetails.title}
          </Text>
          <Text className="mt-1 text-sm text-gray-600">
            {movieDetails.year} | {movieDetails.duration}
          </Text>
        </View>

        {/* 4. Küçük Poster ve Detaylar */}
        <View className="flex-row px-4 pt-3">
          <Image
            source={{ uri: movieDetails.poster }}
            className="w-24 h-36 rounded-md bg-gray-300"
            resizeMode="cover"
          />
          <View className="flex-1 ml-3">
            <Text className="text-sm font-semibold text-gray-700">
              Director
            </Text>
            <Text className="text-sm text-black">
              {movieDetails.director}
            </Text>

            <Text className="mt-2 text-sm font-semibold text-gray-700">
              Cast
            </Text>
            <Text className="text-sm text-black">
              {movieDetails.cast.join(', ')}
            </Text>

            <Text className="mt-2 text-sm font-semibold text-gray-700">
              IMDb
            </Text>
            <Text className="text-sm text-black">
              {movieDetails.imdbRating}
            </Text>

            <Text className="mt-2 text-sm font-semibold text-gray-700">
              Restrictions
            </Text>
            <Text className="text-sm text-black">
              {movieDetails.restrictions.join(', ')}
            </Text>

            <Text className="mt-2 text-sm font-semibold text-gray-700">
              Genre
            </Text>
            <Text className="text-sm text-black">
              {movieDetails.genre}
            </Text>
          </View>
        </View>

        {/* 5. Trailer Butonu */}
        <TouchableOpacity
          className="flex-row items-center mx-4 mt-4 px-3 py-2 border border-black rounded-md w-24"
          onPress={() => {
            console.log('Play trailer:', movieDetails.trailerUrl);
          }}
        >
          <Feather name="play" size={20} color="#000" />
          <Text className="ml-1 text-sm text-black">Trailer</Text>
        </TouchableOpacity>

        {/* 6. About Bölümü */}
        <View className="px-4 pt-4 pb-8">
          <Text className="text-base font-semibold text-black">About</Text>
          <Text className="mt-2 text-sm text-gray-700 leading-6">
            {movieDetails.about}
          </Text>
        </View>
      </ScrollView>

      {/* 7. Footer */}
      <Footer />
    </SafeAreaView>
);
}
