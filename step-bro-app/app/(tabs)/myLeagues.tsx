import { StyleSheet } from 'react-native';
import { Button, TextInput as Input } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { getMyLeagues } from '../../utils/axios';
import { getToken } from '../../utils/utils';
import { LeaguesList } from '../../utils/responsesTypes';

const token = getToken();
let list: LeaguesList[] = [];
let emptyList = false;
let loadingScreen = false;

if (token === '') {
  router.replace('/login');
} else {
  loadingScreen = true;
  getMyLeagues(getToken()).then((response) => {
    if (
      !response.error
      || (response.list === undefined || response.list === null)
      || response.list?.length === undefined
    ) {
      list = response.list || [];
      emptyList = false;
      if (list.length === undefined || list.length === 0) {
        emptyList = true;
      }
    } else {
      list = [];
    }
    loadingScreen = false;
  });
  list = [];
}

export default function MyLeaguesScreen() {
  const [invitationPhone, setInvitationPhone] = useState('');

  return (
    <View style={styles.container}>
      {loadingScreen ? <Text>Loading...</Text>
        : (
          <>
            <Text style={styles.title}>My leagues</Text>
            <View style={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
              <Link href="/modal" asChild>
                <Button
                  mode="elevated"
                  onPress={() => null}
                  buttonColor="#79AF6C"
                  textColor="#FFFFFF"
                  style={{ width: '50%', marginTop: 20, marginBottom: 20 }}
                >
                  Create new league
                </Button>
              </Link>
            </View>
            {emptyList ? <Text>You don't have any leagues yet</Text>
              : (
                <>
                  {list.map((league) => (
                    <View style={styles.leagueContainer} key={league.league_id}>
                      <Text style={{ textTransform: 'uppercase', fontSize: 20, fontWeight: 'bold' }}>{league.league_name}</Text>
                      <Text style={{ fontSize: 13, marginTop: 5, fontStyle: 'italic' }}>
                        From
                        {' '}
                        {league.start_date.toString()}
                        {' '}
                        to
                        {' '}
                        {league.end_date.toString()}
                      </Text>
                      <Text style={{ fontSize: 13, marginTop: 5, fontStyle: 'italic' }}>
                        Created by:
                        {' '}
                        {league.creator_mail}
                        {' '}
                        with
                        {' '}
                        {league.members}
                        {' '}
                        members
                      </Text>

                      <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        marginTop: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      >
                        <Input
                          selectionColor="#79AF6C"
                          underlineColor="transparent"
                          mode="outlined"
                          label="Phone number"
                          enterKeyHint="next"
                          value={invitationPhone}
                          onChangeText={(text) => setInvitationPhone(text)}
                          autoCapitalize="none"
                          textContentType="telephoneNumber"
                          inputMode="tel"
                          style={{ height: 'auto', width: '50%' }}
                        />
                        <Button
                          mode="elevated"
                          onPress={() => console.log('invite')}
                          buttonColor="#79AF6C"
                          textColor="#FFFFFF"
                          style={{ width: '40%' }}
                        >
                          Inivite
                        </Button>
                      </View>

                    </View>
                  ))}
                </>
              )}
          </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  leagueContainer: {
    display: 'flex',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: '#6C95AF',
    borderWidth: 2,
    borderRadius: 10,
  },
  leagueChip: {
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
});
