//加入购物车前端所传字段
{
  type: 0; //购物车所传的判断字段
  detailsId: 1; //当前详情id
  goodsId: 1;
  selectedNum: 2; //选择几个
  discount: null;
  id: 4;
  price: 111; //价格
  properties: [];
  property_price: 0;
  s1: '1'; //对应的规格id
  s2: '4';
  stock_num: 12; //库存
}

//立即购买跳转支付页面
{
  goodsId: 1;
  selectedNum: 2; //选择几个
  discount: 999;
  selectedSkuComb: {
    id: 4;
    price: 111; //价格
    properties: [];
    property_price: 0;
    s1: '1'; //对应的规格id
    s2: '4';
    stock_num: 12; //库存
  }
}

//后端返回
{
  //地址如果没有 返回null
  address: {
    name: '大潘';
    phone: '15677878898';
    city: ['天津市', '天津市'];
    isDefault: 1;
    detailAddress: '黄河大江';
  }
  goods: {
    price: 19000;
    selectedNum: 2;
    imgUrl: '';
    specification: '红色 M';
    freight: '免运费 或者 金额';
    totalAmout: 372891739281;
  }
}
