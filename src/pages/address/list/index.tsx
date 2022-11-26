import React from 'react';
import { history } from 'umi';
import { Radio, SwipeCell, Button, Typography, Card, Flex, ActionBar, Toast } from 'react-vant';
import { createFromIconfontCN } from '@react-vant/icons';

import NavBar from '@/components/NavBar';

import styles from './index.less';

interface IndexProps {}

const IconFont = createFromIconfontCN('//at.alicdn.com/t/c/font_3784684_dtd2e5mepsf.js');

const content = 'React Vant 是一套轻量、可靠的移动端 React 组件库';

const Index: React.FC<IndexProps> = props => {
  return (
    <>
      <NavBar title="收获地址" />

      <Radio.Group onChange={v => console.log(v)}>
        <SwipeCell
          rightAction={
            <Button style={{ height: '100%' }} square type="danger">
              删除
            </Button>
          }
        >
          <Card className={styles.addressCard}>
            <Flex align="center" justify="around">
              <Flex.Item>
                <Radio
                  name={{
                    city: '肯德基先生的地址在',
                    iphone: '13935890089',
                    name: '肯德基先生',
                  }}
                />
              </Flex.Item>
              <Flex.Item className={styles.addressInfo}>
                <Typography.Title level={6}>
                  肯德基先生 <span>13935890089</span>
                </Typography.Title>
                <Typography.Text>肯德基先生的地址在 {content} s</Typography.Text>
              </Flex.Item>
              <Flex.Item className={styles.addressInfo}>
                <IconFont name="icon-bianji" onClick={() => history.push('/address/editor')} />
              </Flex.Item>
            </Flex>
          </Card>
        </SwipeCell>
      </Radio.Group>

      <ActionBar safeAreaInsetBottom style={{ padding: '16px' }}>
        <Button round color="linear-gradient(to right, #ff6034, #ee0a24)" block icon={<IconFont name="icon-tongyong_tianjia" />} onClick={() => history.push('/address/editor')}>
          新建收获地址
        </Button>
      </ActionBar>
    </>
  );
};

export default Index;
