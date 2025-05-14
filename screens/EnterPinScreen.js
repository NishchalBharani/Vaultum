import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import {
  isBiometricAvailable,
  isBiometricEnabled,
  promptBiometricAuth,
} from '../auth/useBiometric';

export default function EnterPinScreen({ navigation }) {
  const [pin, setPin] = useState('');
  const [storedPin, setStoredPin] = useState(null);

  // Fetch stored PIN
  useEffect(() => {
    const loadStoredPin = async () => {
      const savedPin = await AsyncStorage.getItem('@vaultum_pin');
      if (!savedPin) {
        Alert.alert('No PIN Found', 'Redirecting to PIN setup...');
        navigation.replace('PinSetup');
      } else {
        setStoredPin(savedPin);
      }
    };
    loadStoredPin();
  }, []);

  // Auto biometric prompt
  useEffect(() => {
    const tryBiometrics = async () => {
      const available = await isBiometricAvailable();
      const enabled = await isBiometricEnabled();

      if (available && enabled) {
        const success = await promptBiometricAuth();
        if (success) {
          navigation.replace('Vault');
        }
      }
    };

    tryBiometrics();
  }, []);

  const handleVerifyPin = () => {
    if (pin === storedPin) {
      navigation.replace('Vault');
    } else {
      Alert.alert('Incorrect PIN', 'Please try again.');
      setPin('');
    }
  };

  return (
    <View style={tw`flex-1 bg-white justify-center px-6`}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>
        Enter Your Vault PIN
      </Text>

      <TextInput
        style={tw`text-center border border-gray-300 rounded-lg px-4 py-3 text-2xl mb-6`}
        placeholder="••••"
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        value={pin}
        onChangeText={setPin}
      />

      <TouchableOpacity
        style={tw`bg-blue-600 py-3 rounded-full`}
        onPress={handleVerifyPin}
      >
        <Text style={tw`text-white text-lg font-semibold text-center`}>
          Unlock Vault
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.replace('Home')}
        style={tw`mt-4`}
      >
        <Text style={tw`text-blue-500 text-center`}>
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
