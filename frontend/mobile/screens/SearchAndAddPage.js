import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchResultItem from '../components/ShelfComponents/SearchResultItem';
import { useNavigation } from '@react-navigation/native';

export default function SearchAndAddPage() {
  const navigation = useNavigation();

  // 1) Arama metni ve sonuç listesi state’leri
  const [searchText, setSearchText] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // 2) Örnek/dummy film verisi
  const DUMMY_MOVIES = [
    {
      id: 'm1',
      posterUrl: 'https://via.placeholder.com/100x150.png?text=The+Matrix',
      title: 'The Matrix',
      rating: 3,     // 3/5 yıldız
      canAdd: true,
    },
    {
      id: 'm2',
      posterUrl: 'https://via.placeholder.com/100x150.png?text=Inception',
      title: 'Inception',
      rating: 4,
      canAdd: true,
    },
    {
      id: 'm3',
      posterUrl: 'https://via.placeholder.com/100x150.png?text=Parasite',
      title: 'Parasite',
      rating: 5,
      canAdd: false,
    },
    {
      id: 'm4',
      posterUrl: 'https://via.placeholder.com/100x150.png?text=Interstellar',
      title: 'Interstellar',
      rating: 4,
      canAdd: true,
    },
    {
      id: 'm5',
      posterUrl: 'https://via.placeholder.com/100x150.png?text=Joker',
      title: 'Joker',
      rating: 2,
      canAdd: true,
    },
    // ... daha fazla film ekleyebilirsiniz
  ];

  // 3) useEffect ile başlangıçta tüm filmleri ayarla
  useEffect(() => {
    setAllMovies(DUMMY_MOVIES);
    setFilteredMovies([]); // Arama kutusu boşken liste boş
  }, []);

  // 4) Arama metni her değiştiğinde filtrele
  useEffect(() => {
    const text = searchText.trim().toLowerCase();
    if (text.length > 0) {
      const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(text)
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]); // Arama kutusu boşsa gösterme
    }
  }, [searchText, allMovies]);

  // 5) “+” butonuna basıldığında film ekleme
  const handleAddMovie = (movie) => {
    console.log('Film ekleniyor:', movie.id);
    // Burada ilgili listeye ekleme işlemi (API veya state yönetimi) yapılabilir
    // Örneğin: navigation.goBack();
  };

  // 6) FlatList item render fonksiyonu
  const renderItem = ({ item }) => (
    <SearchResultItem
      item={item}
      onAddPress={handleAddMovie}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Başlık Çubuğu */}
      <View style={styles.headerContainer}>
        {/* Geri Ok */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        {/* Arama Kutusu */}
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#555"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Sağda boş bir View (buton yok) */}
        <View style={styles.rightSpacer} />
      </View>

      {/* Arama Sonuçları Listesi */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          searchText.length > 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found.</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Start typing to search...</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 8,
    backgroundColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2D3748', // gray-800
  },
  backButton: {
    padding: 8,
  },
  searchBoxContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937', // gray-800
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    paddingVertical: 0,
  },
  rightSpacer: {
    width: 40,
  },
  listContent: {
    padding: 12,
    paddingBottom: 20,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6B7280', // gray-500
    fontSize:16,
},
});
