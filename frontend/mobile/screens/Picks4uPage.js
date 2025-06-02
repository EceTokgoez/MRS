// /screens/Picks4uPage.jsx
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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Picks4uPage() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('RecommendationTypePage');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* 1. Header (totally black) */}
      <View className="h-12 bg-black justify-center items-center border-b border-gray-800">
        <Text className="text-white text-lg font-bold">Picks4u</Text>
      </View>

      {/* 2. Glass-like Card */}
      <View style={styles.glassWrapper}>
        <View style={styles.glassContainer}>
          {/* 2A. Info Text (English, centered) */}
          <Text style={styles.infoText}>
            Discover movies hand-picked by AI.{'\n'}
            Let us find the perfect film for you!
          </Text>
        </View>
        {/* 2B. “Get Started” Button (outside glass, below) */}
        <TouchableOpacity onPress={handleGetStarted} activeOpacity={0.85} style={styles.getStartedButtonWrapper}>
          <LinearGradient
            colors={['#a21caf', '#6366f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.getStartedButton}
          >
            <Ionicons name="rocket-outline" size={24} color="#FFF" />
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 3. Footer */}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000', // full black background
  },
  /* --- Header --- */
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#111',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  rightSpacer: {
    width: 40,
  },

  /* --- Glass-like Container Wrapper --- */
  glassWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  glassContainer: {
    width: width - 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.13)', // beyazımsı cam efekti
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.30)',     // beyazımsı border
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 12,
    marginBottom: 24, // buton ile araya boşluk
  },

  /* --- Info Text --- */
  infoText: {
    color: '#FFF',
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 32,
  },

  /* --- “Get Started” Gradient Button (outside glass) --- */
  getStartedButtonWrapper: {
    alignSelf: 'center',
    width: width - 80,
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 0,
    marginBottom: 12,
    elevation: 8,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing:0.5,
},
});
