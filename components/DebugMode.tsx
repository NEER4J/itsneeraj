"use client";

import { useState, useEffect } from "react";

export default function DebugMode() {
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle debug mode with Alt+D
      if (e.altKey && e.key === "d") {
        setDebugMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (debugMode) {
      document.documentElement.classList.add("debug-screens");
    } else {
      document.documentElement.classList.remove("debug-screens");
    }
  }, [debugMode]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setDebugMode(!debugMode)}
        className="bg-black/70 text-white text-xs px-3 py-2 rounded-md border border-white/20 flex items-center gap-2"
      >
        <span className={`w-2 h-2 rounded-full ${debugMode ? 'bg-green-500' : 'bg-red-500'}`}></span>
        {debugMode ? 'Debug Mode: ON' : 'Debug Mode: OFF'}
      </button>
    </div>
  );
}