import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    RefreshControl,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredMnemonic } from '../utils/mnemonic';
import { exportVaultData } from '../utils/export';
import { importVaultData } from '../utils/import';
import * as Clipboard from 'expo-clipboard';
import { Menu } from 'lucide-react-native';

export default function VaultScreen({ navigation }) {
    const [mnemonic, setMnemonic] = useState('');
    const [identities, setIdentities] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    // Load mnemonic on mount
    useEffect(() => {
        const fetchMnemonic = async () => {
            const saved = await getStoredMnemonic();
            if (saved) setMnemonic(saved);
        };
        fetchMnemonic();
    }, []);

    const fetchIdentities = async (setIdentities) => {
        try {
            const data = await AsyncStorage.getItem('@vaultum/identities');
            if (data) {
                setIdentities(JSON.parse(data));
            } else {
                setIdentities([]);
            }
        } catch (error) {
            console.error('Error loading identities:', error);
            setIdentities([]);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchIdentities(setIdentities);
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchIdentities(setIdentities);
        setTimeout(() => setRefreshing(false), 500);
    };

    const handleCopy = async () => {
        await Clipboard.setStringAsync(mnemonic);
        Alert.alert('Copied', 'Your mnemonic has been copied to clipboard!');
    };

    const handleDelete = async (index) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this identity?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const data = await AsyncStorage.getItem('@vaultum/identities');
                            if (data) {
                                const identities = JSON.parse(data);
                                identities.splice(index, 1);
                                await AsyncStorage.setItem('@vaultum/identities', JSON.stringify(identities));
                                setIdentities(identities);
                                Alert.alert('Deleted', 'Identity has been deleted.');
                            }
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete identity.');
                        }
                    },
                },
            ]
        );
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        if (menuVisible) {
            setMenuVisible(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={closeMenu}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#4B6FFF']}
                    />
                }
            >
                <View style={tw`flex-1 bg-white px-6 pt-16`}>
                    {/* Hamburger Menu Icon */}
                    <TouchableOpacity
                        onPress={toggleMenu}
                        style={tw`absolute top-15 right-6 p-2`}
                        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                    >
                        <Menu color="#1F2937" size={24} />
                    </TouchableOpacity>

                    {/* Dropdown Menu */}
                    {menuVisible && (
                        <View style={tw`absolute top-24 right-6 bg-white border border-gray-200 rounded-lg shadow-lg w-40 z-10`}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Settings');
                                    setMenuVisible(false);
                                }}
                                style={tw`px-4 py-3 border-b border-gray-200`}
                            >
                                <Text style={tw`text-blue-500 text-sm`}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Login');
                                    setMenuVisible(false);
                                }}
                                style={tw`px-4 py-3`}
                            >
                                <Text style={tw`text-red-500 text-sm`}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Title */}
                    <Text style={tw`text-3xl font-bold text-gray-900 mb-6`}>Your Vault</Text>

                    {/* Identity ID Card */}
                    <View style={tw`bg-indigo-100 p-5 rounded-2xl mb-6 shadow`}>
                        <Text style={tw`text-gray-800 text-lg mb-2 font-semibold`}>
                            Identity ID
                        </Text>
                        <Text style={tw`text-indigo-600 font-bold text-base`}>
                            vaultum:{mnemonic ? mnemonic.split(' ')[0] + '...' : '...'}
                        </Text>
                    </View>

                    {/* Mnemonic Card */}
                    <View style={tw`bg-white border border-gray-300 p-4 rounded-xl mb-6`}>
                        <Text style={tw`text-gray-700 mb-2 font-medium`}>Your Secret Key:</Text>
                        <Text style={tw`text-gray-500 mb-4`}>
                            {mnemonic ? mnemonic.replace(/(\w{3,})/g, '****') : 'Loading...'}
                        </Text>
                        <View style={tw`flex-row justify-between`}>
                            <TouchableOpacity
                                onPress={handleCopy}
                                style={tw`bg-green-500 py-3 rounded-full flex-1 mr-2`}
                            >
                                <Text style={tw`text-white text-center font-semibold`}>
                                    Copy Mnemonic
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('CreateIdentity')}
                                style={tw`bg-purple-500 py-3 rounded-full flex-1 ml-2`}
                            >
                                <Text style={tw`text-white text-center font-semibold`}>
                                    Create Identity
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Identities Overview */}
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>
                        My Identities
                    </Text>

                    <View style={tw`bg-gray-100 p-4 rounded-lg shadow mb-6`}>
                        <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>
                            Identity Overview
                        </Text>

                        {identities.map((id, index) => (
                            <View key={index} style={tw`mb-4 border-b border-gray-300 pb-2`}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('IdentityDetail', { identity: id, index })}
                                >
                                    <Text style={tw`text-gray-700 font-semibold`}>Name: {id.fullName}</Text>
                                    <Text style={tw`text-gray-700`}>DOB: {id.dob}</Text>
                                    <Text style={tw`text-gray-700`}>Nationality: {id.nationality}</Text>
                                    <Text style={tw`text-gray-700`}>Email: {id.email}</Text>
                                    <Text style={tw`text-gray-700`}>Phone: {id.phone}</Text>
                                    {id.bio ? <Text style={tw`text-gray-700`}>Bio: {id.bio}</Text> : null}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleDelete(index)}
                                    style={tw`mt-2 bg-red-500 py-2 px-4 rounded-full w-32`}
                                >
                                    <Text style={tw`text-white text-center`}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* Navigation Buttons */}
                    <View style={tw`mb-6 flex-row flex-wrap justify-between`}>
                        <TouchableOpacity
                            style={tw`bg-blue-500 w-[48%] px-4 py-4 rounded-full shadow mb-4 border border-blue-600`}
                            onPress={() => navigation.navigate('EditIdentity')}
                        >
                            <Text style={tw`text-white text-center font-semibold text-base`}>
                                Edit Identity
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    await exportVaultData();
                                } catch (e) {
                                    Alert.alert('Error', e.message);
                                }
                            }}
                            style={tw`bg-blue-700 w-[48%] px-4 py-4 rounded-full shadow mb-4 border border-blue-800`}
                        >
                            <Text style={tw`text-white text-center font-semibold text-base`}>
                                Export Vault
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    const success = await importVaultData();
                                    if (success) {
                                        Alert.alert('Success', 'Vault imported successfully!');
                                        fetchIdentities(setIdentities); // refresh UI
                                    }
                                } catch (e) {
                                    Alert.alert('Error', e.message);
                                }
                            }}
                            style={tw`bg-emerald-600 w-[48%] px-4 py-4 rounded-full shadow mb-4`}
                        >
                            <Text style={tw`text-white text-center font-semibold text-base`}>
                                Import Vault
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw`bg-purple-600 w-[48%] px-4 py-4 rounded-full shadow mb-4 border border-purple-700`}
                            onPress={() => navigation.navigate('VaultCard')}
                        >
                            <Text style={tw`text-white text-center font-semibold text-base`}>
                                My Vault
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}