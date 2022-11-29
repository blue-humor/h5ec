import React from 'react';

import { Tabs, Cell, Typography, Card, ProductCard, Tag, Button } from 'react-vant';

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
              <ProductCard
                num="2"
                price="2.00"
                desc="描述信息"
                title="商品名称"
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                footer={
                  <>
                    <Button size="small" round plain style={{ marginRight: 2 }}>
                      取消订单
                    </Button>
                    <Button className={styles.button_width} size="small" round color="linear-gradient(to right, #ff6034, #ee0a24)">
                      付款
                    </Button>
                  </>
                }
              />
            </Card>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Index;
