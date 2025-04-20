import Image from 'next/image'
import React from 'react'

interface LaunchProjectsImgProps {
  source1:string,
  source2:string,
  translate:string
}

const LaunchProjectsImg = ({source1, source2, translate}:LaunchProjectsImgProps) => {
  return (
    <div className={`full flex flex-col items-center justify-start gap-4`}
      style={{ transform: `translateY(${translate}%)` }}
    >
      {
        source1 !== "" && (
          <Image
          src={source1}
          alt='launch-section'
          width={500} 
          height={500}
          className='w-full'
        />
        )
      }

      {
        source2!== "" && (
          <Image
            src={source2}
            alt='launch-section'
            width={500} 
            height={500}
            className='w-full'
          />
        )
      }
    </div>
  )
}

export default LaunchProjectsImg