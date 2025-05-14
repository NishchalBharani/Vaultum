import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

export default function IdentityDetailScreen({ route, navigation }) {
  const { identity, index } = route.params;

  return (
    <ScrollView style={tw`flex-1 bg-white px-6 py-10`}>
      <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>
        Identity Details
      </Text>

      {Object.entries(identity).map(([key, value]) => (
        <View key={key} style={tw`mb-4`}>
          <Text style={tw`text-gray-500 text-sm`}>{key.toUpperCase()}</Text>
          <Text style={tw`text-lg text-gray-900`}>{value || '—'}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={tw`bg-indigo-600 py-4 rounded-full shadow-lg mt-10`}
        onPress={() =>
          navigation.navigate('EditIdentity', {
            identity,
            index,
          })
        }
      >
        <Text style={tw`text-white text-center text-lg font-semibold`}>
          Edit Identity
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}