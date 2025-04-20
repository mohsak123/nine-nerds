"use client"

import React, { useState } from 'react';
import { LuSmartphone } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionAboutUs = () => {
  const [openItem, setOpenItem] = useState("item-1");

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={openItem}
      onValueChange={(value) => {
        if (value === "item-1" || value === "item-2") {
          setOpenItem(value);
        }
      }}
    >
      <AccordionItem value="item-1" className="border-[0px]">
        <AccordionTrigger className='justify-center w-full h-[91px] bg-primaryGreen
          transition-all duration-500
          text-[32px] font-bold uppercase !no-underline [&>svg]:hidden
          data-[state=open]:bg-transparent data-[state=open]:text-hover data-[state=open]:cursor-auto
          data-[state=closed]:bg-primaryGreen data-[state=closed]:text-white data-[state=closed]:cursor-pointer'>
          Iraq
        </AccordionTrigger>
        <AccordionContent className='mt-[12px]'>
          <div className='flex items-center gap-2 justify-center'>
            <HiOutlineLocationMarker size={24} className='text-hover' />
            <div className='text-[14px] font-light'>
              <div>Erbil Citadel. 356. 1.1</div>
              <div>miHistoric Sites · Aram Classic.</div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center mt-[23px]">
            <LuSmartphone size={24} className='text-hover ml-[-106px]' />
            <div className='text-[14px] font-light'>+900000000000</div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-[0px]">
        <AccordionTrigger className='justify-center w-full h-[91px] bg-primaryGreen
          transition-all duration-500
          text-[32px] font-bold uppercase !no-underline [&>svg]:hidden
          data-[state=open]:bg-transparent data-[state=open]:text-hover data-[state=open]:cursor-auto
          data-[state=closed]:bg-primaryGreen data-[state=closed]:text-white data-[state=closed]:cursor-pointer'>
          Syria
        </AccordionTrigger>
        <AccordionContent className='mt-[12px]'>
          <div className='flex items-center gap-2 justify-center'>
            <HiOutlineLocationMarker size={24} className='text-hover' />
            <div className='text-[14px] font-light'>
              <div>Erbil Citadel. 356. 1.1</div>
              <div>miHistoric Sites · Aram Classic.</div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center mt-[23px]">
            <LuSmartphone size={24} className='text-hover ml-[-106px]' />
            <div className='text-[14px] font-light'>+900000000000</div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionAboutUs;