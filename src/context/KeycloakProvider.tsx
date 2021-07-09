import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import AuthRoutes from '@/@crema/utility/AuthRoutes';
import React from 'react';
import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  realm: process.env.NEXT_PUBLIC_AUTH_REALM,
  url: process.env.NEXT_PUBLIC_AUTH_URL,
  clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT,
};

export default function KeycloakProvider({ children, cookies }: any) {
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakConfig}
      persistor={SSRCookies(cookies)}
      autoRefreshToken
    >
      <AuthRoutes>{children}</AuthRoutes>
    </SSRKeycloakProvider>
  );
}
