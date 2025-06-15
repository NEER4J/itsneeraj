"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SocialLinks from "@/components/SocialLinks";
import InteractiveEmoji from "@/components/InteractiveEmoji";

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
    <section className="px-6 md:px-8 md:py-20 py-5 mt-28">
      <div className="">
        <motion.div
          className="gap-3 md:gap-10 md:mb-12 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Heading taking 2/3 of space */}
          <motion.div variants={item} className="md:col-span-3">
            <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight lg:text-7xl/tight font-bold mb-7 text-gray-300">
              Hey there! <InteractiveEmoji /> <span className="text-white">I'm Neeraj</span>,
              A web designer & developer
            </h1>
          </motion.div>

          {/* Tagline in the right column */}
          <motion.div variants={item} className="flex items-start mt-4 mb-8">
            <p className="text-lg/tight md:text-2xl/tight text-gray-300">
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
            <Button href="/contact">
              <span>Let's Talk</span>
            </Button>

            <Button
              href="/neeraj_cv_2025.pdf"
              variant="download"
              target="_blank"
              download
            >
              <span>Download CV</span>
            </Button>
          </div>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex"
          >
            <SocialLinks />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;