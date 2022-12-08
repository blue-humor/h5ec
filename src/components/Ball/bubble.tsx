import { Flex, FloatingBall } from 'react-vant';
import { Chat } from '@react-vant/icons';

import './index.less';

export default (props: any) => {
  return (
    <FloatingBall
      className="demo-floating-box-bubble"
      offset={{
        right: 20,
        bottom: 100,
      }}
      style={{
        '--rv-floating-box-size': '60px',
      }}
      adsorb={{
        // 滚动缩进比例
        indent: 1,
        // 近边停靠距离
        distance: 10,
      }}
      {...props}
    >
      <Flex align="center" justify="center" className="main-button">
        <Chat />
      </Flex>
    </FloatingBall>
  );
};
