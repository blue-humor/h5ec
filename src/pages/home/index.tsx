import React, { useState, useEffect } from 'react';

import { Swiper, Image, Search, Toast, Card, Tabs } from 'react-vant';

import Cards from '@/components/Cards';

import { reqSwiper } from '@/services/home';

import styles from './index.less';

interface IndexProps {}

const cardList = [
  {
    id: 1,
    title: 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。',
    cardImage: `https://react-vant.3lang.dev/demo_avatar_1`,
    currentPrice: 198,
    originalPrice: 499,
  },
  {
    id: 2,
    title: 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。',
    cardImage: `https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png`,
    currentPrice: 198,
    originalPrice: 499,
  },
  {
    id: 3,
    title: 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。',
    cardImage: `https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png`,
    currentPrice: 198,
    originalPrice: 499,
  },
  {
    id: 4,
    title: 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。',
    cardImage: `https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png`,
    currentPrice: 198,
    originalPrice: 499,
  },
];

const images = [
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner2.png',
    text: '2',
  },
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner3.png',
    text: '3',
  },
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner4.png',
    text: '4',
  },
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner5.png',
    text: '5',
  },
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner6.png',
    text: '6',
  },
];

const Index: React.FC<IndexProps> = props => {
  const [value, setValue] = useState('');

  const [swiperImage, setSwiperImage] = useState([]);

  const handleImage = async () => {
    const res = await reqSwiper({});
    if (res.code === 200) {
      setSwiperImage(res?.data);
    }
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
            {swiperImage.map((item, index) => (
              <Swiper.Item key={item?.id}>
                <Image lazyload fit="fill" height="150" src={item?.img} width="100%" />
              </Swiper.Item>
            ))}
          </Swiper>
          <Tabs color="#000000">
            <Tabs.TabPane title={`精选推荐`}></Tabs.TabPane>
          </Tabs>
        </Card>

        <div className={styles.home_card_nav}>
          <Cards cardList={cardList} />
        </div>
      </div>
    </>
  );
};

export default Index;
