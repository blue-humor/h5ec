import React, { useEffect, useState } from 'react';

import { history } from 'umi';

import { Card, Cell, Typography, Image, Flex, Button, Badge } from 'react-vant';

import IconFont from '@/utils/iconFont';

import { reqUserInfo } from '@/services/user';

interface IndexProps {}

import styles from './index.less';

const flow = [
  // { id: 1, name: 'icon-icon', text: '待付款', type: 5 },
  // { id: 2, name: 'icon-a-daidaohuodaifahuodaishouhuoyunshu', text: '待发货', type: 10 },
  { id: 3, name: 'icon-daishouhuo1', text: '待收货', type: 40 },
  { id: 4, name: 'icon-dingdanyiwancheng', text: '已完成', type: 50 },
];

const Index: React.FC<IndexProps> = props => {
  const [userInfo, setUserInfo] = useState<any>({});

  const openid = window.sessionStorage.getItem('openid');

  const handleUserInfo = async () => {
    const res = await reqUserInfo({ openid });
    if (res?.code === 200) {
      setUserInfo(res.data);
    }
  };

  const handlePush = (params: number) => {
    history.push({
      pathname: '/user/order',
      query: {
        defaultType: params + '',
      },
    });
  };

  useEffect(() => {
    handleUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <div className={styles.user_nav}>
        <div className={styles.user_bg}></div>
        <Cell style={{ alignItems: 'center' }} className={styles.user_avater} border={false} title={<Typography.Title> {userInfo?.nickName}</Typography.Title>} icon={<Image width={'60px'} height={'60px'} src={userInfo?.headimg} round />} />
        <Card className={styles.user_card}>
          <Cell title={<Typography.Title level={6}>我的订单</Typography.Title>} isLink value="全部订单" onClick={() => handlePush(-1)} />

          <Flex justify="around" style={{ margin: '10px 0 20px  0' }}>
            {flow.map(item => {
              return (
                <Flex.Item key={item.id} onClick={() => handlePush(item?.type)}>
                  <div className={styles.user_iconfont}>
                    <Badge>
                      <IconFont name={item.name} style={{ fontSize: '24px' }} />
                      <div style={{ color: '#707070' }}>{item.text}</div>
                    </Badge>
                  </div>
                </Flex.Item>
              );
            })}
          </Flex>
          <Cell isLink title="收获地址" border className={styles.harvest_addres} onClick={() => history.push('/address/list')} />
          <Cell isLink title="我的投稿" border onClick={() => history.push('/user/articlesList')} />
        </Card>
      </div>
    </>
  );
};

export default Index;
