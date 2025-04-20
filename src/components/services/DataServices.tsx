/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useEffect, useState } from 'react'
import SwiperServices from './SwiperServices';
import DataItem from './ServiceDetails';
import { PopUpOrderServices } from './PopUpOrderServices';
import Image from "next/image";

type ServiceProps = {
  id: number;
  name: string;
  cover_image: string;
  builtin:number
}

interface ServicesProps {
  data: ServiceProps[];
  serviceId:number;
}

const DataServices = ({ data, serviceId }: ServicesProps) => {
  // Handle empty data case
  const firstService = data?.find(item => item.id === serviceId) || data?.[0] || { id: 0, name: '', cover_image: '' };
  
  const [service, setService] = useState<string>(firstService.name || "");
  const [idService, setIdService] = useState<number>(serviceId ||firstService.id);

  useEffect(()=>{
    if(serviceId !== null){
      setIdService(serviceId);
    }
  },[serviceId]);

  return (
    <div>
      <SwiperServices
        sliderItems={data.map(item => ({ id: item.id, name: item.name }))}
        idService={idService}
        setService={setService}
        setIdService={setIdService}
      />

      {data?.map((item) => (
        <div 
          key={item.id}
          className={`${item.id === idService ? "block" : "hidden"}`}
        >
          <DataItem item={item} />
        </div>
      ))}

      <div className="flex flex-col-reverse xl:flex-row justify-between items-center gap-6 xl:gap-[50px] 2xl:gap-[75px]">
        <div>
          <div className="text-[16px] sm:text-[18px] md:text-[20px] 2xl:text-[24px] font-bold text-justify pb-3 md:pb-6">We help you build a strong and integrated brand identity that reflects your company's values and goals in a unique and attractive way</div>
          <div className="text-sm sm:text-[16px] md:text-[18px] 2xl:text-[18px] font-light text-justify pb-4 md:pb-8">When we talk about the Branding department in our company, we're referring to the distinctive mark that your company leaves in the minds of your customers. Our services in this department include:</div>
          <div className="flex items-start justify-between flex-col text-justify">
            <div className="text-[15px] sm:text-[18px] md:text-[20px] 2xl:text-[24px] font-bold text-hover">1. Visual Identity Development</div>
            <ul className="list-disc pl-6 md:pl-8 text-[10px] sm:text-[12px] md:text-[14px] 2xl:text-[18px] font-light">
              <li className="py-2">Logo Design: Creating a distinctive logo that represents the personality and values of your brand</li>
              <li>Color and Typography Selection: Choosing a color palette and fonts that match your identity and enhance your visual presence.</li>
            </ul>
          </div>
        </div>
        <div className="w-full 2xl:w-3/5 h-[450px] xl:h-[320px] relative">
          <Image
            alt="main-services-img"
            src="/images/services1.jpeg"
            fill
            className="w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-start items-center mt-[60px] xl:mt-[53px] gap-6 xl:gap-[50px] 2xl:gap-[75px]">
        <div className="w-full xl:w-[45%] 2xl:w-[450px] h-[450px] xl:h-[320px] relative overflow-hidden">
          <Image
            alt="main-services-img"
            src="/images/services2.jpeg"
            fill
            className="w-full object-cover"
          />
        </div>
        
        <div className="flex flex-col items-start justify-between gap-5 lg:gap-[40px]">
          <div className="flex items-start justify-between flex-col text-justify">
            <div className="text-[15px] sm:text-[18px] md:text-[20px] 2xl:text-[24px] font-bold text-hover">2. Marketing Materials Design</div>
            <ul className="list-disc pl-6 md:pl-8 text-[10px] sm:text-[12px] md:text-[14px] 2xl:text-[18px] font-light">
              <li className="py-2">Business Cards: Designing elegant and professional business cards that leave a strong impression.</li>
              <li>Promotional Materials: Designing brochures, flyers, and booklets that effectively promote your brand.</li>
            </ul>
          </div>

          <div className="flex items-start justify-between flex-col text-justify">
            <div className="text-[15px] sm:text-[18px] md:text-[20px] 2xl:text-[22px] font-bold text-hover">3. Core Messaging Development</div>
            <ul className="list-disc pl-6 md:pl-8 text-[10px] sm:text-[12px] md:text-[14px] 2xl:text-[16px] font-light">
              <li className="py-2">Vision and Mission Statements: Crafting clear and expressive messages that reflect your company's goals and strategy.</li>
              <li>Brand Tone of Voice: Defining the tone and language style that suits your target audience.</li>
            </ul>
          </div>
        </div>
        
      </div>

      <div className="pt-10">
        <div className="text-[15px] sm:text-[18px] md:text-[20px] 2xl:text-[24px] font-bold text-hover">4. Brand Strategy</div>
        <ul className="list-disc pl-6 md:pl-8 text-[10px] sm:text-[12px] md:text-[14px] 2xl:text-[18px] font-light">
          <li className="py-2">Market and Audience Analysis: Studying the market and audience to ensure effective targeting of your marketing efforts.</li>
          <li>Brand Development Plan: Creating a comprehensive plan to enhance and develop your brand presence in the long term.</li>
        </ul>
        <div className="text-sm sm:text-[16px] md:text-[18x] font-light text-justify pt-4 lg:pt-6">
          At our company, we believe that branding is not just a logo or design, but a comprehensive experience that interacts with your customers on various levels. Let us help you build a strong and enduring brand that distinguishes you from your competitors and uniquely attracts your customers.
        </div>
      </div>

      <div className="w-fit mx-auto pt-[50px] pb-[50px]">
        <PopUpOrderServices
          idService={idService}
          service={service}
        />
      </div>
    </div>
  )
}

export default DataServices