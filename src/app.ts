import { history } from 'umi';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import wx from 'weixin-js-sdk';

export const render = async (oldRender: any) => {
  const token = window.sessionStorage.getItem('token');
  if (!token) {
    const { openid, token }: any = history?.location?.query;
    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('openid', openid);
  }
  oldRender();
};

export function onRouteChange({ action }) {
  const token = window.sessionStorage.getItem('token');
  if (!token) {
    wx.miniProgram.switchTab({
      url: '/pages/index/index',
    });
  }

  NProgress.start();
  if (action === 'PUSH' || action === 'POP') {
    NProgress.done();
  }
}
