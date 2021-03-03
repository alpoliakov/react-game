import '../styles/globals.css';
import 'antd/dist/antd.css';

import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
import { useApollo } from 'lib/apollo';
import { AuthProvider } from 'lib/useAuth';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import Footer from '../components/Footer';
import ThemeChanger from '../components/ThemeChanger';

function MyApp({ Component, pageProps, router }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider attribute="class">
        <AuthProvider>
          <ThemeChanger />
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
          <Footer />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
