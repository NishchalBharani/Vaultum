import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc'; // Tailwind for React Native

export default function HomeScreen({ navigation }) {

  // Animation for the checkmark and button
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={tw`flex-1 bg-white items-center justify-center px-6`}>
      {/* Gradient Header Background */}
      <View
        style={tw`absolute top-0 w-full h-1/3 bg-gradient-to-b from-purple-300 to-white opacity-50`}
      />

      {/* Logo/Title Section */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={tw`text-5xl font-bold text-gray-900 mb-4`}>
          Vaultum
        </Text>
      </Animated.View>

      {/* Tagline with Emerald Green Checkmark */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          flexDirection: 'row',
          alignItems: 'center',
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Text style={tw`text-lg text-gray-800 text-center mr-2`}>
          Secure. Simple. Yours.
        </Text>
        <Text style={tw`text-2xl text-green-500`}>✓</Text>
      </Animated.View>

      {/* Spacer */}
      <View style={tw`h-8`} />

      {/* Call to Action Button */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          style={tw`bg-blue-600 px-8 py-4 rounded-full shadow-lg`}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={tw`text-white text-lg font-semibold`}>
            Get Started
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer Text */}
      <Text style={tw`absolute bottom-8 text-gray-600 text-sm`}>
        Trusted by millions. Powered by privacy.
      </Text>
    </View>
  );
}