"use client";

import { useState, useEffect } from 'react';

const greetings = [
  { text: 'Hello', language: 'English' },
  { text: 'नमस्ते', language: 'Nepali' },
  { text: 'Hola', language: 'Spanish' },
  { text: 'Bonjour', language: 'French' },
  { text: 'Ciao', language: 'Italian' },
  { text: 'Olá', language: 'Portuguese' },
  { text: 'Hallo', language: 'German' },
  { text: 'Hej', language: 'Swedish' },
];

export default function LanguageLoader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if loader has been shown before
    const hasShownLoader = sessionStorage.getItem('hasShownLoader');
    
    if (!hasShownLoader) {
      setIsLoading(true);
      sessionStorage.setItem('hasShownLoader', 'true');
      
      // Change greeting every 180ms
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % greetings.length);
      }, 180);

      // Start exit animation after 2 seconds
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 2000);

      // Remove loader after exit animation
      const removeTimer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);

      return () => {
        clearInterval(interval);
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`loader fixed inset-0 z-50 flex items-center justify-center bg-[#161616] transition-all duration-500 ease-in-out
        ${isExiting ? 'translate-y-full rounded-t-[0000px]' : ''}`}
    >
      <div className={`text-center transform transition-all duration-300 ease-out
        ${isExiting ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="text-[50px] md:text-[50px] lg:text-[70px] font-bold text-white mb-2 transition-all duration-300 ease-in-out
          hover:scale-110 transform"
        >
          {greetings[currentIndex].text}
        </div>
        <div className="text-sm text-gray-400 tracking-wider">
          {greetings[currentIndex].language}
        </div>
      </div>
    </div>
  );
}