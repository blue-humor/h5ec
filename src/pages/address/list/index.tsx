import React, { useEffect, useState, useRef } from 'react';
import { history, useModel } from 'umi';
import { Radio, SwipeCell, Button, Typography, Card, Flex, ActionBar, Dialog, Toast, Empty } from 'react-vant';

import IconFont from '@/utils/iconFont';

import NavBar from '@/components/NavBar';

import { reqAddressList, reqAddressDel } from '@/services/address/list';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const { handleClickEdit } = useModel('addressEdit', model => ({
    handleClickEdit: model.handleClickEdit,
  }));

  const { query } = history.location;

  const [addressList, setAddressList] = useState([]);

  const [radioValue, setRadioValue] = useState<any>(null);

  // 获取地址列表
  const handleAddressList = async () => {
    // 备注
    const res = await reqAddressList({ memberId: 1 });
    if ((res.code = 200)) {
      setAddressList(res.data);
    }
  };

  // 选择地址
  const handleOnChange = (params: string) => {
    if (query?.orderId) {
      setRadioValue(params);
      Dialog.confirm({
        // title: '标题',
        message: '是否确认当前地址为收货地址？',
      })
        .then(async () => {
          history.push({
            pathname: '/goods/pay',
            query: {
              ...query,
              addressId: params,
            },
          });
        })
        .catch(() => {
          setRadioValue(null);
        });
    } else {
      return;
    }
  };

  // 删除地址
  const handleAddressDel = async (params: any) => {
    const res = await reqAddressDel({ id: params });
    if (res?.code === 200) {
      setAddressList(addressList.filter((item: any) => item?.id !== params));
      Toast.success(res.message);
    }
  };

  useEffect(() => {
    handleAddressList();

    return () => {};
  }, []);

  return (
    <div className={styles.address_list_nav}>
      <NavBar title="收获地址" />

      {addressList.length < 1 ? (
        <Empty description="暂无收货地址，赶快添加吧" style={{ background: '#fff' }} />
      ) : (
        <Radio.Group onChange={(v: string) => handleOnChange(v)} value={radioValue}>
          {addressList.map((item: any) => {
            return (
              <SwipeCell
                key={item?.id}
                rightAction={
                  <Button style={{ height: '100%' }} square type="danger" onClick={() => handleAddressDel(item?.id)}>
                    删除
                  </Button>
                }
              >
                <Card className={styles.addressCard} key={item.id}>
                  <Flex align="center" justify="around">
                    {query?.orderId ? <Flex.Item> {<Radio name={item?.id} />}</Flex.Item> : null}
                    <Flex.Item className={styles.addressInfo} onClick={e => handleOnChange(item?.id)}>
                      <Typography.Title level={6}>
                        {item?.name} <span>{item?.phone}</span>
                      </Typography.Title>
                      <Typography.Text
                      // ellipsis={{
                      //   rows: 2,
                      //   collapseText: '收起',
                      //   expandText: '展开',
                      // }}
                      >{`${item?.countryName} ${item?.cityName}  ${item?.detailAddress}`}</Typography.Text>
                    </Flex.Item>
                    <Flex.Item>
                      <IconFont width={'20px'} height={'60px'} name="icon-wenbenbianjitianchong" onClick={() => handleClickEdit(item)} />
                    </Flex.Item>
                  </Flex>
                </Card>
              </SwipeCell>
            );
          })}
        </Radio.Group>
      )}

      <ActionBar safeAreaInsetBottom style={{ padding: '16px' }}>
        <Button
          round
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          block
          icon={<IconFont name="icon-tianjia1" />}
          onClick={() => {
            history.push('/address/editor');
          }}
        >
          新建收获地址
        </Button>
      </ActionBar>
    </div>
  );
};

export default Index;
