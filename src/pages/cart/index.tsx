import React, { useState, useEffect } from 'react';

import { SubmitBar, Checkbox, Flex, Typography, Toast, ProductCard, Cell, Image, Card } from 'react-vant';
import { ShopO } from '@react-vant/icons';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [cartData, setCartData] = useState<any>([
    {
      id: 1,
      title: '商品名称',
      desc: '描述信息',
      price: 1998,
      num: 2,
      isChecked: false,
    },
    {
      id: 2,
      title: '商品名称2',
      desc: '描述信息',
      price: 198,
      num: 2,
      isChecked: false,
    },
    {
      id: 3,
      title: '商品名称3',
      desc: '描述信息',
      price: 2998,
      num: 2,
      isChecked: false,
    },
  ]);

  const [allPrice, setAllPrice] = useState(0);

  const handlePrice = (params: any) => {
    console.log(params);

    const allPriceData = params.reduce((sum: any, currentItem: any) => {
      if (currentItem?.isChecked === true) {
        return sum + currentItem.price * currentItem.num;
      } else {
        return 0;
      }
    }, 0);
    setAllPrice(allPriceData);
  };

  //全选 全不选择
  const handleSelectAll = (v: boolean) => {
    const data = cartData.map((item: any) => {
      return {
        ...item,
        isChecked: v,
      };
    });

    setCartData(data);
    handlePrice(data);
  };

  //单选
  const handleRaedo = (params: any) => {
    let data = cartData.map((item: any) => {
      // 调试
      if (params.id === item.id) {
        item.isChecked = !item.isChecked;
      }
      return {
        ...item,
      };
    });

    setCartData(data);

    console.log(data);
  };

  useEffect(() => {
    return () => {};
  }, [cartData]);

  return (
    <div className={styles.cartNav}>
      <div>
        {cartData.map(
          (item: {
            id: React.Key | null | undefined;
            isChecked: boolean | undefined;
            num: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
            price: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
            desc: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
            title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
          }) => {
            return (
              <Card className={styles.card_cart} key={item?.id} onClick={() => handleRaedo(item)}>
                <Flex align="center">
                  <Flex.Item>
                    <Checkbox checked={item?.isChecked} />
                  </Flex.Item>
                  <Flex.Item>
                    <ProductCard className={styles.product_card} num={item?.num} price={item?.price} desc={item?.desc} title={item?.title} thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
                  </Flex.Item>
                </Flex>
              </Card>
            );
          }
        )}
      </div>

      <SubmitBar
        style={{ bottom: '56px' }}
        safeAreaInsetBottom
        price={allPrice * 100}
        buttonText="提交订单"
        tip={
          <>
            你的收货地址不支持同城送,
            <span style={{ color: '#1989fa' }}>修改地址</span>
          </>
        }
      >
        <Checkbox onChange={v => handleSelectAll(v)}>全选</Checkbox>
      </SubmitBar>
    </div>
  );
};

export default Index;
