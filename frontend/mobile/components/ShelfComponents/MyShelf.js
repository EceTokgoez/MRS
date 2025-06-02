// /components/ShelfComponents/MyShelf.jsx
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FilmCard from './FilmCard';

export default function MyShelf({ lists }) {
  const navigation = useNavigation();

  if (!lists || lists.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-gray-500">Henüz “My Lists” yok.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="px-4 py-2"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }} 
    >
      {lists.map((list, index) => (
        <View key={list.id} className="mb-8">
          {/* 1. Liste Başlığı */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ListDetailPage', { listId: list.id })}
          >
            <Text className="text-white text-lg font-semibold mb-2">
              {list.title}
            </Text>
          </TouchableOpacity>

          {/* 2. Filmler Slider (horizontal) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {list.movies.map((movie) => (
              <FilmCard
                key={movie.id}
                posterUrl={movie.poster}
                genre={movie.genre ?? 'Genre'}
                name={movie.name ?? 'Movie Name'}
                onPress={() => {
                  console.log('Film seçildi:', movie.id);
                }}
                onMenuPress={() => {
                  console.log('Film menü tıklandı:', movie.id);
                }}
              />
            ))}
          </ScrollView>

          {/* 3. Eğer bu, son liste değilse, bölüm altına ince bir ayırıcı çizgi koy */}
          {index < lists.length - 1 && (
            <View className="mt-6 border-b border-gray-700" />
          )}
        </View>
      ))}
    </ScrollView>
);
}
