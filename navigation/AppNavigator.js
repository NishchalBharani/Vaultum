// AppNavigator.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VaultScreen from '../screens/VaultScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreateIdentityScreen from '../screens/CreateIdentityScreen';
import EditIdentityScreen from '../screens/EditIdentityScreen';
import VaultCardScreen from '../screens/VaultCardScreen';
import PinSetupScreen from '../screens/PinSetupScreen';
import EnterPinScreen from '../screens/EnterPinScreen';
import IdentityDetailScreen from '../screens/IdentityDetailScreen';
import useAuth from '../auth/authStore';
import UnlockScreen from '../screens/UnlockScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isLoggedIn } = useAuth();
    const [initialRoute, setInitialRoute] = useState(null);
  
    useEffect(() => {
      const decideInitialRoute = async () => {
        const pin = await AsyncStorage.getItem('@vaultum_pin');
  
        if (!isLoggedIn) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('Unlock'); // Redirect here first if logged in
        }
      };
  
      if (isLoggedIn !== null) decideInitialRoute(); // wait for auth check
    }, [isLoggedIn]);
  
    if (!initialRoute) return null; // optionally add a splash screen here
  
    return (
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Unlock" component={UnlockScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Vault" component={VaultScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="CreateIdentity" component={CreateIdentityScreen} />
        <Stack.Screen name="EditIdentity" component={EditIdentityScreen} />
        <Stack.Screen name="VaultCard" component={VaultCardScreen} />
        <Stack.Screen name="PinSetup" component={PinSetupScreen} />
        <Stack.Screen name="EnterPin" component={EnterPinScreen} />
        <Stack.Screen name="IdentityDetail" component={IdentityDetailScreen} />
      </Stack.Navigator>
    );
  }
  
