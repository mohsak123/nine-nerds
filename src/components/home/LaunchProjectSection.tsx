import React from 'react'
// import LaunchProjectsImg from '../images-components/LaunchProjectsImg'
import LinkButton from '../inputs/LinkButton'

const LaunchProjectSection = () => {
  return (
    <div className='py-[50px] sm:py-[74px] px-[30px] lg:px-[60px]'>
      <div className='relative overflow-hidden h-[260px] sm:h-[300px] md:h-[500px] 2xl:h-[710px]'>
        <video playsInline autoPlay muted loop preload="auto" className="h-full !w-full">
          <source src="/videos/test.webm" type="video/webm" />
          <source src="/videos/test.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        {/* <div className='grid grid-cols-6 gap-2 lg:gap-4'>

          <LaunchProjectsImg 
            source1='/images/launch-project1.jpeg'
            source2="/images/launch-project2.png"
            translate="0"
          />

          <LaunchProjectsImg
            source1='/images/launch-project2.png' 
            source2="/images/launch-project3.jpeg"
            translate="-46.4"
          />

          <LaunchProjectsImg
            source1='/images/launch-project3.jpeg' 
            source2="/images/launch-project2.png"
            translate="-35.5"
          />

          <LaunchProjectsImg
            source1="/images/launch-project1.jpeg"
            source2="/images/launch-project3.jpeg"
            translate="-15.5"
          />

          <LaunchProjectsImg
            source1="/images/launch-project3.jpeg" 
            source2="/images/launch-project1.jpeg"
            translate="-13.3"
          />

          <LaunchProjectsImg
            source1="/images/launch-project1.jpeg" 
            source2="/images/launch-project2.png"
            translate="-29.3"
          />

        </div> */}
        
        <div className='absolute flex items-center justify-center flex-col gap-[17px] sm:gap-[34px] text-hover 
          z-10 py-4 px-4 sm:px-8 bg-[#07090ACC] rounded-[32px] w-[95%] md:w-max
          top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <div className='text-center sm:text-left text-[14px] sm:text-[24px] lg:text-[36px] 2xl:text-[50px] font-bold
            uppercase'>
            Launch your project with us
          </div>
          <LinkButton text="Contact Us" width={200} height={50} source="contact" />
        </div>
      </div>
    </div>
  )
}

export default LaunchProjectSection