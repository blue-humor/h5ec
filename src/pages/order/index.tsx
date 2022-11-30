import React from 'react';

import { Tabs, Cell, Typography, Card, ProductCard, Flex, Button, Image } from 'react-vant';

import NavBar from '@/components/NavBar';

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
  return (
    <div className={styles.order_nav}>
      <NavBar title="我的订单" />
      <Tabs sticky swipeable={true} color="#000000" offsetTop="10">
        {tabs.map(item => (
          <Tabs.TabPane key={item.key} title={item.text}>
            <Card className={styles.order_card}>
              <Cell title="订单号 AAAAAAAAAA" value={<Typography.Text type="danger">{item.text}</Typography.Text>} />
              <Flex className="demo-product-card" align="stretch">
                <Image width={100} src="https://img.yzcdn.cn/vant/ipad.jpeg" className="demo-product-card__img" />
                <Flex direction="column" justify="between" className="demo-product-card__content">
                  <div>
                    <Typography.Title level={5}>商品标题</Typography.Title>
                    <Typography.Text type="secondary">这里是商品描述</Typography.Text>
                  </div>
                  <Flex justify="between" align="center">
                    <Typography.Text strong size="lg">
                      ¥2.00
                    </Typography.Text>
                    <Typography.Text size="sm" type="secondary">
                      x2
                    </Typography.Text>
                  </Flex>
                </Flex>
              </Flex>
              <div style={{ margin: '20px 0 0 0 ' }}>
                <Typography.Text size="xs">总价¥:100.00，</Typography.Text>
                <Typography.Text size="xs" style={{ margin: '0 6px 0 0 ' }}>
                  运费¥:10.00
                </Typography.Text>
                <Typography.Text size="md" type="danger">
                  实付¥:100.00
                </Typography.Text>
              </div>
              <div style={{ margin: '8px 0 0 0 ' }}>
                <Button size="small" round plain style={{ marginRight: 2 }}>
                  取消订单
                </Button>
                <Button className={styles.button_width} size="small" round color="linear-gradient(to right, #ff6034, #ee0a24)">
                  付款
                </Button>
              </div>
            </Card>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Index;
