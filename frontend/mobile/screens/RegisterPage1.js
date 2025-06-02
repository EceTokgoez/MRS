// screens/RegisterStep1.js
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ScreenBackground from '../components/ScreenBackground'
import ScreenHeader from '../components/ScreenHeader'
import FormInput from '../components/FormInput'
import StepIndicator from '../components/StepIndicator'
import useFormValidation from '../hooks/useFormValidation'

// Validation rules moved outside component
const validationRules = {
  email: {
    required: 'E-posta zorunlu.',
    pattern: {
      test: /\S+@\S+\.\S+/,
      message: 'Geçerli e-posta girin.'
    }
  },
  password: {
    required: 'Şifre zorunlu.',
    minLength: {
      value: 6,
      message: 'En az 6 karakter girin.'
    }
  },
  confirm: {
    required: 'Tekrar şifre zorunlu.',
    custom: (value, allValues) => {
      if (value !== allValues.password) {
        return 'Şifreler eşleşmiyor.'
      }
      return null
    }
  }
}

export default function RegisterStep1() {
  const navigation = useNavigation()
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [termsError, setTermsError] = useState('')

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    touchAll,
    isValid: formIsValid
  } = useFormValidation(
    { email: '', password: '', confirm: '' },
    validationRules
  )

  const canContinue = formIsValid && agreeTerms

  const handleNext = () => {
    touchAll()
    if (!agreeTerms) {
      setTermsError('KVKK onayı gereklidir.')
    }
    if (canContinue) {
      navigation.navigate('RegisterPage2', { 
        email: values.email, 
        password: values.password 
      })
    }
  }

  return (
    <ScreenBackground>
      <ScreenHeader 
        title="Create Account" 
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
            paddingTop: 70,
            justifyContent: 'center',
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Card */}
          <View className="bg-neutral-800/90 p-6 rounded-2xl w-full max-w-md">
            <Text className="text-white text-2xl font-bold mb-1">
              Create Account
            </Text>
            <Text className="text-gray-300 text-sm mb-6">
              Step 1 of 3: Set up your login details
            </Text>

            <FormInput
              placeholder="Email"
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
            
            <FormInput
              placeholder="Confirm Password"
              secureTextEntry
              value={values.confirm}
              onChangeText={(text) => handleChange('confirm', text)}
              onBlur={() => handleBlur('confirm')}
              error={errors.confirm}
              touched={touched.confirm}
            />

            {/* Terms */}
            <Pressable
              className="flex-row items-center mb-4"
              onPress={() => {
                setAgreeTerms(v => !v)
                setTermsError('')
              }}
            >
              <View
                className={`w-5 h-5 mr-2 border rounded-sm ${
                  agreeTerms
                    ? 'bg-red-600 border-red-600'
                    : 'border-gray-400'
                } items-center justify-center`}
              >
                {agreeTerms && <Text className="text-white">✓</Text>}
              </View>
              <Text className="text-gray-300">
                I agree to the{' '}
                <Text className="text-red-600 underline">Terms & Privacy Policy</Text>
              </Text>
            </Pressable>
            {termsError && (
              <Text className="text-red-400 text-sm mb-4">
                {termsError}
              </Text>
            )}

            {/* Next Button */}
            <TouchableOpacity
              onPress={handleNext}
              disabled={!canContinue}
              className={`w-full rounded-lg py-3 items-center ${
                canContinue ? 'bg-red-600' : 'bg-gray-500'
              }`}
            >
              <Text
                className={`text-lg font-semibold ${
                  canContinue ? 'text-white' : 'text-gray-300'
                }`}
              >
                Next
              </Text>
            </TouchableOpacity>

            {/* Step Indicator */}
            <StepIndicator currentStep={1} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  )
}