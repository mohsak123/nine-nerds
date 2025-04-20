"use client"

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { TbChevronsRight } from "react-icons/tb";
import { TbChevronsLeft } from "react-icons/tb";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";

type SwiperData = {
  id: number
  name: string;
  image: string;
}

interface SwiperAboutUsProps {
  sliderItems: SwiperData[]
}

const SwiperAboutUs = ({ sliderItems }: SwiperAboutUsProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='px-[77px] rounded-[10px] relative'>
      <button
        ref={prevRef}
        className="absolute left-[1%] top-1/2 -translate-y-1/2 !text-white rounded-full z-10"
      >
        <TbChevronsLeft size={48} className="hover:text-hover transition-all duration-300" />
      </button>
      <button
        ref={nextRef}
        className="absolute right-[1%] top-1/2 -translate-y-1/2 text-white rounded-full z-10"
      >
        <TbChevronsRight size={48} className="hover:text-hover transition-all duration-300" />
      </button>

      {
        isClient && (
          <Swiper
            loop={false}
            modules={[Pagination, Navigation]}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onInit={(swiper) => {
              if (typeof swiper.params.navigation === "object") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            className='w-full h-full mx-auto'
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 0 },
              640: { slidesPerView: 2, spaceBetween: 0 },
              768: { slidesPerView: 3, spaceBetween: 0 },
              1024: { slidesPerView: 4, spaceBetween: 0 },
              1280: { slidesPerView: 5, spaceBetween: 0 },
              1536: { slidesPerView: 6, spaceBetween: 0 },
            }}
          >
        {sliderItems.map((item) => (
          <SwiperSlide 
            key={item.id} 
            className='
              !w-[calc(100%)] sm:!w-[calc(100%/2)] md:!w-[calc(100%/3)]
              lg:!w-[calc(100%/4)] xl:!w-[calc(100%/5)] 2xl:!w-[calc(100%/6)]
              flex items-center justify-center !h-auto mx-auto
            '
          >
            <div className="relative h-full w-full flex flex-col gap-2 items-center justify-center">
            <Image 
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.image}`}
              alt={item.name}
              width={80} 
              height={80}
              className="
                w-[80px] h-[80px]
                rounded-md object-contain
                grayscale brightness-[0.2] contrast-[0.85] 
                hover:grayscale-0 hover:brightness-[1] hover:contrast-[1]
                transition-all duration-300
              "
            />
            </div>
          </SwiperSlide>
        ))}
          </Swiper>
        )
      }
      
      <div className="swiper-scrollbar"></div>
    </div>
  )
}

export default SwiperAboutUs