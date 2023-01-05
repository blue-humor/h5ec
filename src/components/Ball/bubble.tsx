import { useState, useEffect } from 'react';
import { Image, Flex, FloatingBall, List } from 'react-vant';

import ZanHong from '@/common/imgs/zanhong.png';

import ZanBai from '@/common/imgs/zanbai.png';

import { reqLikeIt } from '@/services/common';

import { throttle } from '@/utils/index';

import './index.less';

export default (props: any) => {
  const { articleId, like } = props;

  useEffect(() => {
    if (articleId !== null) {
      setIsShow(like);
    }
  }, [like]);
  // 点赞数

  const [isShow, setIsShow] = useState<boolean>(like);

  // 截流

  const handlerLikeIt = async () => {
    const res = await reqLikeIt({ articleId });
    if (res?.code === 200) {
      setIsShow(!isShow);
    }
  };

  return (
    <div className="demo-floating-box">
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
          indent: 0,
          // 近边停靠距离
          distance: 10,
        }}
        // {...props}
      >
        <Flex align="center" justify="center" className="main-button" onClick={() => handlerLikeIt()}>
          <Image src={isShow ? ZanHong : ZanBai} fit="cover" className={`${isShow ? 'shake' : 'shakHidden'}`} />
        </Flex>
      </FloatingBall>
    </div>
  );
};
