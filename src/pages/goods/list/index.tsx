import React, { useState } from 'react';
import { DropdownMenu, Space } from 'react-vant';
import NavBar from '@/components/NavBar'
import Cards from '@/components/Cards'

interface IndexProps { }

export const option1 = [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
]
export const option2 = [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
]

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

const Index: React.FC<IndexProps> = (props) => {
    const [value, setValue] = useState<Record<string, string | number>>({})
    return (
        <>
            <NavBar title="商品列表" />
            <DropdownMenu value={value} onChange={v => setValue(v)} style={{ margin: '0 0 10px 0' }}>
                <DropdownMenu.Item name='value1' options={option1} />
                <DropdownMenu.Item name='value2' options={option2} />
            </DropdownMenu>
            <div ></div>
            <Cards cardList={cardList} />
        </>
    );
};

export default Index;
