import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"

import { BsFillBriefcaseFill } from "react-icons/bs";
import FormFooter from "./FormFooter";
import Image from "next/image";


const PopUpFooter = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='w-[80px] h-[80px] md:w-[96px] md:h-[96px] bg-background flex items-center
          justify-center rounded-full cursor-pointer'>
          <div className='relative bg-white w-[44px] h-[44px] md:w-[50px] md:h-[50px] flex items-center justify-center rounded-full
          group-hover:scale-[1.1] md:group-hover:scale-[1.2] transition-all duration-300
          '>
            <BsFillBriefcaseFill className='text-[22px] md:text-[24px] text-primaryGreen group-hover:text-hover transition-all duration-300' />
          </div>

        </div>
      </DialogTrigger>
      <DialogContent className="scrollbar-hidden !outline-none overflow-y-scroll h-[90vh] max-w-[90%] lg:max-w-[80%]
        xl:max-w-[66%] sm:h-auto md:h-[75%] !rounded-none border-none px-[20px] py-[50px] sm:px-[75px]
        lg:px-[90px] sm:py-[80px] xl:px-[146px] xl:py-[120px]
        ">
          <div className="absolute right-0 w-[500px] md:w-[700px] xl:w-[761px] h-[100%] z-[-10]">
            <Image alt="img-pop-up" src="/images/menu-img.png" fill className="object-cover" />
          </div>
        <DialogHeader className="mt-0">
          <DialogTitle className="text-[14px] text-hover sm:text-[16px] font-light">Join Us</DialogTitle>
          <DialogDescription className="text-[18px] sm:text-[28px] xl:text-[40px] font-bold text-white">
            Join to our team
          </DialogDescription>
        </DialogHeader>

        <FormFooter />

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PopUpFooter