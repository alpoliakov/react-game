import { Button } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div style={{ minHeight: '83vh' }} className="relative py-16">
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-orange-600 dark:text-pink-500 font-semibold tracking-wide uppercase">
              Introducing
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              blackjack, start
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi,
            nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at
            in viverra scelerisque eget. Eleifend egestas fringilla sapien.
          </p>
        </div>
        <div className="mt-6 prose prose-orange dark:prose-dark dark:prose-pink prose-lg mx-auto">
          <Button>Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  );
}
