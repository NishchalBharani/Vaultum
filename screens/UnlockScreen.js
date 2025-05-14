import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

export default function UnlockScreen({ navigation }) {
  const [pin, setPin] = useState('');
  const [storedPin, setStoredPin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredPin = async () => {
      try {
        const saved = await AsyncStorage.getItem('@vaultum_pin');
        if (saved) setStoredPin(saved);
        else navigation.replace('PinSetup'); // If no PIN set, go to setup
      } catch (err) {
        Alert.alert('Error', 'Failed to load PIN.');
      } finally {
        setLoading(false);
      }
    };
    loadStoredPin();
  }, []);

  const handleUnlock = () => {
    if (pin.length !== 4) {
      Alert.alert('Invalid', 'PIN must be 4 digits.');
      return;
    }
    if (pin === storedPin) {
      navigation.replace('Vault'); // Success
    } else {
      Alert.alert('Incorrect PIN', 'Try again.');
      setPin('');
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#4B6FFF" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white px-6 justify-center`}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>
        Enter your Vault PIN
      </Text>

      <TextInput
        style={tw`text-center border border-gray-300 rounded-lg px-4 py-3 text-2xl mb-6`}
        placeholder="••••"
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
        value={pin}
        onChangeText={setPin}
      />

      <TouchableOpacity
        style={tw`bg-blue-600 py-3 rounded-full`}
        onPress={handleUnlock}
      >
        <Text style={tw`text-white text-lg font-semibold text-center`}>
          Unlock Vault
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`mt-4`}
        onPress={() => navigation.navigate('PinSetup')}
      >
        <Text style={tw`text-blue-500 text-center`}>
          Reset PIN
        </Text>
      </TouchableOpacity>
    </View>
  );
}
