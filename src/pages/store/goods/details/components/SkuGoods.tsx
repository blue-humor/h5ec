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
  const goodId: any = history?.location?.query?.id;

  const handleAddOrBay = async (value: any, Type: number) => {
    console.log(value);
    console.log('skuParams', skuParams);

    const res = await reqDetailsPay(value);
    if (res?.code === 200) {
      const { id } = res?.data;
      history.push({
        pathname: '/goods/pay',
        query: {
          orderId: id,
          id: goodId,
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
