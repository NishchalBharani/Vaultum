import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredMnemonic } from '../utils/mnemonic';
import tw from 'twrnc';
import { Eye, EyeOff } from 'lucide-react-native';

export default function VaultCardScreen({ navigation }) {
  const [mnemonic, setMnemonic] = useState('');
  const [did, setDID] = useState('did:vaultum:sample-123456789abcdef');
  const [showMnemonic, setShowMnemonic] = useState(false);

  // Load mnemonic on mount
  useEffect(() => {
    const fetchMnemonic = async () => {
      const saved = await getStoredMnemonic();
      if (saved) setMnemonic(saved);
    };
    fetchMnemonic();
  }, []);

  return (
    <ScrollView style={tw`flex-1 bg-white px-6 pt-10`}>
      <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>
        My Vault
      </Text>

      <View style={tw`bg-black rounded-2xl p-6 mb-6 shadow-2xl`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>
          Vaultum Identity Card
        </Text>

        <Text style={tw`text-gray-400 text-sm mb-1`}>DID:</Text>
        <Text style={tw`text-emerald-400 font-medium mb-4`}>
          {did}
        </Text>

        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`w-70`}>
            <Text style={tw`text-gray-400 text-sm mb-1`}>Mnemonic:</Text>
            <Text style={tw`text-purple-300 font-semibold`}>
              {showMnemonic
                ? mnemonic
                : mnemonic
                  ? mnemonic.split(' ').slice(0, 3).join(' ') + ' ...'
                  : 'No mnemonic found'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowMnemonic(!showMnemonic)}
            style={tw`p-2`}
          >
            {!showMnemonic ? (
              <EyeOff color="#fff" size={22} />
            ) : (
              <Eye color="#fff" size={22} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={tw`bg-emerald-600 py-4 rounded-full shadow-lg mb-4`}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={tw`text-white text-center text-lg font-semibold`}>
          Backup Vault
        </Text>
      </TouchableOpacity>

      <Text style={tw`text-gray-500 text-sm text-center mb-10`}>
        Your vault is your identity. Secure it.
      </Text>
    </ScrollView>
  );
}
