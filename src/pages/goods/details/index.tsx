import React, { useState, useRef } from 'react';

import type { SkuInstance } from 'react-vant';
import { history } from 'umi';

import { Toast, Swiper, ImagePreview, Image, Card, Typography, ActionBar, Flex, Divider, Cell } from 'react-vant';
import { CartO, WapHomeO } from '@react-vant/icons';

import NavBar from '@/components/NavBar';

import GoodsSku from './components/GoodsSku';

import SkuGoods from './components/SkuGoods';

import styles from './index.less';

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
  'https://img.yzcdn.cn/vant/apple-5.jpg',
  'https://img.yzcdn.cn/vant/apple-6.jpg',
  'https://img.yzcdn.cn/vant/apple-7.jpg',
  'https://img.yzcdn.cn/vant/apple-8.jpg',
];

interface IndexProps {}
const Index: React.FC<IndexProps> = props => {
  const skuRef = useRef<SkuInstance>(null);

  // const [showShopping, setShowShopping] = useState(false)
  const [showButtonType, setShowButtonType] = useState(0);

  const [select, setSelect] = useState([]);

  // const handleShowShopping = (show: boolean, type?: number | any) => {
  //   setShowShopping(show)
  //   setShowButtonType(type)
  // }

  const handleShowSku = () => {
    // setShowShopping(show)
    // setShowButtonType(type)
    skuRef.current?.show();
  };

  return (
    <>
      <NavBar title="商品详情" />

      <div className={styles.goods_detalis_nav}>
        <Swiper
          indicator={(total, current) => (
            <div className={styles.custom_indicator}>
              {current + 1}/{total}
            </div>
          )}
        >
          {images?.map((item, index) => {
            return (
              <Swiper.Item key={index}>
                <Image
                  lazyload
                  src={item}
                  key={index}
                  onClick={() =>
                    ImagePreview.open({
                      images,
                    })
                  }
                />
              </Swiper.Item>
            );
          })}
        </Swiper>

        <Card>
          <Card.Body>
            <Flex justify="between" align="center">
              <Flex.Item>
                <Typography.Text type="danger">
                  <span className={styles.card_currentPrice}>¥{299}</span>起
                </Typography.Text>{' '}
                <Typography.Text delete className={styles.card_originalPrice}>
                  ¥{499}
                </Typography.Text>
              </Flex.Item>
              <Flex.Item>
                <Typography.Text>已售{499}</Typography.Text>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Header>
            <Typography.Title
              level={6}
              ellipsis={{
                rows: 2,
                expandText: '更多',
              }}
            >
              React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。
            </Typography.Title>
          </Card.Header>
        </Card>

        <Cell
          title={
            <div>
              已选择:
              {select.map((item: any, index: number) => {
                return (
                  <span style={{ margin: '0 0 0 10px' }} key={index}>
                    {item}
                  </span>
                );
              })}
            </div>
          }
          isLink
          // onClick={() => { handleShowShopping(true) }}
        />

        <Card>
          <Divider>详情介绍</Divider>
          {images.map((item, index) => {
            return (
              <Image
                key={index}
                style={{ margin: '10px 0' }}
                src={item}
                onClick={() =>
                  ImagePreview.open({
                    images,
                  })
                }
              />
            );
          })}
        </Card>

        <ActionBar safeAreaInsetBottom>
          <ActionBar.Icon icon={<WapHomeO />} text="首页" onClick={() => history.push('/')} />
          <ActionBar.Icon icon={<CartO />} badge={{ content: 5 }} text="购物车" onClick={() => history.push('/cart')} />
          {/* <ActionBar.Button type='warning' text='加入购物车' onClick={() => handleShowShopping(true, 0)} /> */}
          {/* <ActionBar.Button type='danger' text='立即购买' onClick={() => handleShowShopping(true, 1)} /> */}

          {/* <ActionBar.Button type='warning' text='加入购物车' onClick={() => handleShowSku(0)} /> */}
          <ActionBar.Button type="danger" text="选择商品规格" onClick={() => handleShowSku()} />
        </ActionBar>
      </div>
      <SkuGoods showButtonType={showButtonType} skuRef={skuRef} />
      {/* <GoodsSku showShoppin={showShopping} handleShowShopping={handleShowShopping} showButtonType={showButtonType} setSelect={setSelect} /> */}
    </>
  );
};

export default Index;
