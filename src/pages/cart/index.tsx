import React from 'react';

import { SubmitBar, Checkbox, SwipeCell, Button, Toast, ProductCard, Cell, Image } from 'react-vant';
import { ShopO } from '@react-vant/icons'



import styles from './index.less'

interface IndexProps { }

const Index: React.FC<IndexProps> = (props) => {
  return (
    <div className={styles.cartNav}>

      <SwipeCell
        // onOpen={() => Toast.info('打开')}
        onClose={() => Toast.info('关闭')}
        rightAction={
          <Button style={{ height: '100%' }} square type="danger">
            删除
          </Button>
        }
      >

      </SwipeCell>
      <Checkbox.Group onChange={(v) => {
        console.log(v);

      }}>
        <Checkbox name='1'>
          <Cell title='世界最强大潘面馆' icon={<ShopO />} />
        </Checkbox>
        <SwipeCell
          rightAction={
            <Button style={{ height: '100%' }} square type="danger">
              删除
            </Button>
          }
        >


          <Checkbox name={{ a: 1 }}>
            <ProductCard
              className={styles.cartProductCard}
              lazyload
              num={2}
              price="2.00"
              originPrice="10.00"
              desc="描述信息"
              title="商品名称"
              thumb={
                <Image lazyload src='https://react-vant.3lang.dev/demo_avatar_1.jpg'>
                </Image>
              }
            />
          </Checkbox>


        </SwipeCell>

      </Checkbox.Group>
      <SubmitBar
        style={{ bottom: '56px' }}
        safeAreaInsetBottom
        price="3050"
        buttonText="提交订单"
        tip={
          <>
            你的收货地址不支持同城送,
            <span style={{ color: '#1989fa' }}>修改地址</span>
          </>
        }
      >
        <Checkbox>全选</Checkbox>
      </SubmitBar>
    </div>
  );
};

export default Index;
