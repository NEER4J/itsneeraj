"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-[#111111] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          {/* Main Content Section */}
          <div className="w-full">
            <motion.div variants={item} className="flex flex-col md:flex-row items-start mb-10 relative">
              <div className="mb-10 pb-10 md:mb-0 border-b border-neutral-800 w-full">
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                  <Image
                    src="/neeraj-bw.jpg"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full aspect-square object-cover"
                  />
                  <h2 className="text-white text-5xl md:text-7xl">Let's work</h2>
                  </div>
                  <h2 className="text-white text-5xl md:text-7xl">together</h2>
                </div>
              </div>
              
              <div className="md:w-1/2 md:flex md:justify-end absolute right-[20px] top-[130px] md:right-[100px] md:top-[130px]">
              <a href="/contact">
                <div className="bg-[#fff]  aspect-square rounded-full p-6 md:p-12 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <span className="text-gray-800 font-medium">Get in touch</span>
                </div>
                </a>
              </div>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div variants={item} className="flex flex-col md:flex-row justify-start gap-5 py-8">
              <div className="">
                <Link href="mailto:ittsneeraj@gmail.com" className="text-white hover:text-gray-300 transition-colors text-lg border border-gray-600 hover:border-gray-400 rounded-full py-4 px-7 sm:w-full block text-center">
                  ittsneeraj@gmail.com
                </Link>
              </div>
              <div className="">
                <Link href="tel:+917470915225" className="text-white hover:text-gray-300 transition-colors text-lg border border-gray-600 hover:border-gray-400 rounded-full py-4 px-7 sm:w-full block text-center">
                  +91 747 091 5225
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom Section */}
          <motion.div variants={item} className="w-full flex flex-col-reverse md:flex-row justify-between items-start mt-10 pt-8 sm:border-t border-neutral-800 md:border-none">

<div className="flex w-1/1 lg:w-1/2 w-full justify-between border-t md:border-none border-neutral-800 pt-6 mt-6 md:mt-0 md:pt-0" >

            <div className="mb-6 md:mb-0">
              <p className="text-gray-500 mb-2">VERSION</p>
              <p className="text-white">{new Date().getFullYear()} © Edition</p>
            </div>
            
            <div className="mb-6 md:mb-0">
              <p className="text-gray-500 mb-2">LOCAL TIME</p>
              <p className="text-white">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</p>
            </div>
            </div>       
            <div className="">
              <p className="text-gray-500 mb-2">SOCIALS</p>
              <div className="flex gap-6">
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                  GitHub
                </Link>
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                  Instagram
                </Link>
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                  LinkedIn
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;