"use client"

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { TbChevronsRight } from "react-icons/tb";
import { TbChevronsLeft } from "react-icons/tb";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./style.css"
import { Navigation, Pagination } from 'swiper/modules';
// import { useRouter } from "next/navigation";
import Link from "next/link";

interface SliderItem {
  id: number;
  name: string;
}

interface SwiperServicesProps {
  sliderItems: SliderItem[];
  idService:number;
  setService: React.Dispatch<React.SetStateAction<string>>;
  setIdService: React.Dispatch<React.SetStateAction<number>>;
}

const SwiperServices = ({ sliderItems, idService, setService, setIdService }: SwiperServicesProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleServiceClick = (item: SliderItem) => {
    setIdService(item.id);
    setService(item.name);
  };


  return (
    <div className='px-[77px] py-[46px] bg-[#1062620D] rounded-[10px] relative'>
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

      {isClient && (
        <Swiper
        scrollbar={{ draggable: true }}
        loop={false}
        modules={[Pagination, Navigation]}
        navigation={{ 
          prevEl: prevRef.current, 
          nextEl: nextRef.current 
        }}
        onInit={(swiper) => {
          if (typeof swiper.params.navigation === "object") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        className='w-full'
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 3, spaceBetween: 0 },
          768: { slidesPerView: 4, spaceBetween: 0 },
          1024: { slidesPerView: 5, spaceBetween: 0 },
          1280: { slidesPerView: 7, spaceBetween: 0 },
          1536: { slidesPerView: 9, spaceBetween: 0 },
        }}
      >
        {sliderItems.map((item) => (
          <SwiperSlide 
            key={item.id} 
            className='!w-[calc(100%)] sm:!w-[calc(100%/3)] md:!w-[calc(100%/4)] 
              lg:!w-[calc(100%/5)] xl:!w-[calc(100%/7)] 2xl:!w-[calc(100%/9)] max-w-auto !mx-auto 
              text-center'
          >
            <Link
              href={`/services/${item.id}`}
              className={`text-[16px] hover:text-hover min-h-5 w-fit mx-auto font-light
                transition-all duration-300 cursor-pointer
                ${item.id === idService ? "text-hover" : "text-white"}
              `}
              onClick={() => handleServiceClick(item)}
            >
              {item.name}
            </Link>
          </SwiperSlide>
        ))}
        </Swiper>
      )}

      
      <div className="swiper-scrollbar !translate-y-[30px]"></div>
    </div>
  )
}

export default SwiperServices