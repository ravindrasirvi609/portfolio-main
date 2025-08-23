"use client";
import { motion } from "framer-motion";
import { projects } from "@/data";
import {
  ExternalLink,
  Github,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Projects = () => (
  <section id="projects" className="relative min-h-screen py-20">
    <div className="container mx-auto px-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
          Featured Projects
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A showcase of my recent work, demonstrating expertise in modern web
          technologies
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
            className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Tech Stack Icons */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.iconLists.slice(0, 3).map((icon, iconIndex) => (
                  <div
                    key={iconIndex}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30"
                  >
                    <Image
                      src={icon}
                      alt="tech"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                ))}
                {project.iconLists.length > 3 && (
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 text-white text-xs font-bold">
                    +{project.iconLists.length - 3}
                  </div>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                {project.des}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.iconLists.slice(0, 4).map((icon, iconIndex) => (
                  <div
                    key={iconIndex}
                    className="w-6 h-6 bg-white/10 rounded flex items-center justify-center"
                  >
                    <Image
                      src={icon}
                      alt="tech"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Project
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-3 bg-white/5 hover:bg-white/10 text-white border border-white/20"
                >
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* View All Projects CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-16"
      >
        <Button
          variant="outline"
          size="lg"
          className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3 text-lg font-semibold"
        >
          <Github className="w-5 h-5 mr-2" />
          View All Projects on GitHub
        </Button>
      </motion.div>
    </div>
  </section>
);
