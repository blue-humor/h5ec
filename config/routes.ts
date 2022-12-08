export default [
  {
    path: '/login',
    title: '登陆',
    component: './login',
  },
  { exact: true, path: '/goods/details', title: '商品详情', component: '@/pages/store/goods/details' },
  { exact: true, path: '/goods/list', title: '商品列表', component: '@/pages/store/goods/list' },
  { exact: true, path: '/goods/pay', title: '订单确认', component: '@/pages/store/goods/pay' },
  { exact: true, path: '/address/list', title: '地址列表', component: '@/pages/store/address/list' },
  { exact: true, path: '/address/editor', title: '地址编辑', component: '@/pages/store/address/editor' },
  { exact: true, path: '/user/order', title: '订单', component: '@/pages/store/order' },
  { exact: true, path: '/apply/list', title: '报名列表', component: '@/pages/apply/list' },
  { exact: true, path: '/apply/editor', title: '报名编辑', component: '@/pages/apply/editor' },
  { exact: true, path: '/sports/list', title: '列表', component: '@/pages/sports/list' },
  { exact: true, path: '/sports/details', title: '详情', component: '@/pages/sports/details' },

  {
    exact: false,
    component: '@/layouts/storeLayouts',
    routes: [
      { exact: true, path: '/sports/home', title: '首页', component: '@/pages/sports/home' },
      { exact: true, path: '/store/classify', title: '分类', component: '@/pages/store/classify' },
      // { exact: true, path: '/store/cart', title: '购物车', component: '@/pages/store/cart' },
      { exact: true, path: '/user', title: '个人中心', component: '@/pages/user' },
      { exact: true, path: '/apply', title: '报名', component: '@/pages/apply' },
      { path: '/', redirect: '/sports/home' },
      { component: './404' },
    ],
  },

  { component: './404' },
];
