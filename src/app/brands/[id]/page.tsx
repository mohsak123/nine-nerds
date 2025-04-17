
import SelectedBrand from '@/components/our-brands/SelectedBrand'
import React from 'react'

type BrandsProps = {
  id:number;
  icon:string;
  name:string;
  cover_image:string;
  description:string;
}

const page = async({ params }: { params: Promise<{ id: string }> }) => {


  const { id } = await params;
  const brandsId = parseInt(id);

  let data: BrandsProps[] = [];
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`,{
      next: { revalidate: 10 },
    });
  
    if (!response.ok) {
      throw new Error("Field to fetch brands");
    }

    const allData = await response.json()

    data = allData.data || []
  } catch (err) {
    console.error("Error fetching projects:", err);
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
        <p className="text-center pt-20 text-[18px] sm:text-[24px] font-semibold">No brands found.</p>
      </div>
    );
  }

  return (
    <div className='pt-[155px] px-[30px] lg:px-[60px]'>
      <SelectedBrand brands={data} brandsId={brandsId} />
    </div>
  )
}

export default page
