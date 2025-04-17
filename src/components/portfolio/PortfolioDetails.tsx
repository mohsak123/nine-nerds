"use client";

import React from 'react';
import DownloadButton from '../inputs/DownloadButton';

interface PortfolioDetailsProps {
  item: {
    id: number;
    name: string;
    cover_image: string;
    catalogue?: string | null;
  };
}

const PortfolioDetails: React.FC<PortfolioDetailsProps> = ({ item }) => {

  const fileUrl = item.catalogue ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.catalogue}` : '';

  return (
    <div
      className="relative w-full h-[300px] mt-8 mb-[60px] p-4 sm:mb-[83px] rounded-[10px]"
      style={{
        backgroundImage: `url("${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.cover_image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {item.catalogue && (
        <div
          className="relative w-full sm:w-fit bg-[#07090ACC] flex items-center justify-center 
          gap-[17px] sm:gap-[34px] px-4 sm:px-8 py-4 rounded-[16px] sm:rounded-[32px] flex-col sm:flex-row
          top-[145px] sm:top-[190px]"
        >
          <div className="text-[18px] md:text-[24px] font-bold text-hover">
            {item.name} catalogue
          </div>
          <DownloadButton
            text="Download pdf"
            width={200}
            height={50}
            fileUrl={fileUrl}
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioDetails;
