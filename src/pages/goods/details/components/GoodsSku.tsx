import React, { useRef } from 'react';

import { history } from 'umi';

import { Sku, Button, Toast, Popup, ProductCard, Form, Selector, Stepper, Space, ActionBar } from 'react-vant';
import { Fire } from '@react-vant/icons';

import styles from '../index.less';

// import type { SkuInstance } from 'react-vant';

interface GoodsSkuProps {
  showShoppin?: boolean;
  showButtonType?: number;
  handleShowShopping: (params: boolean, type?: number) => void;
  setSelect: any;
}

// function getSkuData(largeImageMode = false) {
//     return {
//         goods_id: '1',
//         quota: 5,
//         quota_used: 0,
//         start_sale_num: 2,
//         goods_info: {
//             price: 1,
//             title: '测试商品',
//             picture: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
//         },
//         sku: {
//             price: '1.00',
//             stock_num: 227,
//             none_sku: false,
//             hide_stock: false,
//             collection_id: 2261,
//             tree: [
//                 {
//                     k: '颜色',
//                     k_s: 's1',
//                     k_id: '1',
//                     v: [
//                         {
//                             id: '1',
//                             name: '粉色',
//                             imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
//                         },
//                         {
//                             id: '2',
//                             name: '黄色',
//                             imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png',
//                         },
//                         {
//                             id: '3',
//                             name: '蓝色',
//                             imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-3.png',
//                         },
//                     ],
//                     largeImageMode,
//                 },
//                 {
//                     k: '尺寸',
//                     k_s: 's2',
//                     k_id: '2',
//                     v: [
//                         {
//                             id: '1',
//                             name: '大',
//                         },
//                         {
//                             id: '2',
//                             name: '小',
//                         },
//                     ],
//                 },
//             ],
//             list: [
//                 {
//                     id: 2259,
//                     s1: '2',
//                     s2: '1',
//                     price: 100,
//                     discount: 100,
//                     stock_num: 110,
//                 },
//                 {
//                     id: 2260,
//                     s1: '3',
//                     s2: '1',
//                     price: 100,
//                     discount: 100,
//                     stock_num: 99,
//                 },
//                 {
//                     id: 2257,
//                     s1: '1',
//                     s2: '1',
//                     price: 100,
//                     discount: 100,
//                     stock_num: 111,
//                 },
//                 {
//                     id: 2258,
//                     s1: '1',
//                     s2: '2',
//                     price: 100,
//                     discount: 100,
//                     stock_num: 6,
//                 },
//             ],
//         },
//         properties: [
//             {
//                 k: '加料',
//                 k_id: 124,
//                 is_multiple: true,
//                 v: [
//                     {
//                         id: 1224,
//                         name: '布丁',
//                         price: 3,
//                     },
//                     {
//                         id: 1225,
//                         name: '波霸',
//                         price: 4,
//                     },
//                     {
//                         id: 1226,
//                         name: '珍珠',
//                         price: 5,
//                     },
//                 ],
//             },
//             {
//                 k: '非必选属性',
//                 k_id: 125,
//                 is_multiple: true,
//                 is_necessary: false,
//                 v: [
//                     {
//                         id: 1234,
//                         name: '属性1',
//                         price: 3,
//                     },
//                     {
//                         id: 1235,
//                         name: '属性2',
//                         price: 4,
//                     },
//                 ],
//             },
//             {
//                 k: '未加价的属性项',
//                 k_id: 126,
//                 is_multiple: true,
//                 v: [
//                     {
//                         id: 1244,
//                         name: '属性a',
//                         price: 0,
//                     },
//                     {
//                         id: 1245,
//                         name: '属性b',
//                         price: 0,
//                     },
//                 ],
//             },
//         ],
//     }
// }

// const data = getSkuData()
const options = [
  {
    label: 's',
    value: 's',
  },
  {
    label: 'm',
    value: 'm',
  },
  {
    label: 'l',
    value: 'l',
  },
];

const options2 = [
  {
    label: '红色',
    value: '红色',
  },
  {
    label: '黄色',
    value: '黄色',
  },
  {
    label: '蓝色',
    value: '蓝色',
  },
];

const GoodsSku: React.FC<GoodsSkuProps> = ({ showShoppin, handleShowShopping, showButtonType, setSelect }) => {
  // const ref = useRef<SkuInstance>(null);
  const [form] = Form.useForm();

  const handleOnFinish = (params: any) => {
    if (params.single === undefined) {
      Toast.info({ message: '请选择规格' });
      return;
    } else {
      console.log(params);
      if (showButtonType === 1) {
        const { query } = history.location;
        console.log('query', query);

        // history.push('/goods/pay');
      } else {
        Toast.success({ message: '添加购物车成功' });
      }
    }
  };

  return (
    <>
      <Popup
        safeAreaInsetBottom
        className={styles.goodsSkuNav}
        round
        closeable
        style={{ padding: '10px 10px 80px 10px' }}
        position="bottom"
        // closeIcon={<Fire />}
        visible={showShoppin}
        onClose={() => handleShowShopping(false, showButtonType)}
      >
        <ProductCard
          lazyload
          // tag="标签"
          // num="2"
          price="2.00"
          originPrice="10.00"
          desc="选择 "
          title="React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，…动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />

        <Form
          layout="vertical"
          form={form}
          onFinish={async params => handleOnFinish(params)}
          footer={
            <ActionBar safeAreaInsetBottom style={{ padding: '16px' }}>
              <Button round nativeType="submit" color="linear-gradient(to right, #ff6034, #ee0a24)" block>
                {showButtonType ? '立即支付' : '确认'}
              </Button>
            </ActionBar>
          }
        >
          <Form.Item name="single" label="颜色">
            <Selector
              // onChange={(arr) => setSelect((v) => [...v, ...arr])}
              options={options2}
            />
          </Form.Item>
          <Form.Item name="single2" label="尺寸">
            <Selector
              // onChange={(arr) => setSelect((v) => [...v, ...arr])}
              options={options}
            />
          </Form.Item>
          <Form.Item className={styles.goodsStepper} layout="horizontal" name="stepper" label="购买数量" initialValue={1}>
            <Stepper min={1} max={9999} />
          </Form.Item>
        </Form>
      </Popup>
    </>
  );
};

export default GoodsSku;
