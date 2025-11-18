"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Mail,
  ArrowDown,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { socialMedia } from "@/data";
import * as THREE from "three";
import gsap from "gsap";

/* ---------- Icon helpers ---------- */
const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePosition({ x, y });
      mousePositionRef.current = { x, y };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Text Reveal Effect
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, skewY: 7 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.5,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    }
  }, []);

  // Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const sphereMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x8a2be2,
      transparent: true,
      opacity: 0.6,
    });
    const sphereMesh = new THREE.Points(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    // Animation
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      sphereMesh.rotation.y -= 0.001;
      sphereMesh.rotation.x -= 0.0005;

      // Mouse interaction
      const { x, y } = mousePositionRef.current;
      camera.position.x += (x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const currentContainer = containerRef.current;

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentContainer && currentContainer.contains(renderer.domElement)) {
        currentContainer.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div ref={containerRef} className="fixed inset-0 z-0" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          style={{ y: y1, x: mousePosition.x * 20 }}
          className="flex flex-col items-center"
        >
          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-4 mix-blend-difference"
            >
              RAVINDRA
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                CHOUDHARY
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide"
          >
            Crafting digital experiences with code and creativity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
              onClick={() => {
                window.open(
                  "https://wa.me/918107199052?text=Hi%20Ravindra,%20I%20would%20like%20to%20connect%20with%20you!",
                  "_blank"
                );
              }}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Let&apos;s Talk
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
              onClick={() => {
                window.open(
                  "mailto:dev@ravindrachoudhary.in?subject=Hello%20Ravindra&body=Hi%20Ravindra,%0A%0AI%20would%20like%20to%20connect%20with%20you.",
                  "_blank"
                );
              }}
            >
              <Mail className="mr-2 w-5 h-5" />
              Email Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 flex gap-6"
          >
            {socialMedia.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </div>
    </div>
  );
}
