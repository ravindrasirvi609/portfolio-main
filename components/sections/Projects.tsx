"use client";
import { motion } from "framer-motion";
import { projects } from "@/data";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export const Projects = () => (
  <section className="relative min-h-screen py-20">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mx-auto px-6"
    >
      <h2 className="text-5xl font-bold text-center text-white mb-12">
        Featured Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-video relative">
              <Image src={p.img} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <p className="text-slate-300 mb-4">{p.des}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                View <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);
