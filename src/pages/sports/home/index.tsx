import React, { useState, useEffect } from 'react';
import { history } from 'umi';

import { Swiper, Image, Search, Card, Grid, Cell, Typography } from 'react-vant';

import NewsCard from '@/components/NewsCard';

import { reqSwiper } from '@/services/home';

import IconFont from '@/utils/iconFont';

import styles from './index.less';

import { reqHomeData } from '@/services/sports/home';

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
    const res: any = await reqHomeData(params);
    if (res?.code === 200) {
      const { list } = res?.data;
      setNewList(list);
    }
  };

  const huandlePush = (params: string, title: string) => {
    history.push({
      pathname: '/sports/list',
      query: {
        type: params,
        barTitle: title,
      },
    });
  };

  useEffect(() => {
    handleImage();
    handleHomeList({});
    const { openid, token }: any = history?.location?.query;
    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('openid', openid);
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
            {swiperImage?.map((item: any) => (
              <Swiper.Item key={item?.id}>
                <Image lazyload fit="fill" src={item?.img} width="100%" />
              </Swiper.Item>
            ))}
          </Swiper>
        </Card>
        <Grid>
          <Grid.Item icon={<IconFont name="icon-zizhutuiguang" />} text="投稿集锦" onClick={() => huandlePush('1', '投稿集锦')} />
          <Grid.Item icon={<IconFont name="icon-newspaper4" />} text="赛事新闻" onClick={() => huandlePush('2', '赛事新闻')} />
          <Grid.Item icon={<IconFont name="icon-hezuo" />} text="合作培训" onClick={() => huandlePush('3', '合作培训')} />
          <Grid.Item icon={<IconFont name="icon-kecheng" />} text="精选课程" onClick={() => huandlePush('4', '精选课程')} />
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
          onClick={() => huandlePush('2', '赛事新闻')}
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
        <Cell style={{ padding: '6px 10px' }} center title={<Typography.Title level={5}>热门课程</Typography.Title>} rightIcon={<IconFont name="icon-shuangjiantouyou" />} isLink onClick={() => huandlePush('4', '精选课程')} />
        <NewsCard newList={newList?.articles2} />
      </div>
    </>
  );
};

export default Index;
