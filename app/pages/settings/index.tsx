import Head from 'next/head';
import React, { useEffect } from 'react';

import Loader from '../../components/Loader';
import SettingForm from '../../components/SettingForm';
import { Setting, useSettingsQuery } from '../../lib/graphql/settings.graphql';

export default function Settings() {
  const { data, loading, refetch } = useSettingsQuery({ errorPolicy: 'ignore' });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div style={{ minHeight: '83vh' }} className="flex justify-center items-center">
      <Head>
        <title>Settings</title>
      </Head>
      {loading && <Loader show={loading} />}
      {!loading && data && data.settings && <SettingForm settings={data.settings as Setting[]} />}
    </div>
  );
}
