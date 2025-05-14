import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc'; // Import twrnc
import { generateAndStoreMnemonic, getStoredMnemonic } from '../utils/mnemonic';

export default function LoginScreen({ navigation }) {
  // State for input focus
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Animation for the form
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={tw`flex-1 bg-white items-center justify-center px-6`}>
      {/* Gradient Header Background */}
      <View
        style={tw`absolute top-0 w-full h-1/4 bg-gradient-to-b from-purple-300 to-white opacity-50`}
      />

      {/* Title */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={tw`text-3xl font-bold text-gray-900 mb-8`}>
          Login to Vaultum
        </Text>
      </Animated.View>

      {/* Form */}
      <Animated.View style={{ opacity: fadeAnim, width: '100%', maxWidth: 320 }}>
        {/* Username Input */}
        <TextInput
          style={tw`w-full p-4 mb-4 border rounded-lg ${
            usernameFocused ? 'border-blue-600' : 'border-gray-300'
          } text-gray-800`}
          placeholder="Username"
          placeholderTextColor="#888"
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
        />

        {/* Password Input */}
        <TextInput
          style={tw`w-full p-4 mb-6 border rounded-lg ${
            passwordFocused ? 'border-blue-600' : 'border-gray-300'
          } text-gray-800`}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />

        {/* Forgot Password Link */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')} // Assuming a ForgotPassword screen exists
          style={tw`self-end mb-6`}
        >
          <Text style={tw`text-blue-600 text-sm font-medium`}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={tw`bg-green-500 px-8 py-4 rounded-full shadow-lg`}
          onPress={async () => {
            const existingMnemonic = await getStoredMnemonic();
            if (!existingMnemonic) {
              const newMnemonic = await generateAndStoreMnemonic();
              console.log('Generated new mnemonic:', newMnemonic);
            } else {
              console.log('Existing mnemonic found:', existingMnemonic);
            }
            navigation.navigate('Vault');
          }}
        >
          <Text style={tw`text-white text-lg font-semibold text-center`}>
            Login
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer Text */}
      <Text style={tw`absolute bottom-8 text-gray-600 text-sm`}>
        Secure access, always.
      </Text>
    </View>
  );
}