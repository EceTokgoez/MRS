// screens/RegisterPage2.js
import React, { useState, useEffect } from 'react'
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native'
import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import MaskInput from 'react-native-mask-input'

const Background = styled(ImageBackground)

export default function RegisterPage2() {
  const navigation = useNavigation()

  // form state
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')

  // touched flags
  const [touched, setTouched] = useState({
    username: false,
    firstName: false,
    lastName: false,

  })
  
  // error messages
  const [errors, setErrors] = useState({
    username: '',
    firstName: '',
    lastName: '',
    
  })

  // validate on change/blur
  useEffect(() => {
    const e = { username: '', firstName: '', lastName: '', dob: '' }

    if (touched.username && !username.trim()) {
      e.username = 'Username is required.'
    }
    if (touched.firstName && !firstName.trim()) {
      e.firstName = 'First name is required.'
    }
    if (touched.lastName && !lastName.trim()) {
      e.lastName = 'Last name is required.'
    }
    if (touched.dob) {
      if (!dob.trim()) {
        e.dob = 'Date of birth is required.'
      } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
        e.dob = 'Use MM/DD/YYYY.'
      }
    }

    setErrors(e)
  }, [username, firstName, lastName, dob, touched])

  const canContinue =
    !errors.username &&
    !errors.firstName &&
    !errors.lastName &&
    !errors.dob &&
    username &&
    firstName &&
    lastName &&
    dob

  const handleNext = () => {
    setTouched({ username: true, firstName: true, lastName: true, dob: true })
    if (canContinue) navigation.navigate('PreferencesPage')
  }

  return (
    <Background
      source={require('../assets/moviecollagebg.jpeg')}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="absolute inset-0 bg-black/60" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        className="flex-1 px-4"
      >
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Card */}
          <View className="w-full max-w-md bg-neutral-800/90 p-6 rounded-2xl">
            <Text className="text-white text-2xl font-bold mb-1">
              Your Profile
            </Text>
            <Text className="text-gray-300 text-sm mb-6">
              Step 2 of 3: Tell us about yourself
            </Text>

            {/* Username */}
            <View className="mb-6 w-full">
              <TextInput
                placeholder="Choose a username"
                placeholderTextColor="#ccc"
                className="bg-white rounded-lg px-4 py-3"
                value={username}
                onChangeText={setUsername}
                onBlur={() =>
                  setTouched(t => ({ ...t, username: true }))
                }
              />
              {errors.username ? (
                <Text className="text-red-400 text-sm mt-1">
                  {errors.username}
                </Text>
              ) : null}
            </View>

            {/* First Name */}
            <View className="mb-6 w-full">
              <TextInput
                placeholder="Your first name"
                placeholderTextColor="#ccc"
                className="bg-white rounded-lg px-4 py-3"
                value={firstName}
                onChangeText={setFirstName}
                onBlur={() =>
                  setTouched(t => ({ ...t, firstName: true }))
                }
              />
              {errors.firstName ? (
                <Text className="text-red-400 text-sm mt-1">
                  {errors.firstName}
                </Text>
              ) : null}
            </View>

            {/* Last Name */}
            <View className="mb-6 w-full">
              <TextInput
                placeholder="Your last name"
                placeholderTextColor="#ccc"
                className="bg-white rounded-lg px-4 py-3"
                value={lastName}
                onChangeText={setLastName}
                onBlur={() =>
                  setTouched(t => ({ ...t, lastName: true }))
                }
              />
              {errors.lastName ? (
                <Text className="text-red-400 text-sm mt-1">
                  {errors.lastName}
                </Text>
              ) : null}
            </View>

            {/* Date of Birth */}
            <View className="mb-6 w-full">
                <MaskInput
                    value={dob}
                    onChangeText={(masked, unmasked) => {
                      setDob(masked)
                    }}
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                    placeholder="MM/DD/YYYY"
                    keyboardType="number-pad"
                    className="bg-white rounded-lg px-4 py-3"
                />
                  {errors.dob ? (
                <Text className="text-red-400 text-sm mt-1">
                  {errors.dob}
                </Text>
              ) : null}
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="px-6 py-3 rounded-lg border border-gray-600"
              >
                <Text className="text-gray-300 font-medium">Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNext}
                disabled={!canContinue}
                className={`px-6 py-3 rounded-lg ${
                  canContinue ? 'bg-red-600' : 'bg-gray-500'
                }`}
              >
                <Text
                  className={`font-medium ${
                    canContinue ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>

            {/* Step Indicator */}
            <View className="mt-4 w-full">
              {/* Bar’ın kendisi: 3 eşit parçadan 2’si kırmızı */}
              <View className="h-1 flex-row">
                <View className="bg-red-600 flex-1" />
                <View className="bg-red-600 flex-1" />
                <View className="bg-gray-300 flex-1" />
              </View>
              {/* Etiketler */}
              <View className="flex-row justify-around mt-2">
                <Text className="text-gray-400">Account</Text>
                <Text className="text-red-600 font-semibold">Profile</Text>
                <Text className="text-gray-400">Preferences</Text>
              </View>
            </View>

            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  )
}
