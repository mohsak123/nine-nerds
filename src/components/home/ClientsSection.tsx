import React from 'react';
import MainTitle from '../main-title/MainTitle';
import ClientsImg from '../images-components/ClientsImg';
import { TbChevronsRight } from "react-icons/tb";
import Link from 'next/link';

type clientsProps = {
  id: number;
  name: string;
  image: string;
  website: string;
};

const ClientsSection = async () => {
  let data: clientsProps[] = [];
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients?per_page=16`, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }

    const allData = await response.json();
    data = allData.data || [];
  } catch (err) {
    console.error("Error fetching clients:", err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className='py-[64px] px-[30px] text-center md:px-[60px] mt-[20px] sm:mt-[40px]'>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!data.length) {
    return null
  }

  return (
    <div className='py-[64px] px-[30px] md:px-[60px] mt-[20px] sm:mt-[40px]'>
      <div className='relative flex items-center justify-center'>
        <MainTitle title='Our Clients' id="client" />

        <Link href="/clients?page=1" className='absolute hover:text-hover cursor-pointer transition-all duration-500 
          text-[18px] font-bold flex items-center justify-center gap-2
          right-[0px] lg:right-[-20px] xl:right-[-5px] 2xl:right-0 group
          top-[95px] sm:top-[110px] lg:top-[12px]
        '>
          <span>See All</span>
          <TbChevronsRight className='w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]
            group-hover:drop-shadow-[0px_0px_10px_var(--hover)]
          ' />
        </Link>
      </div>

      <div className='pt-[65px]'>
        <ClientsImg data={data} />
      </div>
    </div>
  );
};

export default ClientsSection;