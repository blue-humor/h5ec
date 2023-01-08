import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { SwipeCell, Button, Typography, Card, Flex, ActionBar, Toast, Empty, Image, NavBar, Divider } from 'react-vant';

import Edit from './components/Edit';

import { reqArticlelist } from '@/services/user';

import { reqDel } from '@/services/articles';

import styles from './index.less';

import IconFont from '@/utils/iconFont';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const [articleList, setArticleList] = useState<any>([]);
  const [visible, setVisible] = useState(false);

  const [row, setRow] = useState({
    id: null,
    title: null,
    content: null,
    thumb: null,
    video: null,
  });

  // 列表
  const handleArticleList = async () => {
    const res = await reqArticlelist({});
    if (res?.code === 200) {
      console.log(res.data?.list);
      setArticleList(res.data?.list);
    }
  };

  // 删除地址
  const handleAplayDel = async (params: any) => {
    const res = await reqDel({ id: params });
    if (res?.code === 200) {
      setArticleList(articleList.filter((item: any) => item?.id !== params));
      Toast.success(res?.message);
    }
  };

  const handleOpenVisible = (isOpen: boolean, item: any = null) => {
    setRow(item);
    setVisible(isOpen);
  };

  useEffect(() => {
    handleArticleList();

    return () => {};
  }, []);

  return (
    <div className={styles.articlesNav}>
      {/* <NavBar title="队员信息列表" onClickLeft={() => history.push('/')} fixed placeholder safeAreaInsetTop /> */}
      {articleList?.map((item: any, index: number) => {
        return (
          <SwipeCell
            key={item?.id}
            rightAction={
              <Button style={{ height: '100%' }} square type="danger" onClick={() => handleAplayDel(item?.id)}>
                删除
              </Button>
            }
          >
            <Card key={item?.id} className={styles.sportsListCard}>
              <Flex justify="around">
                <Flex.Item span={8}>
                  <Image fit="cover" src={item?.thumb} width={'100%'} height={'100%'} radius={6} />
                </Flex.Item>
                <Flex.Item span={11}>
                  <Typography.Text ellipsis={2}>{item?.title}</Typography.Text>
                  <br />
                  <Typography.Text className={styles.sportsListTime}>{item?.createtime}</Typography.Text>
                </Flex.Item>
                <Flex.Item
                  span={3}
                  style={{ lineHeight: 4.8 }}
                  onClick={() => {
                    handleOpenVisible(true, item);
                  }}
                >
                  <IconFont name="icon-bianji1" width={'32px'} height={'32px'} />
                </Flex.Item>
              </Flex>
            </Card>
          </SwipeCell>
        );
      })}
      {articleList.length >= 1 ? <Divider style={{ padding: '0 0 70px 0 ' }}>到底啦～</Divider> : null}
      <ActionBar safeAreaInsetBottom style={{ padding: '16px' }}>
        <Button
          round
          color="linear-gradient(to right, #1654ff, #1654ff)"
          block
          icon={<IconFont name="icon-tianjia1" />}
          onClick={() => {
            handleOpenVisible(true, null);
          }}
        >
          我要投稿
        </Button>
      </ActionBar>
      <Edit visible={visible} handleOpenVisible={handleOpenVisible} row={row} handleArticleList={handleArticleList} />
    </div>
  );
};

export default Index;
