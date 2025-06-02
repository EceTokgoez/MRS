// src/screens/NotificationsPage.jsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import ScreenHeader from '../components/ScreenHeader';

// Notification Item Component
const NotificationItem = ({ notification, onDecision }) => {
  const renderCountdown = (seconds) => {
    const animValue = useState(new Animated.Value(0))[0];

    useEffect(() => {
      Animated.timing(animValue, {
        toValue: 1,
        duration: seconds * 1000,
        useNativeDriver: false,
      }).start();
    }, [animValue, seconds]);

    const widthInterpolation = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['100%', '0%'],
    });

    return (
      <View className="h-1 w-full bg-gray-700 rounded">
        <Animated.View
          style={{
            width: widthInterpolation,
            height: '100%',
            backgroundColor: '#3b82f6',
            borderRadius: 4,
          }}
        />
      </View>
    );
  };

  const typeConfig = {
    harmovie: { label: 'Harmovie Request', color: 'text-indigo-400' },
    friend: { label: 'Friend Request', color: 'text-green-400' },
    group: { label: 'Group Rec. Request', color: 'text-yellow-400' },
  };

  const config = typeConfig[notification.type];

  return (
    <View className="mb-4 bg-gray-800 rounded-xl p-4">
      {config && (
        <Text className={`text-sm ${config.color} mb-2`}>
          {config.label}
        </Text>
      )}

      <View className="flex-row items-center">
        <Ionicons
          name="person-circle-outline"
          size={48}
          color="white"
        />
        <View className="ml-3 flex-1">
          <Text className="text-white text-base font-semibold">
            {notification.name}
          </Text>
          
          {notification.type === 'group' && notification.countdown && (
            <View className="mt-2">
              <Text className="text-gray-400 mb-1">
                {notification.countdown} sec left
              </Text>
              {renderCountdown(notification.countdown)}
            </View>
          )}
        </View>
        
        <View className="flex-row space-x-4">
          <TouchableOpacity
            onPress={() => onDecision(notification.id, true)}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={28}
              color="#10b981"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDecision(notification.id, false)}
          >
            <Ionicons
              name="close-circle-outline"
              size={28}
              color="#ef4444"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'harmovie',
      name: 'Ali Yılmaz',
      countdown: null,
    },
    {
      id: '2',
      type: 'friend',
      name: 'Ayşe Demir',
      countdown: null,
    },
    {
      id: '3',
      type: 'group',
      name: 'Mehmet Kara',
      countdown: 54,
    },
  ]);

  const handleDecision = (id, accept) => {
    // Backend integration would go here
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <ScreenHeader title="Notifications" />

      <ScrollView className="px-4 py-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDecision={handleDecision}
          />
        ))}

        {notifications.length === 0 && (
          <Text className="text-center text-gray-400 mt-8">
            No notifications yet.
          </Text>
        )}
      </ScrollView>

      <Footer />
    </View>
  );
}
