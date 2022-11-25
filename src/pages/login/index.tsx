import React, { useState } from 'react'
import { history } from 'umi'

import { Button, Input, Form, Flex, Cell, Toast, Loading } from 'react-vant'
import { UserO, } from '@react-vant/icons'

interface IndexProps { }

const Index: React.FC<IndexProps> = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    history.push('/home');
  }
  return (
    <>
      <Loading style={{ display: 'inline-flex' }} size="24px" vertical>
        加载中...
      </Loading>
      {/* <Flex justify="around" align="center">
        <Flex.Item>
          <Form
            form={form}
            onFinish={onFinish}
            footer={
              <div style={{ margin: '16px 16px 0' }}>
                <Button round nativeType='submit' type='primary' block>
                  提交
                </Button>
              </div>
            }
          >
            <Form.Item
              tooltip={{
                message:
                  'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
              }}
              // intro='确保这是唯一的用户名'
              rules={[{ required: true, message: '请填写用户名' }]}
              name='username'
              label='用户名'
              leftIcon={<UserO />}
            >
              <Input placeholder='请输入用户名' />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: '请填写密码' }]}
              name='password'
              leftIcon={<UserO />}
              label='密码'
            >
              <Input placeholder='请输入密码' type='password' />
            </Form.Item>
          </Form>
        </Flex.Item>
      </Flex> */}

    </>
  )
};

export default Index;
