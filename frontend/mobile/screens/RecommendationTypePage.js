// /screens/RecommendationTypePage.jsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function RecommendationTypePage() {
  const navigation = useNavigation();

  const handleIndividual = () => {
    navigation.navigate('IndividualRecommendationPage');

  };

  const handleGroup = () => {
    console.log('Group recommendation seçildi');
    // Burada grup tavsiyesi akışını başlatabilirsiniz
    // Ör. navigation.navigate('GroupRecResults');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Başlık */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Choose Recommendation Type</Text>
      </View>

      {/* Soru Metni */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          Would you like an <Text style={styles.boldText}>Individual</Text> or <Text style={styles.boldText}>Group</Text> recommendation?
        </Text>
      </View>

      {/* Butonlar */}
      <View style={styles.buttonsContainer}>
        {/* Individual Butonu */}
        <TouchableOpacity
          onPress={handleIndividual}
          style={styles.buttonWrapper}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#FF8A00', '#E52E71']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Individual</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Group Butonu */}
        <TouchableOpacity
          onPress={handleGroup}
          style={styles.buttonWrapper}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#00C9FF', '#92FE9D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Group</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000', // siyah arka plan
  },
  /* Başlık */
  headerContainer: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
    backgroundColor: '#000',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },

  /* Soru Metni */
  questionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  questionText: {
    color: '#DDD',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
  },
  boldText: {
    color: '#FFF',
    fontWeight: '700',
  },

  /* Butonlar Konteyneri */
  buttonsContainer: {
    marginTop: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: width - 80, // kenarlardan 40 birim boşluk
    borderRadius: 28,
    overflow: 'hidden',
    marginVertical: 12,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight:'600',
},
});
