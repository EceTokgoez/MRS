import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import PodiumChart from '../components/PodiumChart';  // PodiumChart bileşeni
import Footer from '../components/Footer';
import axiosInstance from '../lib/axiosInstance';  // Backend için axios

export default function HarmoviePage() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [subTab, setSubTab] = useState('requests');

  // -----------------------------
  // DUMMY DATA: Uyum Yüzdeleri
  // -----------------------------
  const [compatibilityData] = useState([
    { id: '1', name: 'Friend 1', percent: 65 },
    { id: '2', name: 'Friend 2', percent: 70 },
    { id: '3', name: 'Friend 3', percent: 82 },
    { id: '4', name: 'Friend 4', percent: 74 },
    { id: '5', name: 'Friend 5', percent: 59 },
  ]);

  /*
  // Backend'ten veri çekmek için aşağıdaki hali kullan:
  const [compatibilityData, setCompatibilityData] = useState([]);
  useEffect(() => {
    const fetchCompatibility = async () => {
      try {
        const res = await axiosInstance.get('/user/compatibility');
        setCompatibilityData(res.data.compatibility);
      } catch (err) {
        console.error('Uyum verisi alınamadı:', err);
        setCompatibilityData([]);
      }
    };
    fetchCompatibility();
  }, []);
  */

  // -----------------------------
  // DUMMY DATA: Harmovie İstek & Yanıt Listesi
  // -----------------------------
  const [requestsData] = useState([
    { id: 'r1', name: 'Ali Yılmaz' },
    { id: 'r2', name: 'Ayşe Demir' },
  ]);
  const [responsesData] = useState([
    { id: 'p1', name: 'Mehmet Kara' },
    { id: 'p2', name: 'Selin Yıldız' },
  ]);

  /*
  // Backend'ten istek/yanıt verisi çekmek:
  const [requestsData, setRequestsData] = useState([]);
  const [responsesData, setResponsesData] = useState([]);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get('/harmovie/requests');
        setRequestsData(res.data.requests);
      } catch (err) {
        console.error('Requests alınamadı:', err);
      }
    };
    const fetchResponses = async () => {
      try {
        const res = await axiosInstance.get('/harmovie/responses');
        setResponsesData(res.data.responses);
      } catch (err) {
        console.error('Responses alınamadı:', err);
      }
    };
    fetchRequests();
    fetchResponses();
  }, []);
  */

  // -----------------------------
  // Karar Alma Fonksiyonu (Kabul/Reddet)
  // -----------------------------
  const handleDecision = async (id, accept) => {
    // accept === true  → kabul
    // accept === false → reddet
    console.log(accept ? `Accepted ${id}` : `Rejected ${id}`);

    /*
    // Backend'e karar gönderme örneği:
    try {
      if (accept) {
        await axiosInstance.post(`/harmovie/${id}/accept`);
      } else {
        await axiosInstance.post(`/harmovie/${id}/reject`);
      }
      // İsteği başarıyla işledikten sonra ilgili ID'yi state'ten çıkar:
      setRequestsData(prev => prev.filter(r => r.id !== id));
      setResponsesData(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Karar gönderilemedi:', err);
    }
    */
  };

  return (
    <View className="flex-1 bg-neutral-900">
      {/* 1. HEADER (Geri Oku + Başlık) */}
      <View className="flex-row items-center px-4 pt-8 pb-4 bg-neutral-900">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-white">
          Harmovie
        </Text>
        <View style={{ width: 28 }} />
      </View>

      {/* 2. SCROLLVIEW BAŞLANGICI */}
      <ScrollView className="px-4">
        {/* 2.1. Search + Ayarlar */}
        <View className="flex-row items-center mb-4">
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            className="flex-1 border border-gray-600 rounded-full px-4 py-2 text-white"
          />
          
        </View>

        {/* 2.2. Sekmeler: Friends / Harmovie */}
        <View className="flex-row justify-around mb-4">
          <TouchableOpacity onPress={() => navigation.navigate('FriendsPage')}>
            <Text className="text-gray-400 text-lg">Friends</Text>
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg underline">
            Harmovie
          </Text>
        </View>

        {/* 2.3. PodiumChart (Dummy veri ile) */}
        <PodiumChart data={compatibilityData} />

        {/* 2.4. “Go” Butonu */}
        <View className="items-center mb-8">
            <TouchableOpacity
              className="bg-blue-600 px-8 py-2 rounded-lg"
              onPress={() =>
                navigation.navigate('HarmovieGoPage', {
                  data: compatibilityData, // İstersen parametre olarak da geçebilirsin
                })
              }
            >
              <Text className="text-white font-semibold">Go</Text>
            </TouchableOpacity>
        </View>

        {/* 2.5. Alt Sekmeler: Requests / Responses */}
        <View className="flex-row justify-around mb-4">
          <TouchableOpacity onPress={() => setSubTab('requests')}>
            <Text
              className={`text-lg ${
                subTab === 'requests' ? 'text-white font-bold underline' : 'text-gray-400'
              }`}>
              Requests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSubTab('responses')}>
            <Text
              className={`text-lg ${
                subTab === 'responses' ? 'text-white font-bold underline' : 'text-gray-400'
              }`}>
              Responses
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2.6. Requests Listesi (Dummy) */}
        {subTab === 'requests' &&
          requestsData.map((r) => (
            <View
              key={r.id}
              className="flex-row items-center justify-between bg-gray-800 rounded-xl p-3 mb-4"
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="person-circle-outline"
                  size={40}
                  color="white"
                />
                <Text className="text-white ml-3 text-base font-semibold">
                  {r.name}
                </Text>
              </View>
              <View className="flex-row space-x-4">
                <TouchableOpacity onPress={() => handleDecision(r.id, true)}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={28}
                    color="#10b981"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDecision(r.id, false)}>
                  <Ionicons
                    name="close-circle-outline"
                    size={28}
                    color="#ef4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}

        {/* 2.7. Responses Listesi (Dummy) */}
        {subTab === 'responses' &&
          responsesData.map((r) => (
            <View
              key={r.id}
              className="flex-row items-center justify-between bg-gray-800 rounded-xl p-3 mb-4"
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="person-circle-outline"
                  size={40}
                  color="white"
                />
                <Text className="text-white ml-3 text-base font-semibold">
                  {r.name}
                </Text>
              </View>
              <View className="flex-row space-x-4">
                <TouchableOpacity onPress={() => handleDecision(r.id, true)}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={28}
                    color="#10b981"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDecision(r.id, false)}>
                  <Ionicons
                    name="close-circle-outline"
                    size={28}
                    color="#ef4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>

      {/* 3. Floating Buton (Yeni İstek Ekleme) */}
      <TouchableOpacity
        className="absolute bottom-20 right-6 bg-pink-600 rounded-full p-4 shadow-lg"
        // onPress={() => navigation.navigate('NewHarmovieRequest')}
      >
        <Ionicons name="people-outline" size={24} color="white" />
      </TouchableOpacity>

      {/* 4. FOOTER */}
      <Footer activePage="harmovie" />
    </View>
  );
}
