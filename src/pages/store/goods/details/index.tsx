import React, { useState, useRef, useEffect } from 'react';

import { SkuInstance } from 'react-vant';

import { history } from 'umi';

import { ImagePreview, Image, Card, Typography, ActionBar, Flex, Divider } from 'react-vant';
import { WapHomeO } from '@react-vant/icons';

import SwiperFade from '@/components/SwiperFade';
import NavBar from '@/components/NavBar';

import SkuGoods from './components/SkuGoods';

import { reqDetails } from '@/services/goods/details';

import { priceFormat } from '@/utils';

import styles from './index.less';

interface IndexProps {}
const Index: React.FC<IndexProps> = () => {
  const skuRef = useRef<SkuInstance>(null);

  const [detailsParams, setDetailsParams] = useState<any>({
    title: null,
    price: null,
    originPrice: null,
    imag: [],
    detailsImage: [],
  });

  const [skuParams, setSkuParams] = useState({
    goods_id: null,
    startSaleNum: 1, //起售数量
    goods_info: {},
    sku: {
      price: null, //默认价格（单位元
      stock_num: null, // 商品总库存
      tree: [],
      list: [],
    },
  });

  const [select, setSelect] = useState([]);
  const [showButtonType, setShowButtonType] = useState(0);

  // 打开sku弹框
  const handleShowSku = (type: number) => {
    setShowButtonType(type);
    skuRef.current?.show();
  };

  //获取商品详情
  const handleDetails = async () => {
    let { query } = history.location;
    const res = await reqDetails(query);
    if (res?.code === 200) {
      setDetailsParams(res.data?.details);
      setSkuParams(res.data?.skuList);
    }
  };

  useEffect(() => {
    handleDetails();
    return () => {};
  }, []);

  return (
    <>
      <NavBar title="商品详情" />

      <div className={styles.goods_detalis_nav}>
        {/* <Swiper autoplay={1000} >
          {detailsParams?.imag?.map((image: any, index: number) => (
            <Swiper.Item key={index}>
              <Image src={image} />
            </Swiper.Item>
          ))}
        </Swiper> */}
        <SwiperFade list={detailsParams?.imag} effect="fade" />

        <Card className={styles.details_card}>
          <Card.Body>
            <Flex justify="between" align="center">
              <Flex.Item>
                <Typography.Text type="danger">
                  <span className={styles.card_currentPrice}>¥{priceFormat(detailsParams?.price, 2)}</span>起
                </Typography.Text>{' '}
                <Typography.Text delete className={styles.card_originalPrice}>
                  ¥{priceFormat(detailsParams?.originPrice, 2)}
                </Typography.Text>
              </Flex.Item>
              <Flex.Item>
                <Typography.Text>已售{detailsParams?.sellOutAmount}</Typography.Text>
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
              {detailsParams?.title}
            </Typography.Title>
          </Card.Header>
        </Card>

        {/* <Cell
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
        /> */}

        <Card round style={{ margin: '0 0  70px  0' }}>
          <Divider>详情介绍</Divider>
          {detailsParams?.detailsImage?.map((item: any, index: number | undefined) => {
            return (
              <Image
                key={index}
                style={{ margin: '10px 0' }}
                src={item}
                onClick={() =>
                  ImagePreview.open({
                    images: detailsParams?.detailsImage,
                    closeable: true,
                  })
                }
              />
            );
          })}
          <Divider>到底啦～</Divider>
        </Card>

        <ActionBar safeAreaInsetBottom>
          <ActionBar.Icon icon={<WapHomeO />} text="首页" onClick={() => history.push('/')} />
          {/* <ActionBar.Icon icon={<CartO />} badge={{ content: 5 }} text="购物车" onClick={() => history.push('/cart')} /> */}
          {/* <ActionBar.Button type='warning' text='加入购物车' onClick={() => handleShowShopping(true, 0)} /> */}
          {/* <ActionBar.Button type='danger' text='立即购买' onClick={() => handleShowShopping(true, 1)} /> */}

          {/* <ActionBar.Button type="warning" text="加入购物车" onClick={() => handleShowSku(0)} /> */}
          <ActionBar.Button type="danger" text="立即购买" onClick={() => handleShowSku(1)} />
        </ActionBar>
      </div>
      <SkuGoods showButtonType={showButtonType} skuRef={skuRef} skuParams={skuParams} />
      {/* <GoodsSku showShoppin={showShopping} handleShowShopping={handleShowShopping} showButtonType={showButtonType} setSelect={setSelect} /> */}
    </>
  );
};

export default Index;
