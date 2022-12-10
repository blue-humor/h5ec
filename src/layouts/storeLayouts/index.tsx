import React, { useState } from 'react';

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
  };

  return (
    <>
      {props.children}
      <div className="demo-tabbar">
        <Tabbar defaultValue={'/sports/home'} placeholder fixed value={name} activeColor="#fa4126" inactiveColor="#cec8c8" safeAreaInsetBottom onChange={(c: any) => handleHistory(c)}>
          <Tabbar.Item name="/sports/home" icon={<WapHome />}>
            首页
          </Tabbar.Item>
          <Tabbar.Item name="/store/classify" icon={<Bars />}>
            分类
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
