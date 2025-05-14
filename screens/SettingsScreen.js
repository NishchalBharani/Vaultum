import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    isBiometricAvailable,
    isBiometricEnabled,
    enableBiometric,
    disableBiometric,
} from '../auth/useBiometric';

export default function SettingsScreen({ navigation }) {
    const [biometricEnabled, setBiometricEnabled] = useState(false);

    useEffect(() => {
        const fetchState = async () => {
            const enabled = await isBiometricEnabled();
            setBiometricEnabled(enabled);
        };
        fetchState();
    }, []);

    const toggleBiometric = async () => {
        if (biometricEnabled) {
            await disableBiometric();
            setBiometricEnabled(false);
        } else {
            const available = await isBiometricAvailable();
            if (available) {
                await enableBiometric();
                setBiometricEnabled(true);
            } else {
                Alert.alert('Error', 'Biometric authentication not available on this device.');
            }
        }
    };

    const resetMnemonic = async () => {
        try {
            await AsyncStorage.removeItem('@vaultum_mnemonic');
            Alert.alert('Mnemonic Reset', 'Your mnemonic has been cleared.');
        } catch (error) {
            Alert.alert('Error', 'Failed to reset mnemonic.');
        }
    };

    return (
        <View style={tw`flex-1 bg-white px-6 pt-16`}>
            <Text style={tw`text-3xl font-bold text-gray-900 mb-6`}>
                Vault Settings
            </Text>

            {/* Theme Toggle Placeholder */}
            <View style={tw`mb-6`}>
                <Text style={tw`text-gray-800 text-base mb-2`}>
                    Theme
                </Text>
                <Text style={tw`text-gray-500`}>Coming Soon...</Text>
            </View>


            <TouchableOpacity
                style={tw`bg-gray-800 px-6 py-3 rounded-full shadow mt-4 mb-5`}
                onPress={() => navigation.navigate('PinSetup')}
            >
                <Text style={tw`text-white font-semibold text-center`}>
                    Set Vault PIN
                </Text>
            </TouchableOpacity>

            {/* Reset Button */}
            <TouchableOpacity
                onPress={resetMnemonic}
                style={tw`bg-red-500 py-3 rounded-full mb-4`}
            >
                <Text style={tw`text-white text-center font-semibold`}>
                    Reset Mnemonic
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={toggleBiometric}
                style={tw`bg-black px-4 py-3 rounded-full mb-4 border border-white`}
            >
                <Text style={tw`text-white text-center font-semibold`}>
                    {biometricEnabled ? 'Disable Biometric Unlock' : 'Enable Biometric Unlock'}
                </Text>
            </TouchableOpacity>

            {/* Back Button */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text style={tw`text-blue-500 text-center text-sm`}>
                    Back to Vault
                </Text>
            </TouchableOpacity>
        </View>
    );
}
