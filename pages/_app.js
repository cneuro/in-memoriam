import Head from 'next/head';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import { useStore } from '@/store';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <title>in-memoriam</title>

        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
      </Head>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
