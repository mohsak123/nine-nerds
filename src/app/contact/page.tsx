import ContactForm from '@/components/contact-us/ContactForm'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'


type MainSectionProps = {
  facebook?:string;
  linkedin?:string;
  instagram?:string;
  whatsapp?:string;
  x?:string;
  pinterest?:string;
  behance?:string;
}


const page = async() => {

  let data:MainSectionProps = {} as MainSectionProps;
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website-content`);

    if (!response.ok) {
      throw new Error("Field to fetch hero section");
    }

    const allData = await response.json() || {};
    data = allData.data || {};
  } catch (err) {
    console.error("Error fetching hero section:", err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className='h-screen flex items-center justify-center px-[30px] md:px-[60px]'>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='px-[30px] lg:px-[60px] pt-[186px] mb-[150px]'>
      
      <div className='flex items-center flex-col lg:flex-row justify-start gap-[60px] lg:gap-[30px] xl:gap-[50px] 2xl:gap-[100px]'>
        <div className='flex items-center lg:items-end flex-col-reverse lg:flex-row justify-start 
            gap-[35px] xl:gap-[45px] 2xl:gap-[60px] w-full lg:w-1/2'>
          <div className='flex items-center flex-row lg:flex-col justify-center gap-[30px] sm:gap-[32px]'>

              {data?.instagram !== null ?
            <Link href={`${data.instagram}`} target="_blank">
              <Image
                alt="social-media"
                src="/images/insta.svg"
                width={50}
                height={50}
                priority={true}
                className="aspect-ratio"
              />
            </Link> 
            : 
            null
          }

          {data?.facebook !== null ?
            <Link href={`${data.facebook}`} target="_blank">
              <Image
                alt="social-media"
                src="/images/face.svg"
                width={50}
                height={50}
                priority={true}
                className="aspect-ratio"
              />
            </Link> 
          : 
          null}

          {data?.x !== null ?
            <Link href={`${data.x}`} target="_blank">
              <Image
                alt="social-media"
                src="/images/twitter.svg"
                width={30}
                height={30}
                priority={true}
                className="aspect-ratio"
              />
            </Link> 
          : 
          null}

        {data?.linkedin !== null ?
            <Link href={`${data.linkedin}`} target="_blank">
              <Image
                alt="social-media"
                src="/images/linked in.svg"
                width={50}
                height={50}
                priority={true}
                className="aspect-ratio"
              />
            </Link> 
          : 
          null}

        {data?.whatsapp !== null ?
            <Link href={`${data.whatsapp}`} target="_blank">
              <Image
                alt="social-media"
                src="/images/whats.svg"
                width={50}
                height={50}
                priority={true}
                className="aspect-ratio"
              />
            </Link> 
          : 
          null}

        {data?.pinterest !== null ?
            <Link href={`${data.pinterest}`} target="_blank">
              <Image
                alt="social-media"
                src="/images/pinterest.svg"
                width={50}
                height={50}
                priority={true}
                className="aspect-ratio"
              />
            </Link> 
          : 
          null}

        {data?.behance !== null ?
            <Link href={`${data.behance}`} target="_blank">
              <Image
                alt="social-media"
                src="/images/behance.svg"
                width={50}
                height={50}
                priority={true}
                className="aspect-ratio"
              />
            </Link> 
          : 
          null}
          </div>

          <div className="flex items-center justify-center flex-row lg:flex-col gap-[50px] sm:gap-[80px]">
            <div className='h-[1px] w-[32vw] sm:w-[145px] lg:w-[1px] lg:h-[145px] bg-[#6c6c6c]'></div>
            <div className='h-[1px] w-[32vw] sm:w-[145px] lg:w-[1px] lg:h-[140px] bg-[#6c6c6c]'></div>
          </div>

          <div className='relative w-full !min-h-[490px] md:w-[700px] sm:h-[500px] lg:h-[400px] lg:w-[460px] xl:w-full xl:h-[430px]'>
            <Image src="/images/contact-us.jpeg" alt='' fill className="object-cover" />

            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/100"></div>

            <div className='absolute bottom-0 w-full flex items-center justify-between 
              text-[8px] sm:text-[12px] lg:text-[10px] xl:text-[14px] font-light
              px-[12px] sm:px-[18px] py-[18px] sm:py-[25px] border-gradient-alt shadow-[0px_0px_10px_6.31px_#0000001A]
            '>
            <div>
              <div>Erbil Citadel. 356. 1.1</div>
              <div>miHistoric Sites · Aram Classic.</div>
            </div>
            <div>
              <div>ninenerd@gmail.com</div>
              <div>+900000000000</div>
            </div>
            </div>
          </div>
        </div>

        <div className='w-full xl:w-1/2'>

          <div className='text-[14px] xl:text-[16px] font-light text-hover'>GET IN TOUCH</div>
          <div className='text-[32px] xl:text-[40px] font-bold'>Contact us</div>

          <ContactForm />

        </div>
      </div>

    </div>
  )
}

export default page