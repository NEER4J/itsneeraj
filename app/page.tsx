import { Hello } from "@/components/sections/hello";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/sections/section";

export default function HomePage() {
  return (
    <>
      <Hello />
      <SectionDivider />
      <Work />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Contact />
      <div className="h-12" aria-hidden />
    </>
  );
}
