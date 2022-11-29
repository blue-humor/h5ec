import React from 'react';

import { history } from 'umi';

import { Sku, Button, Toast, ActionBar } from 'react-vant';

import { reqDetailsPay } from '@/services/pay';

interface SkuProps {
  skuRef: any;
  skuParams: any;
  showButtonType?: number;
}

const SkuGoods: React.FC<SkuProps> = ({ skuRef, showButtonType, skuParams }) => {
  const handleAddOrBay = (value: any, Type: number) => {
    console.log(value);

    if (Type) {
      const { query } = history.location;
      // console.log('query', query);
      history.push({
        pathname: '/goods/pay',
        query: query,
      });
      return;
    } else {
      Toast.success('加入购物车成功');
    }
  };

  return (
    <>
      <Sku
        showAddCartBtn={showButtonType === 1 ? false : true}
        safeAreaInsetBottom
        startSaleNum={skuParams?.startSaleNum}
        ref={skuRef}
        sku={skuParams?.sku}
        goods={skuParams?.goods_info}
        goodsId={skuParams?.goods_id}
        // properties={data.properties}
        showSoldoutSku={true}
        onAddCart={(value: any) => handleAddOrBay(value, 0)}
        onBuyClicked={(value: any) => handleAddOrBay(value, 1)}
        // onSkuSelected={(v) => console.log(v.skuValue)}
      />
    </>
  );
};

export default SkuGoods;
