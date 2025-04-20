import Link from 'next/link';
import React from 'react';

interface LinkButtonProps {
  text: string;
  width: number;
  height: number;
  source: string;
}

const LinkButton = ({ text, width, height, source }: LinkButtonProps) => {
  return (
    <Link
      href={`/${source}`}
      className="text-hover width-[150px] sm:w-full border-[1.04px] border-primaryGreen flex items-center
        justify-center font-bold text-[14px] sm:text-[18px] hover:backdrop-blur-[1px] transition-all
        duration-500 hover:shadow-[0px_0px_5px_1px_var(--hover),inset_0px_0px_1px_2px_var(--hover)]"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
