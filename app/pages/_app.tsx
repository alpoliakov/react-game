import '../styles/globals.css';
import 'antd/dist/antd.css';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'lib/apollo';
import { AuthProvider } from 'lib/useAuth';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import Footer from '../components/Footer';
import ThemeChanger from '../components/ThemeChanger';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider attribute="class">
        <AuthProvider>
          <ThemeChanger />
          <Component {...pageProps} />
          <Footer />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
