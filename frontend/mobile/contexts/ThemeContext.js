import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

// Theme configurations - Component dışına taşındı
const THEMES = {
  light: {
    primary: '#dc2626',
    secondary: '#2563eb',
    background: '#ffffff',
    card: '#f3f4f6',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    footer: '#ffffff',
    footerText: '#111827',
    footerActive: '#dc2626',
  },
  dark: {
    primary: '#ef4444',
    secondary: '#3b82f6',
    background: '#111827',
    card: '#1f2937',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    border: '#374151',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    footer: '#000000',
    footerText: '#ffffff',
    footerActive: '#3b82f6',
  },
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // 'light', 'dark', 'custom'
  const [customColors, setCustomColors] = useState({
    primary: '#ef4444',
    secondary: '#3b82f6',
    background: '#111827',
    card: '#1f2937',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    border: '#374151',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    footer: '#000000',
    footerText: '#ffffff',
    footerActive: '#3b82f6',
  });

  // Load theme from AsyncStorage
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedColors = await AsyncStorage.getItem('customColors');
      
      if (savedTheme) setTheme(savedTheme);
      if (savedColors) setCustomColors(JSON.parse(savedColors));
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const saveCustomColors = async (colors) => {
    try {
      await AsyncStorage.setItem('customColors', JSON.stringify(colors));
      setCustomColors(colors);
    } catch (error) {
      console.error('Error saving custom colors:', error);
    }
  };

  // Memoize current theme colors
  const currentThemeColors = useMemo(() => {
    if (theme === 'custom') {
      return customColors;
    }
    return THEMES[theme] || THEMES.dark;
  }, [theme, customColors]);

  // Memoize context value
  const contextValue = useMemo(() => ({
    theme,
    setTheme: saveTheme,
    colors: currentThemeColors,
    customColors,
    setCustomColors: saveCustomColors,
  }), [theme, currentThemeColors, customColors]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}; 