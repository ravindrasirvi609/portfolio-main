"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-purple-400 mb-6 uppercase tracking-widest">
            Words from Leaders
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter mix-blend-difference">
            Client <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Testimonials</span>
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Controls */}
          <div className="absolute top-1/2 -left-4 sm:-left-12 -translate-y-1/2 z-20">
             <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
             >
                <ChevronLeft className="w-6 h-6" />
             </button>
          </div>
          <div className="absolute top-1/2 -right-4 sm:-right-12 -translate-y-1/2 z-20">
             <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
             >
                <ChevronRight className="w-6 h-6" />
             </button>
          </div>

          {/* Carousel */}
          <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.div
                   key={currentIndex}
                   initial={{ opacity: 0, x: 100, scale: 0.95 }}
                   animate={{ opacity: 1, x: 0, scale: 1 }}
                   exit={{ opacity: 0, x: -100, scale: 0.95 }}
                   transition={{ duration: 0.5, ease: "easeInOut" }}
                   className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
                >
                   <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 max-w-4xl text-center relative w-full shadow-2xl">
                      <Quote className="absolute top-6 left-6 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 text-white/5" />
                      <Quote className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 text-white/5 rotate-180" />
                      
                      <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-light leading-relaxed mb-8 relative z-10 italic">
                         "{testimonials[currentIndex].quote}"
                      </p>
                      
                      <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10 relative z-10">
                         {/* Avatar Initial */}
                         <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-purple-500/20">
                            {testimonials[currentIndex].name.charAt(0)}
                         </div>
                         <h4 className="text-xl font-bold text-white mb-1">
                            {testimonials[currentIndex].name}
                         </h4>
                         <span className="text-sm text-cyan-400 font-mono tracking-wide uppercase">
                            {testimonials[currentIndex].title}
                         </span>
                      </div>
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
             {testimonials.map((_, idx) => (
                <button
                   key={idx}
                   onClick={() => setCurrentIndex(idx)}
                   className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                   aria-label={`Go to slide ${idx + 1}`}
                />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};
