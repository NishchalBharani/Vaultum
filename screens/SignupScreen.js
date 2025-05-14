import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';
import { generateAndStoreMnemonic } from '../utils/mnemonic';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignup = async () => {
    try {
      const mnemonic = await generateAndStoreMnemonic();
      console.log('Generated mnemonic:', mnemonic);
      navigation.navigate('Vault');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <View style={tw`flex-1 bg-white items-center justify-center px-6`}>
      {/* Gradient Header */}
      <View
        style={tw`absolute top-0 w-full h-1/4 bg-gradient-to-b from-purple-300 to-white opacity-50`}
      />

      {/* Title */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={tw`text-3xl font-bold text-gray-900 mb-8`}>
          Create Your Vaultum ID
        </Text>
      </Animated.View>

      {/* Form */}
      <Animated.View style={{ opacity: fadeAnim, width: '100%', maxWidth: 320 }}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email or Username"
          placeholderTextColor="#888"
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          style={tw`w-full p-4 mb-4 border rounded-lg ${
            emailFocused ? 'border-blue-600' : 'border-gray-300'
          } text-gray-800`}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          style={tw`w-full p-4 mb-6 border rounded-lg ${
            passwordFocused ? 'border-blue-600' : 'border-gray-300'
          } text-gray-800`}
        />

        <TouchableOpacity
          onPress={handleSignup}
          style={tw`bg-green-500 px-8 py-4 rounded-full shadow-lg`}
        >
          <Text style={tw`text-white text-lg font-semibold text-center`}>
            Create Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={tw`mt-4`}>
          <Text style={tw`text-blue-600 text-sm font-medium text-center`}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
