export default [
  {
    path: '/login',
    title: '登陆',
    component: './login',
  },
  { exact: true, path: '/goods/details', title: '商品详情', component: '@/pages/goods/details' },
  { exact: true, path: '/goods/list', title: '商品列表', component: '@/pages/goods/list' },
  { exact: true, path: '/goods/pay', title: '订单确认', component: '@/pages/goods/pay' },
  { exact: true, path: '/address/list', title: '地址列表', component: '@/pages/address/list' },
  { exact: true, path: '/address/editor', title: '地址编辑', component: '@/pages/address/editor' },
  { exact: true, path: '/user/order', title: '订单', component: '@/pages/order' },

  {
    exact: false,
    component: '@/layouts/index',
    routes: [
      { exact: true, path: '/home', title: '首页', component: '@/pages/home' },
      { exact: true, path: '/classify', title: '分类', component: '@/pages/classify' },
      { exact: true, path: '/cart', title: '购物车', component: '@/pages/cart' },
      { exact: true, path: '/user', title: '个人中心', component: '@/pages/user' },
      // { exact: true, path: '/apply', title: '报名', component: '@/pages/apply' },

      { path: '/', redirect: '/home' },
      { component: './404' },
    ],
  },

  { component: './404' },
];
