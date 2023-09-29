import { AxiosResponse } from 'axios';
import apiClient from '../apiClient';

const authServices = { signup, signin, signout, refresh };

export default authServices;

async function signup(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  signal: AbortSignal
) {
  const response = await apiClient.post(
    'auth/signup',
    {
      firstName,
      lastName,
      email,
      password,
    },
    { signal }
  );
  console.log('response', response);
  return response.data;
}

async function signin(email: string, password: string, signal: AbortSignal) {
  const response = await apiClient.post(
    'auth/signin',
    { email, password },
    { signal }
  );
  return response.data;
}

async function signout() {
  const response = await apiClient.post('auth/signout');
  return response.data;
}

async function refresh() {
  await apiClient.post('auth/signout');
}
