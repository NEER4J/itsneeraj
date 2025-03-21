// components/HeroSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className=" px-6 md:px-8 md:py-20 py-5">
      <div className="">
        <motion.div 
          className=" gap-3 md:gap-10 md:mb-12 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Heading taking 2/3 of space */}
          <motion.div variants={item} className="md:col-span-3">
            <h1 className="text-5xl/tight sm:text-6xl/tight md:text-6xl/tight lg:text-8xl/tight font-bold mb-7">
              Hey there! <span className="inline-block align-middle">👋</span> <span className="text-gray-400">I'm Neeraj</span>,
             A Web Designer & Developer
            </h1>
          </motion.div>
          
          {/* Tagline in the right column */}
          <motion.div variants={item} className="flex items-start mt-4 mb-8">
            <p className="text-xl/tight md:text-3xl/tight text-gray-300">
              I build accessible, pixel-perfect digital experiences for the web.
            </p>
          </motion.div>
        </motion.div>
        
        {/* CTA buttons outside the heading/subtitle container */}
        <motion.div 
          variants={item} 
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex gap-4">
            <Link 
              href="/contact" 
              className="flex items-center text-sm md:text-lg gap-2 bg-white hover:bg-gray-50 text-gray-800 rounded-full px-6 py-3 transition-colors hidden"
            >
              <span>Let's Talk</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            <Link 
              href="/neeraj-resume.pdf" 
              target="_blank"
              download
              className="flex items-center text-sm md:text-lg gap-2 bg-transparent border border-gray-600 hover:border-gray-400 text-white rounded-full px-6 py-3 transition-colors"
            >
              <span>Download CV</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V16M12 16L7 11M12 16L17 11M3 17V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          
          {/* Social Media Icons */}
          <motion.div 
            className="flex mt-2 sm:mt-0 gap-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <SocialLink href="https://github.com/NEER4J" icon={<GithubIcon />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/neeraj-kumar-sharm-design/" icon={<LinkedinIcon />} label="LinkedIn" />
            <SocialLink href="https://www.instagram.com/neerajsharma.__/" icon={<InstagramIcon />} label="Instagram" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

// Social Link Component
const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link 
    href={href} 
    aria-label={label}
    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </Link>
);

// Social Media Icons
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.851 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" />
  </svg>
);


const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53438C20.8734 3.95625 21.1313 4.35469 21.3469 4.91719C21.5109 5.33438 21.7078 5.97188 21.7594 7.13906C21.8156 8.40469 21.8297 8.78438 21.8297 11.9859C21.8297 15.1922 21.8156 15.5719 21.7594 16.8328C21.7078 18.0047 21.5109 18.6375 21.3469 19.0594C21.1313 19.6172 20.8688 20.0203 20.4516 20.4375C20.0297 20.8594 19.6313 21.1172 19.0688 21.3328C18.6516 21.4969 18.0141 21.6938 16.8469 21.7453C15.5813 21.8016 15.2016 21.8156 12 21.8156C8.79375 21.8156 8.41406 21.8016 7.15313 21.7453C5.98125 21.6938 5.34844 21.4969 4.92656 21.3328C4.36875 21.1172 3.96563 20.8547 3.54844 20.4375C3.12656 20.0156 2.86875 19.6172 2.65313 19.0547C2.48906 18.6375 2.29219 18 2.24063 16.8281C2.18438 15.5625 2.17031 15.1828 2.17031 11.9812C2.17031 8.775 2.18438 8.39531 2.24063 7.13438C2.29219 5.9625 2.48906 5.32969 2.65313 4.9125C2.86875 4.35469 3.13125 3.95156 3.54844 3.53438C3.97031 3.1125 4.36875 2.85469 4.92656 2.63906C5.34844 2.475 5.98125 2.27813 7.15313 2.22656C8.41406 2.17031 8.79375 2.15625 12 2.15625M12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74687 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z" />
    <path d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z" />
    <path d="M19.8469 5.59238C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59238C16.9688 4.7955 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59238Z" />
  </svg>
);

export default HeroSection;