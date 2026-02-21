"use client";
import { motion } from "framer-motion";
import { techStack } from "@/data";
import Image from "next/image";

export const TechStack = () => {
  return (
    <section id="tech-stack" className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-purple-400 mb-6 uppercase tracking-widest">
            Architecture Arsenal
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            Enterprise-Grade <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Tech Stack</span>
          </h2>
          <p className="text-lg text-gray-400 font-light">
            I leverage modern, high-performance technologies to build scalable and secure digital systems. Every tool is chosen for maximum reliability and efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
           {techStack.map((tech, index) => (
              <motion.div
                 key={tech.name}
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 whileInView={{ opacity: 1, scale: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1, duration: 0.5 }}
                 className="group relative"
              >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative h-full p-6 pb-8 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-white/20 transition-all duration-300 transform-gpu group-hover:-translate-y-1">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-2xl">
                          {tech.icon && (
                            <Image 
                               src={tech.icon} 
                               alt={tech.name} 
                               fill 
                               className="object-contain" 
                            />
                          )}
                      </div>
                      <div className="text-center">
                          <h3 className="text-white font-medium text-lg tracking-wide">{tech.name}</h3>
                          <p className="text-xs text-purple-400/80 uppercase tracking-wider mt-1 font-mono">{tech.category}</p>
                      </div>
                  </div>
              </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
