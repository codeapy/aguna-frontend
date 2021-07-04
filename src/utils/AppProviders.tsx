import React from 'react';
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import { ApolloProvider } from '@apollo/client';
import client from '@/apollo-client';

const keycloakConfig = {
  realm: process.env.NEXT_PUBLIC_AUTH_REALM,
  url: process.env.NEXT_PUBLIC_AUTH_URL,
  clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT,
};

type AppProviderProps = {
  children: React.ReactNode;
  cookies: unknown;
};

function AppProviders({ children, cookies }: AppProviderProps) {
  return (
    <>
      <SSRKeycloakProvider
        keycloakConfig={keycloakConfig}
        persistor={SSRCookies(cookies)}
      >
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </SSRKeycloakProvider>
    </>
  );
}

export default AppProviders;
