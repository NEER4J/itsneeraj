"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
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
        <section className="">

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="px-6 md:px-8 md:py-10 py-5 mx-auto mb-10"
            >
                <motion.p
                    variants={item}
                    className="text-2xl/tight md:text-3xl/tight lg:text-4xl/tight font-bold my-10 lg:mb-20 lg:mt-0 text-gray-300"
                >
                    Technologies, topics, or tools that I worked with
                </motion.p>
                <div className="flex flex-col lg:flex-row gap-8 relative">
                    {/* Left Content */}
                    <div className="flex-1">


                        <div className="flex flex-wrap gap-0">
                            {/* Front-end Card */}
                            <motion.div
                                variants={item}
                                className="bg-slate-100 rounded-[40px] p-8 bg text-gray-900 w-1/1 mb-4"
                            >
                                <h2 className="text-xl mb-3">Front-end</h2>
                                <p className="text-lg">
                                    Next.js / React / Tailwind / GSAP / Framer Motion / ShadCN / CSS / Bootstrap / HTML
                                </p>
                            </motion.div>



                            {/* Back-end Card */}
                            <motion.div
                                variants={item}
                                className="rounded-[40px] p-8 border border-gray-500 rounded-4xl w-1/2 mb-4"
                            >
                                <h2 className="text-xl font-semibold mb-3">Back-end</h2>
                                <p className="text-lg text-gray-400">
                                    Node / Supabase / PostgreSQL / gRPC / Express.js
                                </p>
                            </motion.div>

                            {/* Git hub Card */}
                            <motion.div
                                variants={item}
                                className=" w-1/2 flex justify-center items-center mb-4"
                            >

                                <a href="https://github.com/NEER4J/" target="_blank" rel="noopener noreferrer">
                                    <img src="/git.svg" alt="GitHub Profile" className="max-w-28" />
                                </a>

                            </motion.div>

                            {/* Design Tools Card*/}
                            <motion.div
                                variants={item}
                                className="rounded-[40px] p-8 border border-gray-500 rounded-4xl w-1/1 w-full mb-4"
                            >
                                <h2 className="text-xl font-semibold mb-3">Design Tools</h2>
                                <p className="text-lg text-gray-400">
                                    Figma / Adobe XD / LottieFiles / Spline / Adobe Illustrator
                                </p>
                            </motion.div>

                        </div>
                    </div>

                    {/* Right Content - Image and Text */}
                    <motion.div
                        variants={item}
                        className="lg:flex flex-1 flex-col"
                    >


                        <div className=" space-y-6">

                            {/* Workflow & Productivity Card */}

                            <motion.div
                                variants={item}
                                className="rounded-[40px] p-8 border border-gray-500 rounded-4xl w-1/1 w-full mb-4"
                            >
                                <h2 className="text-xl font-semibold mb-3">Workflow & Productivity</h2>
                                <p className="text-lg text-gray-400">
                                    Git & GitHub / Vercel & Netlify / (CI/CD) / Postman / Docker / Notion
                                </p>
                            </motion.div>


                            <div className="">


                                <div className="space-y-4 text-gray-300">
                                    {/* <h2 className="text-2xl font-bold">About Me</h2> */}
                                    <p>
                                        Hey! I'm Neeraj — I design and build websites that not only look clean but also <em className="italic">feel</em> right to use. I'm all about sharp UIs, smooth animations, and writing code that doesn't make future me cry.
                                    </p>


                                    <div className="flex flex-wrap gap-6 lg:flex-nowrap">
                                        <div>
                                            <p>
                                                Over the past few years, I've worked on everything from fast landing pages for startups to full-blown web apps. I like projects that challenge me to think, tweak, and occasionally question my life choices (looking at you, CSS). My goal? Build stuff that works well, loads fast, and doesn't make users rage-click.
                                            </p>
                                            <br />
                                            <p>
                                                Outside of the dev world, I'm usually fine-tuning my workspace, trying out new tools or frameworks I'll probably obsess over for a week, or binging anime on my projector setup like it's a mini theatre.
                                            </p>
                                        </div>

                                        <div className="inset-0 max-w-44">
                                            <img className="rounded-[30px] object-cover" src="/neeraj-bw.jpg" alt="" />
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutSection;