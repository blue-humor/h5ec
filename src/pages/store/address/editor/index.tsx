import React, { useEffect, useState } from 'react';

import { history, useModel } from 'umi';

import { Card, Form, Input, Cascader, Button, Switch, Toast, Skeleton } from 'react-vant';

import NavBar from '@/components/NavBar';

import { addressEditor } from '@/utils/rules';
import { reqAddressAdd, reqAddressEdit } from '@/services/address/editor';

import cityJson from './city';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();

  const { query } = history.location;
  const { info }: any = query;

  // 编辑
  const handleAddressAdd = async (params: any) => {
    const res = await reqAddressAdd(params);
    if (res.code === 200) {
      Toast.success(res.message);
      history.goBack();
    }
  };
  // 添加
  const handleAddressEdit = async (params: any) => {
    const res = await reqAddressEdit(params);
    if (res.code === 200) {
      Toast.success(res.message);
      history.goBack();
    }
  };

  const handleOnFinish = (params: any) => {
    if (query?.id) {
      handleAddressEdit({ ...params, id: query.id });
    } else {
      handleAddressAdd({ ...params });
    }
  };
  return (
    <>
      {/* <NavBar title={` ${query?.id ? '编辑收货地址' : '添加收货地址'}`} /> */}

      <Card className={styles.container}>
        <Form
          form={form}
          onFinish={params => handleOnFinish(params)}
          initialValues={
            query?.id
              ? {
                  city: [info?.provinceName, info?.cityName],
                  name: info?.name,
                  phone: info?.phone,
                  detailAddress: info?.detailAddress,
                  isDefault: info?.isDefault,
                }
              : {}
          }
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType="submit" color="linear-gradient(to right, #1654ff, #1654ff)" block>
                保存
              </Button>
            </div>
          }
        >
          <Form.Item rules={addressEditor.name} name="name" label="收货人">
            <Input placeholder="请输入您的姓名" />
          </Form.Item>
          <Form.Item rules={addressEditor.phone} name="phone" label="手机号">
            <Input type="number" placeholder="请输入您的手机号" maxLength={11} />
          </Form.Item>
          <Form.Item name="city" label="地区" isLink rules={addressEditor.city}>
            <Cascader
              popup={{ round: true }}
              title="请选择所在地区"
              fieldNames={{
                text: 'text',
                value: 'text',
                children: 'children',
              }}
              options={cityJson}
            >
              {(_, selectedRows, actions) => <Input value={selectedRows.map(el => el.text).join(',')} readOnly placeholder="请选择所在地区" onClick={() => actions.open()} />}
            </Cascader>
          </Form.Item>
          <Form.Item name="detailAddress" label="详细地址">
            <Input.TextArea rows={3} autoSize maxLength={200} showWordLimit />
          </Form.Item>
          <Form.Item name="isDefault" controlAlign="right" label="是否设置默认地址" valuePropName="checked" labelWidth="160px">
            <Switch size={20} activeColor="#1654ff" inactiveColor="#dcdee0" />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Index;
