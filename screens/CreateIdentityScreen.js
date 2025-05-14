import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CreateIdentityScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  const handleSave = async () => {
    const newIdentity = { fullName, dob, nationality, email, phone, bio };

    try {
      const existing = await AsyncStorage.getItem('@vaultum/identities');
      let updatedList = existing ? JSON.parse(existing) : [];

      updatedList.push(newIdentity);
      await AsyncStorage.setItem('@vaultum/identities', JSON.stringify(updatedList));

      Alert.alert('Success', 'Identity saved!');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving identity:', error);
      Alert.alert('Error', 'Failed to save identity.');
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white px-6 pt-10`}>
      <Text style={tw`text-2xl font-bold mb-6`}>Create New Identity</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={tw`border border-gray-300 p-3 rounded mb-4`}
      />
      <TextInput
        placeholder="Date of Birth"
        value={dob}
        onChangeText={setDob}
        style={tw`border border-gray-300 p-3 rounded mb-4`}
      />
      <TextInput
        placeholder="Nationality"
        value={nationality}
        onChangeText={setNationality}
        style={tw`border border-gray-300 p-3 rounded mb-4`}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={tw`border border-gray-300 p-3 rounded mb-4`}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={tw`border border-gray-300 p-3 rounded mb-4`}
      />
      <TextInput
        placeholder="Bio (optional)"
        value={bio}
        onChangeText={setBio}
        multiline
        style={tw`border border-gray-300 p-3 rounded mb-6 h-24`}
      />

      <TouchableOpacity
        style={tw`bg-green-500 py-4 rounded-full`}
        onPress={handleSave}
      >
        <Text style={tw`text-white text-center font-bold`}>Save Identity</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
