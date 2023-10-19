'use client';

import React, { createContext, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { User, UserContextProps, UserContextType } from './types';

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default function Providers({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UserContext.Provider>
  );
}
