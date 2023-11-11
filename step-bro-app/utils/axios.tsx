import axios from 'axios';
import { LoginBody, LoginResponse } from './responsesTypes';

const baseURL = 'http://185.26.49.230:8080/api';

export async function login(email: string, password: string): Promise<LoginResponse> {
  const data: LoginBody = {
    user_mail: email,
    password,
  };
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/login`,
      data,
    });
    return { token: response.data.user_mail, error: false };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

export async function register(username: string, password: string): Promise<LoginResponse> {
  const data: LoginBody = {
    user_mail: username,
    password,
  };
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/register`,
      data: JSON.stringify({ username, password }),
    });
    console.log(response);
    return { token: response.data, error: false };
  } catch (error) {
    return { error: true };
  }
}
