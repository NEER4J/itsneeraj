"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProjectsSection = () => {
  const [hoveredDevice, setHoveredDevice] = useState<{projectId: number, deviceIndex: number} | null>(null);

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

  const projects = [
    {
      id: 1,
      title: "Apstic",
      subtitle: "Web & App Development Agency",
      description: "Apstic is a digital agency I founded to help businesses establish a strong online presence with cutting-edge web and mobile solutions. From branding and UI/UX to development and SEO, I’ve been deeply involved in crafting digital experiences that not only look great but also perform seamlessly. The challenge was to create scalable, high-performance websites and applications while ensuring top-notch design and discoverability.",
      tags: ["Branding", "UI/UX", "Web Development", "App Development", "SEO"],
      github: "https://apstic.com/",
      images: "/apstic-min.jpg"
    },
    {
      id: 2,
      title: "Trekova",
      subtitle: "Travel Experience Marketplace",
      description: "Trekova is an innovative platform designed to connect travelers with unique experiences. My role involved creating an intuitive UI/UX that simplifies trip bookings while maintaining a strong visual identity. One of the biggest challenges was balancing functionality with aesthetics, ensuring the platform was both easy to use and visually engaging. The result is a seamless marketplace that enhances adventure planning for travelers worldwide.",
      tags: ["Branding", "Mobile App", "UI/UX", "Design System", "Comming Soon"],
      github: "https://trekova.com/",
      images: "trekova-min.jpg"
    },
    {
      id: 3,
      title: "Astonsys",
      subtitle: "Helping a Global QA Company Go Digital",
      description: "Astonsys, a global software testing company, needed a digital transformation to strengthen its brand and online presence. My challenge was to modernize their platform with a cohesive design system while ensuring a professional and intuitive UI/UX. I worked on branding and web development to create a seamless experience that reflects their expertise in the QA industry, ultimately making their services more accessible and engaging.",
      tags: ["Branding", "UI/UX", "Design System", "Web Development"],
      github: "https://astonsys.com/",
      images: "astonsys-min.jpg"
    },
    {
      id: 4,
      title: "Updoer Technology",
      subtitle: "Elevating Digital Solutions",
      description: "Updoer Technology, an IT services and software testing company, needed a fresh approach to their branding and digital identity. I played a crucial role in refining their online presence, tackling challenges such as streamlining UI/UX for better engagement and ensuring their website effectively communicates their services. Through well-thought-out branding and design improvements, we created a strong, impactful digital experience.",
      tags: ["Branding", "UI/UX", "Digital Transformation", "Web Development"],
      github: "https://www.updoertechnology.com/",
      images: "updoer-min.jpg"
    },
    {
      id: 5,
      title: "UK Postcode API",
      subtitle: "Simplifying Address Lookup",
      description: "This project focused on developing a high-performance frontend for a UK postcode lookup tool. The challenge was to create a lightning-fast, user-friendly interface that seamlessly integrates with the API while maintaining a sleek, professional design. My work involved optimizing UI/UX to enhance usability, ensuring that businesses and developers could efficiently retrieve accurate address information with minimal friction.",
      tags: ["Branding", "UI/UX", "Web Development", "API Integration"],
      github: "https://github.com/NEER4J/postcode-frontend",
      images: "postcode-min.jpg"
    },
    {
      id: 6,
      title: "Nu Home - Quote Form Builder",
      subtitle: "Future SaaS Tool",
      description: "The Quote Form Builder is a tool I designed to streamline how businesses create and share custom quotes. My focus was on making the form creation process intuitive and adaptable, enabling users to generate professional, tailored quotes effortlessly. I tackled challenges such as UI/UX optimization and automation, ensuring that the tool is both powerful and easy to use—laying the groundwork for its evolution into a SaaS platform.",
      tags: ["Web Development", "UI/UX", "SaaS", "Automation"],
      github: "https://github.com/NEER4J/nu-home",
      images: "nu-home-min.jpg"
    }
];


  return (
    <section className="py-0 lg:py-5 mb-16 lg:mb-6">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-8 mx-auto"
      >
        <motion.h2 
          variants={item}
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-gray-300"
        >
          Projects
        </motion.h2>

        <div className="space-y-16 flex flex-wrap gap-10 justify-start">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={item}
              className="border-gray-500 border rounded-[40px] overflow-hidden m-0 w-1/1 md:w-[calc(50%-20px)]" style={{margin: 0}}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 p-8 md:p-14">
                {/* Project details - always on the left */}
                <div className="lg:col-span-12">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4">— {project.subtitle}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-4 py-1 rounded-full border-gray-500 border text-gray-300 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-gray-500 text-sm mb-8 space-y-4">
                    <p>{project.description}</p>
                    {/* {project.longDescription && <p className=" ">{project.longDescription}</p>} */}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {project.github && (
                      <Link 
                        href={project.github} 
                        target="_blank" 
                        className="w-16 h-18 flex items-center justify-center"
                      >
                        <Image 
                          src="/git.svg" 
                          alt="GitHub" 
                          width={100} 
                          height={100} 
                          className="opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    )}
                  
                  </div>
                </div>
                
                {/* Project images - always on the right */}
                <div className="lg:col-span-12 relative  overflow-hidden mt-8">
                  <div className="h-full inset-0 flex items-center justify-center">
                  
                  <img src={project.images} alt="" className="rounded-2xl" />

                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;