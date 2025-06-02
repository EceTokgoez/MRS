import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Footer from '../components/Footer';

export default function HarmovieGoPage() {
  const navigation = useNavigation();
  const route = useRoute();

  // Dummy veri veya route üzerinden gelen veri
  const compatibilityData = route.params?.data ?? [
    { id: '1', name: 'Friend 1', percent: 93 },
    { id: '2', name: 'Friend 2', percent: 64 },
    { id: '3', name: 'Friend 3', percent: 61 },
    { id: '4', name: 'Friend 4', percent: 30 },
    { id: '5', name: 'Friend 5', percent: 15 },
  ];

  const sorted = [...compatibilityData].sort((a, b) => b.percent - a.percent);

  return (
    <View className="flex-1 bg-neutral-900">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-8 pb-4 bg-black">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-white">
          Harmovie Results
        </Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Liste */}
      <ScrollView className="px-4 pt-2">
        {sorted.map((item, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;

          return (
            <View
              key={item.id}
              className="mb-4 bg-gray-800 rounded-xl p-3 flex-row items-center"
            >
              {/* Sıralama ve taç */}
              <View className="justify-center items-center w-12">
                {isFirst && (
                  <Ionicons name="medal-outline" size={20} color="#FBBF24" className="mb-1" />
                )}
                <Text className="text-white font-bold text-lg">{rank}</Text>
              </View>

              {/* Avatar */}
              <View className="justify-center items-center w-12">
                <Ionicons name="person-circle-outline" size={48} color="white" />
              </View>

              {/* İsim, yüzdelik ve bar */}
              <View className="flex-1 ml-2">
                <Text className="text-white text-base font-semibold">
                  {item.name} ({item.percent}%)
                </Text>
                <View className="h-3 bg-gray-600 rounded-full mt-1 overflow-hidden">
                  <View
                    style={{
                      width: `${item.percent}%`,
                      height: '100%',
                      backgroundColor: '#3B82F6',
                    }}
                  />
                </View>
              </View>

              {/* Go */}
              <TouchableOpacity className="bg-blue-600 px-3 py-2 rounded-lg ml-2">
                <Text className="text-white text-sm">Go</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      <Footer activePage="harmovie" />
    </View>
  );
}
