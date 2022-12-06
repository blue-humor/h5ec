import { history } from 'umi';
import NProgress from 'nprogress'; // 引入nprogress插件

import 'nprogress/nprogress.css'; // 这个nprogress样式必须引入

export const render = async (oldRender: any) => {
  const token = window.sessionStorage.getItem('token');
  if (!token) {
    history.push('/login');
  }
  oldRender();
};

export function onRouteChange({ location, routes, action }) {
  NProgress.start();
  if (action === 'PUSH' || action === 'POP') {
    NProgress.done();
  }
}
