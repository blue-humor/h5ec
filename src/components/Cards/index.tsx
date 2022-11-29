import React, { useState, useEffect } from 'react';

import { useModel } from 'umi';

import { Image, Card, Toast, Typography, Flex, PullRefresh, List } from 'react-vant';

import './index.less';

interface IndexProps {
  handleCardList: (params: { pageIndex: number; pageSize: number; groupId?: number }) => Promise<any>;
}

const Index: React.FC<IndexProps> = ({ handleCardList }) => {
  const { goodItem, handleClickCard } = useModel('goods', model => ({
    goodItem: model.goodItem,
    handleClickCard: model.handleClickCard,
  }));

  const [pageIndex, setPageIndex] = useState(1);

  const [cardList, setCardList] = useState<any>([]);

  const [finished, setFinished] = useState<boolean>(false);

  const handleOnRefresh = async (params: boolean) => {
    if (params) {
      const res = await handleCardList({ pageIndex, pageSize: 20 });
      if (res?.code === 200) {
        setCardList(res.data);
      }
      Toast.info('刷新成功');
    }
  };

  const handleOnLoad = async () => {
    setPageIndex(v => v + 1);
    const res = await handleCardList({ pageIndex, pageSize: 15 });
    console.log(res.data);

    if (res?.code === 200) {
      setCardList((v: any) => [...v, ...res.data]);
      if (cardList.length >= res?.total) {
        setFinished(true);
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

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
