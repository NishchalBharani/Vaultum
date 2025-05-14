import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const exportVaultData = async () => {
  try {
    const data = await AsyncStorage.getItem('@vaultum/identities');
    if (!data) throw new Error('No data found to export.');

    const fileUri = FileSystem.documentDirectory + 'vaultum_backup.json';
    await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });

    await Sharing.shareAsync(fileUri, {
      mimeType: 'application/json',
      dialogTitle: 'Export Vault',
    });
  } catch (error) {
    throw new Error('Failed to export data: ' + error.message);
  }
};
