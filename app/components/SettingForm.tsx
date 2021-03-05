import { CheckOutlined, CloseOutlined, HomeOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, InputNumber, Slider, Switch, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useEditSettingMutation } from '../lib/graphql/editSetting.graphql';
import { Setting } from '../lib/graphql/settings.graphql';
import { useAuth } from '../lib/useAuth';

interface Props {
  settings: Setting[];
}

export default function SettingForm(props: Props) {
  const { settings } = props;
  const [editSetting] = useEditSettingMutation();
  const [form] = Form.useForm();
  const router = useRouter();

  const { user } = useAuth();

  const [state, setState] = useState({} as any);

  useEffect(() => {
    if (settings) {
      settings.map((setting) => {
        const { _id, sound, music, volume, money, rate, balance, games, complexity } = setting;
        setState({
          _id,
          sound,
          music,
          volume,
          money,
          rate,
          balance,
          games,
          complexity,
        });
      });
    }
  }, [settings]);

  const { _id, sound, music, volume, money, rate, balance, games, complexity } = state;

  useEffect(() => {
    form.setFieldsValue({
      money,
      rate,
      sound,
      music,
      complexity,
      volume,
    });
  }, [state]);

  const onFinish = async (values) => {
    try {
      const { data } = await editSetting({
        variables: {
          input: { id: _id, sound, volume, music, money, rate, balance, games, complexity },
        },
      });
      if (data.editSetting._id) {
        toast.success('Changes saved!');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  function onChangeValue(value) {
    setState({ ...state, volume: value });
  }

  return (
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
      ]}>
      <h1 className="block text-base text-center text-orange-600 dark:text-pink-500 font-semibold tracking-wide uppercase">
        Game settings
      </h1>
      <Form
        initialValues={{ remember: true }}
        layout="vertical"
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError>
        <Form.Item>
          <div style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              style={{ display: 'inline-block' }}
              name="money"
              label={<span className="text-gray-900 dark:text-gray-100">Wallet</span>}
              rules={[{ required: true, type: 'number', min: 100, max: 50000 }]}>
              <InputNumber name="money" onChange={(data) => setState({ ...state, money: data })} />
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block' }}
              name="rate"
              label={<span className="text-gray-900 dark:text-gray-100">Bet</span>}
              rules={[{ required: true, type: 'number', min: 10, max: 1000 }]}>
              <InputNumber name="rate" onChange={(data) => setState({ ...state, rate: data })} />
            </Form.Item>
          </div>
          <div style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              name="sound"
              label={<span className="text-gray-900 dark:text-gray-100">Sound</span>}>
              <Switch
                checked={sound}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(data) => setState({ ...state, sound: data })}
              />
            </Form.Item>
            <Form.Item
              name="music"
              label={<span className="text-gray-900 dark:text-gray-100">Music</span>}>
              <Switch
                checked={music}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(data) => setState({ ...state, music: data })}
              />
            </Form.Item>
            <Form.Item
              name="complexity"
              label={<span className="text-gray-900 dark:text-gray-100">Complexity</span>}>
              <Switch
                checked={complexity}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(data) => setState({ ...state, complexity: data })}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="volume"
            label={<span className="text-gray-900 dark:text-gray-100">Volume</span>}>
            <Slider disabled={!sound} onChange={onChangeValue} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
