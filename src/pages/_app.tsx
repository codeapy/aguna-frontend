import React from 'react';
import { AppProps } from 'next/app';
import { useStore } from '@/redux/store';
import AppProviders from '@/context/AppProviders';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../@crema/services/index';

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector(`#jss-server-side`);
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppProviders store={store}>
      <Component {...pageProps} />
    </AppProviders>
  );
}

export default App;
