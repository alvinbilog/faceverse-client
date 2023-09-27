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

async function signout(email: string, password: string) {
  const response = await apiClient.post('auth/signout', { email, password });
  return response.data;
}

async function refresh() {
  await apiClient.post('auth/signout');
}
