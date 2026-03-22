'use client';

import { ApolloProvider } from '@apollo/client/react';
import { InMemoryCache, HttpLink, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3003/graphql', credentials: 'include' }),
  cache: new InMemoryCache(),
});

export default function GraphQlProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>

  );
}