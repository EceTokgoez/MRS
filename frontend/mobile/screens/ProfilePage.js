import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';

const AVATAR_SIZE = 60;
const ITEM_SHELF_WIDTH = 80;
const ITEM_SHELF_HEIGHT = 100;

export default function ProfileScreen() {
  const navigation = useNavigation();

  const friendsData = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];

  const shelfData = [
    { id: 'a', label: 'Text 1' },
    { id: 'b', label: 'Text 2' },
    { id: 'c', label: 'Text 3' },
    { id: 'd', label: 'Text 4' },
  ];

  return (
    <View className="flex-1 bg-neutral-900 ">
      {/* 1. Geri Oku ve Başlık */}
      <View className="flex-row items-center px-4 pt-8 pb-4 bg-neutral-900">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={28} color="white" />
              </TouchableOpacity>
              <Text className="flex-1 text-center text-xl font-bold text-white">
                Profile
              </Text>
              {/* Boşluk veya başka ikonlar için Placeholder */}
              <View style={{ width: 28 }} />
            </View>
      

      {/* Placeholder Profile Image */}
      <View className="items-center mt-6 mb-4">
        <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center">
          <Ionicons name="person-outline" size={48} color="#888" />
        </View>
        <Text className="text-lg font-semibold mt-3 text-white">Your Name</Text>
      </View>
        


      {/* 3. Ayarlar (Settings) */}
      <TouchableOpacity
        className="flex-row items-center px-6 py-3 border border-gray-300 rounded-lg mb-6 mx-4"
        onPress={() => navigation.navigate('SettingsPage')}
      >
        <Ionicons name="settings-outline" size={24} color="#fff" />
        <Text className="text-base ml-2 text-white">Settings</Text>
      </TouchableOpacity>

      {/* 4. Friends */}
      <View className="px-4 mb-6">
        <Text className="text-lg font-semibold mb-2 text-white">Friends:</Text>
        <FlatList
          horizontal
          data={friendsData}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
          renderItem={() => (
            <View className="mr-4 items-center">
              <Ionicons
                name="person-circle-outline"
                size={AVATAR_SIZE}
                color="#bbb"
              />
            </View>
          )}
        />
      </View>

      {/* 5. My Shelf */}
      <View className="px-4 mb-6 flex-1">
        <Text className="text-lg font-semibold mb-2 text-white">My Shelf:</Text>
        <FlatList
          horizontal
          data={shelfData}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
          renderItem={({ item }) => (
            <View
              className="mr-4 items-center justify-center border border-gray-400 rounded-lg"
              style={{
                width: ITEM_SHELF_WIDTH,
                height: ITEM_SHELF_HEIGHT,
              }}
            >
              <Text className="text-sm text-white">{item.label}</Text>
            </View>
          )}
        />
      </View>

      <Footer />
    </View>
  );
}
