// /screens/IndividualRecommendationPage.jsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function IndividualRecommendationPage() {
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMakeList = () => {
    console.log('Selected mood:', selectedMood);
    // Burada AI tabanlı liste oluşturma işlevini çağırabilirsiniz.
    // Örneğin: navigation.navigate('GeneratedList', { mood: selectedMood });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Üst Kısım: Profil Avatar ve Kullanıcı Bilgisi */}
      <View style={styles.profileContainer}>
        {/* Örnek Avatar, kendi icon veya resminizle değiştirebilirsiniz */}
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person-circle-outline" size={64} color="#CCC" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Mr. Seeger</Text>
          <Text style={styles.userDetails}>Favorites: Comedy</Text>
        </View>
      </View>

      {/* Mood Sorusu */}
      <View style={styles.moodContainer}>
        <Text style={styles.moodQuestion}>How are you today?</Text>

        <View style={styles.moodOptions}>
          {/* Happy */}
          <TouchableOpacity
            style={[
              styles.moodCircle,
              { backgroundColor: '#FFD54F' }, // Sarı
              selectedMood === 'happy' && styles.moodSelected,
            ]}
            onPress={() => setSelectedMood('happy')}
          >
            <Text style={styles.moodEmoji}>😀</Text>
          </TouchableOpacity>

          {/* Neutral */}
          <TouchableOpacity
            style={[
              styles.moodCircle,
              { backgroundColor: '#B0BEC5' }, // Gri
              selectedMood === 'neutral' && styles.moodSelected,
            ]}
            onPress={() => setSelectedMood('neutral')}
          >
            <Text style={styles.moodEmoji}>😐</Text>
          </TouchableOpacity>

          {/* Sad */}
          <TouchableOpacity
            style={[
              styles.moodCircle,
              { backgroundColor: '#81D4FA' }, // Mavi
              selectedMood === 'sad' && styles.moodSelected,
            ]}
            onPress={() => setSelectedMood('sad')}
          >
            <Text style={styles.moodEmoji}>😞</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* “Make List” Butonu */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={handleMakeList}
          activeOpacity={0.8}
          style={[
            styles.makeListButton,
            !selectedMood && styles.buttonDisabled,
          ]}
          disabled={!selectedMood}
        >
          <Text style={styles.makeListText}>Make List</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const circleSize = Math.floor(width / 5);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Siyah arka plan
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  /* Profil Bölümü */
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  userDetails: {
    color: '#BBB',
    fontSize: 14,
    marginTop: 4,
  },

  /* Mood Sorusu */
  moodContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  moodQuestion: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  moodCircle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodSelected: {
    borderWidth: 3,
    borderColor: '#FFF',
  },

  /* “Make List” Butonu */
  buttonWrapper: {
    alignItems: 'center',
  },
  makeListButton: {
    backgroundColor: '#3B82F6', // Tailwind bg-blue-500
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 32,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#555', // Seçim yokken koyu gri
    elevation: 0,
  },
  makeListText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight:'600',
},
});
