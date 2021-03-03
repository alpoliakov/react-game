import { DeleteOutlined, HomeOutlined, RollbackOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const { Meta } = Card;

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Loader from '../../components/Loader';
import SettingForm from '../../components/SettingForm';
import { initializeApollo } from '../../lib/apollo';
import { CurrentUserDocument } from '../../lib/graphql/currentUser.graphql';
import { useDeleteUserMutation } from '../../lib/graphql/deleteUser.graphql';
import { Setting, useSettingsQuery } from '../../lib/graphql/settings.graphql';
import { useAuth } from '../../lib/useAuth';

const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

export default function User({ id }) {
  const [deleteUser] = useDeleteUserMutation();
  const { signOut } = useAuth();
  const router = useRouter();

  const { data, loading, refetch } = useSettingsQuery({ errorPolicy: 'ignore' });

  useEffect(() => {
    refetch();
  }, []);

  const [user, setUser] = useState({
    _id: '',
    username: '',
    email: '',
  });

  const fetchSetting = async () => {
    const apollo = initializeApollo();
    const { data } = await apollo.query({
      query: CurrentUserDocument,
      variables: { userId: id },
    });
    setUser(data.currentUser);
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  const onDelete = async (e) => {
    e.preventDefault();

    try {
      const { data } = await deleteUser({
        variables: { id },
      });
      if (data.deleteUser) {
        signOut();
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <div style={{ minHeight: '83vh' }} className="flex justify-center items-center">
      <Head>
        <title>Profile</title>
      </Head>
      {loading && <Loader show={loading} />}
      {!loading && data && data.settings && (
        <motion.div initial="initial" animate="enter" exit="exit" variants={postVariants}>
          <Card
            style={{ width: 400 }}
            hoverable
            className="items-center self-center dark:bg-gray-900"
            actions={[
              <Link key="back" href="/">
                <Tooltip title="To start page">
                  <HomeOutlined style={{ fontSize: '20px' }} />
                </Tooltip>
              </Link>,
              <Tooltip key="back" title="Return">
                <RollbackOutlined style={{ fontSize: '20px' }} onClick={() => router.back()} />
              </Tooltip>,
              <Tooltip key="delete" title="Remove account">
                <DeleteOutlined style={{ fontSize: '20px' }} onClick={onDelete} />
              </Tooltip>,
            ]}>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <span className="text-2xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  {`User: ${user.username}`}
                </span>
              }
              description={
                <span className="text-xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  {`Email: ${user.email}`}
                </span>
              }
            />
            <Divider />
            <div className="flex align-center justify-between">
              <p className="mt-3 text-xl leading-8 dark:text-gray-100">{`Wallet: ${data.settings[0].money}`}</p>
              <p className="mt-3 text-xl leading-8 dark:text-gray-100">{`Bet: ${data.settings[0].rate}`}</p>
            </div>
            <div className="flex align-center justify-between">
              <p className="mt-3 text-xl leading-8 dark:text-gray-100">{`Games: ${data.settings[0].games}`}</p>
              <p className="mt-3 text-xl leading-8 dark:text-gray-100">{`Balance: ${data.settings[0].balance}`}</p>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

User.getInitialProps = ({ query: { id } }) => {
  return { id };
};
