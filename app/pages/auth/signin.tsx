import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Divider, Form, Input } from 'antd';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

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

export default function SignIn() {
  const { signIn } = useAuth();

  const onFinish = async (values: any) => {
    const { email, password } = values;
    await signIn(email, password);
  };

  return (
    <div style={{ minHeight: '83vh' }} className="flex justify-center items-center">
      <Head>
        <title>Sign In</title>
      </Head>
      <motion.div initial="initial" animate="enter" exit="exit" variants={postVariants}>
        <Card
          style={{ width: 400 }}
          hoverable
          className="items-center self-center dark:bg-gray-900">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}>
            <Form.Item
              label={<span className="text-gray-900 dark:text-gray-100">E-mail</span>}
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}>
              <Input
                name="email"
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-900 dark:text-gray-100">Password</span>}
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input.Password
                name="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-gray-900 dark:text-gray-100">Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '100%' }}>
                Log in
              </Button>
              <Divider />
              <span className="text-gray-900 dark:text-gray-100">
                Or{' '}
                <Link href="/auth/signup">
                  <a>register now!</a>
                </Link>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
