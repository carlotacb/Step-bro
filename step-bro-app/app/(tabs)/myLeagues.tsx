import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
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
                  style={{ width: '30%', marginTop: 20, marginBottom: 20 }}
                >
                  Create new league
                </Button>
              </Link>
            </View>
            {emptyList ? <Text>You don't have any leagues yet</Text>
              : (
                <>
                  {list.map((league) => (
                    <View key={league.league_name} style={styles.leagueContainer}>
                      <Link href="/league_info" asChild>
                        <Button
                          mode="text"
                          onPress={() => null}
                          buttonColor="#6c95af"
                          textColor="#FFFFFF"
                          style={{ width: '80%', marginTop: 10, marginBottom: 10 }}
                        >
                          {league.league_name}
                        </Button>
                      </Link>
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
  leagueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    marginTop: 20,
    backgroundColor: '#6c95af',
    borderRadius: 10,
  },
});
