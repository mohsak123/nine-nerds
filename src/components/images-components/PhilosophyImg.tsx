import Image from 'next/image'
import React from 'react'

interface PhilosophyImgProps{
  source: string;
  width: number;
  height: number;
  title: string;
  description: string;
}

const PhilosophyImg = ({source, width, height, title, description} : PhilosophyImgProps) => {
  return (
    <div className='relative group overflow-hidden'>
      <Image alt="frame" src={source} width={width} height={height} className='grayscale group-hover:grayscale-0 transition-all duration-500' />
      <div className='absolute bottom-4 md:bottom-7 w-full uppercase tracking-[2px] px-6 overflow-hidden'>
        <div className='relative top-[60px] md:top-[74px] lg:top-[74px] xl:top-[72px] 2xl:top-[60px] group-hover:top-0 transition-all duration-500'>
          <div className='font-bold text-[12px] text-hover relative pb-4'>
            {title}
            <span className='absolute bottom-0 left-0 w-full sm:w-[170px] h-[2px] bg-white'></span>
          </div>

          <div className='text-[8px] sm:text-justify font-light pt-4'>
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhilosophyImg