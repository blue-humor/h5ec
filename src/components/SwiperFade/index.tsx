import React from 'react';
import { Image } from 'react-vant';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface IndexProps {
  list: [];
  height: number | string;
  effect: string | any;
}

const Index: React.FC<IndexProps> = ({ list, effect, height }) => {
  return (
    <>
      <Swiper modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y, EffectFade]} effect={effect} loop autoplay pagination={{ clickable: true }}>
        {list?.map((item: any) => (
          <SwiperSlide key={item?.id}>
            <Image fit="cover" src={item?.fileUrl || item} height={height} round radius={6} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Index;
