import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';

export default function FriendsScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState('friends');

  const dummyUsers = [
    { id: '1', name: 'Ali Yılmaz' },
    { id: '2', name: 'Ayşe Demir' },
    { id: '3', name: 'Mehmet Kara' },
  ];

  // const fetchFriends = async () => {
  //   const res = await axiosInstance.get('/friends');
  //   setFriends(res.data);
  // };

  // const handleSendHarmovieRequest = async (userId) => {
  //   await axiosInstance.post(`/harmovie/send`, { to: userId });
  // };

  const handleTabChange = (tab) => {
    if (tab === 'harmovie') {
      navigation.navigate('HarmoviePage');
    } else {
      setSelectedTab(tab);
    }
  };

  return (
    <View className="flex-1 bg-neutral-900 pt-10">
      <View className="flex-row items-center px-4 pb-4 bg-neutral-900">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={28} color="white" />
              </TouchableOpacity>
              <Text className="flex-1 text-center text-xl font-bold text-white">
                Friends
              </Text>
              {/* Boşluk veya başka ikonlar için Placeholder */}
              <View style={{ width: 28 }} />
            </View>
      <View className="px-4">
        {/* Header with Search and Buttons */}
        <View className="flex-row items-center mb-4">
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            className="flex-1 border border-gray-600 rounded-full px-4 py-2 text-white"
          />
          <TouchableOpacity className="ml-3">
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-around mb-4">
          <TouchableOpacity onPress={() => handleTabChange('friends')}>
            <Text className={`text-lg ${selectedTab === 'friends' ? 'text-white font-bold underline' : 'text-gray-400'}`}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabChange('harmovie')}>
            <Text className={`text-lg ${selectedTab === 'harmovie' ? 'text-white font-bold underline' : 'text-gray-400'}`}>Harmovie</Text>
          </TouchableOpacity>
        </View>

        {/* Friend List */}
        <ScrollView className="space-y-4 mb-24">
          {dummyUsers.map((user) => (
            <View
              key={user.id}
              className="flex-row items-center justify-between border border-gray-600 rounded-xl p-3"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
  <Ionicons name="person-circle-outline" size={48} color="white" />
  <Text className="text-white ml-2 text-base font-semibold">{user.name}</Text>
</View>

              </View>
              <View className="relative">
  <TouchableOpacity
    className="absolute -top-3 -right-3 z-10"
    // onPress={() => handleRemoveFriend(user.id)}
  >
    <Ionicons name="remove-circle-outline" size={20} color="red" />
  </TouchableOpacity>
  <TouchableOpacity
    className="bg-blue-600 px-2 py-2 mr-3 rounded-lg"
    // onPress={() => handleSendHarmovieRequest(user.id)}
  >
    <Text className="text-white text-sm">Send Harmovie Request</Text>
  </TouchableOpacity>
</View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Right Button (e.g. Add Friend) */}
      <TouchableOpacity
        className="absolute bottom-20 right-6 bg-pink-600 rounded-full p-4 shadow-lg"
        // onPress={() => navigation.navigate('AddFriend')}
      >
        <Ionicons name="person-add-outline" size={24} color="white" />
      </TouchableOpacity>

      <Footer activePage="friends" />
    </View>
  );
}
