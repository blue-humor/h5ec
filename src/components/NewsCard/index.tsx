import React, { useState } from 'react';

import { history } from 'umi';

import { Card, Image, Toast, Divider, List, Cell, Tag, Typography, Flex } from 'react-vant';

import IconFont from '@/utils/iconFont';

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
      {newList.map((item: any) => {
        return (
          <Card key={item?.id}>
            <Card.Cover onClick={() => handlePush(item?.id)}>
              <Image src={item?.thumb} fit="cover" width="100%" height="58vw" />
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
                  {/* <IconFont name="icon-dianzan" width={22} height={22} style={{ margin: '0 6px' }} /> */}

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
