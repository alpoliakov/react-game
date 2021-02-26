import Head from 'next/head';
import React from 'react';

import { useSettingsQuery } from '../../lib/graphql/settings.graphql';

export default function Settings() {
  const { data, loading, refetch } = useSettingsQuery({ errorPolicy: 'ignore' });
  console.log(data.settings);

  return (
    <div style={{ minHeight: '82vh' }}>
      <Head>
        <title>Settings</title>
      </Head>
      <h1>Settings Page</h1>
    </div>
  );
}
