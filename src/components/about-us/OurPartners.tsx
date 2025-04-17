import React from 'react'
import SwiperAboutUs from './SwiperAboutUs'

type PartnersProps = {
  id:number;
  name:string;
  image:string;
}

const OurPartners = async() => {

  let data:PartnersProps[] = [];
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partners`,{
      next:{revalidate: 10}
    });

    const allData = await response.json();
    data = allData.data || [];
  } catch (err) {
    console.error("Error fetching hero-section:", err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className='py-[64px] px-[30px] md:px-[60px] mt-[20px] sm:mt-[40px]'>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <SwiperAboutUs sliderItems={data} />
    </div>
  )
}

export default OurPartners