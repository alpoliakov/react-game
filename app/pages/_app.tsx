import '../styles/globals.css';

import { ThemeProvider } from 'next-themes';
import React from 'react';

import Footer from '../components/Footer';
import ThemeChanger from '../components/ThemeChanger';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <ThemeChanger />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
