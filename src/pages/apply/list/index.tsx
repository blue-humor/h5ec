import React, { useEffect, useState } from 'react';
import { history } from 'umi';

import { Button, Card, Divider, Flex, Image, Tag, Typography } from 'react-vant';

import Refresh from '@/components/Refresh';
import InfoBall from '@/components/Ball/infoBall';

import { reqAbouts, reqActivityList } from '@/services/apply';

import classNames from './index.less';

type Props = {};

const index = (props: Props) => {
  const [list, setList] = useState([]);

  const handleArticleList = async (params: any) => {
    const res = await reqActivityList({ ...params });
    return res;
  };

  const handlePush = (params: any) => {
    if (params.status === '未报名') {
      history.push({
        pathname: '/apply/enroll',
        query: {
          activityId: params?.id,
        },
      });
    } else {
      history.push({
        pathname: '/apply/enrollList',
        query: {
          activityId: params?.id,
          type: params.type,
        },
      });
    }
  };

  const handleAbouts = async () => {
    const res = await reqAbouts({});
  };

  useEffect(() => {
    handleAbouts();
  }, []);

  return (
    <>
      <Refresh handleList={handleArticleList} setList={setList}>
        <div className={classNames.nav}>
          {list.map((item: any) => {
            return (
              <Card key={item?.id} className={classNames.sportsListCard} onClick={() => handlePush(item)}>
                <Flex justify="around">
                  <Flex.Item span={15}>
                    <Typography.Title>{item?.title}</Typography.Title>
                    <Typography.Text>{item?.intro}</Typography.Text>
                    <br />
                    <Tag color={`${item?.status === '已报名' ? '#1654ff' : ''}`}>{item?.status}</Tag>
                  </Flex.Item>
                  <Flex.Item span={9} style={{ margin: '4px 0 0 0 ' }}>
                    <Image fit="cover" src={item?.thumb} width={'128px'} height={'100%'} radius={6} />
                  </Flex.Item>
                </Flex>
              </Card>
            );
          })}
        </div>
      </Refresh>
      <InfoBall />
    </>
  );
};

export default index;
