import { Platform, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { getUserInformation } from '../../utils/axios';
import { getToken } from '../../utils/utils';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');

  const token = getToken();

  console.log(token);
  if (token === '') {
    router.replace('/login');
  } else {
    console.log('test');
    getUserInformation(token).then((response) => {
      console.log(response);
      setUsername(response.information?.username || '');
      setEmail(response.information?.user_mail || '');
      setPhoneNumber(response.information?.phone || '');
      setBio(response.information?.bio || '');
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello,
        {' '}
        {username}
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
