// pages/_app.tsx

import type { AppProps } from 'next/app';
import "./globals.css";
import Layout from './layout';
import NavBar from '@/src/app/components/NavBar';
import { ResponsiveProvider } from '@/src/app/contexts/ResponsiveContext';




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ResponsiveProvider>
      <Layout>
        <NavBar/>
      <Component {...pageProps} />
      </Layout>
      </ResponsiveProvider>
  );
}

export default MyApp;
