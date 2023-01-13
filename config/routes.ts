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
  { exact: true, path: '/user/articlesList', title: '我的投稿', component: '@/pages/user/articlesList' },

  { exact: true, path: '/apply/enrollList', title: '登记列表', component: '@/pages/apply/enrollList' },
  { exact: true, path: '/apply/editor', title: '报名编辑', component: '@/pages/apply/editor' },
  { exact: true, path: '/sports/list', title: '资讯列表', component: '@/pages/sports/list' },
  { exact: true, path: '/sports/details', title: '资讯详情', component: '@/pages/sports/details' },
  { exact: true, path: '/apply/enroll', title: '登记', component: '@/pages/apply/enroll' },
  { exact: true, path: '/about', title: '', component: '@/pages/about' },

  {
    exact: false,
    component: '@/layouts/storeLayouts',
    routes: [
      { exact: false, path: '/home', title: '峰巍体育', component: '@/pages/sports/home' },
      { exact: true, path: '/store/classify', title: '商城', component: '@/pages/store/classify' },
      // { exact: true, path: '/store/cart', title: '购物车', component: '@/pages/store/cart' },
      { exact: true, path: '/user', title: '个人中心', component: '@/pages/user' },
      { exact: true, path: '/apply/list', title: '报名', component: '@/pages/apply/list' },
      { path: '/', redirect: '/home' },
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/home' },
  { component: './404' },
];
