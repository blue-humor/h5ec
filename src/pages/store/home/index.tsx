import React, { useState, useEffect } from 'react';

import { Swiper, Image, Search, Toast, Card, Tabs } from 'react-vant';

import Cards from '@/components/Cards';

import { reqSwiper, reqGoodsList } from '@/services/home';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [value, setValue] = useState<any>('');

  const [swiperImage, setSwiperImage] = useState<any>([]);

  const handleImage = async () => {
    const res = await reqSwiper({});
    setSwiperImage(res);
  };

  const handleGoodsList = async (params: any) => {
    const res = await reqGoodsList(params);
    return res;
  };

  useEffect(() => {
    handleImage();
    return () => {};
  }, []);

  return (
    <>
      <div className={styles.home_nav}>
        <Search
          shape="round"
          // background="#ffffff"
          value={value}
          onChange={setValue}
          placeholder="请输入搜索关键词"
        />
        <Card>
          <Swiper autoplay={5000}>
            {swiperImage?.map((item: any, index) => (
              <Swiper.Item key={item?.id}>
                <Image lazyload fit="fill" src={item?.img} width="100%" />
              </Swiper.Item>
            ))}
          </Swiper>
          <Tabs color="#000000">
            <Tabs.TabPane title={`精选推荐`}></Tabs.TabPane>
          </Tabs>
        </Card>

        <div className={styles.home_card_nav}>
          <Cards handleCardList={handleGoodsList} />
        </div>
      </div>
    </>
  );
};

export default Index;
