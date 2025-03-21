// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  const navItems = [
    { name: "Works", href: "/works" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
  ];

  return (
    <header className="py-10 px-6 md:px-8 flex justify-between items-center relative z-50">

<div className="header-left flex items-center gap-10">
      {/* Logo/Name */}
      <div className="font-bold text-2xl uppercase tracking-wide">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          NEERAJ
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-10">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-base transition-transform hover:scale-105 hover:text-gray-300",
              pathname === item.href ? "font-medium" : "font-normal"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

</div>
      {/* Let's Talk Button (Desktop) */}
      <div className="hidden md:block">
        <Link 
          href="/contact" 
          className="hidden flex items-center gap-2 bg-white hover:bg-gray-200 text-gray-800 rounded-full px-5 py-2 transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <span>Let's Talk</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed top-0 right-0 bottom-0 w-[250px] bg-gray-900 z-40 md:hidden flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="pt-20 px-6 flex flex-col h-full">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-lg transition-transform hover:text-gray-300",
                      pathname === item.href ? "font-medium" : "font-normal"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-auto mb-10 pt-10">
                <Link 
                  href="/contact" 
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 rounded-full px-5 py-2 transition-transform w-fit"
                >
                  <span>Let's Talk</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;