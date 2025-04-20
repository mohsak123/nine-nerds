"use client";
import React from 'react'
import MainTitle from '../main-title/MainTitle'
import PhilosophyImg from '../images-components/PhilosophyImg'

const philosophySection = () => {
  return (
    <div>
      <div className='pt-[95px] lg:pl-[62px] xl:pl-[84px] flex justify-center lg:justify-start'>
        <MainTitle title='we are more than digital agency' id="philosophy" />
      </div>

      <div className='pt-[78px] px-[24px] xl:px-[60px] flex flex-col-reverse lg:flex-row items-center lg:items-start justify-start gap-3 sm:gap-8 xl:gap-0'>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:w-1/2">
          <div className='flex flex-col items-center justify-center gap-3 sm:gap-6'>
            <PhilosophyImg 
              source='/images/frame1.jpeg' 
              width={317} height={444} 
              title="Our mission" 
              description='Lorem ipsum dolor sit amet consectetur. Orci at massa et feugiat magna.'
            />
            

            <PhilosophyImg 
              source='/images/frame2.jpeg' 
              width={317} height={242} 
              title="Our mission" 
              description='Lorem ipsum dolor sit amet consectetur. Orci at massa et feugiat magna.'
            />
          </div>
          
          <div className='flex flex-col items-center justify-center gap-3 sm:gap-6'>
            <PhilosophyImg 
              source='/images/frame3.jpeg' 
              width={317} height={242} 
              title="Our mission" 
              description='Lorem ipsum dolor sit amet consectetur. Orci at massa et feugiat magna.'
            />

            <PhilosophyImg 
              source='/images/frame4.jpeg' 
              width={317} height={444} 
              title="Equipment" 
              description='Lorem ipsum dolor sit amet consectetur. Orci at massa et feugiat magna.'
            />
          </div>
          
        </div>

        <div className='w-[95%] sm:w-3/4 lg:w-1/2 pt-1 sm:pt-6 lg:sticky lg:top-[10%]'>
          <div className='text-[28px] sm:text-[32px] xl:text-[40px] font-bold text-hover 
            text-center xl:text-start w-auto xl:w-[470px] m-auto'>
              Our philosophy
          </div>
          <div className='w-auto xl:w-[470px] text-justify pt-4 text-[14px] xl:text-[18px] 
            m-auto leading-[28px] font-light'
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Pellentesque consequat diam ac vulputate convallis. Quisque sit amet pretium nulla. Proin volutpat nibh pellentesque elementum tincidunt. Ut aliquam arcu vel augue lobortis tempor cras ultrices tortor et consequat est.
          </div>
        </div>
      </div>
    </div>
  )
}

export default philosophySection


// 2520 * 1907