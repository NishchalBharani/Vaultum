import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const importVaultData = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) return;

    const file = result.assets[0];
    const fileUri = file.uri;
    const content = await fetch(fileUri).then((res) => res.text());

    const importedData = JSON.parse(content);
    if (!Array.isArray(importedData)) {
      throw new Error('Invalid file format.');
    }

    await AsyncStorage.setItem('@vaultum/identities', JSON.stringify(importedData));
    return true;
  } catch (error) {
    throw new Error('Failed to import: ' + error.message);
  }
};
