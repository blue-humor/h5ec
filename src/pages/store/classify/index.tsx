import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { Sidebar, Image, Card, Flex } from 'react-vant';

import { reqCategory } from '@/services/classify';

import './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [active, setActive] = useState(0);

  const [category, setCategory] = useState([]);

  const handleClassify = (item: any) => {
    // Toast(`商品${},店家${item.storeId}`);

    history.push({
      pathname: '/goods/list',
      query: {
        groupId: item.groupId,
      },
    });
  };

  const handleCategory = async () => {
    const res = await reqCategory({});
    if (res?.code === 200) {
      setCategory(res.data);
    }
  };

  useEffect(() => {
    handleCategory();

    return () => {};
  }, []);

  return (
    <>
      <Sidebar
        sideClassName="classify_sidebar"
        value={active}
        onChange={v => {
          setActive(v);
          // Toast.info(`内容区 ${v + 1}`);
        }}
      >
        {category.map((item: any) => {
          return (
            <Sidebar.Item contentStyle={{ background: '#ffffff', padding: '20px 0 0 0 ' }} key={item.groupId} title={item.name}>
              <Flex justify="around" wrap="wrap">
                {item?.children?.map((item2: { groupId: React.Key | null | undefined; thumbnail: string | any; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
                  return (
                    <Flex.Item flex={1} key={item2.groupId}>
                      <Card className="classify_card" onClick={() => handleClassify(item2)}>
                        <Card.Cover>
                          <Image src={item2.thumbnail[0]?.url} width="20vw">
                            {item2.name}
                          </Image>
                        </Card.Cover>
                      </Card>
                    </Flex.Item>
                  );
                })}
              </Flex>
            </Sidebar.Item>
          );
        })}
      </Sidebar>
    </>
  );
};

export default Index;
