import React, { useState, useEffect } from 'react';
import { history } from 'umi';

import { Swiper, Image, Search, Card, Grid, Cell, Typography } from 'react-vant';

import NewsCard from '@/components/NewsCard';
import SwiperFade from '@/components/SwiperFade';

import Refresh from './components/Refresh';

import { reqHomeData } from '@/services/sports/home';

import { reqAbouts } from '@/services/about';

import IconFont from '@/utils/iconFont';

import styles from './index.less';
import VideoPng from '@/common/imgs/video.png';
import TouGao from '@/common/svg/tougao.svg';
import SaiShi from '@/common/svg/saishi.svg';
import HeZuo from '@/common/svg/hezuo.svg';
import JingXuan from '@/common/svg/jingxuan.svg';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [value, setValue] = useState('');

  // const [swiperImage, setSwiperImage] = useState<any>([]);

  const [info, setInfo] = useState<any>({});

  const [newList, setNewList] = useState<any>({
    articles1: [],
    articles2: [],
    imagesList: [],
  });

  // const handleImage = async () => {
  //   const res = await reqSwiper({});
  //   setSwiperImage(res);
  // };

  const handleHomeList = async (params: any) => {
    const res: any = await reqHomeData(params);
    return res;
    // if (res?.code === 200) {
    //   const { list } = res?.data;
    //   setNewList(list);
    // }
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

  const handleInfo = async () => {
    const res = await reqAbouts({});
    if (res?.code === 200) {
      setInfo(res?.data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleInfo();
    }, 600);
    return () => {};
  }, []);

  return (
    <>
      <Search
        label={<div className={styles.search_label}>峰巍体育</div>}
        shape="round"
        // background="#ffffff"
        value={value}
        onChange={setValue}
        disabled
        placeholder="请输入搜索关键词"
      />
      <Refresh handleList={handleHomeList} setList={setNewList}>
        <div className={styles.home_nav}>
          <Card style={{ margin: '0 0 10px 0' }}>
            <SwiperFade list={newList?.imagesList} effect={'slide'} height={'100%'} />
          </Card>
          <Grid border={false}>
            <Grid.Item icon={<Image src={TouGao} height={'32px'} width={'36px'} />} text={<Typography.Text className={styles.articlesSvg}>投稿集锦</Typography.Text>} onClick={() => huandlePush('1', '投稿集锦')} />
            <Grid.Item icon={<Image src={SaiShi} height={'32px'} width={'36px'} />} text={<Typography.Text className={styles.articlesSvg}>赛事新闻</Typography.Text>} onClick={() => huandlePush('2', '赛事新闻')} />
            <Grid.Item icon={<Image src={HeZuo} height={'32px'} width={'36px'} />} text={<Typography.Text className={styles.articlesSvg}>合作培训</Typography.Text>} onClick={() => huandlePush('3', '合作培训')} />
            <Grid.Item icon={<Image src={JingXuan} height={'32px'} width={'36px'} />} text={<Typography.Text className={styles.articlesSvg}>精选课程</Typography.Text>} onClick={() => huandlePush('4', '精选课程')} />
          </Grid>

          <Cell
            style={{ padding: '6px 10px' }}
            center
            title={
              <Typography.Text className={styles.articlesTitle}>
                最新赛事
                <IconFont name="icon-shuangjiantouyou" style={{ padding: '5px 0 0 0' }} />
              </Typography.Text>
            }
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
                  <Image fit="cover" src={item?.thumb} className={`${item?.video ? styles.eventsVideo : styles.eventsImage}`} height={'120px'}>
                    {/* <Typography.Text className={styles.createtime}>{item?.createtime}</Typography.Text> */}
                    {item?.video ? <Image src={VideoPng} fit="cover" className={styles.newsVideoPng} width="40" height="40" /> : null}
                  </Image>
                  <Typography.Title className={styles.eventsTitle} ellipsis={{ rows: 2 }}>
                    {item?.title}
                  </Typography.Title>
                </Grid.Item>
              );
            })}
          </Grid>
          <Cell
            style={{ padding: '6px 10px' }}
            center
            title={
              <Typography.Text className={styles.articlesTitle}>
                热门课程 <IconFont name="icon-shuangjiantouyou" style={{ padding: '5px 0 0 0' }} />
              </Typography.Text>
            }
            onClick={() => huandlePush('4', '精选课程')}
          />
          <NewsCard newList={newList?.articles2} />
        </div>
      </Refresh>

      {info.intro ? (
        <div className={styles.homeInfo}>
          <span>关于我们</span>
          <br />
          <span>联系人：{info?.concatperson}</span>
          <br />
          <span>
            <a href={`tel:${info?.concattel}`}>{info?.concattel}</a>{' '}
          </span>
          <br />
          <span style={{ color: '#999', fontSize: '12px' }}>{info?.intro}</span>
          <br />
        </div>
      ) : null}
    </>
  );
};

export default Index;
