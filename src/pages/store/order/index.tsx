import React, { useEffect, useState } from 'react';

import { history } from 'umi';

import { Tabs, Cell, Typography, Card, ProductCard, Flex, Button, Divider } from 'react-vant';

import NavBar from '@/components/NavBar';
import Refresh from '@/components/Refresh';

import { priceFormat } from '@/utils/index';

import { reqOrder } from '@/services/order';

import styles from './index.less';

interface IndexProps {}

const tabs = [
  { key: '-1', text: '全部' },
  { key: '5', text: '待付款' },
  { key: '10', text: '待发货' },
  { key: '40', text: '待收货' },
  { key: '50', text: '已完成' },
];

const Index: React.FC<IndexProps> = props => {
  const { defaultType }: any = history.location.query;
  const [defaultTab, setDefaultTab] = useState<string>(defaultType);

  const [ordersList, setOrdersList] = useState<any>([]);
  const [params, setParams] = useState({
    current: 1,
    pageSize: 20,
  });

  const handleOrder = async (params: any, v: any) => {
    setDefaultTab(v);
    const res = await reqOrder({ status: v, ...params });
    if (res?.code === 200) {
      setOrdersList(res?.data);
    }
  };

  useEffect(() => {
    handleOrder(params, defaultTab);
    return () => {};
  }, []);

  return (
    <div className={styles.order_nav}>
      <NavBar title="我的订单" />
      <Tabs style={{ zIndex: '1' }} sticky defaultActive={defaultTab} lazyRender lazyRenderPlaceholder swipeable color="#000000" offsetTop="48" onChange={(v: any) => handleOrder(params, v)}>
        {tabs.map(item => (
          <Tabs.TabPane key={item.key} name={item.key} title={item.text}>
            {ordersList?.map((item: any) => {
              return (
                <Card className={styles.order_card} key={item?.id}>
                  <Cell title={`订单号：${item?.orderNo} `} value={<Typography.Text type="danger">{item?.orderStatusName}</Typography.Text>} />
                  <ProductCard
                    num={`${item?.buyQuantity}`}
                    price={`${priceFormat(item?.itemPaymentAmount, 2)}`}
                    title={
                      <Typography.Text ellipsis={2} className={styles.orderTitle}>
                        {item?.goodsName}
                      </Typography.Text>
                    }
                    thumb={`${item?.goodsPictureUrl}`}
                  />
                  <Flex style={{ margin: '20px 16px 0 0 ' }} justify="end" align="center">
                    <Typography.Text size="sm">总价¥:{priceFormat(item?.paymentAmount, 2)}，</Typography.Text>
                    <Typography.Text size="sm" style={{ margin: '0 6px 0 0 ' }}>
                      运费¥:0
                    </Typography.Text>
                    <Typography.Text size="md" type="danger">
                      实付¥:{priceFormat(item?.paymentAmount, 2)}
                    </Typography.Text>
                  </Flex>
                  <Flex style={{ margin: '14px 10px 0 0 ' }} justify="end">
                    <Button size="small" round plain style={{ marginRight: 2 }}>
                      取消订单
                    </Button>
                    <Button
                      className={styles.button_width}
                      size="small"
                      round
                      color="linear-gradient(to right, #e05555, #ce3737)"
                      onClick={() =>
                        history.push({
                          pathname: '/goods/pay',
                          query: {
                            orderId: item?.id,
                          },
                        })
                      }
                    >
                      待付款
                    </Button>
                  </Flex>
                </Card>
              );
            })}
            <Divider dashed>暂无更多订单</Divider>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Index;
