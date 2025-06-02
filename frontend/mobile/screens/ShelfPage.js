// /screens/ShelfPage.jsx
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TabBar from '../components/ShelfComponents/TabBar';
import MyShelf from '../components/ShelfComponents/MyShelf';
import CommonShelf from '../components/ShelfComponents/CommonShelf';
import AddButton from '../components/ShelfComponents/AddButton';
import Footer from '../components/Footer';

export default function ShelfPage() {
  const [activeTab, setActiveTab] = useState('my');
  const navigation = useNavigation();

  // Örnek veri: listelerin içindeki her “movie” array’i artık poster/genre/name içeriyor
  const DUMMY_MY_LISTS = [
    {
      id: 'l1', title: 'Watchlist',
      movies: [
        { id: 'm1', poster: 'https://via.placeholder.com/100.png?text=A', genre: 'Action', name: 'Movie A' },
        { id: 'm2', poster: 'https://via.placeholder.com/100.png?text=B', genre: 'Drama', name: 'Movie B' },
        { id: 'm3', poster: 'https://via.placeholder.com/100.png?text=C', genre: 'Comedy', name: 'Movie C' },
        { id: 'm4', poster: 'https://via.placeholder.com/100.png?text=D', genre: 'Horror', name: 'Movie D' },
      ],
    },
    {
      id: 'l2', title: 'Favorites',
      movies: [
        { id: 'm5', poster: 'https://via.placeholder.com/100.png?text=E', genre: 'Sci-Fi', name: 'Movie E' },
        { id: 'm6', poster: 'https://via.placeholder.com/100.png?text=F', genre: 'Thriller', name: 'Movie F' },
        { id: 'm7', poster: 'https://via.placeholder.com/100.png?text=G', genre: 'Romance', name: 'Movie G' },
      ],
    },
    {
      id: 'l3', title: 'To Watch',
      movies: [
        { id: 'm8', poster: 'https://via.placeholder.com/100.png?text=H', genre: 'Action', name: 'Movie H' },
        { id: 'm9', poster: 'https://via.placeholder.com/100.png?text=I', genre: 'Drama', name: 'Movie I' },
        { id: 'm10', poster: 'https://via.placeholder.com/100.png?text=J', genre: 'Comedy', name: 'Movie J' },
        { id: 'm11', poster: 'https://via.placeholder.com/100.png?text=K', genre: 'Horror', name: 'Movie K' },
        { id: 'm12', poster: 'https://via.placeholder.com/100.png?text=L', genre: 'Sci-Fi', name: 'Movie L' },
      ],
    },
  ];

  const DUMMY_COMMON_LISTS = [
    {
      id: 'c1', title: "Editor's Picks",
      movies: [
        { id: 'm101', poster: 'https://via.placeholder.com/100.png?text=1', genre: 'Fantasy', name: 'Movie 1' },
        { id: 'm102', poster: 'https://via.placeholder.com/100.png?text=2', genre: 'Western', name: 'Movie 2' },
        { id: 'm103', poster: 'https://via.placeholder.com/100.png?text=3', genre: 'Animation', name: 'Movie 3' },
      ],
    },
    {
      id: 'c2', title: 'Group Favorites',
      movies: [
        { id: 'm104', poster: 'https://via.placeholder.com/100.png?text=4', genre: 'Crime', name: 'Movie 4' },
        { id: 'm105', poster: 'https://via.placeholder.com/100.png?text=5', genre: 'Adventure', name: 'Movie 5' },
        { id: 'm106', poster: 'https://via.placeholder.com/100.png?text=6', genre: 'Mystery', name: 'Movie 6' },
        { id: 'm107', poster: 'https://via.placeholder.com/100.png?text=7', genre: 'Documentary', name: 'Movie 7' },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      {/* StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* 1. Üst Kısım: “Shelf” Başlığı */}
      <View className="h-12 bg-black justify-center items-center border-b border-gray-800">
        <Text className="text-white text-lg font-bold">Shelf</Text>
      </View>

      {/* 2. TabBar */}
      <TabBar
        tabs={[
          { key: 'my', label: 'My Lists' },
          { key: 'common', label: 'Common Lists' },
        ]}
        activeKey={activeTab}
        onTabPress={setActiveTab}
      />

      {/* 3. İçerik Bölgesi */}
      <View style={{ flex: 1 }} className="bg-black">
        {activeTab === 'my' ? (
          <MyShelf lists={DUMMY_MY_LISTS} />
        ) : (
          <CommonShelf lists={DUMMY_COMMON_LISTS} />
        )}
      </View>

      {/* 4. “+” Butonu (Footer’ın üstünde) */}
      <AddButton
        onPress={() => {
          navigation.navigate('AddNewListPage');
        }}
      />

      {/* 5. Footer Navigation */}
      <Footer />
    </SafeAreaView>
  );
}
