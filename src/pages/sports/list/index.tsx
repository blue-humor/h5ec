import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import NavBar from '@/components/NavBar';

import { Card, Image, Divider, Typography, Flex, ProductCard } from 'react-vant';

import { reqArticleList } from '@/services/sports/list';

import styles from './index.less';

interface IndexProps {}

const src = 'https://n.sinaimg.cn/sports/2_img/upload/a7a65bdb/107/w1024h683/20221208/df90-c7609c9425dfdc5e0fa7b14d03957b68.jpg';

const content = 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。';

const Index: React.FC<IndexProps> = props => {
  const { query } = history.location;

  const [articleList, setarticleList] = useState<any>([]);

  const handleArticleList = async () => {
    const res = await reqArticleList({ ...query, pageSize: 20, current: 1 });
    if (res?.code === 200) {
      const { list } = res?.data;
      setarticleList(list);
    }
  };

  useEffect(() => {
    handleArticleList();
  }, []);

  return (
    <div className={styles.sportsList}>
      <NavBar title="赛事新闻" />
      {articleList?.map((item: any) => {
        return (
          <Card
            key={item?.id}
            className={styles.sportsListCard}
            onClick={() =>
              history.push({
                pathname: '/sports/details',
                query: {
                  id: item?.id,
                },
              })
            }
          >
            <Flex justify="center">
              <Flex.Item span={8} style={{ margin: '4px 0 0 0 ' }}>
                <Image fit="cover" src={src} width={120.18} height={66} />
              </Flex.Item>
              <Flex.Item span={16}>
                <Typography.Text ellipsis={3}>{item?.title}</Typography.Text>
                <div>
                  <Typography.Text className={styles.sportsListTime}>{item?.createtime}</Typography.Text>
                </div>
              </Flex.Item>
            </Flex>
            <Divider />
          </Card>
        );
      })}
    </div>
  );
};

export default Index;
