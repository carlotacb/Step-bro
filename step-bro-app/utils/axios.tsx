import axios from 'axios';
import bcrypt from 'react-native-bcrypt';
import {
  LoginBody, LoginResponse, RegisterBody, WeekRecord,
} from './responsesTypes';

const baseURL = 'http://185.26.49.230:8080/api';
const salt = bcrypt.genSaltSync(10);

export async function login(email: string, password: string): Promise<LoginResponse> {
  const hash = bcrypt.hashSync(password, salt);
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
  Promise<LoginResponse> {
  const hash = bcrypt.hashSync(password, salt);
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

export async function getUserInfo(token:string):
  Promise<{token:string}> {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/stats/week`,
      headers: {
        token,
      },
    });

    return { ...response.data, error: false };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
