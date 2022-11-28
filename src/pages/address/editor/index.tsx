import React, { useEffect, useState } from 'react';

import { history } from 'umi';

import { Card, Form, Input, Cascader, Button, Switch } from 'react-vant';

import NavBar from '@/components/NavBar';

import options from './city';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();

  const { query } = history.location;

  const handleOnFinish = (params: any) => {
    console.log({ ...params, ...query });
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <NavBar title={` ${query?.id ? '编辑收货地址' : '添加收货地址'}`} />

      <Card className={styles.container}>
        <Form
          form={form}
          onFinish={params => handleOnFinish(params)}
          initialValues={{
            switch: false,
          }}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType="submit" color="linear-gradient(to right, #ff6034, #ee0a24)" block>
                保存
              </Button>
            </div>
          }
        >
          <Form.Item rules={[{ required: true, message: '请输入您的姓名' }]} name="name" label="收货人">
            <Input placeholder="请输入您的姓名" />
          </Form.Item>
          <Form.Item rules={[{ required: true, message: '请输入您的手机号' }]} name="phone" label="手机号">
            <Input type="number" placeholder="请输入您的手机号" />
          </Form.Item>
          <Form.Item name="city" label="地区" isLink rules={[{ required: true, message: '请选择您的所在地区' }]}>
            <Cascader
              popup={{ round: true }}
              title="请选择所在地区"
              fieldNames={{
                text: 'text',
                value: 'text',
                children: 'children',
              }}
              options={options}
            >
              {(_, selectedRows, actions) => <Input value={selectedRows.map(el => el.text).join(',')} readOnly placeholder="请选择所在地区" onClick={() => actions.open()} />}
            </Cascader>
          </Form.Item>
          <Form.Item name="detailAddress" label="详细地址">
            <Input.TextArea rows={3} autoSize maxLength={200} showWordLimit />
          </Form.Item>

          <Form.Item name="defaultAddress" controlAlign="right" label="是否设置默认地址" valuePropName="checked" labelWidth="120px">
            <Switch size={20} activeColor="#fa4126" inactiveColor="#dcdee0" />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Index;
