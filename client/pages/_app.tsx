// pages/_app.tsx
import type { AppProps } from 'next/app';
import "./globals.css";
import Layout from './layout';
import NavBar from '@/src/app/components/NavBar';




function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Layout>
        <NavBar/>
      <Component {...pageProps} />
      </Layout>
  );
}

export default MyApp;
