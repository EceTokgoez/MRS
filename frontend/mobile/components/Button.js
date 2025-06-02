import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  className = '',
  textClassName = '',
  ...props 
}) {
  const variants = {
    primary: {
      button: disabled ? 'bg-gray-500' : 'bg-red-600',
      text: disabled ? 'text-gray-300' : 'text-white'
    },
    outline: {
      button: 'border border-red-600',
      text: 'text-red-500'
    },
    secondary: {
      button: 'bg-neutral-700',
      text: 'text-white'
    },
    danger: {
      button: 'bg-red-600',
      text: 'text-white'
    }
  };

  const variant_styles = variants[variant] || variants.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`rounded-lg py-3 items-center ${variant_styles.button} ${className}`}
      {...props}
    >
      <Text className={`font-semibold ${variant_styles.text} ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
} 