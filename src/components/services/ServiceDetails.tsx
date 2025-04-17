import Image from 'next/image';
import React from 'react'

interface ServiceDetailsProps {
  item: {
    id: number;
    name: string;
    cover_image: string;
    catalogue?: string | null;
  };
}

const ServiceDetails = ({item}:ServiceDetailsProps) => {
  return (
    <div>

      <div className="w-full h-[275px] relative mt-8 mb-10 rounded-[10px] overflow-hidden">
        <Image
          alt="main-services-img"
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.cover_image}`}
          fill
          className="w-full object-cover"
        />
      </div>

    </div>
  )
}

export default ServiceDetails