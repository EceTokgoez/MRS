// /frontend/mobile/src/screens/Search/YearFilterScreen.js

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

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function YearFilterScreen({ navigation }) {
  const years = [
    '2025',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2010-2014',
    '2000-2009',
    '1990-1999',
    '1980-1989',
    '1970-1979',
    '1960-1969',
    '1950-1959',
    '1940-1949',
    'Before 1940',
  ];

  const renderYearItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center px-4 py-3"
      onPress={() =>
        navigation.navigate('YearResults', { yearFilter: item })
      }
    >
      <Text className="text-base text-black">{item}</Text>
      <Feather name="chevron-right" size={20} color="#555" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. Header */}
      <Header title="Search By Year" />

      {/* 2. Yıl Listesi */}
      <FlatList
        data={years}
        keyExtractor={(item) => item}
        renderItem={renderYearItem}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-200 mx-4" />}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 80,
        }}
      />

      {/* 3. Footer */}
      <Footer />
    </SafeAreaView>
);
}
