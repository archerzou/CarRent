import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

import store from '../store';
import '../styles/globals.css';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const persistor = persistStore(store);
  return (
    <>
      <Head>
        <title>MORENT</title>
        <meta
          name="description"
          content="MORENT-online renting car service for all of your needs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
};

export default App;
