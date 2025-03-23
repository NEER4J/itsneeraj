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
      description: "Apstic is a digital agency that helps businesses build powerful web and mobile applications, enhance their online presence, and optimize for search engines. As the founder, I have been involved in branding, UI/UX, development, and SEO strategies to deliver high-quality digital solutions.",
      longDescription: "With a strong focus on innovation and user experience, Apstic combines modern technologies like Next.js, React, and Supabase to create seamless and scalable solutions. From startups to enterprises, our goal is to craft digital products that drive growth and engagement.",
      tags: ["Branding", "UI/UX", "Web Development", "App Development", "SEO"],
      link: "https://example.com/apstic",
      github: "https://github.com/username/apstic"
    },
    {
      id: 2,
      title: "Trekova",
      subtitle: "Travel Experience Marketplace",
      description: "Trekova is an upcoming platform designed to revolutionize the way people discover and book unique travel experiences. The platform connects travelers with experience providers, allowing them to book curated activities, treks, and adventure experiences.",
      longDescription: "By leveraging modern technology, Trekova aims to bridge the gap between travelers and local guides, providing opportunities for both adventure seekers and service providers. The platform will be available on desktop, Android, and iOS, offering a smooth and intuitive booking experience.",
      tags: ["Branding", "Mobile App", "UI/UX", "Design System"],
      link: "https://example.com/trekova",
      github: "https://github.com/username/trekova"
    },
    {
      id: 3,
      title: "Astonsys",
      subtitle: "Helping a Global QA Company Go Digital",
      description: "Astonsys is a global software testing and quality assurance company that needed a digital transformation to strengthen its online presence. I contributed to the project by refining the company's branding, designing an intuitive UI/UX, and developing a robust design system for their platform.",
      longDescription: "Through a well-structured design approach, we created a user-friendly and professional interface that aligns with the brand's credibility in the QA industry. The result was a modern, responsive website that effectively communicates Astonsys' expertise and services.",
      tags: ["Branding", "UI/UX", "Design System", "Web Development"],
      link: "https://example.com/astonsys",
      github: "https://github.com/username/astonsys"
    },
    {
      id: 4,
      title: "Updoer Technology",
      subtitle: "Elevating Digital Solutions",
      description: "Updoer Technology is an IT services and software testing company that wanted to refine its branding and enhance its digital identity. I played a key role in shaping their online presence by working on UI/UX, branding, and web development.",
      longDescription: "By creating a clean and modern interface, we helped Updoer Technology stand out in the competitive IT space. The project involved revamping their website, optimizing user flows, and ensuring a consistent brand experience across digital platforms.",
      tags: ["Branding", "UI/UX", "Digital Transformation", "Web Development"],
      link: "https://example.com/updoer",
      github: "https://github.com/username/updoer"
    },
    {
      id: 5,
      title: "UK Postcode API",
      subtitle: "Simplifying Address Lookup",
      description: "This project involved developing the frontend for a UK postcode lookup tool, which helps developers and businesses quickly retrieve accurate address information. The goal was to create a fast, intuitive, and well-branded interface that integrates seamlessly with the API.",
      longDescription: "I worked on UI/UX improvements, frontend development, and branding to make the tool user-friendly and visually appealing. The final product offers a smooth and efficient experience, making address lookup easier for businesses and developers alike.",
      tags: ["Branding", "UI/UX", "Web Development", "API Integration"],
      link: "https://example.com/postcode-api",
      github: "https://github.com/username/postcode-api"
    },
    {
      id: 6,
      title: "Quote Form Builder",
      subtitle: "Future SaaS Tool",
      description: "The Quote Form Builder is a dynamic tool designed to help businesses generate customized quotes through an intuitive form interface. It allows users to create, edit, and share quote forms tailored to their specific services.",
      longDescription: "This project has the potential to be turned into a SaaS platform, enabling businesses to automate their quotation process while maintaining a professional and branded experience. The goal is to provide a user-friendly solution that enhances efficiency and customer engagement.",
      tags: ["Web Development", "UI/UX", "SaaS", "Automation"],
      link: "https://example.com/quote-builder",
      github: "https://github.com/username/quote-builder"
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

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={item}
              className="border-gray-500 border rounded-[40px] overflow-hidden " style={{ margin: "0", marginBottom: "30px"}}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0  p-8 md:p-14">
                {/* Project details - always on the left */}
                <div className="lg:col-span-5">
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
                    
                    {project.link && (
                      <Link 
                        href={project.link} 
                        target="_blank" 
                        className="group flex items-center gap-2"
                      >
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Project images - always on the right */}
                <div className="lg:col-span-7 relative h-[300px] md:h-[299px]  overflow-hidden">
                  <div className="h-full inset-0 flex items-center justify-center">
                    <div className="flex h-full w-full">
                      {/* Device mockups with hover effect - first device expanded by default */}
                      {[0, 1, 2].map((deviceIndex) => {
                        const isDefaultExpanded = !hoveredDevice && deviceIndex === 0;
                        const isHovered = hoveredDevice?.projectId === project.id && hoveredDevice?.deviceIndex === deviceIndex;
                        const shouldExpand = isHovered || isDefaultExpanded;
                        
                        return (
                          <div 
                            key={deviceIndex}
                            className={`h-full transition-all duration-500 ease-in-out flex items-center justify-center ${
                              shouldExpand ? 'w-2/4' : 'w-1/4'
                            }`}
                            onMouseEnter={() => setHoveredDevice({ projectId: project.id, deviceIndex })}
                            onMouseLeave={() => setHoveredDevice(null)}
                          >
                            <div 
                              className={`h-[80%] ${deviceIndex === 1 ? 'w-[90%]' : 'w-[80%]'} 
                                bg-neutral-800 rounded-lg flex items-center justify-center transition-all duration-500
                                ${shouldExpand ? '' : 'blur-[2px] opacity-70'}`}
                            >
                              <span className="text-neutral-600 text-sm">
                                {deviceIndex === 0 ? 'Mobile' : deviceIndex === 1 ? 'Desktop' : 'Tablet'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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