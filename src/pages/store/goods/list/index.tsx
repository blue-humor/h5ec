import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { DropdownMenu } from 'react-vant';
import NavBar from '@/components/NavBar';
import Cards from '@/components/Cards';
import Refresh from '@/components/Refresh';

import { reqGoodList } from '@/services/goods/list';

interface IndexProps {}

export const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
];
export const option2 = [
  { text: '默认排序', value: 0 },
  { text: '好评排序', value: 1 },
  { text: '销量排序', value: 3 },
];

const Index: React.FC<IndexProps> = props => {
  const [value, setValue] = useState<any>({ type: 0, sort: 0 });

  const [cardList, setCardList] = useState([]);

  const handleGoodList = async (params: any) => {
    const { query } = history.location;
    const res = await reqGoodList({ ...params, ...query, ...value });

    return res;
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      {/* <NavBar title="商品列表" /> */}
      {/* <DropdownMenu defaultValue={value} value={value} onChange={v => setValue(v)} style={{ margin: '0 0 4px 0' }} activeIcon={''}>
        <DropdownMenu.Item name="type" options={option1} />
        <DropdownMenu.Item name="sort" options={option2} />
      </DropdownMenu> */}
      <div></div>
      <div style={{ padding: '10px' }}>
        <Refresh handleList={handleGoodList} setList={setCardList}>
          <Cards cardList={cardList} />
        </Refresh>
      </div>
    </>
  );
};

export default Index;
