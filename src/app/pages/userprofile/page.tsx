'use client';
import apiClient from '@/app/api/apiClient';
import { UserContext } from '@/app/providers';
import { UserContextProps, UserData } from '@/app/types';
import { createContext, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext) as UserContextProps;
  const { data, error, isLoading } = useQuery<UserData, Error>(
    'me/user',
    async () => {
      const response = await apiClient.get('me/user', {
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    }
  );
  useEffect(() => {
    if (data) setUser(data);
    console.log('user in userProfile', user);
  }, [data, setUser]);
  console.log('user in userProfile outside', user);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>
        {data?.data.firstName} {data?.data.lastName}
      </h1>
      <p>{data?.data.email}</p>
    </div>
  );
};

export default UserProfile;
