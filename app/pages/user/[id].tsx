import { DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Tooltip } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const { Meta } = Card;

import Loader from '../../components/Loader';
import SettingForm from '../../components/SettingForm';
import { initializeApollo } from '../../lib/apollo';
import { CurrentUserDocument } from '../../lib/graphql/currentUser.graphql';
import { useDeleteUserMutation } from '../../lib/graphql/deleteUser.graphql';
import { Setting, useSettingsQuery } from '../../lib/graphql/settings.graphql';

export default function User({ id }) {
  const [deleteUser] = useDeleteUserMutation();

  const { data, loading, refetch } = useSettingsQuery({ errorPolicy: 'ignore' });

  useEffect(() => {
    refetch();
  }, []);

  const [user, setUser] = useState({
    _id: '',
    username: '',
    email: '',
  });

  const fetchStream = async () => {
    const apollo = initializeApollo();
    const { data } = await apollo.query({
      query: CurrentUserDocument,
      variables: { userId: id },
    });
    setUser(data.currentUser);
  };

  useEffect(() => {
    fetchStream();
  }, []);

  return (
    <div style={{ minHeight: '83vh' }} className="flex justify-center items-center">
      <Head>
        <title>Profile</title>
      </Head>
      {loading && <Loader show={loading} />}
      {!loading && data && data.settings && (
        <Card
          style={{ width: 400 }}
          hoverable
          className="items-center self-center"
          actions={[
            <Link key="back" href={`/game/${user._id}`}>
              <Tooltip title="Back">
                <RollbackOutlined style={{ fontSize: '20px' }} />
              </Tooltip>
            </Link>,
            <Tooltip key="delete" title="Remove">
              <DeleteOutlined style={{ fontSize: '20px' }} />
            </Tooltip>,
          ]}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={
              <span className="text-2xl leading-8 font-extrabold tracking-tight text-gray-900">
                {`User: ${user.username}`}
              </span>
            }
            description={
              <span className="text-xl leading-8 font-extrabold tracking-tight text-gray-900">
                {`Email: ${user.email}`}
              </span>
            }
          />
          <Divider />
          <p className="mt-3 text-l leading-8">{`Money: ${data.settings[0].money}`}</p>
          <p className="mt-3 text-l leading-8">{`Rate: ${data.settings[0].rate}`}</p>
        </Card>
      )}
    </div>
  );
}

User.getInitialProps = ({ query: { id } }) => {
  return { id };
};
