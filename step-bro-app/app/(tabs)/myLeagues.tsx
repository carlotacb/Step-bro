import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { Text, View } from '../../components/Themed';
import { getMyLeagues } from '../../utils/axios';
import { getToken } from '../../utils/utils';
import { LeaguesList } from '../../utils/responsesTypes';

const token = getToken();
let list: LeaguesList[] = [];
const emptyList = false;
const loadingScreen = false;

if (token === '') {
  router.replace('/login');
} else {
  /* loadingScreen = true;
  getMyLeagues(getToken()).then((response) => {
    console.log(response);
    console.log(response.list);
    console.log(response.list?.length);
    if (
      !response.error
      || (response.list === undefined || response.list === null)
      || response.list?.length === undefined
    ) {
      list = response.list || [
        { league_id: 1, league_name: 'League 1' },
        { league_id: 2, league_name: 'League 2' },
        { league_id: 3, league_name: 'League 3' },
        { league_id: 4, league_name: 'League 4' },
        { league_id: 5, league_name: 'League 5' },
      ];
      emptyList = false;
      if (list.length === undefined || list.length === 0) {
        emptyList = true;
      }
    } else {
      list = [
        { league_id: 1, league_name: 'League 1' },
        { league_id: 2, league_name: 'League 2' },
        { league_id: 3, league_name: 'League 3' },
        { league_id: 4, league_name: 'League 4' },
        { league_id: 5, league_name: 'League 5' },
      ];
    }
    loadingScreen = false;
  }); */
  list = [
    { league_id: 1, league_name: 'League 1' },
    { league_id: 2, league_name: 'League 2' },
    { league_id: 3, league_name: 'League 3' },
    { league_id: 4, league_name: 'League 4' },
    { league_id: 5, league_name: 'League 5' },
  ];
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
            {emptyList
              ? <Text>You don't have any leagues yet</Text>
              : (
                <>
                  {list.map((league) => (
                    <View key={league.league_name} style={styles.leagueContainer}>
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
