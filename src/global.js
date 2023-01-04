import Vconsole from 'vconsole';
import { history } from 'umi';
const { NODE_ENV } = process.env;

const { pathname } = history.location;

if (NODE_ENV === 'development') {
  new Vconsole();
}

import NProgress from 'nprogress'; // 引入nprogress插件
NProgress.configure({ easing: 'ease', showSpinner: false });

// window.addEventListener('popstate', e => {
//   new Promise((resolve, reject) => {
//     resolve(() => {
//       if (location.pathname === '/apply/list') {
//         history.push('/');
//         return;
//       }
//     });
//   });
// });
