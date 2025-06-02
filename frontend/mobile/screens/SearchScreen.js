// /frontend/mobile/src/screens/SearchScreen.js

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Footer from '../components/Footer';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = React.useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* 1. Arama Çubuğu */}
        <View className="flex-row items-center bg-gray-200 mx-4 mt-2 px-3 py-2 rounded-lg">
          <Feather name="search" size={20} color="#555" />
          <TextInput
            className="ml-2 flex-1 text-base text-black p-0 h-6"
            placeholder="Find movies, cast, friends.."
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={() =>
              navigation.navigate('SearchResults', { query })
            }
          />
        </View>

        {/* 2. "Search by" Başlığı */}
        <Text className="mt-6 ml-4 text-lg font-semibold text-black">
          Search by
        </Text>

        {/* 3. Filtre Satırları */}
        <ScrollView className="mt-2" keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300"
            onPress={() => navigation.navigate('GenreFilter')}
          >
            <Text className="text-base text-black">GENRE</Text>
            <Feather name="chevron-right" size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300"
            onPress={() => navigation.navigate('LanguageFilter')}
          >
            <Text className="text-base text-black">LANGUAGE</Text>
            <Feather name="chevron-right" size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300"
            onPress={() => navigation.navigate('YearFilter')}
          >
            <Text className="text-base text-black">RELEASE YEAR</Text>
            <Feather name="chevron-right" size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300"
            onPress={() => navigation.navigate('PopularFilter')}
          >
            <Text className="text-base text-black">POPULAR</Text>
            <Feather name="chevron-right" size={20} color="#555" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 4. Footer */}
      <Footer />
    </SafeAreaView>
  );
}



