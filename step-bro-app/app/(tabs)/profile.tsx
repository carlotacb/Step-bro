import { Platform, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, TextInput as Input } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { Text, View } from '../../components/Themed';
import { getUserInformation, updateUserInformation } from '../../utils/axios';
import { getToken } from '../../utils/utils';

const token = getToken();
let initialUsername = '';
let email = '';
let phoneNumber = '';
let initialBio = '';
let loadingScreen = false;

if (token === '') {
  router.replace('/login');
} else {
  loadingScreen = true;
  getUserInformation(token).then((response) => {
    initialUsername = response.information?.username || '';
    email = response.information?.user_mail || '';
    phoneNumber = response.information?.phone_number || '';
    initialBio = response.information?.bio || '';
    loadingScreen = false;
  });
}

export default function ProfileScreen() {
  const [bio, setBio] = useState(initialBio);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(initialUsername);

  function updateProfile() {
    setLoading(true);
    updateUserInformation(token, bio, username).then((response) => {
      if (response.error) {
        setLoading(false);
      } else {
        setLoading(false);
        return router.replace('/home');
      }
    });
  }

  function logout() {
    setLoading(true);
    if (Platform.OS === 'web') {
      localStorage.removeItem('userToken');
      router.replace('/login');
    } else {
      SecureStore.deleteItemAsync('userToken').then(() => router.replace('/login'));
    }
  }

  return (
    <View style={styles.container}>
      {loadingScreen
        ? <Text>Loading...</Text>
        : (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                Update your profile
              </Text>
            </View>
            <View style={styles.formContainer}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <Input
                label={<Text style={styles.label}>Email</Text>}
                selectionColor="#79AF6C"
                underlineColor="transparent"
                mode="outlined"
                disabled
                enterKeyHint="next"
                value={email}

              />

              <Input
                selectionColor="#79AF6C"
                underlineColor="transparent"
                mode="outlined"
                disabled
                label={<Text style={styles.label}>Phone Number</Text>}
                enterKeyHint="next"
                value={phoneNumber}
              />
              <Input
                selectionColor="#79AF6C"
                underlineColor="transparent"
                mode="outlined"
                label={<Text style={styles.label}>Username</Text>}
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
                label={<Text style={styles.label}>Biography</Text>}
                enterKeyHint="next"
                value={bio}
                onChangeText={(text) => setBio(text)}
                autoCapitalize="none"
                multiline
                numberOfLines={5}
              />
              <View
                style={{
                  marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                }}
              >
                <Button
                  mode="elevated"
                  onPress={() => updateProfile()}
                  buttonColor="#79AF6C"
                  textColor="#FFFFFF"
                  style={{ width: '46%' }}
                  loading={loading}
                >
                  {loading ? 'Loading...' : 'Confirm changes' }
                </Button>
                <Button
                  mode="elevated"
                  onPress={() => logout()}
                  buttonColor="#C96568"
                  textColor="#FFFFFF"
                  style={{ width: '46%' }}
                  loading={loading}
                >
                  Log out
                </Button>
              </View>
            </View>
          </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 50,
    paddingRight: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  formContainer: {
    marginTop: 50,
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  label: {
    // backgroundColor: 'black', // Same color as background
    color: '#000',
    fontSize: 20,
    backgroundColor: '#fff',
  },
});
