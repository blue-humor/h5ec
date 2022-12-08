import React, { useState, useEffect } from 'react';
import { history } from 'umi';

import { Swiper, Image, Search, Card, Grid, Cell, Typography } from 'react-vant';

import NewsCard from '@/components/NewsCard';

import { reqSwiper, reqGoodsList } from '@/services/home';

import IconFont from '@/utils/iconFont';

import styles from './index.less';

import { reqHomeData } from '@/services/sports/home';

const src = 'https://n.sinaimg.cn/sports/2_img/upload/a7a65bdb/107/w1024h683/20221208/df90-c7609c9425dfdc5e0fa7b14d03957b68.jpg';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [value, setValue] = useState('');

  const [swiperImage, setSwiperImage] = useState<any>([]);

  const [newList, setNewList] = useState<any>({
    articles1: [],
    articles2: [],
  });

  const handleImage = async () => {
    const res = await reqSwiper({});
    setSwiperImage(res);
  };

  const handleHomeList = async (params: any) => {
    const res = await reqHomeData(params);
    if (res?.code === 200) {
      const { list } = res?.data;
      console.log(list);

      setNewList(list);
    }
  };

  useEffect(() => {
    handleImage();
    handleHomeList({});
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

        <Cell
          style={{ padding: '6px 10px' }}
          isLink
          center
          title={
            <Typography.Title className={styles.title} level={5}>
              最新赛事
            </Typography.Title>
          }
          rightIcon={<IconFont name="icon-shuangjiantouyou" />}
          onClick={() =>
            history.push({
              pathname: '/sports/list',
              query: {
                type: '2',
              },
            })
          }
        />
        <Grid border={false} columnNum={2}>
          {newList?.articles1?.map((item: any) => {
            return (
              <Grid.Item
                key={item?.id}
                className={styles.eventsNav}
                onClick={() => {
                  history.push({
                    pathname: '/sports/details',
                    query: {
                      id: item?.id,
                    },
                  });
                }}
              >
                <Image src={item?.thumb} className={styles.eventsImage} height={'120px'}>
                  <Typography.Title className={styles.eventsTitle}>{item?.title}</Typography.Title>
                  <Typography.Text className={styles.createtime}>{item?.createtime}</Typography.Text>
                </Image>
              </Grid.Item>
            );
          })}
        </Grid>
        <Cell
          style={{ padding: '6px 10px' }}
          center
          title={<Typography.Title level={5}>热门课程</Typography.Title>}
          rightIcon={<IconFont name="icon-shuangjiantouyou" />}
          isLink
          onClick={() =>
            history.push({
              pathname: '/sports/list',
              query: {
                type: '4',
              },
            })
          }
        />
        <NewsCard newList={newList?.articles2} />
      </div>
    </>
  );
};

export default Index;
