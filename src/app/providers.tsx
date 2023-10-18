'use client';

import React, { createContext, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextType } from './types';

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
export default function Providers({ children }: any) {
  const [postAuthorId, setPostAuthorId] = useState<number[] | null>([]);
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <UserContext.Provider value={{ postAuthorId, setPostAuthorId }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UserContext.Provider>
  );
}
