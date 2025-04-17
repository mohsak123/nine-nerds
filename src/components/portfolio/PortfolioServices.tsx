"use client"

import React, { useState } from 'react'
import SwiperPortfolio from './SwiperPortfolio';
import PortfolioDetails from './PortfolioDetails';
import ProjectsPortfolio from './ProjectsPortfolio';
interface ProjectService {
  id: number;
  name: string;
  cover_image: string;
  catalogue?: string;
}
interface PortfolioServicesProps {
  data: ProjectService[];
  portfolioId:number;
}

const PortfolioServices: React.FC<PortfolioServicesProps> = ({ data, portfolioId }) => {

  const firstService = data?.find(item => item.id === portfolioId) || data?.[0] || { id: 0, name: '', cover_image: '' };

  const [service, setService] = useState(firstService.name || "");
  const [portfolioServicesId, setPortfolioServicesId] = useState<number>(portfolioId);

  return (
    <div>

      <SwiperPortfolio
        names={data.map(item => ({ id: item.id, name: item.name }))}
        portfolioServicesId={portfolioServicesId}
        setPortfolioServicesId={setPortfolioServicesId}
        setService={setService}
      />

      {data.map(item => (
          <div 
            key={item.id}
            className={`${item.id === portfolioServicesId ? 'block' : 'hidden'}`}
          >
            <PortfolioDetails item={item} />
          </div>
      ))} 

      <ProjectsPortfolio data={data} service={service} />
    </div>
  );
};

export default PortfolioServices;
