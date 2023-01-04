import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { SwipeCell, Button, Typography, Card, Flex, ActionBar, Toast, Empty, Image, NavBar, Divider } from 'react-vant';

import IconFont from '@/utils/iconFont';

// import NavBar from '@/components/NavBar';

import { reqApplyList, reqApplyDel } from '@/services/apply';

import styles from './index.less';
import TeamSvg from '@/common/svg/team.svg';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { query } = history.location;
  const { parentId, type }: any = query;

  const [applyList, setapplyList] = useState<any>([]);

  // 获取地址列表
  const handleapplyList = async () => {
    const res = await reqApplyList({ current: 1, pageSize: 26, parentId: query?.parentId });
    if (res?.code === 200) {
      const { list } = res?.data;
      setapplyList(list);
    }
  };

  // 删除地址
  const handleAplayDel = async (params: any) => {
    const res = await reqApplyDel({ id: params });
    if (res?.code === 200) {
      setapplyList(applyList.filter((item: any) => item?.id !== params));
      Toast.success(res?.message);
    }
  };

  const handleApplyEditorPush = (item: any) => {
    history.push({
      pathname: '/apply/editor',
      query: {
        register_memberId: parentId,
        type: type,
        info: item,
      },
    });
  };

  useEffect(() => {
    handleapplyList();

    return () => {};
  }, []);

  return (
    <div className={styles.address_list_nav}>
      {/* <NavBar title="队员信息列表" onClickLeft={() => history.push('/')} fixed placeholder safeAreaInsetTop /> */}

      {applyList.length < 1 ? (
        <Empty description="暂无队员，赶快添加吧！" imageSize={280} image={<Image src={TeamSvg} />} />
      ) : (
        applyList?.map((item: any, index: number) => {
          return (
            <SwipeCell
              key={item?.id}
              rightAction={
                <Button style={{ height: '100%' }} square type="danger" onClick={() => handleAplayDel(item?.id)}>
                  删除
                </Button>
              }
            >
              <Card className={styles.addressCard}>
                <Flex align="center" justify="around">
                  <Flex.Item className={styles.addressInfo} onClick={() => handleApplyEditorPush(item)}>
                    <Typography.Title level={6}>队员姓名：{item?.name}</Typography.Title>
                    <Typography.Title level={6}>队员性别：{item?.sex}</Typography.Title>
                    <Typography.Title level={6}>队员身份证号：{item?.idNo}</Typography.Title>
                    {type === '1' ? (
                      <>
                        <Typography.Text>所属学校：{item?.colleageName}</Typography.Text>
                        <br />
                        <Typography.Text>未成年监护人姓名：{item?.supervisorName}</Typography.Text>
                        <br />
                        <Typography.Text>监护人身份证号：{item?.supervisorIdNo}</Typography.Text>
                        <br />
                      </>
                    ) : null}
                  </Flex.Item>
                  <Flex.Item>
                    <IconFont width={'20px'} height={'60px'} name="icon-wenbenbianjitianchong" onClick={() => handleApplyEditorPush(item)} />
                  </Flex.Item>
                </Flex>
              </Card>
              {index + 1 === applyList.length ? <Divider style={{ padding: '0 0 70px 0 ' }}>到底啦～</Divider> : null}
            </SwipeCell>
          );
        })
      )}

      <ActionBar safeAreaInsetBottom style={{ padding: '16px' }}>
        <Button
          round
          color="linear-gradient(to right, #1654ff, #1654ff)"
          block
          icon={<IconFont name="icon-tianjia1" />}
          onClick={() => {
            history.push({
              pathname: '/apply/editor',
              query: {
                register_memberId: parentId,
                type,
              },
            });
          }}
        >
          添加队友信息含替补
        </Button>
      </ActionBar>
    </div>
  );
};

export default Index;
