import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { createVaultIdentity } from '../lib/vault'; 

export default function PinSetupScreen({ navigation }) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1); // 1: Enter PIN, 2: Confirm PIN

  const handleSetPin = async () => {
    if (pin.length !== 4 || confirmPin.length !== 4) {
      Alert.alert('Invalid PIN', 'PIN must be 4 digits long.');
      return;
    }
  
    if (pin !== confirmPin) {
      Alert.alert('PIN Mismatch', 'The PINs do not match.');
      setConfirmPin('');
      return;
    }
  
    try {
      await AsyncStorage.setItem('@vaultum_pin', pin);
  
      const { vaultId, mnemonic } = await createVaultIdentity();
      console.log('Vault Created:', vaultId);
      console.log('Mnemonic:', mnemonic);
  
      Alert.alert('Vault Ready', 'Your vault identity has been created.');
  
      navigation.replace('Vault');
    } catch (error) {
      console.error('Vault creation failed:', error);
      Alert.alert('Error', 'Failed to save PIN or create vault identity.');
    }
  };

  return (
    <View style={tw`flex-1 bg-white px-6 justify-center`}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>
        {step === 1 ? 'Set a 4-digit PIN' : 'Confirm your PIN'}
      </Text>

      <TextInput
        style={tw`text-center border border-gray-300 rounded-lg px-4 py-3 text-2xl mb-6`}
        placeholder="••••"
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
        value={step === 1 ? pin : confirmPin}
        onChangeText={(text) => {
          if (step === 1) setPin(text);
          else setConfirmPin(text);
        }}
      />

      <TouchableOpacity
        style={tw`bg-blue-600 py-3 rounded-full`}
        onPress={() => {
          if (step === 1 && pin.length === 4) {
            setStep(2);
          } else if (step === 2) {
            handleSetPin();
          } else {
            Alert.alert('Error', 'Please enter a valid 4-digit PIN.');
          }
        }}
      >
        <Text style={tw`text-white text-lg font-semibold text-center`}>
          {step === 1 ? 'Next' : 'Save PIN'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`mt-4`}
        onPress={() => navigation.goBack()}
      >
        <Text style={tw`text-blue-500 text-center`}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}
