// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import LanguageLoader from "@/components/LanguageLoader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Neeraj Sharma |  Web Developer & Designer",
  description: "I build accessible, pixel-perfect digital experiences for the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-white antialiased">
        <LanguageLoader />
        <SmoothScroll>
          <div className="rainbo-sec">
            <div className='rainbow'></div>
            <div className='rainbow'></div>
            <div className='rainbow'></div>
            <div className='rainbow'></div>
            <div className='rainbow'></div>
            <div className='rainbow'></div>
            <div className='h'></div>
            <div className='v'></div>
          </div>

          <main className="relative z-[2]">
            {children}
            <Footer />
          </main>
          
          
        </SmoothScroll>
      </body>
    </html>
  );
}