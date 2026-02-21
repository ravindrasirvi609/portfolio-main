"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { aboutData } from "@/data";
import {
  Zap,
  Globe,
  Database,
  Cpu,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const highlights = [
    { title: "Scalable Architecture", icon: Database, color: "text-cyan-400" },
    { title: "High Performance", icon: Zap, color: "text-purple-400" },
    { title: "Global Reach", icon: Globe, color: "text-pink-400" },
    { title: "Smart Systems", icon: Cpu, color: "text-emerald-400" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 sm:py-32 bg-[#050505] border-t border-white/5"
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/30 blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-900/30 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left - Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300 mb-6"
                >
                  The Architect
                </motion.div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tighter mb-6">
                  Not just building apps. <br/>
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Engineering Systems.
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
                  {aboutData.role}
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />

              <p className="text-lg text-gray-400 leading-relaxed font-light">
                {aboutData.story}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {highlights.map((item, i) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span className="text-gray-300 font-medium text-sm md:text-base">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Visual / Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none group perspective-1000">
              {/* Glass container */}
              <motion.div 
                 whileHover={{ rotateY: -5, rotateX: 5 }}
                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
                 className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-4 transform-gpu transition-all duration-500 hover:border-white/20"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 mix-blend-multiply" />
                  <Image
                    src="/ravindra.jpeg"
                    alt="Ravindra Choudhary"
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                    priority
                  />
                  
                  {/* Overlay Accent */}
                  <div className="absolute bottom-6 left-6 z-20">
                     <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span className="text-white font-mono text-sm tracking-widest uppercase">System Online</span>
                     </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-purple-500/30 rounded-bl-3xl" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
