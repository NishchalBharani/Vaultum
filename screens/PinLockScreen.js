import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

export default function PinLockScreen({ navigation }) {
    const [pin, setPin] = useState('');

    const handleUnlock = async () => {
        const storedPin = await AsyncStorage.getItem('@vaultum_pin');
        if (pin === storedPin) {
            navigation.replace('Vault'); // replace so PIN screen doesn't stay in stack
        } else {
            Alert.alert('Access Denied', 'Incorrect PIN');
            setPin('');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1 justify-center items-center bg-white px-6`}
        >
            <Text style={tw`text-3xl font-bold text-gray-800 mb-8`}>Enter PIN</Text>

            <TextInput
                style={tw`border border-gray-300 w-full rounded-xl p-4 text-center text-2xl mb-6`}
                value={pin}
                onChangeText={(text) => setPin(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
                placeholder="••••"
            />

            <TouchableOpacity
                style={tw`bg-blue-500 w-full py-4 rounded-full`}
                onPress={handleUnlock}
            >
                <Text style={tw`text-white text-center font-semibold text-lg`}>Unlock</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
