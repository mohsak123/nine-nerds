/* eslint-disable react/no-unescaped-entities */
import AccordionAboutUs from '@/components/about-us/AccordionAboutUs';
import OurPartners from '@/components/about-us/OurPartners';
import DownloadButton from '@/components/inputs/DownloadButton';
import LinkButton from '@/components/inputs/LinkButton';
import Image from 'next/image';
import React from 'react'
import { FiPlus } from "react-icons/fi";

type AboutUsProps = {
  counter_countries:number;
  counter_customers:number;
  counter_employees:number;
  counter_projects:number;
  company_profile?:string;
}

interface dataProps {
  title:string,
  numbers:number[],
}

const page = async() => {

  let data:AboutUsProps = {} as AboutUsProps;
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website-content`,{
      next:{revalidate: 10}
    });

    const allData = await response.json() || {};

    data = allData.data || {}
    
  } catch (err) {
    console.error("Error fetching data:", err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className='h-[89vh] flex items-center justify-center px-[30px] md:px-[60px]'>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const data1: dataProps[] = [
    {
      title: "Countries",
      numbers: data.counter_countries <= 8 
        ? Array.from({length: data.counter_countries}, (_, i) => i + 1)
        : [...Array.from({length: 7}, (_, i) => i + 1), data.counter_countries]
    },
    {
      title: "Customers", 
      numbers: data.counter_customers <= 8 
        ? Array.from({length: data.counter_customers}, (_, i) => i + 1)
        : [...Array.from({length: 7}, (_, i) => i + 1), data.counter_customers]
    },
    {
      title: "Employees",
      numbers: data.counter_employees <= 8 
        ? Array.from({length: data.counter_employees}, (_, i) => i + 1)
        : [...Array.from({length: 7}, (_, i) => i + 1), data.counter_employees]
    },
    {
      title: "Projects",
      numbers: data.counter_projects <= 8 
        ? Array.from({length: data.counter_projects}, (_, i) => i + 1)
        : [...Array.from({length: 7}, (_, i) => i + 1), data.counter_projects]
    }
  ];

  const fileUrl = data.company_profile ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.company_profile}` : '';

  return (
    <div className=''>

      <div className='h-screen relative px-[30px] lg:px-[60px]'>

        <div className='h-full flex items-start flex-col justify-center relative'>
          <div className="absolute right-[-30px] lg:right-[-60px] top-0 w-[640px] sm:w-[1000px] h-[100%] sm:h-[90%] z-[-10]">
            <Image alt="img-pop-up" src="/images/menu-img.png" fill className="object-cover" />
          </div>
          <div className='text-[14px] sm:text-[16px] lg:text-[24px] font-bold'>About Our Agency</div>
          <div className='text-[30px] sm:text-[48px] lg:text-[60px] font-bold'>Your <span className='text-hover'>Trusted</span></div>
          <div className='text-[30px] sm:text-[48px] lg:text-[60px] font-bold'>Partner For</div>
          <div className='text-[30px] sm:text-[48px] lg:text-[60px] font-bold'>Business</div>
          {
            fileUrl !== "" ?
            <div className='mt-[40px]'>
              <DownloadButton
                text="Download company profile" 
                width={360} 
                height={50}
                fileUrl={fileUrl}
              />
            </div>
            :
              null
          }
        </div>
      </div>

      <div className='h-[342px] bg-black'>
        <Image src="/images/about-us-img.jpeg" alt='' width={100} height={1}
          className="!w-full h-[342px] object-scale-down" />
      </div>

      <div className="mt-[100px] text-center px-[30px] lg:px-[60px]">
        <div className="text-[16px] sm:text-[18px] lg:text-[24px] font-bold">Who we are</div>
        <div className="mt-2 text-[32px] lg:mt-4 sm:text-[40px] lg:text-[60px] font-bold">We help business <span className="text-hover">Grow</span></div>
        <div className="text-[14px] sm:text-[16px] lg:text-[18px] font-light mt-[30px] lg:mt-[50px]">We are A MARKETING AGENCY SPECIALIZED IN BUILDING AND MARKETING BRANDS & PRESENTING THEM TO THE MARKET. it includes a specialized team in the field of MARKETING and graphic design, creating advertising solutions, Managing advertising campaigns, Programming website and smart phone applications for various and smart phone applications for various types of businesses with a creative & modern outlook, accuracy & excellence in providing service.</div>
      </div>

      <div className="px-[30px] lg:px-[60px] mt-[100px]">
        <div className="border-[0.5px] border-[#002727] rounded-[20px] py-[24px] px-[50px]
          grid grid-cols-1 sm:grid-cols-2 gap-[50px] xl:grid-cols-4 place-items-center
        ">
          {
            data1.map((item,index)=>(
              <div key={index} className="h-[100px] flex flex-col justify-between">
                <div className="flex items-center gap-4 h-[40px] sm:h-[41px] justify-start group overflow-hidden">
                  <FiPlus className="w-[34px] h-[41px]" />
                  <div className={`text-[18px] sm:text-[40px] flex-1 text-center font-bold
                    flex items-center justify-end flex-col transition-all duration-500
                    ${item?.numbers.length < 8 ? "translate-y-[40%] group-hover:translate-y-[-40%]" 
                    : "translate-y-[44%] group-hover:translate-y-[-43.5%]"}
                  `}>
                    {item.numbers.map((number)=>(
                      <div key={number}>{number}</div>
                    ))}
                  </div>
                </div>
                <div className="text-[20px] sm:text-[24px] text-hover font-bold">{item.title}</div>
              </div>
            ))
          }
        </div>
      </div>

      <div className='mt-[100px] px-[30px] lg:px-[60px]'>
        <div className='text-[36px] sm:text-[60px] font-bold text-center'>Our <span className='text-hover'>Partners</span></div>
        <div className='mt-[50px]'>
          <OurPartners />
        </div>
      </div>

      <div className='mt-[100px]'>
        <div className='px-[30px] lg:px-[60px] text-[36px] sm:text-[60px] font-bold text-center'>Our <span className='text-hover'>Branches</span></div>
        <div className='mt-[30px] lg:mt-[50px] grid gird-cols-1 xl:grid-cols-3'>
          <AccordionAboutUs />
          <Image src="/images/map.png" alt='' width={1000} height={100} className="xl:col-span-2 w-full h-[175px] sm:h-[200px] md:h-[297px]" />
        </div>
      </div>

      <div className='mt-[100px] px-[30px] lg:px-[60px]'>
        <div className='px-[24px] py-[20px] md:px-[40px] md:py-[24px] border-[0.5px] border-[#002727] rounded-[20px]'>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-1 md:gap-8">
            <div>
              <div className="text-[24px] md:text-[32px] font-bold text-hover">Join Us</div>
              <div className="text-[14px] lg:text-[16px] font-light mt-4">If you have any questions or want to start your new project with us, don't hesitate to reach out.</div>
              <div className="text-[14px] lg:text-[16px] font-light">We're here to assist you every step of the way.</div>
              <div className='mt-8'>
                <LinkButton text="Contact Us" width={200} height={50} source='contact' />
              </div>
            </div>
            <Image src="/images/join-us.png" alt="" width={194} height={147} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default page