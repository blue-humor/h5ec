import React, { useState, useEffect } from 'react';

import { Image, Search, Card, Tabs, List } from 'react-vant';

import SwiperFade from '@/components/SwiperFade';
import Cards from '@/components/Cards';
import Refresh from '@/components/Refresh';

import { reqGoodsList } from '@/services/home';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [value, setValue] = useState<any>('');

  const [list, setList] = useState<any>([]);
  const [swiperList, setSwiperList] = useState<any>([]);

  const handleHomeList = async (params: any) => {
    const res = await reqGoodsList(params);
    return res;
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className={styles.home_nav}>
        <Refresh handleList={handleHomeList} setList={setList} setSwiperList={setSwiperList}>
          <Search
            shape="round"
            // background="#ffffff"
            value={value}
            onChange={setValue}
            placeholder="请输入搜索关键词"
          />
          <Card>
            <SwiperFade list={swiperList} effect="silde" height={122} />
            <Tabs color="#000000">
              <Tabs.TabPane title={`精选推荐`}></Tabs.TabPane>
            </Tabs>
          </Card>
          <div className={styles.home_card_nav}>
            <Cards cardList={list} />
          </div>
        </Refresh>
      </div>
    </>
  );
};

export default Index;
