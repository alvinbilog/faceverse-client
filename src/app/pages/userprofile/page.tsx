'use client';
import apiClient from '@/app/api/apiClient';
import { UserData } from '@/app/types';
import { useQuery } from 'react-query';

const UserProfile = () => {
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
  console.log('data', data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data?.data.name}</h1>
      <p>{data?.data.email}</p>
    </div>
  );
};

export default UserProfile;
