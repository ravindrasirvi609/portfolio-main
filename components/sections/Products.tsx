"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { products } from "@/data";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
                <span className="text-sm font-mono tracking-widest text-cyan-400 uppercase">Product {String(index + 1).padStart(2, '0')}</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {product.title}
              </h2>
              <h3 className="text-xl sm:text-2xl text-purple-400 font-light tracking-wide">
                {product.tagline}
              </h3>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed font-light border-l-2 border-white/20 pl-6">
              {product.description}
            </p>

            {/* Features Built */}
            <div className="pt-4 space-y-4">
               <h4 className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Core Architecture</h4>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                 {product.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                       <ArrowRight className="w-4 h-4 text-cyan-500" />
                       <span className="text-sm md:text-base font-light">{feature}</span>
                    </li>
                 ))}
               </ul>
            </div>

            {/* Client Showcase */}
            <div className="pt-4 space-y-3">
              <h4 className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Trusted By</h4>
              <div className="flex flex-wrap gap-2">
                {product.clients.map((client: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-400 backdrop-blur-sm">
                    {client}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 pt-6">
              {product.link !== "#" && (
                <a 
                  href={product.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105"
                >
                  <span className="relative z-10">Live Preview</span>
                  <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              
              {/* Stack Icons */}
              <div className="flex -space-x-3">
                {product.iconLists.map((icon: string, i: number) => (
                   <div key={i} className="relative w-10 h-10 rounded-full border-2 border-black bg-[#111] flex items-center justify-center p-2 z-[10] hover:z-[20] transition-all hover:-translate-y-2">
                     <Image src={icon} alt="tech-icon" fill className="object-contain p-2" />
                   </div>
                ))}
              </div>
            </div>
            
          </motion.div>

          {/* Visual Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: isEven ? -10 : 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
             <div className="relative aspect-[16/10] w-full group perspective-1000">
                {/* Back Glow */}
                <div className={`absolute inset-0 rounded-2xl blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-60 bg-gradient-to-tr ${isEven ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'}`} />
                
                {/* Main Image Container */}
                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-xl transform-gpu transition-all duration-700 group-hover:scale-[1.02] group-hover:border-white/20">
                   {/* Browser/Window Header */}
                   <div className="absolute top-0 inset-x-0 h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 z-20">
                     <div className="w-3 h-3 rounded-full bg-red-500/80" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                     <div className="w-3 h-3 rounded-full bg-green-500/80" />
                   </div>
                   
                   <Image
                     src={product.img}
                     alt={product.title}
                     fill
                     className="object-cover object-top pt-10 filter brightness-90 group-hover:brightness-110 transition-all duration-700"
                   />
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export const Products = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="products" ref={containerRef} className="relative bg-[#050505] min-h-screen py-24 border-t border-white/5">
       {/* Section Header */}
       <div className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-0 hidden sm:block">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center md:text-left pt-20"
           >
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mix-blend-difference">
                 Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Products</span>
              </h2>
           </motion.div>
       </div>

       {/* Products List */}
       <div className="relative w-full flex flex-col">
          {products.map((product, index) => (
             <ProductCard key={product.id} product={product} index={index} />
          ))}
       </div>
    </section>
  );
};
