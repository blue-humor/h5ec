import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Card, Cell, Form, Input, ProductCard, ActionBar, Button, Skeleton, Typography } from 'react-vant';
import { Add, ShopO, createFromIconfontCN } from '@react-vant/icons';

import NavBar from '@/components/NavBar';

import RemarkModel from './components/RemarkModel';

import { reqOrderDetail } from '@/services/pay';

import styles from './index.less';

interface IndexProps {}

// const content = 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。';

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();

  const [showClose, setShowClose] = useState(false);

  const [remark, setRemark] = useState('');

  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [orderAddress, setOrderAddress] = useState<any>(null);

  const [orderId, setOrderId] = useState<any>(null);

  const [addressId, setAddressId] = useState<number>(0);

  //关闭弹框
  const handleShowClose = (params: boolean) => {
    setShowClose(params);
  };

  //提交表单
  const onFinish = (values: any) => {
    console.log({ ...values, remark });
  };

  // 生成订单
  const handlerOrderDetail = async (params: any) => {
    const res = await reqOrderDetail(params);
    if (res?.code === 200) {
      setAddressId(res.data.addressId);
      setOrderDetail(res.data.goods);
      setOrderAddress(res.data.address);
    }
  };

  //订单路由参数
  const handlePathQuery = () => {
    history.push({
      pathname: '/address/list',
      query: {
        orderId,
      },
    });
  };

  useEffect(() => {
    const { query } = history.location;
    setOrderId(query?.orderId);
    handlerOrderDetail(query);

    return () => {};
  }, []);

  return (
    <>
      <NavBar title="订单确认" />
      {addressId === 0 || undefined ? (
        <Cell
          className={styles.payAdd}
          title="添加收获地址"
          isLink
          icon={<Add color="#fa4126" />}
          style={{ margin: '6px 0 6px 0' }}
          onClick={() => {
            handlePathQuery();
          }}
        />
      ) : (
        <Card className={styles.addressCard}>
          <Cell
            className={styles.payAdd}
            center
            onClick={e => {
              // e.preventDefault()
              handlePathQuery();
            }}
            title={
              <>
                {orderAddress?.city.map((item: any) => {
                  return <Typography.Text>{item}</Typography.Text>;
                })}
                <Typography.Text style={{ margin: '0 0 0 4px' }}>{orderAddress?.detailAddress}</Typography.Text>
              </>
            }
            label={`${orderAddress?.name} ${orderAddress?.phone}`}
            isLink
          />
        </Card>
      )}

      {orderDetail === null ? (
        <Skeleton row={10} style={{ margin: '40px 0 0 0' }} />
      ) : (
        <div>
          <Card style={{ margin: '10px 0 0 0 ' }}>
            <Cell title="店铺名" icon={<ShopO />} />
            <ProductCard num="2" price={orderDetail?.price} desc={orderDetail?.sku} title={orderDetail?.title} thumb={orderDetail?.imgUrl} />
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={{
                rental: `¥${18888888888}`,
                freight: orderDetail?.freight,
                // invoice: '暂不开发票',
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
            </Form>
            <Form.Item isLink label="备注" onClick={() => handleShowClose(true)}>
              <Input align="right" placeholder="选项，建议和商家沟通确认" value={remark} readOnly />
            </Form.Item>

            <Cell
              title
              value={
                <Typography.Title type="danger">
                  <span className={styles.pay_heji}>合计：</span>¥217271
                </Typography.Title>
              }
            />
          </Card>

          <RemarkModel handleShowClose={handleShowClose} showClose={showClose}>
            <Card className={styles.pay_remark_card} round>
              <Input.TextArea autoFocus maxLength={200} showWordLimit placeholder="请输入文本" autoSize={{ minHeight: 200 }} onChange={v => setRemark(v)} />
            </Card>
          </RemarkModel>
        </div>
      )}
    </>
  );
};

export default Index;
