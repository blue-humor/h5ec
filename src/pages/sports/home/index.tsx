import React, { useState, useEffect } from 'react';

import { Swiper, Image, Search, Card, Grid, Cell, Typography } from 'react-vant';

import NewsCard from '@/components/NewsCard';

import { reqSwiper, reqGoodsList } from '@/services/home';

import IconFont from '@/utils/iconFont';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [value, setValue] = useState('');

  const [swiperImage, setSwiperImage] = useState([]);

  const handleImage = async () => {
    const res = await reqSwiper({});
    setSwiperImage(res);
  };

  // const handleGoodsList = async (params: any) => {
  //     const res = await reqGoodsList(params);
  //     return res;
  // };

  useEffect(() => {
    handleImage();
    return () => {};
  }, []);

  return (
    <>
      <div className={styles.home_nav}>
        <Search
          label={<div className={styles.search_label}>峰巍体育</div>}
          shape="round"
          // background="#ffffff"
          value={value}
          onChange={setValue}
          placeholder="请输入搜索关键词"
          action={<IconFont name="icon--lingdang" style={{ width: '40px' }} />}
        />
        <Card>
          <Swiper autoplay={5000}>
            {swiperImage?.map((item: any, index) => (
              <Swiper.Item key={item?.id}>
                <Image lazyload fit="fill" src={item?.img} width="100%" />
              </Swiper.Item>
            ))}
          </Swiper>
        </Card>
        <Grid>
          <Grid.Item icon={<IconFont name="icon-zizhutuiguang" />} text="投稿集锦" />
          <Grid.Item icon={<IconFont name="icon-newspaper4" />} text="赛事新闻" />
          <Grid.Item icon={<IconFont name="icon-hezuo" />} text="合作培训" />
          <Grid.Item icon={<IconFont name="icon-kecheng" />} text="精选课程" />
        </Grid>
        <Cell center title={<Typography.Title level={6}>最新赛事</Typography.Title>} rightIcon={<IconFont name="icon-shuangjiantouyou" />} isLink />
        <Grid border={false} columnNum={2}>
          <Grid.Item className={styles.eventsNav}>
            <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" className={styles.eventsImage} height={'120px'}>
              <Typography.Title className={styles.eventsTitle}>清晨点支烟</Typography.Title>
              <Typography.Text className={styles.eventsText}>人气：12万</Typography.Text>
            </Image>
          </Grid.Item>
          <Grid.Item className={styles.eventsNav}>
            <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" className={styles.eventsImage} height={'120px'}>
              <Typography.Title className={styles.eventsTitle}>清晨点支烟</Typography.Title>
              <Typography.Text className={styles.eventsText}>人气：12万</Typography.Text>
            </Image>
          </Grid.Item>
        </Grid>
        <Cell center title={<Typography.Title level={6}>热门课程</Typography.Title>} rightIcon={<IconFont name="icon-shuangjiantouyou" />} isLink />
        <NewsCard />
      </div>
    </>
  );
};

export default Index;
