"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

interface MousePosition {
  x: number;
  y: number;
}

const InteractiveEmoji = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [prevMousePosition, setPrevMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [waveRotation, setWaveRotation] = useState(0);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Store previous position before updating
      setPrevMousePosition(mousePosition);
      
      // Update current mouse position
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [mousePosition]);
  
  // Calculate wave direction based on mouse movement
  useEffect(() => {
    // Calculate horizontal movement (positive = right, negative = left)
    const deltaX = mousePosition.x - prevMousePosition.x;
    
    // Only update rotation if there's significant movement
     if (Math.abs(deltaX) > 1) {
    // Map movement to rotation
    const newRotation = Math.max(-25, Math.min(25, deltaX * 1.5));
    setWaveRotation(newRotation);
  } else {
    // Gradually return to center when no movement
    setWaveRotation(prev => prev * 0.8);  // Use functional update pattern
  }
}, [mousePosition, prevMousePosition]);

  return (
    <motion.span 
      className="inline-block align-middle"
      style={{ 
        display: "inline-block",
        originX: 0.7,
        originY: 0.7,
        rotate: waveRotation,
        transition: "rotate 0.05s ease-out",
      }}
      animate={{
        rotate: waveRotation
      }}
    >
      👋
    </motion.span>
  );
};

export default InteractiveEmoji;