import Link from "next/link"
import AccordionLinkMenu from "./AccordionLinkMenu";

// interface MenuItem {
//   title: string;
//   path: string;
// }

// interface linksMenuProps {
//   title: string;
//   mainPath:string,
//   menu1: MenuItem[];
//   menu2?: MenuItem[];
// }

// const linksMenu: linksMenuProps[] = [
//   {
//     title: "Services",
//     mainPath:"/services",
//     menu1: [
//       { title: "Branding", path: "/branding" },
//       { title: "Social media", path: "/social media" },
//       { title: "Product design", path: "/product-design" },
//       { title: "Booth production", path: "/booth-production" },
//       { title: "Programming", path: "/programming" },
//       { title: "Events organizing", path: "/events-organizing" },
//     ],
//     menu2: [
//       { title: "Content creation", path: "/content-creation" },
//       { title: "Printing", path: "/printing" },
//       { title: "3D design", path: "/3d-design" },
//       { title: "Photography", path: "/photography" },
//       { title: "Public relations", path: "/public-relations" },
//       { title: "Training", path: "/training" },
//     ]
//   },
//   {
//     title: "Our Brands",
//     mainPath:"/our-brands",
//     menu1: [
//       { title: "Menomize", path: "/menomize" },
//       { title: "9 - Nine", path: "/9-nine" },
//     ],
//   },
//   {
//     title: "Portfolio",
//     mainPath:"/portfolio",
//     menu1: [
//       { title: "A To Z Projects", path: "/a-z-projects" },
//       { title: "Branding", path: "/branding" },
//       { title: "Social media", path: "/social media" },
//       { title: "Product design", path: "/product-design" },
//       { title: "Booth production", path: "/booth-production" },
//       { title: "Programming", path: "/programming" },
//       { title: "Events organizing", path: "/events-organizing" },
//     ],
//     menu2: [
//       { title: "Content creation", path: "/content-creation" },
//       { title: "Printing", path: "/printing" },
//       { title: "3D design", path: "/3d-design" },
//       { title: "Photography", path: "/photography" },
//       { title: "Public relations", path: "/public-relations" },
//       { title: "Training", path: "/training" },
//     ]
//   }
// ]

type ServicesLinks = {
  id:number;
  name:string;
}

interface LinksMenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  services: ServicesLinks[];
  portfolios: ServicesLinks[];
  brands: ServicesLinks[];
}

const LinksMenu = ({setOpen, services, portfolios, brands}:LinksMenuProps) => {

  return (
    <div className="py-[20px]">
      <div className="flex flex-col md:flex-row items-start justify-start gap-[55px] lg:gap-[70px]">
        <Link href="/" onClick={()=>setOpen(false)}
          className="text-[18px] lg:text-[24px] hover:text-hover font-light transition-all duration-300"
        >
          Home
        </Link>
        
        <div className="relative group hidden md:block">
          <div className="text-[18px] lg:text-[24px] hover:text-hover font-light transition-all 
            duration-300 cursor-pointer">
            Services
          </div>
          <div className="hidden absolute group-hover:grid grid-cols-2 gap-8 w-max pt-8">
            {
              services.map((service)=>(
                <Link href={`/services/${service.id}`}
                  key={service.id} 
                  className="cursor-pointer w-fit hover:text-hover transition-all duration-300"
                  onClick={()=>setOpen(false)}
                  >
                  {service.name}
                </Link>
              ))
            }
          </div>
        </div>

        <div className="relative group hidden md:block">
          <div className="text-[18px] lg:text-[24px] hover:text-hover font-light transition-all 
            duration-300 cursor-pointer">
            Brands
          </div>
          <div className="hidden absolute group-hover:grid grid-cols-2 gap-8 w-max pt-8">
            {
              brands.map((brand)=>(
                <Link href={`/brands/${brand.id}`}
                  key={brand.id} 
                  className="cursor-pointer w-fit hover:text-hover transition-all duration-300"
                  onClick={()=>setOpen(false)}
                  >
                  {brand.name}
                </Link>
              ))
            }
          </div>
        </div>

        <div className="relative group hidden md:block">
          <div className="text-[18px] lg:text-[24px] hover:text-hover font-light transition-all 
            duration-300 cursor-pointer">
            portfolio
          </div>
          <div className="hidden absolute group-hover:grid grid-cols-2 gap-8 w-max pt-8">
            {
              portfolios.map((portfolio)=>(
                <Link href={`/portfolio/${portfolio.id}`}
                  key={portfolio.id} 
                  className="cursor-pointer w-fit hover:text-hover transition-all duration-300"
                  onClick={()=>setOpen(false)}
                  >
                  {portfolio.name}
                </Link>
              ))
            }
          </div>
        </div>

        <AccordionLinkMenu linksMenu={services} setOpen={setOpen} title="Services" baseUrl="services" />
        <AccordionLinkMenu linksMenu={brands} setOpen={setOpen} title="Brands" baseUrl="brands" />
        <AccordionLinkMenu linksMenu={portfolios} setOpen={setOpen} title="Portfolio" baseUrl="portfolio" />
      </div>

      <div className="flex flex-col md:flex-row gap-[55px] lg:gap-[70px] items-start justify-start mt-[55px] md:mt-[400px]">
        <Link href="/about" onClick={()=>setOpen(false)}
          className="text-[18px] lg:text-[24px] hover:text-hover font-light transition-all duration-300"
        >
          About Us
        </Link>
        <Link href="/contact" onClick={()=>setOpen(false)}
          className="text-[18px] lg:text-[24px] hover:text-hover font-light transition-all duration-300"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}

export default LinksMenu