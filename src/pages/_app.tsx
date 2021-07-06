import React from 'react';
import { GetServerSideProps } from 'next';
import { AppProps } from 'next/app';
import { useStore } from '@/redux/store';
import AppProviders from '@/utils/AppProviders';
import { IncomingMessage } from 'http';
import cookie from 'cookie';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../@crema/services/index';

interface InitialProps {
  cookies: unknown;
}

function App({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const store = useStore(pageProps.initialReduxState);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector(`#jss-server-side`);
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppProviders cookies={cookies} store={store}>
      <Component {...pageProps} />
    </AppProviders>
  );
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || ``);
}

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    cookies: parseCookies(context?.req),
  },
});

export default App;
