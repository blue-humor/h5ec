import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { SwipeCell, Button, Typography, Card, Flex, ActionBar, Toast, Divider } from 'react-vant';

import IconFont from '@/utils/iconFont';

import EditModel from './components/EditModel';

import { reqApplyList, reqApplyDel } from '@/services/apply';

import styles from './index.less';

// import wx from 'weixin-js-sdk';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { query } = history.location;
  const { parentId, type, activityId }: any = query;

  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState<any>();

  const [applyList, setapplyList] = useState<any>([]);

  // 获取地址列表
  const handleapplyList = async () => {
    const res = await reqApplyList({ current: 1, pageSize: 30, parentId: query?.parentId, activityId, type });
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

  const handleOpenVisible = (isOpen: boolean, item: any = null) => {
    setInfo(item);
    setVisible(isOpen);
  };

  useEffect(() => {
    handleapplyList();

    return () => {};
  }, []);

  return (
    <div className={styles.address_list_nav}>
      {/* <NavBar title="队员信息列表" onClickLeft={() => history.push('/')} fixed placeholder safeAreaInsetTop /> */}
      {applyList?.map((item: any, index: number) => {
        return (
          <>
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
                  <Flex.Item className={styles.addressInfo} onClick={() => handleOpenVisible(true, item)}>
                    <Typography.Title level={6}>队员姓名：{item?.name}</Typography.Title>
                    <Typography.Title level={6}>队员性别：{item?.sex}</Typography.Title>
                    <Typography.Title level={6}>队员身份证号：{item?.idNo}</Typography.Title>
                    {type == '1' ? (
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
                    <IconFont style={{ fontSize: '36px' }} name="icon-icon1" onClick={() => handleOpenVisible(true, item)}></IconFont>
                  </Flex.Item>
                </Flex>
              </Card>
            </SwipeCell>
            {index + 1 === applyList?.length ? <Divider style={{ paddingBottom: '100px' }}>到底啦～</Divider> : null}
          </>
        );
      })}
      <ActionBar safeAreaInsetBottom style={{ padding: '12px' }}>
        <Button
          round
          color="linear-gradient(to right, #1654ff, #1654ff)"
          block
          icon={<IconFont name="icon-tianjia1" />}
          onClick={() => {
            handleOpenVisible(true);
          }}
        >
          添加队友信息含替补
        </Button>
      </ActionBar>

      <EditModel visible={visible} handleOpenVisible={handleOpenVisible} handleapplyList={handleapplyList} info={info} />
    </div>
  );
};

export default Index;
