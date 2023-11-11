// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'react-native-bcrypt';
import {
  LoginBody, LoginOrRegisterResponse, RegisterBody, MyInformationResponse, MyStats,
} from './responsesTypes';

const md5 = require('md5');

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

    return { token: response.data, error: false };
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

    console.log(response.data.user);
    return { information: { ...response.data.user }, error: false };
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

export async function updateUserInformation(token: string, bio: string, username: string): Promise<MyInformationResponse> {
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

    console.log(response.data.user);
    return { information: { ...response.data.user }, error: false };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
