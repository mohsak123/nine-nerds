import AToZSection from "@/components/home/AToZSection";
import ClientsSection from "@/components/home/ClientsSection";
import LaunchProjectSection from "@/components/home/LaunchProjectSection";
import MainSection from "@/components/home/MainSection";
import MapSection from "@/components/home/MapSection";
import PhilosophySection from '@/components/home/PhilosophySection';
import ProjectsSection from "@/components/home/ProjectsSection";

export default function Home() {

  return (
    <div>
      <MainSection />
      <PhilosophySection />
      <MapSection />
      <ClientsSection/>
      <AToZSection />
      <ProjectsSection />
      <LaunchProjectSection />
    </div>
  );
}
