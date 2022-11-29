import { useState, useCallback, useEffect, SetStateAction } from 'react';

import { reqDetailsPay } from '@/services/pay';

import { history } from 'umi';

export default () => {
  const [orderConfirm, setOrderConfirm] = useState(null);

  const handledetailsPay = async (params: any) => {
    const res = await reqDetailsPay(params);
    if (res?.code === 200) {
    }
  };

  return {};
};
