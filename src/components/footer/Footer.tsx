import Image from 'next/image'
import React from 'react'
import LinksFooter from './LinksFooter'
import { PiArrowArcRightLight } from "react-icons/pi";
import Link from 'next/link';
import PopUpFooter from './PopUpFooter';

type LinksFooter = {
  id:number;
  name:string;
}

const Footer = async() => {

  let data:LinksFooter[] = [];
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?builtin=0`,{
      next: {revalidate: 10},
    });

    if (!response.ok) {
      throw new Error("Field to fetch services")
    }

    const allData = await response.json();
    data = allData.data || [];
  } catch (err) {
    console.error("Error fetching services:", err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className='h-[89vh] flex items-center justify-center px-[30px] md:px-[60px]'>
        <p className="text-red-500 text-center">Error: {error}</p>
      </div>
    );
  }

  const links1 = [
    {title:"Home", path: "/"},
    {title:"Our Services", path: "/services"},
    {title:"About Us", path: "/about"},
    {title:"Contact Us", path: "/contact"},
  ]

  const linksLength = Math.ceil(data?.length / 3)

  return (
    <div className='relative bg-footer px-[30px] 2xl:px-[60px] py-10 mt-[100px]'>

      <div className='absolute left-[calc(50%-47px)] top-0 translate-x-[-50%] translate-y-[-70%]
        flex items-center justify-center overflow-hidden group
      '>

        <div className='w-[94px] text-center transition-all duration-200 translate-y-[120%] group-hover:translate-y-[-25%]'>
          <PiArrowArcRightLight size={24} className='ml-auto' />
          <div className='text-[12px] md:text-[13px] font-light '>Join To Our Team</div>
        </div>
        
        <PopUpFooter />

      </div>


      <div className='flex gap-10 md:gap-8 xl:gap-4 2xl:gap-8 justify-between'>

        <div className='flex flex-col md:flex-row flex-1 justify-between gap-10 md:gap-[30px] 
          lg:gap-[50px] 2xl:gap-[100px]'>
          <div className=''>
            <Link href="/">
              <Image
                width={177}
                height={170}
                alt='logo-footer'
                src="/images/company.png"
                className='h-max mx-auto sm:mx-0'
              />
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 w-full gap-10 md:gap-6 lg:gap-4 2xl:gap-6'>
            <LinksFooter links={links1} />
            {/* <div 
              className={`grid sm:grid-rows-${linksLength} md:grid-flow-col md:col-span-3 h-fit gap-y-4`}
              >
              {
                data?.length > 0 ?
                (
                  data?.map((link) =>(
                    <Link
                      href={`/services/${link.id}`}
                      key={link.id}
                      className='text-[12px] w-fit lg:text-sm font-light hover:text-hover cursor-default
                        transition-all duration-300 h-fit'
                      >
                      {link.name}
                    </Link>
                  ))
                )
                : 
                null
              }
            </div> */}

            <div
              className={`grid sm:grid-rows-${linksLength} md:grid-flow-col md:col-span-3 h-fit gap-y-4`}
              style={{ gridTemplateRows: `repeat(${linksLength}, 1fr)` }} 
            >
              {
                data?.length > 0 ?
                (
                  data?.map((link) => (
                    <Link
                      href={`/services/${link.id}`}
                      key={link.id}
                      className='text-[12px] w-fit lg:text-sm font-light hover:text-hover cursor-default transition-all duration-300 h-fit'
                    >
                      {link.name}
                    </Link>
                  ))
                )
                : null
              }
            </div>
          </div>

          

        </div>
        
        <div className='hidden xl:block'>
          <div className='flex items-start justify-between flex-col gap-4 text-[12px] lg:text-sm font-light'>
            <div className='text-hover'>Get in touch</div>
            <div className=''>
              <div>Erbil Citadel. 356. 1.1</div>
              <div>miHistoric Sites · Aram Classic.</div>
            </div>
            <div className=''>ninenerds@gmail.com</div>
            <div className='flex items-center justify-start gap-6 mt-1 md:mt-3'>
              <Image src="/images/instagram.svg" alt="" width={20} height={20} className="cursor-pointer" />
              <Image src="/images/twitter.svg" alt="" width={20} height={20} className="cursor-pointer" />
              <Image src="/images/facebook.svg" alt="" width={20} height={20} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className='block xl:hidden mt-10'>
          <div className='flex items-start justify-between flex-col gap-4 text-[12px] lg:text-sm font-light'>
            <div className='text-hover'>Get in touch</div>
            <div className=''>
              <div>Erbil Citadel. 356. 1.1</div>
              <div>miHistoric Sites · Aram Classic.</div>
            </div>
            <div className=''>ninenerds@gmail.com</div>
            <div className='flex items-center justify-start gap-6 mt-1 md:mt-3'>
              <Image src="/images/instagram.svg" alt="" width={20} height={20} className="cursor-pointer" />
              <Image src="/images/twitter.svg" alt="" width={20} height={20} className="cursor-pointer" />
              <Image src="/images/facebook.svg" alt="" width={20} height={20} className="cursor-pointer" />
            </div>
          </div>
          </div>

      <hr className='border-t-1 mt-8 md:mt-16 border-[##C3C3C6] pb-[20px]' />

      <div className='flex items-center justify-center gap-4 md:justify-end md:gap-8 text-[12px] md:text-sm font-light'>
        <div>
          Privacy policy
        </div>
        <div>
          Terms of conditions
        </div>
      </div>
      
    </div>
  )
}

export default Footer