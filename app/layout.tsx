// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neeraj Sharma | Full-stack Developer",
  description: "Portfolio of Neeraj Sharma, a full-stack developer focused on maintainable and clean code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}