import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { Tabbar } from 'react-vant';
import { Bars, WapHome, Cart, Friends } from '@react-vant/icons';

import './index.less';

interface IndexProps {
  children: any;
}

const Layout: React.FC<IndexProps> = props => {
  const [name, setName] = useState<string>('home');

  const handleHistory = (params: any) => {
    setName(params);
    console.log();
    history.push(`/${params}`);
  };

  useEffect(() => {
    const pathName = history.location.pathname;
    const name = pathName.substring(1);
    setName(name);
    return () => {};
  }, []);

  return (
    <>
      {props.children}
      <div className="demo-tabbar">
        <Tabbar placeholder value={name} activeColor="#fa4126" inactiveColor="#cec8c8" safeAreaInsetBottom onChange={c => handleHistory(c)}>
          <Tabbar.Item name="home" icon={<WapHome />}>
            首页
          </Tabbar.Item>
          <Tabbar.Item name="classify" icon={<Bars />}>
            分类
          </Tabbar.Item>
          <Tabbar.Item name="cart" icon={<Cart />} badge={{ content: 5 }}>
            购物车
          </Tabbar.Item>
          <Tabbar.Item name="user" icon={<Friends />}>
            个人中心
          </Tabbar.Item>
          <Tabbar.Item name="apply" icon={<Friends />}>
            报名
          </Tabbar.Item>
        </Tabbar>
      </div>
    </>
  );
};

export default Layout;
