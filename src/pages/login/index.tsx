import React, { useState } from 'react';
import { history } from 'umi';

import { Button, Input, Form, Flex, Cell, Toast, Loading, Card } from 'react-vant';
import { UserO } from '@react-vant/icons';

import { reqLogin } from '@/services/login';
import { login } from '@/utils/rules';

import styles from './index.less';

import { LoginDataType } from './data';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: LoginDataType) => {
    const res = await reqLogin(values);
    if (res?.code === 200) {
      window.localStorage.setItem('token', res.token);
      Toast(res.message);
      history.push('/home');
      return;
    } else {
      Toast(res.message);
    }
  };
  return (
    <>
      <div className={styles.login_nav}>
        <Flex justify="around" align="center">
          <Flex.Item>
            <Form
              form={form}
              onFinish={onFinish}
              footer={
                <div style={{ margin: '16px 16px 0' }}>
                  <Button round nativeType="submit" type="primary" block>
                    登陆
                  </Button>
                </div>
              }
            >
              <Form.Item
                tooltip={{
                  message: 'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
                }}
                // intro='确保这是唯一的用户名'
                rules={login.username}
                name="username"
                label="用户名"
                leftIcon={<UserO />}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                rules={login.password}
                name="password"
                leftIcon={<UserO />}
                label="密码"
                tooltip={{
                  message: 'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
                }}
              >
                <Input placeholder="请输入密码" type="password" />
              </Form.Item>
            </Form>
          </Flex.Item>
        </Flex>
      </div>
    </>
  );
};

export default Index;
