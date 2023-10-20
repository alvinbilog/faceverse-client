'use client';

import React, { createContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProps, UserContextType, UserData } from './types';

export const UserContext = createContext<UserContextProps | null>(null);

export default function Providers({ children }: any) {
  const [user, setUser] = useState<UserData | null>(null);
  const [queryClient] = React.useState(() => new QueryClient());
  useEffect(() => {
    console.log('User state in Providers:', user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UserContext.Provider>
  );
}
