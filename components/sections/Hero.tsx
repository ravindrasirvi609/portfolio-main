import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button"; // Assuming this component handles its own B&W theming or is neutral
import {
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Code,
  Download,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

const ThreeJSHero = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const geometryGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const socialMedia = [
    { id: 1, icon: Github, url: "#", label: "GitHub" },
    { id: 2, icon: Twitter, url: "#", label: "Twitter" },
    { id: 3, icon: Linkedin, url: "#", label: "LinkedIn" },
  ];

  // Particle system setup
  const createParticleSystem = () => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Grayscale particles: R, G, and B values are the same
      const grayScaleValue = Math.random() * 0.6 + 0.4; // Range from 0.4 (dark gray) to 1.0 (white)
      colors[i * 3] = grayScaleValue;
      colors[i * 3 + 1] = grayScaleValue;
      colors[i * 3 + 2] = grayScaleValue;

      sizes[i] = Math.random() * 2 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute(
      "particleColor",
      new THREE.BufferAttribute(colors, 3)
    );
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 particleColor;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = particleColor; // Will be grayscale
          vec3 pos = position;
          pos.x += sin(time + position.y * 0.1) * 0.1;
          pos.y += cos(time + position.x * 0.1) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor; // vColor is already grayscale
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float alpha = 1.0 - (distance * 2.0);
          gl_FragColor = vec4(vColor, alpha * 0.8); // vColor is (gray, gray, gray)
        }
      `,
      transparent: true,
      vertexColors: true,
    });

    return new THREE.Points(geometry, material);
  };

  // Create floating geometric shapes
  const createFloatingGeometry = () => {
    const group = new THREE.Group();

    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 8, 16);
    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888, // Mid-gray
      transparent: true,
      opacity: 0.8,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-3, 2, -2);
    group.add(torus);

    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.8);
    const octaMaterial = new THREE.MeshPhongMaterial({
      color: 0xcccccc, // Light-gray
      transparent: true,
      opacity: 0.7,
    });
    const octa = new THREE.Mesh(octaGeometry, octaMaterial);
    octa.position.set(3, -1, -1);
    group.add(octa);

    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.6);
    const icoMaterial = new THREE.MeshPhongMaterial({
      color: 0x555555, // Dark-gray
      transparent: true,
      opacity: 0.6,
    });
    const ico = new THREE.Mesh(icoGeometry, icoMaterial);
    ico.position.set(-2, -2, -3);
    group.add(ico);

    // Dodecahedron
    const dodecaGeometry = new THREE.DodecahedronGeometry(0.7);
    const dodecaMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee, // Very light-gray (almost white)
      transparent: true,
      opacity: 0.5,
      wireframe: true,
    });
    const dodeca = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
    dodeca.position.set(2, 2, -2);
    group.add(dodeca);

    return group;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 15); // Black fog
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x505050, 0.8); // Dark gray ambient light, slightly brighter
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // White directional light, slightly stronger
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Point lights changed to white for neutral illumination
    const pointLight1 = new THREE.PointLight(0xffffff, 0.7, 10);
    pointLight1.position.set(-5, 5, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.7, 10);
    pointLight2.position.set(5, -5, 2);
    scene.add(pointLight2);

    // Add particle system
    const particles = createParticleSystem();
    scene.add(particles);
    particlesRef.current = particles as THREE.Points;

    // Add floating geometry
    const geometryGroup = createFloatingGeometry();
    scene.add(geometryGroup);
    geometryGroupRef.current = geometryGroup;

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update particles
      if (particlesRef.current) {
        (
          particlesRef.current.material as THREE.ShaderMaterial
        ).uniforms.time.value = time;
        particlesRef.current.rotation.y = time * 0.1;
      }

      // Animate floating geometry
      if (geometryGroupRef.current) {
        geometryGroupRef.current.children.forEach((mesh, index) => {
          mesh.rotation.x = time * (0.5 + index * 0.1);
          mesh.rotation.y = time * (0.3 + index * 0.1);
          mesh.position.y += Math.sin(time + index) * 0.001;
        });
      }

      // Camera movement based on mouse
      camera.position.x +=
        (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y +=
        (mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-black via-gray-800 to-black">
      {/* Three.js Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{ background: "transparent" }}
      />

      {/* Overlay Content */}
      <div
        className={`relative z-10 flex items-center justify-center h-full transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container px-4 md:px-6 text-center">
          {/* Profile Avatar with 3D effect */}
          <div className="relative mb-8 mx-auto w-fit">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-white p-1 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="w-full h-full rounded-full bg-black/90 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                <Code className="w-20 h-20 text-white z-10 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-400/20 animate-pulse" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full animate-ping" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block text-white/90 mb-2 transform hover:scale-105 transition-transform duration-300">
                  Hi, I&apos;m
                </span>
                <span className="block bg-gradient-to-r from-orange-500 via-whi to-orange-500 bg-clip-text text-transparent animate-pulse">
                  Ravindra Choudhary
                </span>
              </h1>

              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Full Stack Developer crafting
                <span className="font-bold text-white"> exceptional </span>
                digital experiences with
                <span className="font-bold text-blue-500"> Next.js</span>,
                <span className="font-bold text-green-500"> React</span>
                <span className="font-bold text-red-500"> Angular </span>
                <span className="font-bold text-purple-500">
                  {" "}
                  TypeScript
                </span>{" "}
                and
                <span className="font-bold text-white">
                  {" "}
                  modern technologies
                </span>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {socialMedia.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.id}
                    variant="outline"
                    size="lg"
                    className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:scale-110 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-gray-500/25"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    {social.label}
                  </Button>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 hover:from-gray-200 hover:via-gray-300 hover:to-gray-400 text-black px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-gray-700/50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                onClick={() =>
                  window.open(`https://wa.me/918107199052`, "_blank")
                }
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

          {/* Scroll Indicator */}
          <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center animate-bounce">
            <div className="flex flex-col items-center text-white/60">
              <span className="text-sm mb-2 font-medium">
                Scroll to explore
              </span>
              <ChevronDown className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-8 left-8 z-20 mt-14">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium">
              Available for work
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-20 mt-14">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
          <div className="text-white/80 text-sm">
            <div className="font-medium">Portfolio 2025</div>
            <div className="text-xs text-white/60">Full Stack Developer</div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/80 text-lg font-medium">
              Loading Experience...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeJSHero;
