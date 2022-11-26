import React, { useEffect, Fragment } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const Index: React.FC = () => {
  useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.done();
    };
  }, []);
  return <Fragment />;
};

export default Index;
