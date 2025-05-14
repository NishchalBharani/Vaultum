import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

export default function EditIdentityScreen({ route, navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    nationality: '',
    email: '',
    phone: '',
    bio: '',
  });

  const [indexToEdit, setIndexToEdit] = useState(null);

  useEffect(() => {
    const loadIdentity = async () => {
      try {
        // Check if identity and index are passed via route params
        const { identity, index } = route.params || {};
        if (identity && index !== undefined) {
          setForm(identity);
          setIndexToEdit(index);
        } else {
          // Fallback to loading the last identity if no specific identity is provided
          const data = await AsyncStorage.getItem('@vaultum/identities');
          if (data) {
            const identities = JSON.parse(data);
            const lastIndex = identities.length - 1;
            if (lastIndex >= 0) {
              setForm(identities[lastIndex]);
              setIndexToEdit(lastIndex);
            } else {
              Alert.alert('No Identity Found', 'You have no saved identities to edit.');
              navigation.goBack();
            }
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load identity.');
        navigation.goBack();
      }
    };

    loadIdentity();
  }, [route.params]);

  const handleUpdate = async () => {
    try {
      const data = await AsyncStorage.getItem('@vaultum/identities');
      if (data) {
        const identities = JSON.parse(data);
        if (indexToEdit !== null && indexToEdit >= 0 && indexToEdit < identities.length) {
          identities[indexToEdit] = form;
          await AsyncStorage.setItem('@vaultum/identities', JSON.stringify(identities));
          Alert.alert('Updated', 'Identity updated successfully!');
          navigation.goBack();
        } else {
          Alert.alert('Error', 'Invalid identity index.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update identity.');
    }
  };

  return (
    <View style={tw`flex-1 bg-white px-6 py-10`}>
      <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>
        Edit Identity
      </Text>

      {Object.keys(form).map((field) => (
        <TextInput
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChangeText={(text) => setForm({ ...form, [field]: text })}
          style={tw`border border-gray-300 rounded-lg p-4 mb-4 text-gray-800`}
          placeholderTextColor="#888"
        />
      ))}

      <TouchableOpacity
        style={tw`bg-green-600 py-4 rounded-full shadow-lg`}
        onPress={handleUpdate}
      >
        <Text style={tw`text-white text-center text-lg font-semibold`}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
}