export default [
  {
    path: '/login',
    name: '登陆',
    component: './login',
  },
  { exact: true, path: '/goods/details', component: '@/pages/goods/details' },
  { exact: true, path: '/goods/list', component: '@/pages/goods/list' },
  { exact: true, path: '/goods/pay', component: '@/pages/goods/pay' },
  { exact: true, path: '/address/list', component: '@/pages/address/list' },
  { exact: true, path: '/address/editor', component: '@/pages/address/editor' },

  {
    exact: false,
    component: '@/layouts/index',
    routes: [
      { exact: true, path: '/home', component: '@/pages/home' },
      { exact: true, path: '/classify', component: '@/pages/classify' },
      { exact: true, path: '/cart', component: '@/pages/cart' },
      { exact: true, path: '/user', component: '@/pages/user' },
      { path: '/', redirect: '/home' },
    ],
  },

  // {
  //   component: './404',
  // },
];
