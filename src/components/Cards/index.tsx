import React, { useState, useEffect } from 'react';

import { useModel } from 'umi';

import { Image, Card, Toast, Typography, Flex, PullRefresh, List } from 'react-vant';

import { priceFormat } from '@/utils/index';

import './index.less';

interface IndexProps {
  cardList: any;
}

const Index: React.FC<IndexProps> = ({ cardList }) => {
  const { handleClickCard } = useModel('goods', model => ({
    handleClickCard: model.handleClickCard,
  }));

  return (
    <Flex gutter={10} wrap="wrap">
      {cardList?.map((item: any) => {
        return (
          <Flex.Item span={12} key={item?.id}>
            <Card className="card_nav" round onClick={() => handleClickCard(item)}>
              <Card.Cover className="card_cover">
                <Image lazyload showError fit="fill" src={item?.thumb} width="100%" />
              </Card.Cover>
              <Card.Body>
                <Typography.Text ellipsis={2}>{item?.title}</Typography.Text>
                <Typography.Text type="danger">
                  <span className="card_parice">¥{priceFormat(item?.price, 2)}</span>
                </Typography.Text>{' '}
                <Typography.Text delete>¥{priceFormat(item?.originPrice, 2)}</Typography.Text>
              </Card.Body>
            </Card>
          </Flex.Item>
        );
      })}
    </Flex>
  );
};

export default Index;
