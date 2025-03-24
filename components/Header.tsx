// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from 'react-scroll';
import SocialLinks from "@/components/SocialLinks";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFullName, setShowFullName] = useState(false);
  const lastScrollY = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  
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
  
  // Handle scroll events for header visibility and appearance
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setHeaderVisible(currentScrollY <= 10);
    };
    
    // Check scroll position immediately on mount/navigation
    controlHeader();
    
    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [pathname]); // Add pathname as dependency to run on route changes
  
  const navItems = [
    // { name: "Home", href: "home" },
    { name: "Work", href: "work" },
    { name: "About", href: "about" },
    { name: "Projects", href: "projects" },
    // { name: "Contact", href: "/contact" }, 
  ];

  

  return (
    <>
      <motion.header 
        className={cn(
          "max-w-7xl m-auto fixed top-0 left-0 right-0 py:10 pt-12 pb-12 md:py-16 px-6 md:px-8 flex justify-between items-center z-50 transition-all duration-300",
          isScrolled ? "shadow-lg py-4" : "bg-transparent",
        )}
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: headerVisible ? 0 : -100,
          opacity: headerVisible ? 1 : 0
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="header-left flex items-center gap-10">
          {/* Logo/Name with hover effect */}
          <div className="font-medium text-xl tracking-wide overflow-hidden relative">
          <div className="hover:opacity-90 transition-opacity inline-block">
            <div className="relative overflow-hidden w-48 flex gap-2">©
              <motion.div
                className="flex transition-all duration-300 ease-in-out"
                animate={{ x: showFullName ? '-105%' : '0%' }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <span className="inline-block min-w-full">Code by Neeraj</span>
                <span className="inline-block min-w-full"> Neeraj Sharma</span>
              </motion.div>
            </div>
          </div>
          <div 
            className="absolute inset-0 w-full h-full cursor-pointer"
            onMouseEnter={() => setShowFullName(true)}
            onMouseLeave={() => setShowFullName(false)}
          />
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.href}
                spy={true}
                smooth={true}
                offset={-80}
                duration={800}
                className={cn(
                  "text-base transition-all hover:scale-105 hover:text-gray-300 cursor-pointer relative group",
                  pathname === `/#${item.href}` ? "font-medium" : "font-normal"
                )}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"/>
              </ScrollLink>
            ))}
          </nav>
        </div>

        {/* Let's Talk Button (Desktop) */}
        <div className="hidden md:block">
          <Link 
            href="/contact" 
            className="flex items-center gap-2 bg-white hover:bg-gray-200 text-gray-800 rounded-full px-5 py-2 transform hover:scale-105 transition-all duration-300 ease-out"
          >
            <span>Let's Talk</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Menu Button (Both Mobile and Desktop) */}
        <button 
          className="md:hidden fixed right-0 text-white z-50 w-20 h-20 flex items-center justify-center rounded-full"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          style={{display: 'none !important'}}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.header>
      
      {/* Floating menu button that transforms between hamburger and close */}
      {!headerVisible && (
        <motion.button
          className="fixed right-6 top-6 text-black z-50 w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu (both Mobile and Desktop) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[90vw] md:w-[480px] z-40 flex flex-col bg-[#111] shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{
              x: '100%',
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25,
              },
            }}
            transition={{ 
              type: 'spring',
              stiffness: 400,
              damping: 40
            }}
          >
            <div className="pt-24 px-8 flex flex-col h-full w-full">
              <div className="text-lg text-gray-400 mb-6 uppercase tracking-widest">
                NAVIGATION
              </div>
              <div className="border-b border-gray-800 mb-8"></div>
              <nav className="flex flex-col space-y-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <ScrollLink
                      to={item.href}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={800}
                      className={cn(
                        "text-5xl md:text-6xl transition-all hover:text-white cursor-pointer flex items-center",
                        pathname === `/#${item.href}` ? "text-white font-medium" : "text-gray-300 font-normal"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {index === 0 && <span className="w-2 h-2 bg-white rounded-full mr-4 hidden"></span>}
                      {item.name}
                    </ScrollLink>
                  </motion.div>
                ))}
              </nav>
              
              <div className="mt-auto mb-10 pt-10">
                <div className="text-lg text-gray-400 mb-6 uppercase tracking-widest">
                  SOCIALS
                </div>
                <div className="border-b border-gray-800 mb-8"></div>
                <SocialLinks />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;