import { Platform, StyleSheet } from 'react-native';

import { useState } from 'react';
import { Button, TextInput as Input } from 'react-native-paper';
import { Link, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Text, View } from '../components/Themed';
import { register } from '../utils/axios';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loadingRegister, setLoadingRegister] = useState(false);

  function registerFunction() {
    setLoadingRegister(true);
    register(username, email, phoneNumber, password, bio).then((response) => {
      if (response.error) {
        setErrorText('There is an error... The email already exists!');
        setLoadingRegister(false);
      } else {
        setErrorText('');
        setLoadingRegister(false);
        if (Platform.OS === 'web') {
          localStorage.setItem('userToken', response.token || '');
        } else {
          SecureStore.setItem('userToken', response.token || '');
        }
        return router.replace('/home');
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Step Bro!</Text>
      <View style={styles.inputsContainer}>
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Username"
          enterKeyHint="next"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          textContentType="username"
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Email"
          enterKeyHint="next"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          textContentType="emailAddress"
          inputMode="email"
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Phone number"
          enterKeyHint="next"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          autoCapitalize="none"
          textContentType="telephoneNumber"
          inputMode="tel"
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Password"
          enterKeyHint="next"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Biography"
          enterKeyHint="next"
          value={bio}
          onChangeText={(text) => setBio(text)}
          autoCapitalize="none"
          multiline
          numberOfLines={5}
        />
        <Text style={styles.error}>{errorText}</Text>
        <Button
          mode="elevated"
          onPress={() => registerFunction()}
          buttonColor="#79AF6C"
          textColor="#FFFFFF"
          loading={loadingRegister}
          style={{ marginTop: 15 }}
        >
          {loadingRegister ? 'Loading...' : 'Sign up' }
        </Button>
        <Text style={styles.logInText}>
          You have an account?
          {' '}
          <Link href="/login" style={styles.logInButton}>Log in</Link>
        </Text>
      </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 50,
    textAlign: 'center',
  },
  inputsContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  error: {
    fontSize: 13,
    color: '#f13a59',
    paddingTop: 8,
  },
  logInText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  logInButton: {
    fontWeight: 'bold',
    color: '#79AF6C',
  },
});
