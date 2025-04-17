import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';

interface linksMenuProps {
  id:number;
  name:string;
}

interface AccordionLinkMenuProps {
  linksMenu: linksMenuProps[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title:string;
  baseUrl:string;
}


const AccordionLinkMenu = ({linksMenu,setOpen,title,baseUrl}:AccordionLinkMenuProps) => {
  return (
    <Accordion type="single" collapsible className="w-full flex md:hidden flex-col items-start gap-[55px]">
      <AccordionItem className="!border-none w-full" value={`item-0`}>
        <AccordionTrigger className="hover:text-hover decoration-transparent w-fit [&>svg]:hidden
          data-[state=open]:text-hover data-[state=closed]:text-white !p-0 text-[18px]
          ">{title}
        </AccordionTrigger>
        <AccordionContent className="pt-6">
          <div className='grid grid-cols-2 gap-y-6 gap-x-4 w-full'>
            {
              linksMenu.map((link)=>(
                <Link key={link.id} href={`/${baseUrl}/${link.id}`}
                  onClick={()=>setOpen(false)}
                  className="cursor-pointer text-[13px] hover:text-hover transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))
            }
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionLinkMenu


/*

linksMenu.map((link,index)=>(
            <AccordionContent className="flex justify-between items-start pt-6">
              {/* <div className='flex flex-col justify-start gap-6'>
                {link.menu1.map((me1, index)=>(
                  <Link onClick={()=>setOpen(false)} className="cursor-pointer hover:text-hover transition-all duration-300" key={index} href={me1.path}>{me1.title}</Link>
                ))}
              </div>

              <div className='flex flex-col justify-start gap-6'>
                {link.menu2?.map((me2, index)=>(
                  <Link onClick={()=>setOpen(false)} className="cursor-pointer hover:text-hover transition-all duration-300" key={index} href={me2.path}>{me2.title}</Link>
                ))}
              </div>
              
              </AccordionContent>
            ))
*/