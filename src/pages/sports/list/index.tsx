import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import NavBar from '@/components/NavBar';

import { Card, Image, Divider, Typography, Flex, ProductCard } from 'react-vant';

import { reqArticleList } from '@/services/sports/list';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const { query } = history.location;
  const { barTitle } = query;

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
      <NavBar title={barTitle} />
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
                <Image fit="cover" src={item?.thumb} width={120.18} height={66} />
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
