import ClientsImg from '@/components/images-components/ClientsImg'
import MainTitle from '@/components/main-title/MainTitle'
import PaginationData from '@/components/utils/PaginationData';
import React from 'react'

type AllClientsProps = {
  id:number;
  name:string;
  image:string;
  website:string
}

export const dynamic = 'force-dynamic';

const page = async({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {

  const params = await searchParams; // ✅ Await the promise first
  const currentPage = Number(params.page) || 1;

  const numOfClients = 16;
  let data:AllClientsProps[] = [];
  let totalProjects = 0;
  let error = null

  try{
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/clients?per_page=${numOfClients}&page=${currentPage}`,
      { next:{ revalidate: 10 } }
    );

    if (!response.ok) {
      throw new Error("Field to fetch all clients");
    }

    const allData = await response.json();
    data = allData.data || [];
    totalProjects = allData.total || allData.meta?.total || 0;
  } catch(err){
    console.error("Error fetching clients:", err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  const totalPages = Math.ceil(totalProjects / numOfClients);

  if (error) {
    return (
      <div className='py-[64px] px-[30px] md:px-[60px] mt-[20px] sm:mt-[40px]'>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }
  
  if (!data.length) {
      return (
        <div className='py-[64px] px-[30px] md:px-[60px]'>
          <div className='w-fit mx-auto'>
          </div>
          <p className="text-center pt-20 text-[18px] sm:text-[24px] font-semibold">No clients found.</p>
        </div>
      );
  }


  return (
    <div className='py-[64px] px-[30px] md:px-[60px]'>
      <div className='mt-[75px] sm:mt-[100px] xl:mt-[150px]'>
        <div className='mx-auto w-fit'>
          <MainTitle title='All Projects' id="allProjects" />
        </div>
        <div className='mt-[40px] sm:mt-[60px] md:mt-[75px]'>
          <ClientsImg data={data} />
        </div>
      </div>
      <PaginationData
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  )
}

export default page