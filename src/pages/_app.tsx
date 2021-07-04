import { AppContext, AppProps } from 'next/app';
import '../config';
import { IncomingMessage } from 'http';
import '@/styles/global.css';
import cookie from 'cookie';
import AppProviders from '../utils/AppProviders';

interface InitialProps {
  cookies: unknown;
}

function App({ Component, pageProps, cookies }: AppProps & InitialProps) {
  return (
    <AppProviders cookies={cookies}>
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

App.getInitialProps = async (context: AppContext) => ({
  cookies: parseCookies(context?.ctx?.req),
});

export default App;
