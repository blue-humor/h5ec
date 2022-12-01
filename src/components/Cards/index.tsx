import React, { useState, useEffect } from 'react';

import { useModel } from 'umi';

import { Image, Card, Toast, Typography, Flex, PullRefresh, List } from 'react-vant';

import './index.less';

interface IndexProps {
  handleCardList: (params: { pageIndex: number; pageSize: number; groupId?: number }) => Promise<any>;
}

const Index: React.FC<IndexProps> = ({ handleCardList }) => {
  const { handleClickCard } = useModel('goods', model => ({
    handleClickCard: model.handleClickCard,
  }));

  const [pageIndex, setPageIndex] = useState<number>(1);

  const [cardList, setCardList] = useState<number[]>([]);

  const [finished, setFinished] = useState<boolean>(false);

  const [total, setTotal] = useState<number>(0);

  //刷新
  const handleOnRefresh = async (params: boolean) => {
    if (params) {
      const res = await handleCardList({ pageIndex: 1, pageSize: 20 });
      if (res?.code === 200) {
        setCardList(res.data.spuList);
      }
      Toast.info('刷新成功');
    }
  };

  // 分页
  const handleOnLoad = async () => {
    const res = await handleCardList({ pageIndex, pageSize: 15 });
    if (res?.code === 200) {
      const { spuList, totalCount } = res?.data;
      setCardList((v: any) => [...v, ...spuList]);
      setTotal(totalCount);
      setPageIndex(v => v + 1);
    }
    if (cardList.length >= total) {
      setFinished(true);
      return;
    }
  };

  return (
    <PullRefresh onRefresh={async () => handleOnRefresh(true)} onRefreshEnd={() => console.log('onRefreshEnd')}>
      <List finished={finished} key="list" onLoad={async () => handleOnLoad()} finishedText="暂无更多">
        <Flex gutter={10} wrap="wrap">
          {cardList?.map((item: any) => {
            return (
              <Flex.Item span={12} key={item?.id}>
                <Card className="card_nav" round onClick={() => handleClickCard(item)}>
                  <Card.Cover className="card_cover">
                    <Image lazyload showError fit="fill" src={item?.primaryImage} width="100%" />
                  </Card.Cover>
                  <Card.Body>
                    <Typography.Text ellipsis={2}>{item?.title}</Typography.Text>
                    <Typography.Text type="danger">
                      ¥<span className="card_parice">{Math.ceil(item?.price) / 100}</span>
                    </Typography.Text>{' '}
                    <Typography.Text delete>¥{Math.ceil(item?.originPrice) / 100}</Typography.Text>
                  </Card.Body>
                </Card>
              </Flex.Item>
            );
          })}
        </Flex>
      </List>
    </PullRefresh>
  );
};

export default Index;
