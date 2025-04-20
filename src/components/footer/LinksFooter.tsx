import Link from 'next/link';
import React from 'react'

interface Link {
  title: string;
  path: string;
}

interface LinksFooterProps {
  links: Link[];
}

const LinksFooter = ({links}:LinksFooterProps) => {
  return (
    <div className='flex flex-col gap-4'>
      {
        links.map((link)=>(
          <Link
            className='text-[12px] w-fit lg:text-sm font-light hover:text-hover cursor-default
              transition-all duration-300'
            key={link.title} 
            href={link.path}
          >
            {link.title}
          </Link>
        ))
      }
    </div>
  )
}

export default LinksFooter