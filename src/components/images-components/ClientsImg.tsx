import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ClientProps = {
  id: number;
  name: string;
  image: string;
  website: string | null; // Explicitly mark as nullable
};

interface ClientsImgProps {
  data: ClientProps[];
}

const ClientLogo = ({ client }: { client: ClientProps }) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}/${client.image}`;
  
  return (
    <>
      <Image
        width={75}
        height={75}
        priority={true}
        alt={client.name || 'Client logo'}
        src={client.image ? imageUrl : '/vector.png'}
        className='brightness-[1] group-hover:brightness-[1.2] transition-all duration-300 aspect-square'
      />
      {client.name && (
        <span className='absolute bottom-0 text-white text-[16px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          {client.name}
        </span>
      )}
    </>
  );
};

const ClientsImg = ({ data }: ClientsImgProps) => {

  if (!data?.length) {
    return null;
  }

  return (
    <div className='flex items-center justify-center flex-wrap
      gap-3 sm:gap-[20px] pt-[20px]'>
      {data.map((client) => (
        <div
          key={client.id}
          className='group flex items-center justify-center w-[144px] sm:w-[175px] lg:w-[200px]
            border-gradient aspect-square relative'
        >
          {client.website ? (
            <Link
              href={client.website}
              target="_blank"
              rel="noreferrer"
              className="w-full h-full flex items-center justify-center"
            >
              <ClientLogo client={client} />
            </Link>
          ) : (
            <ClientLogo client={client} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientsImg;