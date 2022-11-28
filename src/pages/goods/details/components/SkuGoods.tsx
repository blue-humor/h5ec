import React from 'react';

import { history } from 'umi';

import { Sku, Button, Toast, ActionBar } from 'react-vant';

import type { SkuInstance } from 'react-vant';

interface SkuProps {
  skuRef: any;
  showButtonType?: number;
}

const data = {
  goods_id: '1',
  startSaleNum: 2, //起售数量
  goods_info: {
    price: 1,
    title: '测试商品',
    picture: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
  },
  sku: {
    price: '199.9', //默认价格（单位元
    stock_num: 666, // 商品总库存
    tree: [
      {
        k: '颜色',
        k_s: 's1',
        k_id: '1',
        v: [
          {
            id: '1',
            name: '粉色',
            imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
          },
          {
            id: '2',
            name: '黄色',
            imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png',
          },
          {
            id: '3',
            name: '蓝色',
            imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-3.png',
          },
        ],
        largeImageMode: false, //是否开启大图预览
      },
      {
        k: '尺寸',
        k_s: 's2',
        k_id: '2',
        v: [
          {
            id: '1',
            name: '大',
          },
          {
            id: '2',
            name: '小',
          },
        ],
      },
    ],
    list: [
      // 如果没有规格对应的种类参数 默认售空
      {
        id: 2259,
        s1: '2', //对应 颜色种类的黄色
        s2: '1', // 对应 尺寸的da 种类
        price: 999, //当前商品价格
        discount: 888, //折扣价格
        stock_num: 110, //剩余库存
      },
      {
        id: 2260,
        s1: '3',
        s2: '1',
        price: 100,
        stock_num: 99,
      },
      {
        id: 2257,
        s1: '1',
        s2: '1',
        price: 100,
        stock_num: 111,
      },
      {
        id: 2258,
        s1: '1',
        s2: '2',
        price: 100,
        stock_num: 6,
      },
    ],
  },
};

const SkuGoods: React.FC<SkuProps> = ({ skuRef }) => {
  const handleAddOrBay = (value: any, Type: number) => {
    console.log('value', value);
    console.log('showButtonType', Type);

    if (Type) {
      history.push('/goods/pay');
      return;
    } else {
      Toast.success('加入购物车成功');
    }
  };

  return (
    <>
      <Sku
        // showAddCartBtn={showButtonType === 1 ? false : true}
        // skuActions={<ActionBar safeAreaInsetBottom style={{ padding: '0 16px', margin: '100px 0 0 0' }}>
        //     <Button
        //         round
        //         block
        //         color={showButtonType ? 'linear-gradient(to right, #ff6034, #ee0a24)' : 'linear-gradient(to right, #ff6034, #ffbb00)'}
        //         onClick={() => {

        //         }}
        //     >
        //         {showButtonType ? '立即购买' : '加入购物车'}
        //     </Button>
        // </ActionBar>}
        safeAreaInsetBottom
        startSaleNum={data.startSaleNum}
        ref={skuRef}
        sku={data.sku}
        goods={data.goods_info}
        goodsId={data.goods_id}
        // properties={data.properties}
        showSoldoutSku={true}
        onAddCart={(value: any) => handleAddOrBay(value, 0)}
        onBuyClicked={(value: any) => handleAddOrBay(value, 1)}
      />
    </>
  );
};

export default SkuGoods;
