import React, { useEffect, useState } from 'react';

import { Tabs, Cell, Typography, Card, ProductCard, Flex, Button, Image } from 'react-vant';

import NavBar from '@/components/NavBar';

import { reqOrder } from '@/services/order';

import styles from './index.less';

interface IndexProps {}

const tabs = [
  { key: -1, text: '全部' },
  { key: 5, text: '待付款' },
  { key: 10, text: '待发货' },
  { key: 40, text: '待收货' },
  { key: 50, text: '已完成' },
];

const Index: React.FC<IndexProps> = props => {
  const [defaultTab, setDefaultTab] = useState<number>(-1);

  const handleOrder = async (params: any) => {
    setDefaultTab(params);
    const res = await reqOrder({ orderStatus: params, memberId: 1 });
    console.log(res);
  };

  useEffect(() => {
    handleOrder(defaultTab);
    return () => {};
  }, []);

  return (
    <div className={styles.order_nav}>
      <NavBar title="我的订单" />
      <Tabs defaultActive={-1} lazyRender lazyRenderPlaceholder sticky swipeable color="#000000" offsetTop="10" onChange={v => handleOrder(v)}>
        {tabs.map(item => (
          <Tabs.TabPane key={item.key} name={item.key} title={item.text}>
            <Card className={styles.order_card}>
              <Cell title="订单号 AAAAAAAAAA" value={<Typography.Text type="danger">{item.text}</Typography.Text>} />
              <ProductCard num="2" price="2.00" desc="描述信息" title="商品名称" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
              <Flex style={{ margin: '20px 16px 0 0 ' }} justify="end" align="center">
                <Typography.Text size="xs">总价¥:100.00，</Typography.Text>
                <Typography.Text size="xs" style={{ margin: '0 6px 0 0 ' }}>
                  运费¥:10.00
                </Typography.Text>
                <Typography.Text size="md" type="danger">
                  实付¥:100.00
                </Typography.Text>
              </Flex>
              <Flex style={{ margin: '14px 10px 0 0 ' }} justify="end">
                <Button size="small" round plain style={{ marginRight: 2 }}>
                  取消订单
                </Button>
                <Button className={styles.button_width} size="small" round color="linear-gradient(to right, #ff6034, #ee0a24)">
                  付款
                </Button>
              </Flex>
            </Card>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Index;
