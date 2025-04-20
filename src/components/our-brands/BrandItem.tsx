import Image from "next/image";
import Link from "next/link";

interface BrandProps {
  id: number;
  icon: string;
  name: string;
  cover_image: string;
  description: string;
};


export const BrandItem = ({
  brand,
  brandsId,
}: {
  brand: BrandProps;
  brandsId:number
}) => (
  <Link
    href={`/brands/${brand.id}`}
    className={`flex group items-center justify-center gap-4 h-full p-6 cursor-pointer
      ${brand.id === brandsId ? "border-gradient-bottom" : ""}
    `}
  >
    <div
      className={`w-[60px] h-[60px] flex items-center justify-center
        ${brand.id === brandsId ? "border-gradient" : ""}
      `}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${brand.icon}`}
        alt={`${brand.name} logo`}
        width={44}
        height={44}
        className="p-1 w-[44px] h-[44px] object-contain"
        loading="lazy"
      />
    </div>
    <div
      className={`text-[14px] sm:text-[18px] font-light
        ${brand.id === brandsId ? "text-hover" : ""} group-hover:text-hover
      `}
    >
      {brand.name}
    </div>
  </Link>
);