import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import { Text, View } from '../../components/Themed';
import { getMyLeagues } from '../../utils/axios';
import { getToken } from '../../utils/utils';
import { LeaguesList } from '../../utils/responsesTypes';

const token = getToken();
let list: LeaguesList[] = [{ league_name: 'test', league_id: 1 }, { league_name: 'test2', league_id: 2 }];
let loadingScreen = false;

if (token === '') {
  router.replace('/login');
} else {
  loadingScreen = true;
  getMyLeagues(getToken()).then((response) => {
    if (!response.error) {
      list = response.list || [];
    }
    loadingScreen = false;
  });
}

export default function MyLeaguesScreen() {
  function createLeague() {
    console.log('create league');
  }

  console.log(list);

  return (
    <View style={styles.container}>
      {loadingScreen ? <Text>Loading...</Text>
        : (
          <>
            <Text style={styles.title}>My leagues</Text>
            <View style={{ display: 'flex', alignItems: 'flex-end', width: '90%' }}>
              <Button
                mode="elevated"
                onPress={() => createLeague()}
                buttonColor="#79AF6C"
                textColor="#FFFFFF"
                style={{ width: '30%', marginTop: 20 }}
              >
                Create new league
              </Button>
            </View>
            {list.length <= 0
              ? <Text>You don't have any leagues yet</Text>
              : (
                <>
                  {list.map((league) => (
                    <View key={league.league_name}>
                      <Text>{league.league_name}</Text>
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
    padding: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
