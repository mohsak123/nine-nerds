import React from "react";

interface PopUpButtonProps {
  text: string;
  width: number;
  height: number;
}

const PopUpButton = ({ text, width, height }: PopUpButtonProps) => {
  return (
    <button
      style={{ width: `${width}px`, height: `${height}px` }}
      className="w-[150px] sm:w-auto h-auto text-hover border-[1.04px] border-primaryGreen
        flex items-center justify-center outline-none
        text-[14px] sm:text-[18px] hover:backdrop-blur-[1px] transition-all duration-500
        hover:shadow-[0px_0px_5px_1px_var(--hover),inset_0px_0px_1px_2px_var(--hover)]"
    >
      {text}
    </button>
  );
};

export default PopUpButton;
