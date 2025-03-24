import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection"

export default function Home() {
  return (
    <main className="min-h-screen text-white max-w-screen-xl mx-auto" >
      <Header />
      <HeroSection />
      <div id="about">
        <AboutSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="work">
        <ExperienceSection />
      </div>
    </main>
  );
}