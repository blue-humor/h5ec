import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { DropdownMenu } from 'react-vant';
import NavBar from '@/components/NavBar';
import Cards from '@/components/Cards';

import { reqGoodList } from '@/services/goods/list';

interface IndexProps {}

export const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
];
export const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' },
];

const Index: React.FC<IndexProps> = props => {
  const [value, setValue] = useState<any>({ value1: 0, value2: 'a' });

  // const [cardList, setCardList] = useState([])

  const handleGoodList = async params => {
    const { query } = history.location;
    const res = await reqGoodList({ ...params, ...query, ...value });
    return res;
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <NavBar title="商品列表" />
      <DropdownMenu defaultValue={value} value={value} onChange={v => setValue(v)} style={{ margin: '0 0 4px 0' }} activeIcon={''}>
        <DropdownMenu.Item name="value1" options={option1} />
        <DropdownMenu.Item name="value2" options={option2} />
      </DropdownMenu>
      <div></div>
      <div style={{ padding: '10px' }}>
        <Cards handleCardList={handleGoodList} />
      </div>
    </>
  );
};

export default Index;
