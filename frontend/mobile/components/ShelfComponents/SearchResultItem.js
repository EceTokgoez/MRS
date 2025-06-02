//ShelfComponents/SearchResultItem.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchResultItem({ item, onAddPress }) {
  const { posterUrl, title, rating, canAdd } = item;

  // rating: 0–5 arası bir sayı. Burada tam sayılara yaklaşarak yıldızları çiziyoruz.
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={`full-${i}`} name="star" size={16} color="#FFD700" style={styles.starIcon} />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" style={styles.starIcon} />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* 1. Poster Kutusu */}
      <Image
        source={{ uri: posterUrl }}
        style={styles.poster}
        resizeMode="cover"
      />

      {/* 2. Film Adı ve Yıldızlar */}
      <View style={styles.middleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
      </View>

      {/* 3. Sağda Dairesel “+” Butonu */}
      {canAdd && (
        <TouchableOpacity
          onPress={() => onAddPress(item)}
          style={styles.addButtonContainer}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1F2937', // gray-800’e yakın
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  poster: {
    width: 64,
    height: 96,
    borderRadius: 4,
    backgroundColor: '#374151', // gray-700’e yakın
  },
  middleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  starIcon: {
    marginRight: 4,
  },
  addButtonContainer: {
    backgroundColor: '#3B82F6', // Tailwind bg-blue-500
    padding: 12,                // Tailwind p-4
    borderRadius: 999,          // Tailwind rounded-full
    // Basit bir gölge (shadow-lg yerine elevation iOS/Android uyumlu):
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation:8,
},
});
