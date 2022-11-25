import React, { useState } from 'react';
import { history } from 'umi';
import { Card, Cell, Form, Input, ProductCard, ActionBar, Button, Popup } from 'react-vant';
import { Add, ShopO, createFromIconfontCN } from '@react-vant/icons';

import NavBar from '@/components/NavBar';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();
  const remark = Form.useWatch('remark', form);

  const [visible, setVisible] = useState(false);
  const onCancel = () => setVisible(false);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <NavBar title="订单确认" />
      <Cell
        className={styles.payAdd}
        title="添加收获地址"
        isLink
        icon={<Add color="#fa4126" />}
        style={{ margin: '6px 0 6px 0' }}
        onClick={() => {
          history.push('/address');
        }}
      />
      <Card>
        <Cell title="店铺名" icon={<ShopO />} />
        <ProductCard num="2" price="2.00" desc="描述信息" title="商品名称" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            rental: `¥${18888888888}`,
            freight: '免运费',
            invoice: '暂不开发票',
            // remark: 's1s1s1'
          }}
          footer={
            <>
              <ActionBar safeAreaInsetBottom style={{ padding: '16px' }}>
                <Button round nativeType="submit" color="linear-gradient(to right, #ff6034, #ee0a24)" block>
                  提交订单
                </Button>
              </ActionBar>
            </>
          }
        >
          <Form.Item label="商品总额" name="rental">
            <Input align="right" readOnly />
          </Form.Item>
          <Form.Item label="运费" name="freight">
            <Input align="right" readOnly />
          </Form.Item>
          <Form.Item isLink label="发票" name="invoice">
            <Input align="right" readOnly />
          </Form.Item>
          <Form.Item label="商家备注" name="remark">
            <Input.TextArea maxLength={300} showWordLimit placeholder="请输入文本" autoSize={{ minHeight: 100 }} />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Index;
