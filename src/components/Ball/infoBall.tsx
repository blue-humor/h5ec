import { history } from 'umi';

import { Flex, FloatingBall, Typography } from 'react-vant';

import IconFont from '@/utils/iconFont';

import './index.less';

export default (props: any) => {
  const handlePush = () => {
    history.push({
      pathname: '/about',
    });
  };

  return (
    <div className="demo-floating-box" onClick={() => handlePush()}>
      <FloatingBall
        className="demo-floating-box-bubble"
        offset={{
          right: 18,
          bottom: 140,
        }}
        style={{
          '--rv-floating-box-size': '60px',
        }}
        adsorb={{
          // 滚动缩进比例
          indent: 0,
          // 近边停靠距离
          distance: 16,
        }}
        // {...props}
      >
        <div className="infoNav">
          {' '}
          <IconFont name="icon-lianxiwomen1" style={{ fontSize: '30px', zindex: 99 }} />
          <br />
          <Typography.Title className="infoFont">联系我们</Typography.Title>
        </div>
      </FloatingBall>
    </div>
  );
};
