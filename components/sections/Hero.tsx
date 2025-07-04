"use client";
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Download, MessageCircle } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let globe: any;
    let controls: any;
    let renderer: any;
    let camera: any;
    let scene: any;
    let animationId: number;

    async function init() {
      // Dynamically import browser-only modules
      const [ThreeGlobeModule, OrbitControlsModule, countriesData] =
        await Promise.all([
          import("three-globe"),
          import("three/examples/jsm/controls/OrbitControls"),
          import("@/data/globe.json"),
        ]);
      const ThreeGlobe = ThreeGlobeModule.default;
      const OrbitControls = OrbitControlsModule.OrbitControls;
      const countries = countriesData.default || countriesData;

      const { current: canvas } = canvasRef;
      if (!canvas) return;

      scene = new THREE.Scene();
      // Add a starfield background
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starVertices.push(x, y, z);
      }
      starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starVertices, 3)
      );
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      scene.fog = new THREE.Fog(0x000000, 400, 2000);
      scene.background = new THREE.Color(0x0a0a23); // deep blue-black
      scene.add(new THREE.AmbientLight(0xffffff, 1.2)); // brighter ambient
      scene.add(new THREE.DirectionalLight(0xffffff, 1)); // brighter directional

      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 400);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setClearColor(0x0a0a23, 1);
      renderer.setSize(window.innerWidth, window.innerHeight);

      globe = new ThreeGlobe();
      // Add a realistic Earth texture (make sure this file exists in /public)
      if (typeof globe.globeImageUrl === "function") {
        globe.globeImageUrl("/earth-blue-marble.jpg");
      }
      // Add a glowing atmosphere
      globe
        .atmosphereColor("#3a9cff")
        .atmosphereAltitude(0.25)
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .hexPolygonColor((e: any) => {
          if (
            ["USA", "India", "Japan", "China", "Germany"].includes(
              e.properties.ISO_A3
            )
          ) {
            return "rgba(255,255,255,1)"; // white highlight
          } else return "rgba(255,255,255,0.7)"; // semi-white
        });

      const globeMesh = globe.clone();
      globeMesh.rotation.y = -Math.PI * (5 / 9);
      globeMesh.rotation.z = Math.PI / 9;
      scene.add(globeMesh);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 200;
      controls.maxDistance = 500;
      controls.rotateSpeed = 0.8;
      controls.zoomSpeed = 1;
      controls.autoRotate = false;
      controls.minPolarAngle = Math.PI / 3.5;
      controls.maxPolarAngle = Math.PI - Math.PI / 3;

      window.addEventListener("resize", handleResize);

      function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        camera.lookAt(scene.position);
        controls.update();
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      }
      animate();
    }

    if (typeof window !== "undefined") {
      init();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe && globe.traverse) {
        globe.traverse((child: any) => {
          if (child.geometry) {
            child.geometry.dispose();
          }
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m: any) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
      if (renderer) {
        renderer.dispose();
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", () => {});
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col h-screen items-center justify-center">
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
          Ravindra Choudhary
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-300">
          Full Stack Developer | UI/UX Enthusiast
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 hover:from-gray-200 hover:via-gray-300 hover:to-gray-400 text-black px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-gray-700/50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            onClick={() => window.open(`https://wa.me/918107199052`, "_blank")}
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Chat on WhatsApp
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-10 py-6 text-lg font-semibold hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            <Download className="w-6 h-6 mr-3" />
            Download Resume
          </Button>
        </div>
      </div>
    </div>
  );
}
