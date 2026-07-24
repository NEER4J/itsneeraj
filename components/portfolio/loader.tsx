"use client";

import { useEffect } from "react";

/**
 * Boot orchestrator. Content is hidden pre-paint via the `preload` class on
 * <html> (set in ThemeScript). Once fonts + all resources have loaded — with a
 * minimum on-screen time so it never flashes, and a hard max as a safety — it
 * removes `preload` (triggering the staggered section reveal) and fires
 * `pet:reveal` so the pet flies from center to its edge dock.
 */
export function Loader() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("preload")) return;

    // First-ever visit: hold the intro for ~2s. After that, the loading time is
    // dynamic — it lasts only as long as the page actually takes to load.
    let firstVisit = false;
    try {
      if (!localStorage.getItem("neeraj.visited")) {
        firstVisit = true;
        localStorage.setItem("neeraj.visited", "1");
      }
    } catch {}

    let done = false;
    const start = performance.now();
    const MIN = firstVisit ? 2000 : 300;
    const MAX = firstVisit ? 5000 : 4500;

    const reveal = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN - (performance.now() - start));
      window.setTimeout(() => {
        html.classList.remove("preload");
        html.classList.add("loaded");
        window.dispatchEvent(new Event("pet:reveal"));
      }, wait);
    };

    const loadP =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((res) =>
            window.addEventListener("load", () => res(), { once: true }),
          );
    const fontsP = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();

    const maxT = window.setTimeout(reveal, MAX);
    Promise.all([loadP, fontsP]).then(reveal);

    return () => clearTimeout(maxT);
  }, []);

  return null;
}
