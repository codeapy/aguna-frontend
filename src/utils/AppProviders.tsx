import React from 'react';
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';

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
        {children}
      </SSRKeycloakProvider>
    </>
  );
}

export default AppProviders;
