// /components/ShelfComponents/AddButton.jsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-20 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
    >
      <Ionicons name="add" size={28} color="white" />
    </TouchableOpacity>);
}