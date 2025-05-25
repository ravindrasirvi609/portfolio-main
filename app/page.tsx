"use client";

import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Code,
  Palette,
  Zap,
  Users,
  Award,
  Calendar,
  ArrowUp,
  MessageCircle,
  Contact,
} from "lucide-react";
import * as THREE from "three";
import { socialMedia } from "@/data";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";

// Scroll to top button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 rounded-full p-3 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      size="icon"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

// SEO Component (simulated meta tags)
const SEOHead = () => {
  useEffect(() => {
    // Simulate setting document title and meta tags
    document.title =
      "Ravindra Choudhary - Full Stack Developer | Next.js Specialist | UI/UX Expert";

    // In a real Next.js app, you'd use next/head or app directory metadata
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Professional Full Stack Developer specializing in Next.js, React, and modern web technologies. Expert in UI/UX design and scalable web applications."
      );
    }
  }, []);

  return null;
};

export default function Home() {
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "projects",
        "experience",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SEOHead />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 relative overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                RC
              </div>
              <div className="hidden md:flex space-x-8">
                {["About", "Projects", "Experience", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                      currentSection === item.toLowerCase()
                        ? "text-blue-600"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        {/* <section
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

              <div className="space-y-4 max-w-4xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                  <span className="block text-slate-900 dark:text-white">
                    Hi, I&apos;m
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Ravindra Choudhary
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Full Stack Developer crafting exceptional digital experiences
                  with
                  <span className="font-semibold text-blue-600"> Next.js</span>,
                  <span className="font-semibold text-purple-600"> React</span>,{" "}
                  <span className="font-semibold text-red-600">Angular</span>{" "}
                  and
                  <span className="font-semibold text-green-600">
                    {" "}
                    modern technologies
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
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
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
                  asChild
                >
                  <a
                    href="https://wa.me/918107199052"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </a>
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
        </section> */}

        <Hero />

        {/* About Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <footer className="py-12 bg-slate-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Ravindra Sirvi
                </div>
                <p className="text-slate-400 mt-2">
                  Full Stack Developer • UI/UX Enthusiast
                </p>
              </div>

              <div className="flex space-x-6">
                {socialMedia.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2025 Ravindra Choudhary. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <ScrollToTop />
      </main>
    </>
  );
}
