/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import LinksMenu from './LinksMenu';

interface LinkItem {
  id: number;
  name: string;
}

interface SideMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({ open, setOpen }: SideMenuProps) => {
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

        setServices(servicesData.data || []);
        setPortfolios(portfoliosData.data || []);
        setBrands(brandsData.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : 'Failed to load menu data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent aria-describedby={undefined} className='border-none overflow-y-auto !w-[100vw] !max-w-[100vw]'>
        <SheetTitle></SheetTitle>
        <div className='px-[0px] lg:px-[60px] py-[50px] lg:py-[89px]'>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : (
            <LinksMenu
              setOpen={setOpen}
              services={services}
              portfolios={portfolios}
              brands={brands}
            />
          )}
        </div>
        <img 
          src='/images/menu-img.png' 
          alt='Menu background'
          className="absolute z-[-1] object-cover right-[0px] top-0 h-[100%] md:h-[90%]"
        />
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;