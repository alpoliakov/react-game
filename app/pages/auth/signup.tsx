import { LockOutlined, MailOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Divider, Form, Input, Tooltip } from 'antd';
import { useAuth } from 'lib/useAuth';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function SignUp() {
  const [form] = Form.useForm();
  const { signUp } = useAuth();

  const onFinish = async (values: any) => {
    const { username, email, password } = values;
    await signUp(username, email, password);
  };

  return (
    <div style={{ minHeight: '83vh' }} className="flex justify-center items-center">
      <Head>
        <title>Sign Up Page</title>
      </Head>
      <Card style={{ width: 400 }} hoverable className="items-center self-center">
        <Form
          initialValues={{ remember: true }}
          layout="vertical"
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError>
          <Form.Item
            name="username"
            label={
              <span>
                Name&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}>
            <Input name="username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
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
            <Input name="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback>
            <Input.Password name="password" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  // eslint-disable-next-line no-undef
                  value ? Promise.resolve() : Promise.reject('Should accept agreement'),
              },
            ]}>
            <Checkbox>
              I have read the{' '}
              <Link href="/rules">
                <a>agreement</a>
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
            <Divider />
            Or{' '}
            <Link href="/auth/signin">
              <a>Login now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
