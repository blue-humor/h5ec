import React from 'react';
import { history } from 'umi';

import { Button, Empty, Image } from 'react-vant';

interface IndexProps {}

import NoFound from '@/common/svg/404.svg';

const NoFoundPage: React.FC<IndexProps> = props => {
  return (
    <>
      <Empty className="custom-image" imageSize={380} image={<Image src={NoFound} />}>
        <Button style={{ width: 160 }} round type="primary" onClick={() => history.push('/')}>
          Go Home
        </Button>
      </Empty>
    </>
  );
};

export default NoFoundPage;
