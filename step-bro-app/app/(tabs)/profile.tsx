import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Avatar, Button, TextInput as Input } from 'react-native-paper';
import { Text, View } from '../../components/Themed';
import { getUserInformation, updateUserInformation } from '../../utils/axios';
import { getToken } from '../../utils/utils';

const token = getToken();
let initialUsername = '';
let email = '';
let phoneNumber = '';
let initialBio = '';

if (token === '') {
  router.replace('/login');
} else {
  getUserInformation(token).then((response) => {
    initialUsername = response.information?.username || '';
    email = response.information?.user_mail || '';
    phoneNumber = response.information?.phone_number || '';
    initialBio = response.information?.bio || '';
  });
}

export default function ProfileScreen() {
  const [bio, setBio] = useState(initialBio);
  const [avatar, setAvatar] = useState(defaultAvatar);
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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Update your profile
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          disabled
          label="Email"
          enterKeyHint="next"
          value={email}
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          disabled
          label="Phone number"
          enterKeyHint="next"
          value={phoneNumber}
        />
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
          label="Biography"
          enterKeyHint="next"
          value={bio}
          onChangeText={(text) => setBio(text)}
          autoCapitalize="none"
          multiline
          numberOfLines={5}
        />
        <Button
          mode="elevated"
          onPress={() => updateProfile()}
          buttonColor="#79AF6C"
          textColor="#FFFFFF"
          loading={loading}
          style={{ marginTop: 15 }}
        >
          {loading ? 'Loading...' : 'Confirm changes' }
        </Button>
      </View>
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
});
