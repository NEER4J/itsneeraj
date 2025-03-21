// app/page.tsx
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen text-white max-w-screen-2xl mx-auto">
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}