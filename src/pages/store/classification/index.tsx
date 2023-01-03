import React, { useState, useEffect, useRef } from 'react';

import { NavBar, Sidebar, ProductCard, Stepper, Typography, ImagePreview, Image, Cell, Card, Divider } from 'react-vant';
import BScroll from '@better-scroll/core';

import IconFont from '@/utils/iconFont';

import classNames from './index.less';

import list from './data.json';

interface IndexProps {}

var foodScroll: any = '';

const Index: React.FC<IndexProps> = props => {
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [tops, setTops] = useState([]);

  const refFoods = useRef<any>();
  const refFoodsUl = useRef<any>();
  const refMenu = useRef<any>();

  const handleBScroll = () => {
    foodScroll = new BScroll(refFoods.current, {
      scrollY: true,
      click: true,
      probeType: 2,
    });
    const menuScroll = new BScroll(refMenu.current, {
      scrollY: true,
      click: true,
      probeType: 3,
    });
    foodScroll.on('scroll', ({ x, y }: any) => {
      setScrollY(Math.abs(y));
    });
    foodScroll.on('scrollEnd', ({ x, y }: any) => {
      setScrollY(Math.abs(y));
    });
  };
  //    初始化tops
  const handleTops = () => {
    let tops: any = [];
    let topOffsetTop: null = null;
    const foods = refFoodsUl.current.children;
    foods.forEach((item: any) => {
      topOffsetTop += item.clientHeight;
      tops.push(topOffsetTop);
    });

    setTops(tops);
  };
  // 计算当前分类下标
  const currentIndex = () => {
    const index = tops.findIndex((top, index) => {
      return scrollY >= top && scrollY < tops[index + 1];
    });
    return index + 1;
  };

  useEffect(() => {
    handleTops();
    handleBScroll();

    return () => {};
  }, []);

  const foodList = list.goods?.map((goods, goodsIndex) => {
    return (
      <Card key={goodsIndex}>
        <Cell title={goods?.name} center border={false} />
        {goods?.foods?.map((item: any, foodIndex: number) => {
          return (
            <ProductCard
              key={foodIndex}
              num={<Stepper buttonSize="20px" min={0} />}
              price={item?.price}
              desc={item?.description}
              title={item?.name}
              thumb={
                <Image
                  style={{ margin: '10px 0' }}
                  src={item?.image}
                  onClick={() =>
                    ImagePreview.open({
                      images: [item?.image],
                      closeable: true,
                    })
                  }
                />
              }
            />
          );
        })}
        {goodsIndex + 1 === list.goods?.length ? <div className={classNames.atAll}>到底啦～</div> : null}
      </Card>
    );
  });

  return (
    <>
      <NavBar fixed placeholder safeAreaInsetTop className={classNames.navBar} leftText={<IconFont name="icon-fanhui" className={classNames.iconFont} />} />
      <div className={classNames.goodsNav}>
        <div className={classNames.goodsSidebar} ref={refMenu}>
          <ul>
            {list?.goods.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classNames.sildeItem}
                  style={{
                    fontWeight: index === currentIndex() ? 'bold' : '',
                    background: index === currentIndex() ? '#ffffff' : '',
                  }}
                  onClick={() => {
                    let top = refFoodsUl.current.children[index].offsetTop;
                    setScrollY(top);
                    foodScroll.scrollTo(0, -top, 300);
                  }}
                >
                  {/* <IconFont name='icon-shuxian' /> */}
                  <Typography.Text ellipsis={2}>{item.name}</Typography.Text>
                </div>
              );
            })}
          </ul>
        </div>

        <div className={classNames.goodFootsList} ref={refFoods}>
          <ul ref={refFoodsUl}>{foodList}</ul>
        </div>
      </div>
    </>
  );
};

export default Index;
