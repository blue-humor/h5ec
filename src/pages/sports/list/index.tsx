import React, { useState } from 'react';

import { history } from 'umi';

import NavBar from '@/components/NavBar';

import Refresh from '@/components/Refresh';

import { Card, Image, Divider, Typography, Flex } from 'react-vant';

import { reqArticleList } from '@/services/sports/list';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { query } = history.location;
  const { barTitle }: any = query;

  const [articleList, setarticleList] = useState<any>([]);

  const handleArticleList = async (params: any) => {
    const res = await reqArticleList({ ...params, ...query });
    return res;
  };

  return (
    <div className={styles.sportsList}>
      <NavBar title={barTitle} query={query} />
      <Refresh handleList={handleArticleList} setList={setarticleList}>
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
      </Refresh>
    </div>
  );
};

export default Index;
