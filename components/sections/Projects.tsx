"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data";
import { Code, ExternalLink } from "lucide-react";
import Image from "next/image";

export const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A showcase of my recent work and personal projects that demonstrate
            my skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="w-full h-full relative">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-green-600/20" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Button className="opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  {project.des}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.iconLists.map((icon, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                    >
                      <Image
                        src={icon}
                        alt="tech"
                        className="h-4 w-4 mr-1"
                        width={16}
                        height={16}
                      />
                    </Badge>
                  ))}
                </div>
                <Button
                  className="w-full rounded-full"
                  variant="outline"
                  asChild
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
