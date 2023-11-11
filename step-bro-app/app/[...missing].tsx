import { Redirect } from 'expo-router';
import { getToken } from '../utils/utils';

export default function NotFoundScreen() {
  if (getToken() === '') {
    return <Redirect href="/login" />;
  }
  return <Redirect href="/home" />;
}
