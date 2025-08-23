// Hero.tsx – drop-in replacement
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ThreeGlobe from "three-globe";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Loader,
  Download,
  Mail,
  ArrowDown,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialMedia } from "@/data";

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

/* ---------- 3-D Globe + Scroll ---------- */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const cameraZ = useTransform(scrollYProgress, [0, 0.5, 1], [300, 100, 800]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000510);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* Lighting */
    scene.add(new THREE.AmbientLight(0xcccccc, 0.8));
    const sun = new THREE.DirectionalLight(0xffffff, 1.8);
    sun.position.set(1, 1, 1);
    scene.add(sun);

    /* Starfield */
    const starVertices = new Float32Array(15_000 * 3).map(() =>
      THREE.MathUtils.randFloatSpread(2000)
    );
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(starVertices, 3)
    );
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* Globe */
    const globe = new ThreeGlobe()
      .globeImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .atmosphereColor("#3a92ff")
      .atmosphereAltitude(0.25);

    globe.rotateY(-Math.PI * 0.5);
    scene.add(globe);

    /* Controls */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 100;
    controls.maxDistance = 900;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enablePan = false;
    controls.enableZoom = false;

    /* Resize handler */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* Animation loop */
    const animate = () => {
      camera.position.z = cameraZ.get();
      controls.update();
      stars.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);
    setIsLoading(false);

    /* Cleanup */
    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if ((obj as any).geometry) (obj as any).geometry.dispose?.();
        const mat = obj as any;
        if (mat.material) {
          if (Array.isArray(mat.material))
            mat.material.forEach((m: any) => m.dispose?.());
          else mat.material.dispose?.();
        }
      });
    };
  }, [cameraZ]);

  return (
    <>
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-10 h-10 animate-spin text-cyan-400" />
            <p className="text-cyan-300 text-lg">Loading Earth…</p>
          </div>
        </div>
      )}

      {/* 3-D canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Scrollable content */}
      <div className="relative z-10 w-full h-[300vh] pointer-events-none">
        <section className="h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-auto text-center max-w-4xl mx-auto px-6"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-500 bg-clip-text text-transparent leading-tight"
            >
              Ravindra Choudhary
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-6 text-xl md:text-2xl lg:text-3xl text-gray-200 font-light"
            >
              Full-Stack Developer
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-3 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Building scalable web applications with modern tech
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3 text-lg font-semibold"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-8 flex justify-center space-x-6"
            >
              {socialMedia.map((social, index) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  {social.icon === Github ? (
                    <GithubIcon />
                  ) : social.icon === Linkedin ? (
                    <LinkedinIcon />
                  ) : (
                    <TwitterIcon />
                  )}
                </motion.a>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 flex flex-col items-center"
            >
              <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-6 h-6 text-cyan-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Résumé sections */}
        {[
          {
            title: "Experience",
            items: [
              "Viklele Consulting – Software Engineer (Dec 2024 → Present)\nCVS Health USA real-time staff tracking & advanced routing.",
              "Operant Pharmacy – Software Engineer (Jun 2023 → Nov 2024)\nNext.js pharmacy research platform, Razorpay payments, scalable DB design.",
              "Quadwave Consulting – Solution Developer (Apr 2022 → May 2023)\nASP.NET Core & Angular risk-management tool, REST APIs.",
            ],
          },
          {
            title: "Projects",
            items: [
              "Business Risk Management Tool – ASP.NET Core + Angular",
              "Social-Media Web App – Angular, Auth, Payments",
              "Pharmacy Research Platform – Next.js, Data-Viz",
              "Lift – Real-time Car-Pooling, Mapbox, Chat",
            ],
          },
        ].map((section, idx) => (
          <section
            key={idx}
            className="h-screen flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pointer-events-auto max-w-3xl text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent">
                {section.title}
              </h2>
              <div className="space-y-4 text-gray-200 text-lg md:text-xl">
                {section.items.map((t, i) => (
                  <p key={i} className="leading-relaxed">
                    {t}
                  </p>
                ))}
              </div>
            </motion.div>
          </section>
        ))}
      </div>
    </>
  );
}
