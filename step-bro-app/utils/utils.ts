import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export function getToken(): string {
  if (Platform.OS === 'web') {
    return localStorage.getItem('userToken') || '';
  }
  return SecureStore.getItem('userToken') || '';
}
