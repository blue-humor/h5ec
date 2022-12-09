import react, { useState } from 'react';
import { Image, Flex, FloatingBall, Typography } from 'react-vant';

import { Chat } from '@react-vant/icons';

import ZanHong from '@/common/imgs/zanhong.png';

import ZanBai from '@/common/imgs/zanbai.png';

import './index.less';

export default (props: any) => {
  const [isShow, setIsShow] = useState<boolean>(false);

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
      <Flex align="center" justify="center" className="main-button" onClick={() => setIsShow(!isShow)}>
        <Image src={isShow ? ZanHong : ZanBai} fit="cover" className={`${isShow ? 'shake' : 'shakHidden'}`} />
      </Flex>
    </FloatingBall>
  );
};
