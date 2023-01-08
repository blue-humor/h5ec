import React from 'react';
import { Image } from 'react-vant';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface IndexProps {
  list: [];
  effect: string | any;
}

const Index: React.FC<IndexProps> = ({ list, effect }) => {
  return (
    <>
      <Swiper modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y, EffectFade]} effect={effect} autoplay pagination={{ clickable: true }}>
        {list?.map((item: any) => (
          <SwiperSlide key={item?.id}>
            <Image fit="fill" src={item?.img || item} width="100%" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Index;
