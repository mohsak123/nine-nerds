"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { PopUpProjects } from './PopUpProjects';
import "./style.css";

type MediaProps = {
  id:string;
  project_id:string;
  sort_id:string;
  type:string;
  url:string;
}

type ProjectsProps = {
  id: number;
  name: string;
  image: string;
  media:MediaProps[]
};

interface ProjectsDataProps {
  projects: ProjectsProps[];
}

const ProjectsData = ({ projects }: ProjectsDataProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedProjectMedia, setSelectedProjectMedia] = useState<MediaProps[]>([]);

  const handleOpenDialog = (media: MediaProps[]) => {
    setSelectedProjectMedia(media);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <div>
      <div className="grid grid-col-1 xl:grid-cols-2 gap-8 pt-10 md:pt-16">
        {projects?.map((project, index) => (
          <div key={index} className="pt-2">
            <div
              onClick={() => handleOpenDialog(project.media)}
              className={`text-[18px] text-center md:text-left md:text-[24px] xl:text-[32px] font-bold
                pb-6 hover:text-hover cursor-pointer w-fit
              `}
            >
              {project.name}
            </div>
            <div
              onClick={() => handleOpenDialog(project.media)}
              className="group h-[320px] md:h-[490px] rounded-[15px]
                overflow-hidden cursor-pointer project"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${project.image}`}
                width={600}
                height={1}
                alt="project"
                className="w-full project-img object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <PopUpProjects
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        media={selectedProjectMedia}
      />
    </div>
  );
};

export default ProjectsData;
