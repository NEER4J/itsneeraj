// app/page.tsx
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="min-h-screen text-white max-w-screen-xl mx-auto">
      <Header />
      <main>
     
        <HeroSection />
        <AboutSection />

      </main>
    </div>
  );
}