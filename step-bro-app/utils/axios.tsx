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
      headers: {
        token,
      },
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
      headers: {
        token,
      },
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
      headers: {
        token,
      },
    });
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

    console.log(response.data.user);
    return { stats: { ...response.data.message }, error: false };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

export async function sendSteps(token:string, steps:number): Promise<BasicResponse> {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/stats`,
      headers: {
        token,
      },
      data: {
        steps,
      },
    });

    console.log(response.data.user);
    return { error: false };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

export async function createLeague(
  token: string,
  league_name: string,
  start_date: string,
  end_date: string,
  description: string,
): Promise<CreationLeagueResponse> {
  let userMail = '';
  getUserInformation(token).then(
    (response) => { userMail = response.information?.user_mail || ''; },
  );

  try {
      const response = await axios({
      method: 'post',
      url: `${baseURL}/leagues`,
      headers: {
        token,
      },
      data: {
        league_name,
        start_date,
        end_date,
        description,
      },
    });

    console.log(response.data);
    return { league_id: response.data.league_id, error: false };
  } catch (error) {
    console.log(error);
    return { league_id: '', error: true };
  }
}
