import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader from '../components/ScreenHeader';
import FormInput from '../components/FormInput';
import useFormValidation from '../hooks/useFormValidation';

// Validation rules moved outside component
const validationRules = {
  email: {
    required: 'E-mail is required.',
    pattern: {
      test: /\S+@\S+\.\S+/,
      message: 'Enter a valid email.'
    }
  },
  password: {
    required: 'Password is required.'
  }
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    touchAll,
    isValid
  } = useFormValidation(
    { email: '', password: '' },
    validationRules
  );

  const handleLogin = () => {
    touchAll();
    if (isValid) {
      console.log('Login with', { ...values, stayLoggedIn });
      navigation.navigate('HomePage');
    }
  };

  return (
    <ScreenBackground>
      <ScreenHeader 
        title="Log in" 
        transparent={true} 
        showGradient={true} 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-center items-center px-4"
      >
        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{
            paddingVertical: 20,
            paddingBottom: 40,
            paddingTop: 120,
            justifyContent: 'center',
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Card */}
          <View className="bg-neutral-800/90 p-6 rounded-2xl w-full max-w-md">
            <Text className="text-white text-2xl font-bold mb-1">Login</Text>
            <Text className="text-gray-300 text-sm mb-6">
              Welcome back! Please sign in to continue
            </Text>

            <FormInput
              placeholder="your.email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={(text) => handleChange('email', text)}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              touched={touched.email}
            />

            <FormInput
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={(text) => handleChange('password', text)}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              touched={touched.password}
            />

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mb-4 -mt-2">
              <Text className="text-red-600 text-sm">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Stay logged in */}
            <Pressable
              className="flex-row items-center mb-6"
              onPress={() => setStayLoggedIn(!stayLoggedIn)}
            >
              <View
                className={`w-5 h-5 mr-2 border rounded-sm ${
                  stayLoggedIn ? 'bg-red-600 border-red-600' : 'border-gray-400'
                } items-center justify-center`}
              >
                {stayLoggedIn && <Text className="text-white">✓</Text>}
              </View>
              <Text className="text-gray-300">Stay logged in</Text>
            </Pressable>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={!isValid}
              className={`w-full rounded-lg py-3 items-center ${
                isValid ? 'bg-red-600' : 'bg-gray-500'
              }`}
            >
              <Text
                className={`text-lg font-semibold ${
                  isValid ? 'text-white' : 'text-gray-300'
                }`}
              >
                Login
              </Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-300">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterPage1')}>
                <Text className="text-red-600">Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}