import Image from "next/image";
import MainTitle from "../main-title/MainTitle";
import Link from "next/link";



type MainSectionProps = {
  hero_section_image:string;
  hero_section_title:string;
  hero_section_description:string;
  facebook?:string;
  linkedin?:string;
  instagram?:string;
  whatsapp?:string;
  x?:string;
  pinterest?:string;
  behance?:string;
}


const MainSection = async() => {

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
    <div
      className={`relative h-screen px-[20px] sm:px-[40px] bg-cover bg-center`}
      style={{
        backgroundImage: `url('${process.env.NEXT_PUBLIC_STORAGE_URL}/${data?.hero_section_image}')`,
      }}
    >
      <div className="flex gap-6 md:gap-0 items-center justify-center md:justify-between h-full flex-col md:flex-row">
        <div className="flex flex-col items-center justify-center gap-[56px] relative xl:left-[117px]">
          <MainTitle
            title={data?.hero_section_title}
            id="main"
          />
          <div className="font-light text-justify text-[14px] sm:text-[18px]
            sm:w-[470px] leading-[24px] uppercase">
            {data?.hero_section_description}
          </div>
        </div>

        <div className="flex flex-row flex-wrap md:flex-col gap-6 sm:gap-8">

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
                width={32}
                height={32}
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
      </div>
    </div>
  );
}

export default MainSection;
