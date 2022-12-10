import React, { useState } from 'react';

import { history } from 'umi';

import { Card, Image, Toast, Divider, List, Cell, Tag, Typography, Flex } from 'react-vant';

import IconFont from '@/utils/iconFont';

import VideoPng from '@/common/imgs/video.png';

import styles from './index.less';

interface IndexProps {
  newList: any;
}

const Index: React.FC<IndexProps> = ({ newList }) => {
  const handlePush = (params: string) => {
    history.push({
      pathname: '/sports/details',
      query: {
        id: params,
      },
    });
  };

  return (
    <>
      {newList?.map((item: any) => {
        return (
          <Card key={item?.id}>
            <Card.Cover onClick={() => handlePush(item?.id)} className={styles.newsCover}>
              <Image src={item?.thumb} fit="cover" width="100%" height="58vw" className={styles.newsImage} />
              {item?.video ? <Image src={VideoPng} fit="cover" className={styles.newsVideoPng} width="80" height="80" /> : null}
            </Card.Cover>
            <Card.Body className={styles.newsFontSize}>
              <Typography.Title level={6} ellipsis={2} onClick={() => handlePush(item?.id)}>
                {item?.title}
              </Typography.Title>
              <Flex justify="between">
                <Flex.Item>
                  <Typography.Text>{item?.createtime}</Typography.Text>
                </Flex.Item>
                <Flex.Item>
                  <Typography.Text>{item?.likecount}</Typography.Text>
                </Flex.Item>
              </Flex>
            </Card.Body>
            <Divider dashed />
          </Card>
        );
      })}
    </>
  );
};

export default Index;
