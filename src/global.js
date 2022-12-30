import Vconsole from 'vconsole';

const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  new Vconsole();
}

import NProgress from 'nprogress'; // 引入nprogress插件
NProgress.configure({ easing: 'ease', showSpinner: false });
