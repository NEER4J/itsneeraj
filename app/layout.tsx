// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neeraj Sharma | Front End - Developer",
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
        </main>
      </body>
    </html>
  );
}