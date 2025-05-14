import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center px-6`}>
      <Text style={tw`text-2xl font-bold text-gray-900 mb-4`}>
        Forgot Password
      </Text>

      <Text style={tw`text-gray-700 text-center mb-6`}>
        Enter your recovery keyword or mnemonic phrase to reset your password.
      </Text>

      <TextInput
        style={tw`w-full p-4 mb-4 border rounded-lg border-gray-300 text-gray-800`}
        placeholder="Enter recovery keyword"
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        style={tw`bg-green-500 px-6 py-4 rounded-full mb-4`}
        onPress={() => {
          // For now just navigate back
          navigation.navigate('Login');
        }}
      >
        <Text style={tw`text-white text-base font-semibold`}>
          Recover Access
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={tw`text-blue-500 text-sm`}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
