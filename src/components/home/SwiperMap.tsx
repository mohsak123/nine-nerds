"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { TbChevronsRight } from "react-icons/tb";
import { TbChevronsLeft } from "react-icons/tb";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";

interface SwiperServicesProps {
  sliderItems: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  countryMap: { [key: string]: { name: string; image: string } };
}

const SwiperMap = ({ sliderItems, selectedCountry, setSelectedCountry, countryMap }: SwiperServicesProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCountryClick = (item: string) => {
    const actualCountry = countryMap[item];
    if (selectedCountry === actualCountry.name) {
      setSelectedCountry("");
    } else {
      setSelectedCountry(actualCountry.name);
    }
  };


  return (
    <div className='px-[80px] sm:px-[140px] bg-[#07090ACC] 
      h-[50px] sm:h-[75px] md:h-[100px] flex items-end w-full 
      absolute bottom-0'>

      <button
        ref={prevRef}
        className="absolute left-[30px] sm:left-[80px] top-1/2 -translate-y-1/2 !text-white rounded-full z-10"
      >
        <TbChevronsLeft size={48} className="!size-[24px] sm:!size-[48px] hover:text-hover transition-all duration-300" />
      </button>
      <button
        ref={nextRef}
        className="absolute right-[30px] sm:right-[80px] top-1/2 -translate-y-1/2 text-white rounded-full z-10"
      >
        <TbChevronsRight size={48} className="!size-[24px] sm:!size-[48px] hover:text-hover transition-all duration-300" />
      </button>
      {
        isClient && (
          <Swiper
            loop={true}
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
            className='w-full h-[200px] sm:h-[300px] md:h-[400px]'
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 0 },
              640: { slidesPerView: 2, spaceBetween: 0 },
              768: { slidesPerView: 3, spaceBetween: 0 },
              1024: { slidesPerView: 4, spaceBetween: 0 },
              1280: { slidesPerView: 4, spaceBetween: 0 },
              1536: { slidesPerView: 5, spaceBetween: 0 },
            }}
          >
            {sliderItems.map((item: string, index: number) => (
              <SwiperSlide key={index} className='!w-[calc(100%)] sm:!w-[calc(100%/2)] md:!w-[calc(100%/3)]
                lg:!w-[calc(100%/4)] 2xl:!w-[calc(100%/5)]
                max-w-auto !mx-auto text-center !flex !items-center overflow-visible'>
                <div
                  className={`text-[16px] sm:text-[18px] lg:text-[24px] min-h-5 w-max
                    mx-auto font-light transition-all duration-300 cursor-pointer relative
                    mt-[150px] sm:mt-[230px] md:mt-[300px]
                    ${selectedCountry === countryMap[item].name ? "text-hover" : "text-white"}
                  `}
                  onClick={() => handleCountryClick(item)}
                >
                  <div className="w-full flex justify-center">
                    <div
                      className={`
                        absolute top-[-110px] sm:top-[-150px] w-[80px] h-[80px] transition-opacity
                        duration-500 ease-in-out shadow-[0px_0px_25px_-5px_var(--hover)]
                        ${selectedCountry === countryMap[item].name
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                        }
                      `}
                    >
                      <Image
                        src={countryMap[item].image}
                        alt={countryMap[item].name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    {item}
                  </div>
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

export default SwiperMap;
