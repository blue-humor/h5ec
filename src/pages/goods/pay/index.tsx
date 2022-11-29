import React, { useState } from 'react';
import { history } from 'umi';
import { Card, Cell, Form, Input, ProductCard, ActionBar, Button, Flex, Typography } from 'react-vant';
import { Add, ShopO, createFromIconfontCN } from '@react-vant/icons';

import NavBar from '@/components/NavBar';

import RemarkModel from './components/RemarkModel';

import styles from './index.less';

interface IndexProps {}

const content = 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。';

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();
  // const remark = Form.useWatch('remark', form);

  const [showClose, setShowClose] = useState(false);

  const [remark, setRemark] = useState('选项，建议和商家沟通确认');

  const handleShowClose = (params: boolean) => {
    setShowClose(params);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <NavBar title="订单确认" />
      {/* <Cell
        className={styles.payAdd}
        title="添加收获地址"
        isLink
        icon={<Add color="#fa4126" />}
        style={{ margin: '6px 0 6px 0' }}
        onClick={() => {
          history.push('/address/list');
        }}
      /> */}
      <Card className={styles.addressCard}>
        <Cell
          className={styles.payAdd}
          center
          onClick={e => {
            // e.preventDefault()
            history.push('/address/list');
          }}
          title={<Typography.Text>{content}</Typography.Text>}
          label="大力 16877898876"
          isLink
        />
      </Card>

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
          {/* <Form.Item isLink label="发票" name="invoice">
            <Input align="right" readOnly />
          </Form.Item> */}
          <Cell
            isLink
            title="商家备注"
            onClick={() => handleShowClose(true)}
            value={
              <Typography.Text
                color="#969799"
                ellipsis={{
                  rows: 1,
                }}
              >
                {remark}
              </Typography.Text>
            }
          />
        </Form>
      </Card>

      <RemarkModel handleShowClose={handleShowClose} showClose={showClose}>
        <Card style={{ margin: '50px 20px 20px  20px' }}>
          <Input.TextArea autoFocus maxLength={200} showWordLimit placeholder="请输入文本" autoSize={{ minHeight: 200 }} onChange={v => setRemark(v)} />
        </Card>
      </RemarkModel>
    </>
  );
};

export default Index;
