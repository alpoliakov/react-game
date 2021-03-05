import Head from 'next/head';
import React, { useEffect } from 'react';

import GameField from '../../components/GameField';
import Loader from '../../components/Loader';
import { useSettingsQuery } from '../../lib/graphql/settings.graphql';

export default function Game({ id }) {
  const { data, loading, refetch } = useSettingsQuery({ errorPolicy: 'ignore' });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div style={{ minHeight: '84vh' }} className="flex justify-center items-center">
      <Head>
        <title>Game</title>
      </Head>
      {loading && <Loader show={loading} />}
      {!loading && data && data.settings && <GameField id={data.settings[0]._id} />}
    </div>
  );
}

Game.getInitialProps = ({ query: { id } }) => {
  return { id };
};
