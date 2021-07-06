import React from 'react';
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import { ApolloProvider } from '@apollo/client';
import client from '@/apollo-client';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ContextProvider from '../@crema/utility/ContextProvider';
import CremaThemeProvider from '../@crema/utility/CremaThemeProvider';
import CremaStyleProvider from '../@crema/utility/CremaStyleProvider';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import PageMeta from '../@crema/core/PageMeta';
import { LocaleProvider } from '../@crema';

const keycloakConfig = {
  realm: process.env.NEXT_PUBLIC_AUTH_REALM,
  url: process.env.NEXT_PUBLIC_AUTH_URL,
  clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT,
};

type AppProviderProps = {
  children: React.ReactNode;
  cookies: unknown;
  store: any;
};

function AppProviders({ children, cookies, store }: AppProviderProps) {
  return (
    <>
      <PageMeta />
      <ContextProvider>
        <Provider store={store}>
          <CremaThemeProvider>
            <CremaStyleProvider>
              <LocaleProvider>
                <SSRKeycloakProvider
                  keycloakConfig={keycloakConfig}
                  persistor={SSRCookies(cookies)}
                >
                  <AuthRoutes>
                    <ApolloProvider client={client}>
                      <CssBaseline />
                      {children}
                    </ApolloProvider>
                  </AuthRoutes>
                </SSRKeycloakProvider>
              </LocaleProvider>
            </CremaStyleProvider>
          </CremaThemeProvider>
        </Provider>
      </ContextProvider>
    </>
  );
}

export default AppProviders;
