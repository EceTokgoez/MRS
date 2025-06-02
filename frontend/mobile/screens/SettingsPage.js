import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ScreenHeader from '../components/ScreenHeader';
import { useTheme } from '../contexts/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Setting Section Component
const SettingSection = ({ title, children }) => {
  const { colors } = useTheme();
  return (
    <>
      <Text className="font-semibold text-lg mb-1 mt-6" style={{ color: colors.text }}>{title}</Text>
      {children}
    </>
  );
};

// Setting Row Component
const SettingRow = ({ label, children }) => {
  const { colors } = useTheme();
  return (
    <View className="flex-row justify-between items-center mb-4">
      <Text style={{ color: colors.text }}>{label}</Text>
      {children}
    </View>
  );
};

// Setting Input Component
const SettingInput = ({ label, value, onChangeText, placeholder }) => {
  const { colors } = useTheme();
  return (
    <View className="mb-4">
      <Text className="mb-1" style={{ color: colors.text }}>{label}</Text>
      <TextInput
        className="border rounded px-3 py-2"
        style={{ 
          color: colors.text, 
          borderColor: colors.border,
          backgroundColor: colors.card 
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );
};

// Setting Picker Component
const SettingPicker = ({ label, value, onValueChange, items }) => {
  const { colors } = useTheme();
  return (
    <View className="mb-4">
      <Text className="mb-1" style={{ color: colors.text }}>{label}</Text>
      <View className="border rounded" style={{ borderColor: colors.border, backgroundColor: colors.card }}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          dropdownIconColor={colors.text}
          style={{ color: colors.text }}
        >
          {items.map(item => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

// Theme Selection Component
const ThemeSelector = () => {
  const { theme, setTheme, colors } = useTheme();
  const [showCustomModal, setShowCustomModal] = useState(false);
  
  const themeOptions = [
    { id: 'light', label: 'Light Mode', icon: 'sunny-outline' },
    { id: 'dark', label: 'Dark Mode', icon: 'moon-outline' },
    { id: 'custom', label: 'Custom Mode', icon: 'color-palette-outline' },
  ];

  return (
    <View className="mb-4">
      <Text className="mb-3" style={{ color: colors.text }}>Theme</Text>
      <View className="flex-row justify-between">
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => {
              if (option.id === 'custom') {
                setShowCustomModal(true);
              }
              setTheme(option.id);
            }}
            className={`flex-1 items-center py-3 mx-1 rounded-lg border-2`}
            style={{
              backgroundColor: theme === option.id ? colors.primary : colors.card,
              borderColor: theme === option.id ? colors.primary : colors.border,
            }}
          >
            <Ionicons 
              name={option.icon} 
              size={24} 
              color={theme === option.id ? '#ffffff' : colors.text} 
            />
            <Text 
              className="text-xs mt-1"
              style={{ color: theme === option.id ? '#ffffff' : colors.text }}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default function SettingsScreen() {
  const { colors } = useTheme();
  const [settings, setSettings] = useState({
    email: 'example@example.com',
    language: 'tr',
    emailNotif: true,
    pushNotif: true,
    friendVisibility: true,
    shelfPublic: false,
    groupSuggest: true,
  });

  const handleUpdate = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const languageOptions = [
    { label: 'Türkçe', value: 'tr' },
    { label: 'English', value: 'en' },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScreenHeader title="Settings" />
      
      <ScrollView className="px-4">
        <SettingSection title="Account">
          <SettingInput
            label="Email"
            value={settings.email}
            onChangeText={(text) => handleUpdate('email', text)}
            placeholder="Email"
          />
        </SettingSection>

        <SettingSection title="Content & Appearance">
          <ThemeSelector />
          <SettingPicker
            label="Language"
            value={settings.language}
            onValueChange={(value) => handleUpdate('language', value)}
            items={languageOptions}
          />
        </SettingSection>

        <SettingSection title="Notifications">
          <SettingRow label="Email Notifications">
            <Switch
              value={settings.emailNotif}
              onValueChange={(val) => handleUpdate('emailNotif', val)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={settings.emailNotif ? '#ffffff' : colors.textSecondary}
            />
          </SettingRow>
          <SettingRow label="Push Notifications">
            <Switch
              value={settings.pushNotif}
              onValueChange={(val) => handleUpdate('pushNotif', val)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={settings.pushNotif ? '#ffffff' : colors.textSecondary}
            />
          </SettingRow>
        </SettingSection>

        <SettingSection title="Privacy">
          <SettingRow label="Friends Can See Me">
            <Switch
              value={settings.friendVisibility}
              onValueChange={(val) => handleUpdate('friendVisibility', val)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={settings.friendVisibility ? '#ffffff' : colors.textSecondary}
            />
          </SettingRow>
          <SettingRow label="Public Shelf">
            <Switch
              value={settings.shelfPublic}
              onValueChange={(val) => handleUpdate('shelfPublic', val)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={settings.shelfPublic ? '#ffffff' : colors.textSecondary}
            />
          </SettingRow>
          <SettingRow label="Group Suggestions From Strangers">
            <Switch
              value={settings.groupSuggest}
              onValueChange={(val) => handleUpdate('groupSuggest', val)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={settings.groupSuggest ? '#ffffff' : colors.textSecondary}
            />
          </SettingRow>
        </SettingSection>

        <SettingSection title="About">
          <View className="mb-12">
            <Text style={{ color: colors.text }}>App version: 1.0.0</Text>
            <Text style={{ color: colors.text }}>© 2025 MRS App. All rights reserved.</Text>
          </View>
        </SettingSection>

        {/* Account Actions */}
        <View className="mb-16">
          <TouchableOpacity 
            className="py-3 rounded-lg items-center mb-3"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-white font-semibold">Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="border-2 py-3 rounded-lg items-center"
            style={{ borderColor: colors.error }}
          >
            <Text className="font-semibold" style={{ color: colors.error }}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
