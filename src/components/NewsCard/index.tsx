import React, { useState } from 'react';
import { Card, Image, Toast, Divider, List, Cell, Tag, Typography } from 'react-vant';

import IconFont from '@/utils/iconFont';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [finished, setFinished] = useState<boolean>(false);

  const handleOnLoad = async () => {};

  return (
    <>
      <List finished={finished} onLoad={handleOnLoad}>
        <Card round>
          <Card.Cover onClick={() => Toast.info('点击了Cover区域')}>
            <Image src="/demo_avatar_1.jpg" fit="cover" width="100%" height="58vw" />
          </Card.Cover>
          <Card.Header className={styles.newsFontSize}>封面展示</Card.Header>
          <Card.Body className={styles.newsFontSize}>
            <Cell title="时间：2022-12-12" style={{ padding: '0 0' }}>
              <IconFont name="icon-dianzan" width={22} height={22} style={{ margin: '0 6px' }} />
              <Typography.Text>2022</Typography.Text>
            </Cell>
          </Card.Body>
          <Divider dashed />
        </Card>
      </List>
    </>
  );
};

export default Index;
