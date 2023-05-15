import Layout from '@/components/Layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  console.log('App');

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
