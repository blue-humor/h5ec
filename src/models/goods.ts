import { useState, useCallback, useEffect, SetStateAction } from 'react';

import { history } from 'umi';

export default () => {
  const [goodItem, setGoodItem] = useState(null);

  const handleClickCard = useCallback((item: any) => {
    setGoodItem(item);
    console.log(item);

    history.push('/goods/details');
  }, []);

  return {
    handleClickCard,
    goodItem,
  };
};
