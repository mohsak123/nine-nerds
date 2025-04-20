"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { PopUpProjects } from '../home/PopUpProjects';



type MediaProps = {
  id:string;
  project_id:string;
  sort_id:string;
  type:string;
  url:string;
}

type ProjectService = {
  id: number;
  name: string;
  icon: string;
  media:MediaProps[]
}

interface PortfolioService {
  id: number;
  name: string;
  cover_image: string;
  catalog?: string;
  projects?: ProjectService[];
}


const ProjectsPortfolio: React.FC<{ 
  data: PortfolioService[]; 
  service: string; 
}> = ({ data, service }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedProjectSource, setSelectedProjectSource] = useState<MediaProps[]>([]);

  const handleOpenDialog = (media: MediaProps[]) => {
    setSelectedProjectSource(media);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 mb-[120px]'>
      {data?.map((item) => (
        item.name === service ? (
          item?.projects?.map((project) => (
            <div key={project.id} className='group' onClick={() => handleOpenDialog(project.media)}>
              <div className='w-full border-gradient h-[176px] bg-footer flex items-center justify-center
                  group-hover:shadow-[0px_0px_10px_5px_var(--hover)] transition-all duration-500 cursor-pointer
                '>
                <Image 
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${project.icon}`}
                  alt='project-img'
                  width={75}
                  height={75}
                  className="w-[75px] h-[75px] object-contain"
                />
              </div>

              <div className='text-center mt-4 group-hover:text-hover transition-all duration-500 
                cursor-pointer text-[16px] font-bold'>
                {project.name}
              </div>
          </div>
        ))
        )
        : 
        null
        
      ))}
      
      <PopUpProjects
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        media={selectedProjectSource}
      />
    </div>
  );
}

export default ProjectsPortfolio;
