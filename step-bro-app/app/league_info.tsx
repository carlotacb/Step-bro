import { router } from 'expo-router';
import { getMyLeagues, getUserInformation } from '../utils/axios';
import { getToken } from '../utils/utils';

const token = getToken();
if (token === '') {
  router.replace('/login');
} else {
  /* getMyLeagues(token).then((response) => {
    initialUsername = response.information?.username || '';
    email = response.information?.user_mail || '';
    phoneNumber = response.information?.phone_number || '';
    initialBio = response.information?.bio || '';
    loadingScreen = false;
  }); */
}
export default function LeagueInfo() {
  return (
    <View />
  );
}
