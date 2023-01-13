import React, { useEffect, useRef } from 'react';

import BScroll from '@better-scroll/core';

import './index.less';

interface IndexProps {
  children: any;
}

let scrollY: any = null;
const Index: React.FC<IndexProps> = props => {
  const container = useRef<any>();

  useEffect(() => {
    scrollY = new BScroll(container.current, {
      scrollY: true,
      click: true,
      probeType: 2,
    });
    console.log(scrollY);

    return () => {};
  }, []);

  return (
    <div ref={container} className="container">
      <div>
        <ul>{props.children}</ul>
      </div>
    </div>
  );
};

export default Index;
