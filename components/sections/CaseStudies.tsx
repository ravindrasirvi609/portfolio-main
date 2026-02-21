"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { caseStudies } from "@/data";
import Image from "next/image";
import { TrendingUp, Activity, CheckCircle2 } from "lucide-react";

export const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} id="case-studies" className="relative bg-[#050505] min-h-screen py-24 sm:py-32 border-t border-white/5 overflow-hidden">
       {/* Background Elements */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-cyan-900/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-0 w-1/3 h-1/2 bg-purple-900/10 rounded-full blur-[150px]" />
       </div>

       <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center max-w-3xl mx-auto mb-20"
          >
             <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-cyan-400 mb-6 uppercase tracking-widest">
                Impact & Proof
             </div>
             <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter mix-blend-difference">
                Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Case Studies</span>
             </h2>
             <p className="text-lg text-gray-400 font-light">
                Discover how I transformed complex operational bottlenecks into streamlined, high-performance digital solutions for real-world businesses.
             </p>
          </motion.div>

          <div className="space-y-32">
             {caseStudies.map((study, index) => (
                <div key={study.id} className="relative group perspective-1000">
                   <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-16 items-center`}>
                      
                      {/* Image Preview */}
                      <motion.div 
                         initial={{ opacity: 0, scale: 0.95, rotateY: index % 2 === 0 ? -5 : 5 }}
                         whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                         viewport={{ once: true, margin: "-10%" }}
                         transition={{ duration: 0.8 }}
                         className="w-full lg:w-1/2 relative"
                      >
                         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl transform group-hover:scale-105 transition-transform duration-700" />
                         <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm p-2 transform-gpu group-hover:border-white/20 transition-all duration-500">
                             <div className="relative w-full h-full rounded-xl overflow-hidden filter grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500">
                                <Image
                                   src={study.image}
                                   alt={study.title}
                                   fill
                                   className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80" />
                             </div>

                             {/* Floating Metric Card over Image */}
                             <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex justify-between items-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                                <span className="text-white font-medium">{study.metrics[0].label}</span>
                                <span className="text-emerald-400 font-bold text-xl">{study.metrics[0].value}</span>
                             </div>
                         </div>
                      </motion.div>

                      {/* Case Details */}
                      <motion.div
                         initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true, margin: "-10%" }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                         className="w-full lg:w-1/2 space-y-8"
                      >
                         <div>
                            <span className="text-cyan-400 font-mono text-sm tracking-wider uppercase">{study.product}</span>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">{study.title}</h3>
                         </div>

                         <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-white/10 pl-10">
                            {/* Problem */}
                            <div className="relative">
                               <div className="absolute -left-[45px] top-1 w-6 h-6 rounded-full bg-[#050505] border-2 border-red-500/50 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                               </div>
                               <h4 className="text-sm uppercase tracking-widest text-red-500 font-semibold mb-2">The Problem</h4>
                               <p className="text-gray-400 font-light leading-relaxed">{study.problem}</p>
                            </div>

                            {/* Solution */}
                            <div className="relative">
                               <div className="absolute -left-[45px] top-1 w-6 h-6 rounded-full bg-[#050505] border-2 border-cyan-500/50 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                               </div>
                               <h4 className="text-sm uppercase tracking-widest text-cyan-500 font-semibold mb-2">The Solution</h4>
                               <p className="text-gray-300 font-light leading-relaxed">{study.solution}</p>
                            </div>

                            {/* Result */}
                            <div className="relative">
                               <div className="absolute -left-[45px] top-1 w-6 h-6 rounded-full bg-[#050505] border-2 border-emerald-500/50 flex items-center justify-center">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                               </div>
                               <h4 className="text-sm uppercase tracking-widest text-emerald-500 font-semibold mb-2">The Result</h4>
                               <p className="text-white font-medium leading-relaxed">{study.result}</p>
                            </div>
                         </div>

                         {/* Metrics Grid */}
                         <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                            {study.metrics.map((metric, i) => (
                               <div key={i} className="text-center sm:text-left">
                                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                     {metric.value}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-semibold">
                                     {metric.label}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </motion.div>

                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};
