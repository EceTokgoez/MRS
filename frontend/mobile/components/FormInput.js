import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function FormInput({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  ...props
}) {
  return (
    <View className="w-full mb-4">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        className="bg-white rounded-lg px-4 py-3"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
      />
      {error && touched ? (
        <Text className="text-red-400 text-sm mt-1">{error}</Text>
      ) : (
        touched && <View className="h-2" />
      )}
    </View>
  );
} 