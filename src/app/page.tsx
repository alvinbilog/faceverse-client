'use client';

import { useQuery } from 'react-query';
import userServices from './users/usersApi';

export default function Home() {
  const { isLoading, isError, data, error } = useQuery<any, any, any>({
    queryKey: ['user'],
    queryFn: () => userServices.getUsers(),
  });
  if (isLoading) return <div>...Loading</div>;
  if (isError) return <div>Error:{error.message}</div>;
  return (
    <main>
      <h1>home</h1>
      //test
      {data?.data?.map((user: any) => (
        <li key={user.firstName}>{user.firstName}</li>
      ))}
    </main>
  );
}
