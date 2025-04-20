"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import FormOrderServices from "./FormOrderServices";
import { Button } from "../ui/button"


interface ServiceDataProps {
  idService:number;
  service:string
}

export function PopUpOrderServices({idService, service}:ServiceDataProps) {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        className="w-[150px] sm:w-[200px] h-[50px] bg-transparent rounded-none
        text-hover border-[1.04px] border-primaryGreen hover:bg-transparent
        flex items-center justify-center outline-none
        text-[14px] sm:text-[18px] hover:backdrop-blur-[1px] transition-all duration-500
        hover:shadow-[0px_0px_5px_1px_var(--hover),inset_0px_0px_1px_2px_var(--hover)]"
      onClick={() => setOpen(true)}>Order NOW</Button>
      
      <DialogContent className="scrollbar-hidden overflow-y-scroll h-[90vh] max-w-[90%] lg:max-w-[80%]
        xl:max-w-[66%] sm:h-auto md:h-[75%] !rounded-none border-none px-[20px] py-[50px] sm:px-[75px]
        lg:px-[90px] sm:py-[80px] xl:px-[146px] xl:py-[120px]
        ">
          <div className="absolute right-0 w-[500px] md:w-[700px] xl:w-[761px] h-[100%] z-[-10]">
            <Image alt="img-pop-up" src="/images/menu-img.png" fill className="object-cover" />
          </div>
        <DialogHeader className="mt-0">
          <DialogTitle className="text-[14px] text-hover sm:text-[16px] font-light">{service}</DialogTitle>
          <DialogDescription className="text-[18px] sm:text-[28px] xl:text-[40px] font-bold text-white">
            Order our service now
          </DialogDescription>
        </DialogHeader>

        <FormOrderServices idService={idService} setOpen={setOpen} />

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}