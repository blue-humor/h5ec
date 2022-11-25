import React, { useState, useEffect } from 'react';

import { useModel } from 'umi';


import { Image, Card, Toast, Typography, Flex, PullRefresh, List } from 'react-vant';

import './index.less'

interface IndexProps {
    cardList: {
        id: number;
        title: string;
        cardImage: string;
        currentPrice: number;
        originalPrice: number;
    }[]
}



const Index: React.FC<IndexProps> = ({ cardList }) => {

    const { goodItem, handleClickCard } = useModel('goods', (model) => ({
        goodItem: model.goodItem,
        handleClickCard: model.handleClickCard,
    }));



    const [finished, setFinished] = useState<boolean>(false)

    const handleOnRefresh = (params: boolean) => {
        if (params) {
            Toast.info('刷新成功')
        }
    }

    const handleOnLoad = () => {
        setFinished(true)

    }

    useEffect(() => {
        return () => {

        }
    }, [])


    return (
        <PullRefresh onRefresh={async () => handleOnRefresh(true)} onRefreshEnd={() => console.log('onRefreshEnd')}  >
            <List finished={finished} key='list' onLoad={async () => handleOnLoad()} finishedText='暂无更多' errorText='请求失败，点击重新加载'>
                <Flex justify='around' gutter={6} wrap='wrap' direction="row">
                    {
                        cardList?.map((item) => {
                            return <Flex.Item span={12} key={item.id}>
                                <Card className='card_nav' round onClick={() => handleClickCard(item)}>
                                    <Card.Cover className='card_cover'>
                                        <Image lazyload showError fit="fill" src={item?.cardImage} width='100%' />
                                    </Card.Cover>
                                    <Card.Body>
                                        <Typography.Text ellipsis={2}>
                                            {item?.title}
                                        </Typography.Text>
                                        <Typography.Text type="danger">¥<span className='card_parice'>{item?.currentPrice}</span></Typography.Text>{' '}
                                        <Typography.Text delete>¥{item?.originalPrice}</Typography.Text>
                                    </Card.Body>
                                </Card>
                            </Flex.Item>
                        })
                    }
                </Flex>
            </List>
        </PullRefresh>


    );
};

export default Index;
