import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/apollo-client';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import KeycloakProvider from '@/context/KeycloakProvider';
import ContextProvider from '../@crema/utility/ContextProvider';
import CremaThemeProvider from '../@crema/utility/CremaThemeProvider';
import CremaStyleProvider from '../@crema/utility/CremaStyleProvider';
import PageMeta from '../@crema/core/PageMeta';
import { LocaleProvider } from '../@crema';

type AppProviderProps = {
  children: React.ReactNode;
  store: any;
};

function AppProviders({ children, store }: AppProviderProps) {
  return (
    <>
      <PageMeta />
      <ContextProvider>
        <Provider store={store}>
          <CremaThemeProvider>
            <CremaStyleProvider>
              <LocaleProvider>
                <KeycloakProvider>
                  <ApolloProvider client={client}>
                    <CssBaseline />
                    {children}
                  </ApolloProvider>
                </KeycloakProvider>
              </LocaleProvider>
            </CremaStyleProvider>
          </CremaThemeProvider>
        </Provider>
      </ContextProvider>
    </>
  );
}

export default AppProviders;
