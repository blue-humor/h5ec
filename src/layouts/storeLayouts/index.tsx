import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { Tabbar } from 'react-vant';
import { Bars, WapHome, Friends } from '@react-vant/icons';

import IconFont from '@/utils/iconFont';

interface IndexProps {
  children: any;
}

const Layout: React.FC<IndexProps> = (props: { children: any }) => {
  const [name, setName] = useState<string>('');

  const handleHistory = (params: string) => {
    setName(params);
    history.push({
      pathname: params,
    });

    // window.location.href = params
  };

  useEffect(() => {
    console.log(history.location.pathname);

    setName(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <>
      {props.children}
      <div className="demo-tabbar" style={{ zIndex: 999 }}>
        <Tabbar defaultValue={'/home'} placeholder fixed value={name} activeColor="#7490eb" inactiveColor="#cec8c8" safeAreaInsetBottom onChange={(c: any) => handleHistory(c)}>
          <Tabbar.Item name="/home" icon={<WapHome />}>
            首页
          </Tabbar.Item>
          <Tabbar.Item name="/store/classify" icon={<Bars />}>
            商城
          </Tabbar.Item>
          {/* <Tabbar.Item name="/store/cart" icon={<Cart />} badge={{ content: 5 }}>
            购物车
          </Tabbar.Item> */}
          <Tabbar.Item name="/apply" icon={<IconFont name="icon-baoming" />}>
            报名
          </Tabbar.Item>
          <Tabbar.Item name="/user" icon={<Friends />}>
            个人中心
          </Tabbar.Item>
        </Tabbar>
      </div>
    </>
  );
};

export default Layout;
