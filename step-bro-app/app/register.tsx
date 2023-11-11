import { StyleSheet } from 'react-native';

import { useState } from 'react';
import { Button, TextInput as Input } from 'react-native-paper';
import { Link } from 'expo-router';
import { Text, View } from '../components/Themed';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Step Bro!</Text>
      <View style={styles.inputsContainer}>
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Username"
          returnKeyType="next"
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
          returnKeyType="next"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Phone number"
          returnKeyType="next"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          autoCapitalize="none"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
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
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Biography"
          returnKeyType="next"
          value={bio}
          onChangeText={(text) => setBio(text)}
          autoCapitalize="none"
          multiline
          numberOfLines={5}
        />
        <Button
          mode="elevated"
          onPress={() => console.log(`The username is ${username} and the password is ${password}`)}
          buttonColor="#79AF6C"
          textColor="#FFFFFF"
          loading={loadingLogin}
          style={{ marginTop: 15 }}
        >
          Sign Up
        </Button>
        <Text style={styles.logInText}>
          You have an account?
          {' '}
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
