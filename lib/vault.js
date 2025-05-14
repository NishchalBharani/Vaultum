import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import * as bip39 from 'bip39';

export async function createVaultIdentity() {
  try {
    const vaultId = uuidv4();
    const mnemonic = bip39.generateMnemonic(); // 12-word secure phrase

    // Store securely (MVP-level)
    await AsyncStorage.setItem('@vaultum:id', vaultId);
    await AsyncStorage.setItem('@vaultum:mnemonic', mnemonic);

    return { vaultId, mnemonic };
  } catch (error) {
    console.error('Error creating vault identity:', error);
    throw error;
  }
}

export async function getVaultIdentity() {
  const vaultId = await AsyncStorage.getItem('@vaultum:id');
  const mnemonic = await AsyncStorage.getItem('@vaultum:mnemonic');

  return { vaultId, mnemonic };
}
