import React from 'react'
import MainTitle from '../main-title/MainTitle'
import ProjectsData from './ProjectsData';
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

const AToZSection = async() => {

  let data: ProjectsProps[] = [];
  let error = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects?show_in_home=1&builtin=1`,{
        next: {revalidate: 10},
      });

    const allData = await response.json();

    data = allData.data || [];
  } catch (err) {
    console.error("Error fetching projects:", err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className='py-[64px] px-[30px] md:px-[60px]'>
        <p className="text-red-500 text-center py-10">Error: {error}</p>
      </div>
    );
  }

  if (!data.length) {
    return null
  }

  return (
    <div className='py-[64px] px-[30px] md:px-[60px]'>
      <div className='w-fit mx-auto'>
        <MainTitle title='A To Z Projects' id="aTOz" />
      </div>
      <ProjectsData projects={data} />
    </div>
  )
}

export default AToZSection