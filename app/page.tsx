"use client";

import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "lucide-react";
import * as THREE from "three";
import {
  projects,
  skills,
  socialMedia,
  testimonials,
  workExperience,
} from "@/data";

// Mock data (replace with your actual data)

// Three.js Background Component
const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.8,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    camera.position.z = 30;

    sceneRef.current = scene;
    rendererRef.current = renderer;
    particlesRef.current = particlesMesh;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.0008;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

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
        <ThreeBackground />

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
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                About Me
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Passionate about creating seamless digital experiences that make
                a difference
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Performance Focused
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Building lightning-fast applications that scale
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Design Excellence
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Crafting beautiful, intuitive user interfaces
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Collaborative
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Working closely with teams to deliver excellence
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Skills & Expertise
                </h3>
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                A showcase of my recent work and personal projects that
                demonstrate my skills
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                      <Code className="w-16 h-16 text-white opacity-50" />
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
                      {["React", "Next.js", "TypeScript", "Tailwind"].map(
                        (tech, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                          >
                            {tech}
                          </Badge>
                        )
                      )}
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

        {/* Experience Section */}
        <section
          id="experience"
          className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Work Experience
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                My professional journey and key achievements in the tech
                industry
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {workExperience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline line */}
                  {index !== workExperience.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-32 bg-gradient-to-b from-blue-500 to-purple-500" />
                  )}

                  <div className="flex items-start space-x-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-8 h-8 text-white" />
                    </div>

                    <Card className="flex-1 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                              {exp.title}
                            </CardTitle>
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                              {exp.company}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="flex items-center space-x-1"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>{exp.duration}</span>
                          </Badge>
                        </div>
                        <CardDescription className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                          {exp.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Client Testimonials
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                What people say about working with me and the results we&apos;ve
                achieved together
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-300">
                          {testimonial.title}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 text-yellow-400">
                          ⭐
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Ready to bring your ideas to life? Lets discuss your project and
                create something amazing together.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Email
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        dev@ravindrachoudhary.in
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Phone
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        +91 8107199052
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Location
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Pune, Maharashtra, India
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                      Send a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Name
                        </label>
                        <input
                          type="email"
                          className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Subject
                      </label>
                      <input className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none dark:bg-slate-700 dark:text-white"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-3">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

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
              <p>
                &copy; 2025 Ravindra Sirvi. All rights reserved. Built with
                Next.js, Three.js & ShadCN UI.
              </p>
            </div>
          </div>
        </footer>

        <ScrollToTop />
      </main>
    </>
  );
}
