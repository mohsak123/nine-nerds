import React from 'react';
import PortfolioServices from '@/components/portfolio/PortfolioServices';

type ProjectsProps = {
  id:number;
  name:string;
  image:string;
}

type PortfolioProps = {
  id:number;
  name:string;
  cover_image:string;
  catalogue?:string;
  projects?:ProjectsProps[]
}

const page = async({ params }: { params: Promise<{ id: string }> }) => {


  const { id } = await params;
  const portfolioId = parseInt(id);

  let data:PortfolioProps[] = [];
  let error = null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?with_projects=1`,{
      next: { revalidate: 10 },
    });

    if(!response.ok){
      throw new Error("Field to fetch portfolio services");
    }
  
    const allData = await response.json();
    data = allData.data || [];
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className='h-[89vh] flex items-center justify-center px-[30px] md:px-[60px]'>
        <p className="text-red-500 text-center">Error: {error}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className='h-[89vh] flex items-center justify-center px-[30px] md:px-[60px]'>
        <p className="text-center pt-20 text-[18px] sm:text-[24px] font-semibold">No services found.</p>
      </div>
    );
  }

  return (

    <div className='px-[30px] lg:px-[50px] pt-[155px]'>
      <PortfolioServices data={data} portfolioId={portfolioId} />
    </div>
  )
}

export default page