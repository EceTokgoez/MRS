// frontend/mobile/screens/PreferencesPage.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const Background = styled(ImageBackground);

const allGenres = [
  'Action', 'Comedy', 'Drama', 'Sci-Fi',
  'Horror', 'Romance', 'Animation',
  'Documentary', 'Thriller', 'Fantasy',
  'Adventure', 'Crime', 'Mystery', 'War',
  'Western', 'Biography', 'Musical', 'Sport'
];

// Önerilen aktörler listesi
const suggestedActors = [
  'Tom Hanks', 'Scarlett Johansson', 'Leonardo DiCaprio',
  'Meryl Streep', 'Denzel Washington', 'Jennifer Lawrence',
  'Brad Pitt', 'Viola Davis', 'Ryan Gosling', 'Emma Stone'
];

// Önerilen filmler listesi
const suggestedMovies = [
  'The Shawshank Redemption', 'Inception', 'Pulp Fiction',
  'The Godfather', 'Interstellar', 'Fight Club',
  'The Dark Knight', 'Parasite', 'Forrest Gump', 'Avatar'
];

export default function PreferencesPage({ navigation }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [actorQuery, setActorQuery] = useState('');
  const [selectedActors, setSelectedActors] = useState([]);
  const [movieQuery, setMovieQuery] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]);

  const toggleGenre = (g) =>
    setSelectedGenres(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    );

  const addActor = () => {
    const name = actorQuery.trim();
    if (name && !selectedActors.includes(name)) {
      setSelectedActors(prev => [...prev, name]);
      setActorQuery('');
    }
  };
  const removeActor = (a) =>
    setSelectedActors(prev => prev.filter(x => x !== a));

  const addMovie = () => {
    const title = movieQuery.trim();
    if (title && !selectedMovies.includes(title)) {
      setSelectedMovies(prev => [...prev, title]);
      setMovieQuery('');
    }
  };
  const removeMovie = (m) =>
    setSelectedMovies(prev => prev.filter(x => x !== m));

  const handleFinish = () => {
    console.log({ selectedGenres, selectedActors, selectedMovies });
    navigation.navigate('HomePage');
  };

  return (
    <Background
      source={require('../assets/moviecollagebg.jpeg')}
      resizeMode="cover"
      className="flex-1"
    >
      {/* Make StatusBar transparent so it's included in our custom header */}
      <StatusBar translucent backgroundColor="black" barStyle="light-content" />
      
      {/* Dark overlay for the entire screen */}
      <View className="absolute inset-0 bg-black/60" />
      
      {/* Netflix-style header - fully transparent with gradient */}
      <View className="absolute top-0 left-0 right-0 z-10">
        {/* Gradient overlay that fades from dark to transparent */}
        <View className="w-full bg-gradient-to-b from-black/90 via-black/70 to-transparent pb-4">
          {/* This gives space for the status bar */}
          <View className="h-10" />
          
          {/* Header content */}
          <View className="flex-row items-center px-4 py-3">
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              className="w-10 h-10 items-center justify-center"
            >
              <Ionicons name="chevron-back" size={28} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold ml-2">Your Preferences</Text>
          </View>
        </View>
      </View>

      <SafeAreaView className="flex-1" style={{ paddingTop: 70 }}>
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-neutral-800/90 p-6 rounded-2xl w-full">
            <Text className="text-white text-2xl font-bold mb-1">Your Preferences</Text>
            <Text className="text-gray-300 mb-6">Step 3 of 3: Tell us what you like</Text>

            {/* Genres */}
            <Text className="text-white text-lg font-semibold mb-3">What kind of movies do you like?</Text>
            <FlatList
              data={allGenres}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item}
              contentContainerStyle={{ paddingVertical: 8 }}
              renderItem={({ item }) => {
                const active = selectedGenres.includes(item);
                return (
                  <TouchableOpacity
                    onPress={() => toggleGenre(item)}
                    className={`px-4 py-2 mr-2 rounded-full border ${
                      active
                        ? 'bg-red-600 border-red-700'
                        : 'bg-neutral-700 border-neutral-600'
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        active ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            {/* Actors */}
            <Text className="text-white text-lg font-semibold mb-3">Which movie actors do you like?</Text>
            <View className="flex-row items-center mb-4">
              <TextInput
                className="flex-1 bg-neutral-700 border border-neutral-600 rounded-full px-4 h-12 text-white"
                placeholder="Search for actors..."
                placeholderTextColor="#999"
                value={actorQuery}
                onChangeText={setActorQuery}
                onSubmitEditing={addActor}
              />
              <TouchableOpacity
                onPress={addActor}
                className="ml-3 bg-red-600 rounded-full px-5 h-12 justify-center shadow"
              >
                <Text className="text-white font-semibold">Add</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap mb-4">
              {selectedActors.map(a => (
                <View
                  key={a}
                  className="flex-row items-center bg-red-900/50 border border-red-700 px-3 py-1 m-1 rounded-full"
                >
                  <Text className="text-white mr-2">{a}</Text>
                  <TouchableOpacity onPress={() => removeActor(a)}>
                    <Text className="text-white font-bold">×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            
            {/* Suggested Actors */}
            <Text className="text-gray-300 text-sm mb-2">Suggested actors</Text>
            <FlatList
              data={suggestedActors}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (!selectedActors.includes(item)) {
                      setSelectedActors(prev => [...prev, item]);
                    }
                  }}
                  disabled={selectedActors.includes(item)}
                  className={`px-3 py-2 mr-2 rounded-lg bg-neutral-700 ${
                    selectedActors.includes(item) ? 'opacity-50' : ''
                  }`}
                >
                  <Text className="text-white">{item}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Movies */}
            <Text className="text-white text-lg font-semibold mb-3">What movies do you like?</Text>
            <View className="flex-row items-center mb-4">
              <TextInput
                className="flex-1 bg-neutral-700 border border-neutral-600 rounded-full px-4 h-12 text-white"
                placeholder="Type a movie title..."
                placeholderTextColor="#999"
                value={movieQuery}
                onChangeText={setMovieQuery}
                onSubmitEditing={addMovie}
              />
              <TouchableOpacity
                onPress={addMovie}
                className="ml-3 bg-red-600 rounded-full px-5 h-12 justify-center shadow"
              >
                <Text className="text-white font-semibold">Add</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={selectedMovies}
              horizontal
              keyExtractor={item => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8 }}
              renderItem={({ item }) => (
                <View className="w-24 h-36 mr-3 bg-neutral-700 rounded-xl overflow-hidden shadow-sm">
                  <View className="flex-1 justify-center items-center px-1">
                    <Text className="text-center text-sm text-white">{item}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeMovie(item)}
                    className="absolute top-2 right-2 bg-neutral-800/80 rounded-full w-6 h-6 items-center justify-center shadow"
                  >
                    <Text className="text-white font-semibold">×</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListHeaderComponent={() => (
                <TouchableOpacity
                  onPress={() => {/* Modal veya galeri seçimi */}}
                  className="w-24 h-36 mr-3 border-2 border-dashed border-neutral-500 rounded-xl flex items-center justify-center"
                >
                  <Text className="text-3xl text-neutral-500">＋</Text>
                </TouchableOpacity>
              )}
            />

            {/* Suggested Movies */}
            <Text className="text-white text-lg font-semibold mt-6 mb-3">Suggested movies</Text>
            <FlatList
              data={suggestedMovies}
              horizontal
              keyExtractor={item => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (!selectedMovies.includes(item)) {
                      setSelectedMovies(prev => [...prev, item]);
                    }
                  }}
                  disabled={selectedMovies.includes(item)}
                  className={`w-32 h-48 mr-3 ${selectedMovies.includes(item) ? 'opacity-50' : ''}`}
                >
                  <View className="flex-1 bg-neutral-700 rounded-xl overflow-hidden">
                    <View className="h-28 bg-neutral-600 flex items-center justify-center">
                      <Ionicons name="film-outline" size={32} color="#aaa" />
                    </View>
                    <View className="p-2">
                      <Text className="text-white text-sm" numberOfLines={2}>{item}</Text>
                    </View>
                    {selectedMovies.includes(item) && (
                      <View className="absolute top-2 right-2 bg-red-600 rounded-full p-1">
                        <Ionicons name="checkmark" size={12} color="#fff" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View
          className={`absolute inset-x-0 bottom-0 ${
            Platform.OS === 'ios' ? 'pb-6' : 'pb-4'
          } px-6 py-3 bg-black/80 border-t border-neutral-700 flex-row justify-between`}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-neutral-700 rounded-full px-6 py-3"
          >
            <Text className="text-white font-semibold">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFinish}
            className="bg-red-600 rounded-full px-6 py-3"
          >
            <Text className="text-white font-semibold">Finish</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Background>
  );
}