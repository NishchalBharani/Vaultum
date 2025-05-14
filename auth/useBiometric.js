// auth/useBiometric.js
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isBiometricAvailable = async () => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return compatible && enrolled;
};

export const promptBiometricAuth = async () => {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Unlock Vaultum',
    fallbackLabel: 'Enter PIN',
    disableDeviceFallback: false,
  });

  return result.success;
};

export const enableBiometric = async () => {
  await AsyncStorage.setItem('@vaultum_biometric_enabled', 'true');
};

export const disableBiometric = async () => {
  await AsyncStorage.removeItem('@vaultum_biometric_enabled');
};

export const isBiometricEnabled = async () => {
  const enabled = await AsyncStorage.getItem('@vaultum_biometric_enabled');
  return enabled === 'true';
};
