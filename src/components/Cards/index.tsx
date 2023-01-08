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
    <Flex gutter={10} wrap="wrap" style={{ padding: '10px 0 0 0' }}>
      {cardList?.map((item: any) => {
        return (
          <Flex.Item span={12} key={item?.id}>
            <Card className="card_nav" round onClick={() => handleClickCard(item)}>
              <Card.Cover className="card_cover">
                <Image lazyload showError fit="fill" src={item?.thumb} width="100%" />
              </Card.Cover>
              <Card.Body>
                <Typography.Title level={6} ellipsis={2}>
                  {item?.storeName}
                </Typography.Title>
                <Typography.Title level={6} ellipsis={2}>
                  {item?.title}
                </Typography.Title>

                {item?.deliPrice ? <Typography.Text type="secondary">起送费 ¥{priceFormat(item?.deliPrice, 2)}</Typography.Text> : null}
                {item?.price ? (
                  <>
                    <Typography.Text type="danger">
                      <span className="card_parice">{item?.price ? `¥${priceFormat(item?.price, 2)}` : null}</span>
                    </Typography.Text>
                    <Typography.Text type="secondary" delete>
                      {item?.originPrice ? `¥${priceFormat(item?.originPrice, 2)}` : null}
                    </Typography.Text>
                  </>
                ) : null}
              </Card.Body>
            </Card>
          </Flex.Item>
        );
      })}
    </Flex>
  );
};

export default Index;
