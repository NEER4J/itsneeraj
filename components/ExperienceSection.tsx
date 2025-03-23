"use client";

import { motion } from "framer-motion";

const ExperienceSection = () => {
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
    <section>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-8 md:py-10 py-0 mx-auto"
      >
        <motion.h2 
          variants={item}
          className="text-2xl/tight md:text-3xl/tight lg:text-4xl/tight font-bold my-6 lg:mb-16 lg:mt-0 text-gray-300"
        >
          Work experience
        </motion.h2>


        <div className="space-y-12">
          {/* Experience Section */}
          <motion.div variants={item} className="border-t border-neutral-700 py-6 " style={{ margin: "0" }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="lg:w-1/4">
                <h3 className="text-xl lg:text-2xl font-semibold text-white">NJ Designpark, <span className="text-gray-400">Bhilai(C.G.)</span></h3>
                <p className="text-gray-400 mt-1">• Oct 2022 - Present</p>
              </div>
              <div className="mt-2 md:mt-0 lg:w-1/4">
                <p className="text-sm lg:text-lg text-gray-300">Lead frontend developer and designer</p>
              </div>
              <div className="flex gap-2 mt-3 md:mt-0">
                <span className="px-4 py-1 rounded-full bg-neutral-900 text-gray-300 text-sm">UI/UX</span>
                <span className="px-4 py-1 rounded-full bg-neutral-900 text-gray-300 text-sm">Development</span>
                <span className="px-4 py-1 rounded-full bg-neutral-900 text-gray-300 text-sm">BRANDING</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="border-t border-b border-neutral-700 py-6 " style={{ margin: "0" }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="lg:w-1/4" >
                <h3 className="text-xl lg:text-2xl font-semibold text-white">Freelancing, <span className="text-gray-400">Remote</span></h3>
                <p className="text-gray-400 mt-1">• Jan 2020 - Oct 2022</p>
              </div>
              <div className="mt-2 md:mt-0 lg:w-1/4">
                <p className="text-sm lg:text-lg text-gray-300">Front-end developer and designer</p>
              </div>
              <div className="flex gap-2 mt-3 md:mt-0">
                <span className="px-4 py-1 rounded-full bg-neutral-900 text-gray-300 text-sm">UI/UX</span>
                <span className="px-4 py-1 rounded-full bg-neutral-900 text-gray-300 text-sm">Development</span>
                <span className="px-4 py-1 rounded-full bg-neutral-900 text-gray-300 text-sm">BRANDING</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="text-right">
            <p className="text-gray-400" >Work experience</p>
            <p className="text-white"> <i>4 years 11 months</i> </p>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={item} className=" mt-0 " style={{ margin: "0" }}>
            <h2 className="text-2xl/tight md:text-3xl/tight lg:text-4xl/tight font-bold my-5 lg:mb-10 lg:mt-0 text-gray-300">Education</h2>
            
            <div className="py-6 flex flex-col md:flex-row md:items-center justify-between mb-4 border-t border-b border-neutral-700 ">
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">Bachelor of Technology in Computer Science</h3>
                <p className="text-gray-400 mt-1">• June 2020 - June 2023</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-sm lg:text-lg text-gray-400">Chattisgarh swami vivekanand technical university</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;