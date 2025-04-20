import Image from "next/image";

interface BrandProps  {
  id: number;
  icon: string;
  name: string;
  cover_image: string;
  description: string;
};

export const BrandDetails = ({ brand }: { brand: BrandProps }) => (
  <div>
    <div className="w-full h-[300px] relative mt-8 mb-[30px] sm:mb-[50px] rounded-[10px] overflow-hidden">
      <Image
        alt={`${brand.name} cover`}
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${brand.cover_image}`}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        loading="lazy"
        quality={75}
      />
    </div>

    <div className="text-[14px] sm:text-[18px] font-light mb-[80px] sm:mb-[120px]">
      {brand.description}
    </div>
  </div>
);