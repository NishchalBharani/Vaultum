import * as bip39 from 'bip39';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const generateAndStoreMnemonic = async () => {
  try {
    const mnemonic = bip39.generateMnemonic(); // Generate 12-word mnemonic
    await AsyncStorage.setItem('vaultum_mnemonic', mnemonic);
    return mnemonic;
  } catch (error) {
    console.error('Error generating or storing mnemonic:', error);
    throw error;
  }
};

export const getStoredMnemonic = async () => {
  try {
    const mnemonic = await AsyncStorage.getItem('vaultum_mnemonic');
    return mnemonic;
  } catch (error) {
    console.error('Error retrieving mnemonic:', error);
    return null;
  }
};
