import React, { useState } from 'react';
import { Card, Image, Toast, Divider, List, Cell, Tag, Typography, Flex } from 'react-vant';

import IconFont from '@/utils/iconFont';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [finished, setFinished] = useState<boolean>(false);

  const handleOnLoad = async () => {};

  const src = 'https://n.sinaimg.cn/sports/2_img/upload/a7a65bdb/107/w1024h683/20221208/df90-c7609c9425dfdc5e0fa7b14d03957b68.jpg';

  return (
    <>
      <List finished={finished} onLoad={handleOnLoad}>
        <Card>
          <Card.Cover onClick={() => Toast.info('点击了Cover区域')}>
            <Image src={src} fit="cover" width="100%" height="58vw" />
          </Card.Cover>
          <Card.Body className={styles.newsFontSize}>
            <Typography.Title level={6}>标题{src}</Typography.Title>
            <Flex justify="between">
              <Flex.Item>
                <Typography.Text>时间：2101.12</Typography.Text>
              </Flex.Item>
              <Flex.Item>
                <IconFont name="icon-dianzan" width={22} height={22} style={{ margin: '0 6px' }} />
                <Typography.Text>2022</Typography.Text>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <Divider dashed />
        </Card>
      </List>
    </>
  );
};

export default Index;
