import { history } from 'umi';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

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
  NProgress.start();
  if (action === 'PUSH' || action === 'POP' || action === 'REPLACE') {
    NProgress.done();
  }
}
