import React, { useState } from 'react';

import { history } from 'umi';

import { Sku, Button, Toast, ActionBar } from 'react-vant';

import { reqDetailsPay } from '@/services/pay';

interface SkuProps {
  skuRef: any;
  skuParams: any;
  showButtonType?: number;
}

const SkuGoods: React.FC<SkuProps> = ({ skuRef, showButtonType, skuParams }) => {
  const handleAddOrBay = async (value: any, Type: number) => {
    const res = await reqDetailsPay(value);
    if (res?.code === 200) {
      history.push({
        pathname: '/goods/pay',
        query: {
          orderId: res?.data?.id,
        },
      });
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
