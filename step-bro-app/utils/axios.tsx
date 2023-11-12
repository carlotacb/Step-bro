// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import md5 from 'md5';
import {
  LoginBody,
  LoginOrRegisterResponse,
  RegisterBody,
  MyInformationResponse,
  MyStats,
  BasicResponse,
  MyLeagueResponse, CreationLeagueResponse,
} from './responsesTypes';

const baseURL = 'http://185.26.49.230:8080/api';

export async function login(email: string, password: string): Promise<LoginOrRegisterResponse> {
  const hash = md5(password);
  const data: LoginBody = {
    user_mail: email,
    password: hash,
  };

  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/login`,
      data,
    });
    return { token: response.data.user_mail, error: false };
  } catch (error) {
    return { error: true };
  }
}

export async function register(
  username: string,
  email: string,
  phone: string,
  password: string,
  bio: string,
):
  Promise<LoginOrRegisterResponse> {
  const hash = md5(password);
  const data: RegisterBody = {
    username,
    user_mail: email,
    phone,
    password: hash,
    bio,
  };

  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/register`,
      data,
    });

    return { token: response.data.token, error: false };
  } catch (error) {
    return { error: true };
  }
}

export async function getUserInformation(token: string): Promise<MyInformationResponse> {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/profile`,
      headers: { token },
    });
    return { information: { ...response.data.user }, error: false };
  } catch (error) {
    return { error: true };
  }
}

export async function updateUserInformation(
  token: string,
  bio: string,
  username: string,
): Promise<MyInformationResponse> {
  try {
    const response = await axios({
      method: 'put',
      url: `${baseURL}/users`,
      headers: { token },
      data: {
        bio,
        username,
      },
    });
    return { information: { ...response.data.user }, error: false };
  } catch (error) {
    return { error: true };
  }
}

export async function getMyLeagues(token: string): Promise<MyLeagueResponse> {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/myLeagues`,
      headers: { token },
    });
    console.log(response.data);
    return { list: { ...response.data.leagues }, error: false };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

export async function getUserStats(token: string): Promise<MyStats> {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/stats/week`,
      headers: {
        token,
      },
    });

    return { stats: { ...response.data.message }, error: false };
  } catch (error) {
    return { error: true };
  }
}

export async function sendSteps(token: string, steps: number): Promise<BasicResponse> {
  try {
    await axios({
      method: 'post',
      url: `${baseURL}/stats`,
      headers: { token },
      data: { steps },
    });

    return { error: false };
  } catch (error) {
    return { error: true };
  }
}

export async function createLeague(
  token: string,
  leagueName: string,
  startDate: string,
  endDate: string,
  description: string,
): Promise<BasicResponse> {
  let userMail = '';
  getUserInformation(token).then(
    (response) => { userMail = response.information?.user_mail || ''; },
  );
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/leagues`,
      headers: { token },
      data: {
        creator_mail: userMail,
        league_name: leagueName,
        start_date: startDate,
        end_date: endDate,
        description,
      },
    });
    return { error: false };
  } catch (error) {
    return { error: true };
  }
}
