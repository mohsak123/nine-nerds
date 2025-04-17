"use client"

import React from 'react';

interface DownloadButtonProps {
  text: string;
  width: number;
  height: number;
  fileUrl: string;  // رابط الملف
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ text, width, height, fileUrl }) => {

  const handleDownload = () => {
    if (!fileUrl) return;
  
    const fileName = fileUrl.split('/').pop();
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('target', '_blank');
    link.setAttribute('download', fileName || 'file.pdf');
    
    window.open(fileUrl, '_blank');
  };

  return (
    <div
      onClick={handleDownload}
      className={`text-hover !width-[150px] sm:w-full border-[1.04px] border-primaryGreen
        flex items-center
        justify-center font-bold text-[14px] sm:text-[18px] hover:backdrop-blur-[1px] transition-all
        duration-500 hover:shadow-[0px_0px_5px_1px_var(--hover),inset_0px_0px_1px_2px_var(--hover)]
        cursor-pointer`}
      style={{ width: `${width}px`, height: `${height}px`,maxWidth:"70vw !important" }}
    >
      {text}
    </div>
  );
};

export default DownloadButton;
