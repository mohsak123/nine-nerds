import React from "react";
import { BrandItem } from "./BrandItem";
import { BrandDetails } from "./BrandDetails";

type BrandProps = {
  id: number;
  icon: string;
  name: string;
  cover_image: string;
  description: string;
};

interface SelectedBrandProps {
  brands: BrandProps[];
  brandsId:number;
}

const SelectedBrand = ({ brands, brandsId }: SelectedBrandProps) => {

  if (!brands.length) {
    return <div className="text-center py-10">No brands available</div>;
  }

  return (
    <div>
      <div className="w-full overflow-x-auto scrollbar-hidden">
        <div
          className="min-w-max sm:h-[110px] bg-[#1062620D] rounded-[10px] flex items-center
          justify-center gap-[20px] sm:gap-[60px] flex-row px-6"
        >
          {brands.map((brand) => (
            <BrandItem
              key={brand.id}
              brand={brand}
              brandsId={brandsId}
            />
          ))}
        </div>
      </div>

      {brands.map((brand) => (
        <div 
          key={brand.id} 
          className={`${brand.id === brandsId ? 'block' : 'hidden'}`}
        >
          <BrandDetails brand={brand} />
        </div>
      ))}
    </div>
  );
};

export default SelectedBrand;