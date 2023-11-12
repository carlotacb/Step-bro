import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, TextInput as Input } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { createLeague } from '../utils/axios';
import { getToken } from '../utils/utils';

export default function ModalScreen() {
  const [leagueName, setLeagueName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loadingCreateLeague, setLoadingCreateLeague] = useState(false);

  function createLeagueFunction() {
    setLoadingCreateLeague(true);
    createLeague(getToken(), leagueName, startDate, endDate, description).then((response) => {
      if (response.error) {
        setErrorText('There is an error creating the leagues!');
        setLoadingCreateLeague(false);
      } else {
        setErrorText('');
        setLoadingCreateLeague(false);
        return router.replace('/myLeagues');
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="League name"
          enterKeyHint="next"
          value={leagueName}
          onChangeText={(text) => setLeagueName(text)}
          autoCapitalize="none"
          textContentType="username"
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Start date"
          enterKeyHint="next"
          value={startDate}
          onChangeText={(text) => setStartDate(text)}
          autoCapitalize="none"
          inputMode="numeric"
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="End date"
          enterKeyHint="next"
          value={endDate}
          onChangeText={(text) => setEndDate(text)}
          autoCapitalize="none"
          inputMode="numeric"
        />
        <Input
          selectionColor="#79AF6C"
          underlineColor="transparent"
          mode="outlined"
          label="Biography"
          enterKeyHint="next"
          value={description}
          onChangeText={(text) => setDescription(text)}
          autoCapitalize="none"
          multiline
          numberOfLines={5}
        />
        <Text style={styles.error}>{errorText}</Text>
        <Button
          mode="elevated"
          onPress={() => createLeagueFunction()}
          buttonColor="#79AF6C"
          textColor="#FFFFFF"
          loading={loadingCreateLeague}
          style={{ marginTop: 15 }}
        >
          {loadingCreateLeague ? 'Loading...' : 'Create League' }
        </Button>
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
