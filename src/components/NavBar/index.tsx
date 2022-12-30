import React, { Suspense } from 'react';
import { history } from 'umi';

import { NavBar, Typography } from 'react-vant';

interface IndexProps {
  title: string;
}

const Index: React.FC<IndexProps> = ({ title }) => {
  return (
    <>
      <NavBar
        style={{ zIndex: '9' }}
        placeholder
        fixed
        safeAreaInsetTop
        title={<Typography.Text>{title}</Typography.Text>}
        // leftText="返回"
        onClickLeft={() => history.goBack()}
      />
    </>
  );
};

export default Index;
