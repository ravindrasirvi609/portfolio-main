"use client";

import { Button } from "@/components/ui/button";
import { socialMedia } from "@/data";
import { motion } from "framer-motion";
import {
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                <Code className="w-16 h-16 text-blue-600" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="block text-slate-900 dark:text-white">
                Hi, I&apos;m
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Ravindra Choudhary
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Full Stack Developer crafting exceptional digital experiences with
              <span className="font-semibold text-blue-600"> Next.js</span>,
              <span className="font-semibold text-purple-600"> React</span>, and
              <span className="font-semibold text-green-600">
                {" "}
                modern technologies
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {socialMedia.map((social) => {
              const IconComponent = social.icon;
              return (
                <Button
                  key={social.id}
                  variant="outline"
                  size="lg"
                  className="rounded-full hover:scale-105 transition-all duration-300 border-2 hover:border-blue-500 hover:text-blue-600"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    {social.id === 1
                      ? "GitHub"
                      : social.id === 2
                      ? "Twitter"
                      : "LinkedIn"}
                  </a>
                </Button>
              );
            })}
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
