data: {
// 所有 sku 规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
// 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
tree: [
{
k: '颜色', // skuKeyName：规格类目名称
k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
v: [
{
id: '1', // skuValueId：规格值 id
name: '红色', // skuValueName：规格值名称
imgUrl: 'https://img01.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
previewImgUrl: 'https://img01.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
},
{
id: '1',
name: '蓝色',
imgUrl: 'https://img01.yzcdn.cn/2.jpg',
previewImgUrl: 'https://img01.yzcdn.cn/2p.jpg',
}
],
largeImageMode: true, // 是否展示大图模式
}
],
// 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
list: [
{
id: 2259, // skuId
s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
price: 100, // 价格（单位分）
stock_num: 110 // 当前 sku 组合对应的库存
}
],
price: '1.00', // 默认价格（单位元）
stock_num: 227, // 商品总库存
collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
none_sku: false, // 是否无规格商品
}

<!-- 前端模拟字段 参考-->

const data = {
goods_id: '1',
quota: 5,
quota_used: 0,
start_sale_num: 2,
goods_info: {
price: 1,
title: '测试商品',
picture: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
},
sku: {
price: '199.9',
stock_num: 666, //总体数量
none_sku: false,
hide_stock: false,
collection_id: 2261,
tree: [
{
k: '颜色',
k_s: 's1',
k_id: '1',
v: [
{
id: '1',
name: '粉色',
imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
},
{
id: '2',
name: '黄色',
imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png',
},
{
id: '3',
name: '蓝色',
imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-3.png',
},
],
largeImageMode: false,
},
{
k: '尺寸',
k_s: 's2',
k_id: '2',
v: [
{
id: '1',
name: '大',
},
{
id: '2',
name: '小',
},
],
},
],
list: [
{
id: 2259,
s1: '2',
s2: '1',
price: 100,
discount: 100,
stock_num: 110,
},
{
id: 2260,
s1: '3',
s2: '1',
price: 100,
discount: 100,
stock_num: 99,
},
{
id: 2257,
s1: '1',
s2: '1',
price: 100,
discount: 100,
stock_num: 111,
},
{
id: 2258,
s1: '1',
s2: '2',
price: 100,
discount: 100,
stock_num: 6,
},
],
},
}
