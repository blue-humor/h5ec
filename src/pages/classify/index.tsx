import React, { useState } from 'react';

import { history } from 'umi'

import { Sidebar, Toast, Image, Card, Flex, NavBar } from 'react-vant';

import './index.less'

interface IndexProps { }

const data = [

    {
        "groupId": 249481,
        "name": "女装",
        "thumbnail": "https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png",
        "storeId": 1,
        "children": [
            {
                "groupId": 249480,
                "name": "卫衣",
                "thumbnail": "https://cdn-we-retail.ym.tencent.com/tsr/classify/img-1.png",
                "storeId": 1,
                "children": []
            },
            {
                "groupId": 249484,
                "name": "毛呢外套",
                "thumbnail": "https://cdn-we-retail.ym.tencent.com/tsr/classify/img-2.png",
                "storeId": 1,
                "children": []
            },
            {
                "groupId": 249489,
                "name": "毛呢外套",
                "thumbnail": "https://cdn-we-retail.ym.tencent.com/tsr/classify/img-2.png",
                "storeId": 1,
                "children": []
            },
            {
                "groupId": 249489,
                "name": "毛呢外套",
                "thumbnail": "https://cdn-we-retail.ym.tencent.com/tsr/classify/img-2.png",
                "storeId": 1,
                "children": []
            }
        ]
    }]

const Index: React.FC<IndexProps> = (props) => {
    const [active, setActive] = useState(0);

    const handleClassify = (item: any) => {
        Toast(`商品${item.groupId},店家${item.storeId}`)
        history.push('/goods/list')
    }

    return (
        <div>
            {/* <NavBar
                fixed
                safeAreaInsetTop
                leftText="返回"
            /> */}
            <Sidebar
                sideClassName='classify_sidebar'
                value={active}
                onChange={(v) => {
                    setActive(v);
                    Toast.info(`内容区 ${v + 1}`);
                }}
            >

                {
                    data.map((item) => {
                        return <Sidebar.Item
                            contentStyle={{ background: '#ffffff', padding: '20px 0 0 0 ' }}
                            key={item.groupId}
                            title={item.name}>
                            <Flex justify="around" wrap="wrap" >
                                {
                                    item?.children?.map((item2, index) => {
                                        return <Flex.Item flex={1} key={index}>
                                            <Card className='classify_card' onClick={() => handleClassify(item2)}>
                                                <Card.Cover >
                                                    <Image src={item2.thumbnail} width='20vw' >
                                                        {item2.name}
                                                    </Image>
                                                </Card.Cover>
                                            </Card>
                                        </Flex.Item>
                                    })
                                }
                            </Flex>
                        </Sidebar.Item>
                    })
                }
            </Sidebar>
        </div>

    );
};

export default Index;
