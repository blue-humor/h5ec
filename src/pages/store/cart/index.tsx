import React, { useState } from 'react';

import { SubmitBar, Checkbox, Flex, ProductCard, Cell, Card } from 'react-vant';
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
  const [selectList, setSelectList] = useState([]);
  const [allCheked, setAllCheked] = useState(false);

  //全选 全不选择
  const handleSelectAll = (v: boolean) => {
    setAllCheked(v);
    const data = cartData.map((item: any) => {
      item.isChecked = v;
      return item;
    });
    setCartData(data);
    handleAllPrice();
  };

  //单选
  const handleRaedo = (params: any) => {
    const data = cartData.map((item: any) => {
      if (params.id == item?.id) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setCartData(data);
    handleSelect();
    handleAllPrice();
  };

  // 选中的list
  const handleSelect = () => {
    let arr: any = [];
    cartData.forEach((item: any) => {
      if (item?.isChecked === true) {
        arr.push(item.id);
      }
    });

    if (arr.length === cartData.length) {
      setAllCheked(true);
    } else {
      setAllCheked(false);
    }
    setSelectList(arr);
  };

  const handleAllPrice = () => {
    let total = 0;
    cartData.forEach((item: any) => {
      if (item.isChecked === true) {
        total += item.price * item.num;
      }
    });
    setAllPrice(total);
  };

  return (
    <div className={styles.cartNav}>
      <div>
        <Cell title="商家" icon={<ShopO />} />
        {cartData.map((item: { id: number; isChecked: boolean; num: number; price: number; desc: string; title: string }) => {
          return (
            <Card className={styles.card_cart} key={item?.id} onClick={() => handleRaedo(item)}>
              <Flex align="center">
                <Flex.Item>
                  <Checkbox checkedColor="#ee0a24" checked={item?.isChecked} />
                </Flex.Item>
                <Flex.Item>
                  <ProductCard className={styles.product_card} num={item?.num} price={item?.price} desc={item?.desc} title={item?.title} thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
                </Flex.Item>
              </Flex>
            </Card>
          );
        })}
      </div>
      <div>
        <SubmitBar
          style={{ bottom: '60px', zIndex: 1 }}
          safeAreaInsetBottom
          price={allPrice * 100}
          buttonText="提交订单"
          // tip={
          //   <>
          //     你的收货地址不支持同城送,
          //     <span style={{ color: '#1989fa' }}>修改地址</span>
          //   </>
          // }
        >
          <Checkbox checked={allCheked} checkedColor="#ee0a24" onChange={v => handleSelectAll(v)}>
            全选
          </Checkbox>
        </SubmitBar>
      </div>
    </div>
  );
};

export default Index;
