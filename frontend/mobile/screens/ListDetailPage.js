// /screens/ListDetailPage.jsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import FilmCard from '../components/ShelfComponents/FilmCard';
import AddButton from '../components/ShelfComponents/AddButton';

export default function ListDetailPage() {
  const navigation = useNavigation();
  const route = useRoute();

  // route.params ile gelen değerleri alalım
  const listName = route.params?.listName ?? 'Untitled List';
  const visibility = route.params?.visibility ?? 'Private (only me)';
  const movies = route.params?.movies ?? []; // Film dizisi

  // “Grant” butonu tıklanınca
  const handleGrantOption = () => {
    console.log('Grant option gösterildi');
    // Burada modal/ayrıntılı izin ayarlarını açabilirsiniz
  };

  // FilmCard’a tıklanınca
  const handleCardPress = (movie) => {
    console.log('FilmCard tıklandı:', movie.id);
    // Örn: navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  // FilmCard içindeki üç nokta menüsü tıklanınca
  const handleCardMenu = (movie) => {
    console.log('FilmCard menü tıklandı:', movie.id);
    // Örn: “Edit / Remove” gibi seçenekler
  };

  // Yüzen “+” butonu tıklanınca
  const handleAddMovie = () => {
    navigation.navigate('SearchAndAdd');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* 1. Başlık Çubuğu */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{listName}</Text>

        <TouchableOpacity
          onPress={() => console.log('Üç nokta menü tıklandı')}
          style={styles.moreButton}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* 2. Visibility + Grant Butonu */}
      <View style={styles.visibilityContainer}>
        <Text style={styles.visibilityText}>{visibility}</Text>
        <TouchableOpacity
          onPress={handleGrantOption}
          style={styles.grantButton}
        >
          <Text style={styles.grantButtonText}>Show Grant Option</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      {/* 3. Film Kartları */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <FilmCard
              posterUrl={item.poster}
              genre={item.genre}
              name={item.name}
              onPress={() => handleCardPress(item)}
              onMenuPress={() => handleCardMenu(item)}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* 4. Sağ Alt Yüzen “+” Butonu */}
      <AddButton onPress={handleAddMovie} />
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
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2D3748',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  moreButton: {
    padding: 8,
  },
  visibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1F2937',
  },
  visibilityText: {
    flex: 1,
    color: '#D1D5DB',
    fontSize: 14,
  },
  grantButton: {
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  grantButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#4B5563',
  },
  cardWrapper: {
    alignItems: 'center',
    marginVertical: 12,
  },
  listContent: {
    paddingBottom:100,
},
});
