// /screens/AddNewListPage.jsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddButton from '../components/ShelfComponents/AddButton';


export default function AddNewListPage({ navigation }) {
  // 1) State: Liste adı ve görünürlük seçeneği
  const [listName, setListName] = useState('');
  const [visibility, setVisibility] = useState('private'); 
  
  // Olası değerler: 'private' | 'public' | 'friends'

  // 2) Kaydet butonuna basıldığında çalışacak fonksiyon
  const handleSave = () => {
    if (listName.trim() === '') {
      // Eğer liste adı boşsa, hata gösterebilirsiniz.
      // Örneğin Toast veya Alert
      alert('Lütfen bir liste adı girin.');
      return;
    }
    // Burada API kaydetme veya state’e ekleme işlemi yapılır.
    console.log('Yeni liste kaydediliyor:', { listName, visibility });
    // Kayıt işleminden sonra geri dön:
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Durum Çubuğu */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* 1. Üst Başlık Çubuğu */}
      <View className="flex-row items-center justify-between h-12 px-4 bg-black border-b border-gray-800">
        {/* Sol: “X” (iptal) ikonu */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>

        {/* Ortada: Başlık */}
        <Text className="text-white text-lg font-semibold">New List</Text>

        {/* Sağ: “✓” (kaydet) ikonu */}
        <TouchableOpacity
          onPress={handleSave}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="checkmark" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* 2. Form Alanları */}
      <View className="px-4 py-6 bg-black flex-1">
        {/* 2.1. List Name (Liste Adı) */}
        <Text className="text-gray-300 text-base mb-2">List name</Text>
        <TextInput
          value={listName}
          onChangeText={setListName}
          placeholder="Enter list name"
          placeholderTextColor="#555"
          className="text-white text-lg pb-1 border-b border-gray-600 mb-8"
          // Underline (border-b) koyduk ve renk olarak gri ton verdik.
        />

        {/* 2.2. Visibility (Görünürlük) */}
        <Text className="text-gray-300 text-base mb-2">Visibility</Text>
        <View className="flex-row justify-between mb-8">
          {/* Private */}
          <TouchableOpacity
            onPress={() => setVisibility('private')}
            className={`flex-1 py-3 mr-2 rounded-lg items-center ${
              visibility === 'private' ? 'bg-blue-600' : 'bg-gray-800'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                visibility === 'private' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Private
            </Text>
            {visibility === 'private' && (
              <Text className="text-xs text-gray-200 mt-1">
                Only me
              </Text>
            )}
          </TouchableOpacity>

          {/* Public */}
          <TouchableOpacity
            onPress={() => setVisibility('public')}
            className={`flex-1 py-3 mx-2 rounded-lg items-center ${
              visibility === 'public' ? 'bg-blue-600' : 'bg-gray-800'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                visibility === 'public' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Public
            </Text>
            {visibility === 'public' && (
              <Text className="text-xs text-gray-200 mt-1">
                Everyone
              </Text>
            )}
          </TouchableOpacity>

          {/* Friends */}
          <TouchableOpacity
            onPress={() => setVisibility('friends')}
            className={`flex-1 py-3 ml-2 rounded-lg items-center ${
              visibility === 'friends' ? 'bg-blue-600' : 'bg-gray-800'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                visibility === 'friends' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Friends
            </Text>
            {visibility === 'friends' && (
              <Text className="text-xs text-gray-200 mt-1">
                Only friends
              </Text>
            )}
          </TouchableOpacity>
        </View>


        {/* Şimdiye kadar form alanlarından sonra boşluk kaldıysa alt kısımda başka öğe yok */}
      </View>
      <AddButton
        onPress={() => {
          navigation.navigate('SearchAndAddPage');
        }}
      />
    </SafeAreaView>
);
}
