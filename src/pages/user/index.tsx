import React, { useEffect, useState } from 'react';

import { history } from 'umi';

import { Card, Cell, Typography, Image, Flex, Button, Badge } from 'react-vant';

import IconFont from '@/utils/iconFont';

import { reqUserInfo } from '@/services/user';

interface IndexProps {}

import styles from './index.less';

const flow = [
  { id: 1, name: 'icon-gouwuche_daifukuan', text: '待付款', type: 1 },
  { id: 2, name: 'icon-daifahuo', text: '代发货', type: 2 },
  { id: 3, name: 'icon-daishouhuo', text: '代收货', type: 3 },
  { id: 4, name: 'icon-yiwancheng', text: '已完成', type: 4 },
];

const Index: React.FC<IndexProps> = props => {
  const { openid }: any = history?.location?.query;
  const [userInfo, setUserInfo] = useState<any>({});

  const handleUserInfo = async () => {
    const res = await reqUserInfo({ openid });
    if (res?.code === 200) {
      setUserInfo(res.data);
    }
  };

  useEffect(() => {
    handleUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <div className={styles.user_nav}>
        <div className={styles.user_bg}></div>
        <Cell style={{ alignItems: 'end' }} className={styles.user_avater} title={<Typography.Title> {userInfo?.nickName}</Typography.Title>} icon={<Image width={'60px'} height={'60px'} src={userInfo?.headimg} round />} />
        <Card className={styles.user_card}>
          <Cell title={<Typography.Title level={6}>我的订单</Typography.Title>} isLink value="全部订单" onClick={() => history.push('/user/order')} />

          <Flex justify="around" style={{ margin: '10px 0 20px  0' }}>
            {flow.map(item => {
              return (
                <Flex.Item key={item.id}>
                  <div className={styles.user_iconfont}>
                    <Badge content={5}>
                      <IconFont name={item.name} width={'32px'} height={'32px'} />
                      <div>{item.text}</div>
                    </Badge>
                  </div>
                </Flex.Item>
              );
            })}
          </Flex>
          <Cell isLink title="收获地址" className={styles.harvest_addres} onClick={() => history.push('/address/list')} />
        </Card>
      </div>
    </>
  );
};

export default Index;
