import { useState, useCallback, useEffect, SetStateAction } from 'react';

import { history } from 'umi';

export default () => {
  const [goodItem, setGoodItem] = useState(null);

  const handleClickCard = useCallback((item: any) => {
    if (item?.storeName) {
      history.push({
        pathname: '/goods/list',
        query: {
          groupId: '13',
        },
      });
    } else {
      setGoodItem(item);
      history.push({
        pathname: '/goods/details',
        query: {
          id: item.id,
          // storeId: item.storeId,
        },
      });
    }
  }, []);

  return {
    handleClickCard,
    goodItem,
  };
};
