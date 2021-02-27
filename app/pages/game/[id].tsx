import Head from 'next/head';
import React from 'react';

export default function Game({ id }) {
  console.log(id);

  return (
    <div style={{ minHeight: '83vh' }} className="flex justify-center items-center">
      <Head>
        <title>Game</title>
      </Head>
      <h1 className="text-gray-600 dark:text-gray-100 uppercase shadow__item">Game Page</h1>
    </div>
  );
}

Game.getInitialProps = ({ query: { id } }) => {
  return { id };
};
