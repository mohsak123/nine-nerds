/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { CiSearch } from 'react-icons/ci';
import { RiMenu5Fill } from 'react-icons/ri';
import SideMenu from './SideMenu';
import { Input } from '../ui/input';

interface LinkItem {
  id: number;
  name: string;
}

const Navbar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);

  const [navItems, setNavItems] = useState([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ]);

  const [services, setServices] = useState<LinkItem[]>([]);
  const [portfolios, setPortfolios] = useState<LinkItem[]>([]);
  const [brands, setBrands] = useState<LinkItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [servicesRes, portfoliosRes, brandsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?builtin=0`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`)
        ]);

        const [servicesData, portfoliosData, brandsData] = await Promise.all([
          servicesRes.json(),
          portfoliosRes.json(),
          brandsRes.json()
        ]);

        const fetchedServices = await Array.isArray(servicesData?.data) ? servicesData.data : [];
        const fetchedPortfolios = await Array.isArray(portfoliosData?.data) ? portfoliosData.data : [];
        const fetchedBrands = await Array.isArray(brandsData?.data) ? brandsData.data : [];

        setServices(fetchedServices);
        setPortfolios(fetchedPortfolios);
        setBrands(fetchedBrands);

        const updatedNavItems = [
          { name: "Home", path: "/" },
          ...(fetchedServices.length > 0 ? [{ name: "Services", path: `/services/${fetchedServices[0]?.id}` }] : []),
          ...(fetchedBrands.length > 0 ? [{ name: "Our Brands", path: `/brands/${fetchedBrands[0]?.id}` }] : []), // تم التعديل هنا
          ...(fetchedPortfolios.length > 0 ? [{ name: "Portfolio", path: `/portfolio/${fetchedPortfolios[0]?.id}` }] : []), // وتم التعديل هنا
          { name: "About Us", path: "/about" },
          { name: "Contact Us", path: "/contact" },
        ];

        setNavItems(updatedNavItems);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : 'Failed to load menu data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between px-[20px] sm:px-[50px] 
      2xl:px-[60px] py-[20px] sm:py-[33px] absolute z-[10] w-full`}>
      <div className="w-[150px] sm:w-[170px] 2xl:w-[200px]">
        <Link href="/">
          <Image
            alt="Astronaut"
            src="/images/Logo1.png"
            width={217}
            height={59}
            className="w-full h-max cursor-pointer"
          />
        </Link>
      </div>

      <nav className="p-4 hidden xl:block relative">
        <ul className='flex items-center justify-between gap-7'>
          {
            navItems.map((item) => (
              <Link
                key={item.path}
                className={`
                  text-[16px] px-3 py-4 cursor-pointer relative group 
                  hover:text-hover font-light
                  ${item.path.split("/")[1] === pathname.split("/")[1] ? "text-hover" : "text-white"}
                `}
                href={item.path}
              >
                {item.name}
                {item.path.split("/")[1] === pathname.split("/")[1] && (
                  <span className="absolute bottom-0 left-0 w-0 h-[1.8px] bg-hover group-hover:w-full transition-all duration-300 ease-in-out"></span>
                )}
                {
                  item.path.split("/")[1] === pathname.split("/")[1] && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.8px] bg-hover group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  )
                }
              </Link>
            ))
          }
        </ul>
      </nav>

      <div className='relative flex items-center justify-between gap-6 sm:gap-8'>
        <CiSearch className={`cursor-pointer hover:text-hover transition delay-100 
          w-8 h-8 2xl:w-10 2xl:h-10 ${search === true ? "text-hover" : "text-white"}`}
          onClick={() => setSearch((prev) => !prev)}
        />
        <RiMenu5Fill className='cursor-pointer hover:text-hover transition delay-100
          w-8 h-8 2xl:w-10 2xl:h-10'
          onClick={() => setOpen((dev) => !dev)}
        />

        <Input
          type='search'
          placeholder='Branding'
          className={`absolute right-0 top-[75px] w-[273px] h-[43px] px-[18px]
            border-[1px] border-gray-600 rounded-none ring-transparent ring-offset-transparent
            ${search === true ? "block" : "hidden"}
            !ring-0 !ring-transparent
          `}
        />
      </div>

      <SideMenu open={open} setOpen={setOpen} />
    </div>
  )
}

export default Navbar;
