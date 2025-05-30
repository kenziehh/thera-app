import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';

// Zod validation schema
const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 8 characters')
});

type SignInFormData = z.infer<typeof signInSchema>;

// Declare __DEV__ if it's not already defined (e.g., in a testing environment)
declare const __DEV__: boolean;

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);

      // Console log the form data
      console.log('=== FORM SUBMISSION ===');
      console.log('Email:', data.email);
      console.log('Password:', data.password);
      console.log('Full Data:', JSON.stringify(data, null, 2));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert('Success', 'Form submitted successfully! Check console for data.');
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header with gradient background */}

          <View className="bg-blue-300 pt-24 pb-32 ">

            <Text className="text-white-200 w-full text-3xl font-bold text-center mb-2">
              Sign-in to your Account
            </Text>
            <Text className="text-white-50 text-center text-base">
              Enter your email and password to log in
            </Text>
          </View>

          {/* Form Container */}
          <View className="flex-1 px-10 -mt-16 ">
            <View className="bg-white-200 rounded-[10px] shadow-lg p-6 mb-6">
              {/* Email Input */}
              <View className="mb-4">
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className={`border rounded-lg px-4 py-4 text-base bg-gray-50 ${errors.email ? 'border-red-500' : 'border-gray-200'
                        }`}
                    />
                  )}
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View className="mb-4">
                <View className="relative">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        className={`border rounded-lg px-4 py-4 pr-12 text-base bg-gray-50 ${errors.password ? 'border-red-500' : 'border-gray-200'
                          }`}
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>


              {/* Remember me and Forgot password
              <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center">
                  <Controller
                    control={control}
                    name="rememberMe"
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        value={value}
                        onValueChange={onChange}
                        color={value ? '#4F46E5' : undefined}
                        className="mr-2"
                      />
                    )}
                  />
                </View>
                <TouchableOpacity>
                  <Text className="text-blue-600 text-sm font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View> */}

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                className={`rounded-2xl py-2.5 mb-6 ${isValid && !isLoading
                  ? 'bg-blue-300'
                  : 'bg-gray-400'
                  }`}
              >
                <Text className="text-white-50 text-center text-base font-semibold">
                  {isLoading ? 'Logging in...' : 'Log-in'}
                </Text>
              </TouchableOpacity>
              
              <View className='flex-row justify-center items-center mb-6'>
                <Text className='text xs'>
                  Don't have an account?{' '}
                </Text>
                <Text className='text-xs text-blue-300'>Sign Up</Text>
              </View>
              {/* Form Debug Info (Development only) */}
              {/* {typeof __DEV__ !== 'undefined' && __DEV__ && (
                <View className="bg-gray-100 p-3 rounded-lg mb-4">
                  <Text className="text-xs text-gray-600 font-medium mb-1">
                    Debug Info:
                  </Text>
                  <Text className="text-xs text-gray-600">
                    Form Valid: {isValid ? 'Yes' : 'No'}
                  </Text>
                  <Text className="text-xs text-gray-600">
                    Errors: {Object.keys(errors).length}
                  </Text>
                  {Object.keys(errors).length > 0 && (
                    <Text className="text-xs text-red-600">
                      {Object.keys(errors).join(', ')}
                    </Text>
                  )}
                </View>
              )} */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}