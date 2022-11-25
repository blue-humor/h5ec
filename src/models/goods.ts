import { useState, useCallback } from 'react';

import { history } from 'umi';

export default () => {
  const [goodItem, setGoodItem] = useState(null);

  const handleClickCard = useCallback(item => {
    setGoodItem(item);
    console.log(item);

    history.push('/goods/details');
  }, []);

  return {
    handleClickCard,
    goodItem,
  };
};
