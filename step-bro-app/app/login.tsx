import { Image, StyleSheet } from 'react-native';

import { useState } from 'react';
import { Button, TextInput as Input } from 'react-native-paper';
import { Link, Redirect, router } from 'expo-router';
import { Text, View } from '../components/Themed';
import { login } from '../utils/axios';

const Logo = require('../assets/images/logo.jpeg');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);
  function loginFunction() {
    setLoadingLogin(true);
    login(username, password).then((response) => {
      if (response.error) {
        setErrorText('Incorrect username or password!');
        setLoadingLogin(false);
      } else {
        setErrorText('');
        setLoadingLogin(false);

        return router.replace('/home');
      }
    });
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={{ width: 200, height: 200, borderRadius: 20 }} />
      <Text style={styles.title}>Welcome back to Step Bro!</Text>
      <View style={styles.inputsContainer}>
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Email"
          returnKeyType="next"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Password"
          returnKeyType="next"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry
        />
        <Text style={styles.error}>{errorText}</Text>
        <Button
          mode="elevated"
          onPress={() => loginFunction()}
          buttonColor="#79AF6C"
          textColor="#FFFFFF"
          loading={loadingLogin}
          style={{ marginTop: 15 }}
        >
          Log in
        </Button>
        <Text style={styles.signUpText}>
          You don’t have an account yet?
          {' '}
          <Link href="/register" style={styles.signUpButton}>Sign up</Link>
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
  signUpText: {
    fontSize: 13,
    color: '#ffffff',
    textAlign: 'center',
  },
  signUpButton: {
    fontWeight: 'bold',
    color: '#79AF6C',
  },
});
