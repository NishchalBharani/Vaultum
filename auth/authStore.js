// auth/authStore.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('@vaultum_token');
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem('@vaultum_token', token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@vaultum_token');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
