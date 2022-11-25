import React, { useState } from 'react';

import { Swiper, Image, Search, Toast, Card, Tabs } from 'react-vant';

import Cards from '@/components/Cards'

import styles from './index.less'


interface IndexProps { }

const cardList = [
  {
    id: 1,
    title: 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。',
    cardImage: `https://react-vant.3lang.dev/demo_avatar_1`,
    currentPrice: 198,
    originalPrice: 499,
  },
  {
    id: 2,
    title: 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。',
    cardImage: `https://react-vant.3lang.dev/demo_avatar_1.jpg`,
    currentPrice: 198,
    originalPrice: 499,
  },
  {
    id: 3,
    title: 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。',
    cardImage: `https://react-vant.3lang.dev/demo_avatar_1.jpg`,
    currentPrice: 198,
    originalPrice: 499,
  },
  {
    id: 4,
    title: 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。',
    cardImage: `https://react-vant.3lang.dev/demo_avatar_1.jpg`,
    currentPrice: 198,
    originalPrice: 499,
  },
]


const images = [
  'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d9612cfa2b74d149ba81605878c7a0b~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp',
  'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d9612cfa2b74d149ba81605878c7a0b~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp',
  'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d9612cfa2b74d149ba81605878c7a0b~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp',
  'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d9612cfa2b74d149ba81605878c7a0b~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp',
  'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d9612cfa2b74d149ba81605878c7a0b~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp',
  'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d9612cfa2b74d149ba81605878c7a0b~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp',

]

const Index: React.FC<IndexProps> = (props) => {
  const [value, setValue] = useState('');
  return (
    <>
      <div className={styles.home_nav}>
        <Search
          shape="round"
          // background="#ffffff" 
          value={value}
          onChange={setValue}
          placeholder="请输入搜索关键词"
        />
        <Card>
          <Swiper autoplay={5000}>
            {images.map((image, index) => (
              <Swiper.Item key={index}>
                <Image lazyload fit="fill" src={image} width='100%' />
              </Swiper.Item>
            ))}
          </Swiper>
          <Tabs color='#fa4126'>
            <Tabs.TabPane title={`精选推荐`} >
            </Tabs.TabPane>
          </Tabs>
        </Card>

        <div className={styles.home_card_nav} >
          <Cards cardList={cardList} />
        </div>
      </div>
    </>
  );
};

export default Index;
